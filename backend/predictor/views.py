import joblib
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from tensorflow.keras.preprocessing import image
from django.conf import settings
import os
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sklearn.impute import SimpleImputer

# Logger setup
logger = logging.getLogger(__name__)

# Load the crop recommendation model
crop_model = joblib.load('knn_crop_recommendation_model.pkl')

# Load the label encoder model
le = joblib.load('label_encoder.pkl')

# Load the plant disease classification model
disease_model = tf.keras.models.load_model('plant_disease_model.h5')
disease_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

@csrf_exempt
def predict(request):
    try:
        if request.method == 'POST' and 'image' in request.FILES:
            img_file = request.FILES['image']
            
            # Save the file in the media folder and get the relative path
            img_path = default_storage.save('temp.jpg', ContentFile(img_file.read()))

            # Get the absolute path to the file using MEDIA_ROOT
            img_full_path = os.path.join(settings.MEDIA_ROOT, img_path)
            logger.info(f"Image saved to: {img_full_path}")

            # Load and preprocess the image
            img = image.load_img(img_full_path, target_size=(128, 128))
            img_array = np.expand_dims(image.img_to_array(img) / 255.0, axis=0)
            logger.info(f"Image array shape: {img_array.shape}")
            
            # Predict using the disease model
            predictions = disease_model.predict(img_array)
            logger.info(f"Disease Predictions: {predictions}")
            predicted_class = np.argmax(predictions)
            logger.info(f"Predicted class: {predicted_class}")
            if (predicted_class == 1):
                disease = 'Powdery'
            elif (predicted_class == 2):
                disease = 'Rust'
            elif(predicted_class == 0) :
                disease = 'Healthy'

            # Return the predicted class as a JSON response
            return JsonResponse({'predicted_class': disease})
        else:
            return JsonResponse({'error': 'Invalid request'}, status=400)
    
    except Exception as e:
        logger.error(f"Error during disease prediction: {e}")
        return JsonResponse({'error': str(e)}, status=500)
@api_view(['POST'])
def recommend_crop(request):
    try:
        # Extract and convert data
        N = float(request.data.get('N', 0))
        P = float(request.data.get('P', 0))
        K = float(request.data.get('K', 0))
        temperature = float(request.data.get('temperature', 0))
        humidity = float(request.data.get('humidity', 0))
        ph = float(request.data.get('ph', 0))
        rainfall = float(request.data.get('rainfall', 0))

        # Log the raw input data for debugging
        logger.info(f"Raw input data: N={N}, P={P}, K={K}, temperature={temperature}, humidity={humidity}, ph={ph}, rainfall={rainfall}")

        # Prepare input data
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

        # Load the saved scaler (fitted during training)
        scaler = joblib.load('scaler.pkl')
        sample_test_case_scaled = scaler.transform(input_data)  # Use transform, not fit_transform

        # Log the scaled input data
        logger.info(f"Scaled input data: {sample_test_case_scaled}")

        # Predict the crop using the loaded model
        predicted_crop_index = crop_model.predict(sample_test_case_scaled)

        # Log the predicted index
        logger.info(f"Predicted crop index: {predicted_crop_index}")

        predicted_crop = le.inverse_transform(predicted_crop_index)

        # Log the predicted crop name
        logger.info(f"Predicted crop: {predicted_crop[0]}")

        return Response({'predicted_crop': predicted_crop[0]}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error: {e}")
        return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
