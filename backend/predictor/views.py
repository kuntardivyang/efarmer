import os
import logging
from pathlib import Path

import joblib
import numpy as np
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

# Logger setup
logger = logging.getLogger(__name__)

# Disease class mapping
DISEASE_CLASSES = {
    0: 'Healthy',
    1: 'Powdery',
    2: 'Rust'
}

# Valid ranges for crop recommendation inputs
INPUT_RANGES = {
    'N': (0, 140),
    'P': (5, 145),
    'K': (5, 205),
    'temperature': (8, 44),
    'humidity': (14, 100),
    'ph': (3.5, 10),
    'rainfall': (20, 300)
}

# Lazy loading for ML models to improve startup time
_disease_model = None
_crop_model = None
_label_encoder = None
_scaler = None


def get_disease_model():
    """Lazy load the disease classification model."""
    global _disease_model
    if _disease_model is None:
        try:
            import tensorflow as tf
            model_path = Path(settings.BASE_DIR) / 'plant_disease_model.h5'
            _disease_model = tf.keras.models.load_model(str(model_path))
            _disease_model.compile(
                optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            logger.info("Disease model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load disease model: {e}")
            raise
    return _disease_model


def get_crop_model():
    """Lazy load the crop recommendation model."""
    global _crop_model
    if _crop_model is None:
        try:
            model_path = Path(settings.BASE_DIR) / 'knn_crop_recommendation_model.pkl'
            _crop_model = joblib.load(str(model_path))
            logger.info("Crop model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load crop model: {e}")
            raise
    return _crop_model


def get_label_encoder():
    """Lazy load the label encoder."""
    global _label_encoder
    if _label_encoder is None:
        try:
            encoder_path = Path(settings.BASE_DIR) / 'label_encoder.pkl'
            _label_encoder = joblib.load(str(encoder_path))
            logger.info("Label encoder loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load label encoder: {e}")
            raise
    return _label_encoder


def get_scaler():
    """Lazy load the scaler."""
    global _scaler
    if _scaler is None:
        try:
            scaler_path = Path(settings.BASE_DIR) / 'scaler.pkl'
            _scaler = joblib.load(str(scaler_path))
            logger.info("Scaler loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load scaler: {e}")
            raise
    return _scaler


def validate_image(img_file):
    """Validate uploaded image file."""
    # Check file size (max 10MB)
    if img_file.size > 10 * 1024 * 1024:
        return False, "Image file too large. Maximum size is 10MB."

    # Check file type
    allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if img_file.content_type not in allowed_types:
        return False, "Invalid image type. Allowed types: JPEG, PNG, WebP."

    return True, None


def cleanup_temp_file(file_path):
    """Clean up temporary files."""
    try:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
            logger.debug(f"Cleaned up temp file: {file_path}")
    except Exception as e:
        logger.warning(f"Failed to clean up temp file {file_path}: {e}")


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def predict(request):
    """
    Predict plant disease from an uploaded image.

    Expected: POST request with 'image' file field.
    Returns: { "success": true, "data": { "predicted_class": "Healthy|Powdery|Rust", "confidence": 0.95 } }
    """
    img_full_path = None

    try:
        # Validate request
        if 'image' not in request.FILES:
            return Response({
                'success': False,
                'message': 'No image file provided. Please upload an image.'
            }, status=status.HTTP_400_BAD_REQUEST)

        img_file = request.FILES['image']

        # Validate image
        is_valid, error_message = validate_image(img_file)
        if not is_valid:
            return Response({
                'success': False,
                'message': error_message
            }, status=status.HTTP_400_BAD_REQUEST)

        # Ensure media directory exists
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

        # Save the file temporarily
        import uuid
        temp_filename = f"temp_{uuid.uuid4().hex}.jpg"
        img_path = default_storage.save(temp_filename, ContentFile(img_file.read()))
        img_full_path = os.path.join(settings.MEDIA_ROOT, img_path)

        logger.info(f"Image saved temporarily to: {img_full_path}")

        # Load and preprocess the image
        from tensorflow.keras.preprocessing import image as keras_image

        img = keras_image.load_img(img_full_path, target_size=(128, 128))
        img_array = keras_image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        logger.debug(f"Image array shape: {img_array.shape}")

        # Get prediction
        model = get_disease_model()
        predictions = model.predict(img_array, verbose=0)
        predicted_class_idx = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))

        disease_name = DISEASE_CLASSES.get(predicted_class_idx, 'Unknown')

        logger.info(f"Prediction: {disease_name} (confidence: {confidence:.2%})")

        return Response({
            'success': True,
            'data': {
                'predicted_class': disease_name,
                'confidence': round(confidence, 4),
                'all_probabilities': {
                    name: round(float(predictions[0][idx]), 4)
                    for idx, name in DISEASE_CLASSES.items()
                }
            }
        }, status=status.HTTP_200_OK)

    except FileNotFoundError as e:
        logger.error(f"Model file not found: {e}")
        return Response({
            'success': False,
            'message': 'ML model not available. Please contact support.'
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    except Exception as e:
        logger.error(f"Error during disease prediction: {e}", exc_info=True)
        return Response({
            'success': False,
            'message': 'An error occurred during prediction. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    finally:
        # Always clean up temp files
        cleanup_temp_file(img_full_path)


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def recommend_crop(request):
    """
    Recommend a crop based on soil and weather conditions.

    Expected: POST request with JSON body containing N, P, K, temperature, humidity, ph, rainfall.
    Returns: { "success": true, "data": { "predicted_crop": "rice" } }
    """
    try:
        # Extract and validate input data
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        input_values = {}
        validation_errors = []

        for field in required_fields:
            value = request.data.get(field)

            if value is None or value == '':
                validation_errors.append(f"{field} is required")
                continue

            try:
                float_value = float(value)
                min_val, max_val = INPUT_RANGES[field]

                if not (min_val <= float_value <= max_val):
                    validation_errors.append(
                        f"{field} must be between {min_val} and {max_val}"
                    )
                else:
                    input_values[field] = float_value

            except (ValueError, TypeError):
                validation_errors.append(f"{field} must be a valid number")

        if validation_errors:
            return Response({
                'success': False,
                'message': 'Validation failed',
                'errors': validation_errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Log input data
        logger.info(f"Crop recommendation input: {input_values}")

        # Prepare input array in the correct order
        input_array = np.array([[
            input_values['N'],
            input_values['P'],
            input_values['K'],
            input_values['temperature'],
            input_values['humidity'],
            input_values['ph'],
            input_values['rainfall']
        ]])

        # Scale the input
        scaler = get_scaler()
        scaled_input = scaler.transform(input_array)

        logger.debug(f"Scaled input: {scaled_input}")

        # Get prediction
        model = get_crop_model()
        label_encoder = get_label_encoder()

        predicted_index = model.predict(scaled_input)
        predicted_crop = label_encoder.inverse_transform(predicted_index)[0]

        logger.info(f"Recommended crop: {predicted_crop}")

        return Response({
            'success': True,
            'data': {
                'predicted_crop': predicted_crop,
                'input_summary': {
                    'nitrogen': input_values['N'],
                    'phosphorus': input_values['P'],
                    'potassium': input_values['K'],
                    'temperature': input_values['temperature'],
                    'humidity': input_values['humidity'],
                    'ph': input_values['ph'],
                    'rainfall': input_values['rainfall']
                }
            }
        }, status=status.HTTP_200_OK)

    except FileNotFoundError as e:
        logger.error(f"Model file not found: {e}")
        return Response({
            'success': False,
            'message': 'ML model not available. Please contact support.'
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    except Exception as e:
        logger.error(f"Error during crop recommendation: {e}", exc_info=True)
        return Response({
            'success': False,
            'message': 'An error occurred during prediction. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def health_check(request):
    """Health check endpoint for the ML service."""
    models_status = {
        'disease_model': False,
        'crop_model': False,
        'label_encoder': False,
        'scaler': False
    }

    try:
        get_disease_model()
        models_status['disease_model'] = True
    except Exception:
        pass

    try:
        get_crop_model()
        models_status['crop_model'] = True
    except Exception:
        pass

    try:
        get_label_encoder()
        models_status['label_encoder'] = True
    except Exception:
        pass

    try:
        get_scaler()
        models_status['scaler'] = True
    except Exception:
        pass

    all_healthy = all(models_status.values())

    return Response({
        'success': True,
        'status': 'healthy' if all_healthy else 'degraded',
        'models': models_status
    }, status=status.HTTP_200_OK if all_healthy else status.HTTP_503_SERVICE_UNAVAILABLE)
