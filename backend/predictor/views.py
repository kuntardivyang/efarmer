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

# Logger setup
logger = logging.getLogger(__name__)

# Load the crop recommendation model
crop_model = joblib.load('knn_crop_recommendation_model.pkl')

# Load the plant disease classification model
disease_model = tf.keras.models.load_model('plant_disease_model.h5')
disease_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Define a StandardScaler instance (used for crop model)
scaler = StandardScaler()

@csrf_exempt
def recommend_crop(request):
    try:
        if request.method == 'POST':
            # Parse the input data from the request body
            input_data = request.POST
            N = float(input_data['N'])
            P = float(input_data['P'])
            K = float(input_data['K'])
            temperature = float(input_data['temperature'])
            humidity = float(input_data['humidity'])
            ph = float(input_data['ph'])
            rainfall = float(input_data['rainfall'])

            # Create a sample test case from the input values
            sample_test_case = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            logger.info(f"Received input for crop recommendation: {sample_test_case}")

            # Scale the input features using the same scaler used during training
            sample_test_case_scaled = scaler.fit_transform(sample_test_case)

            # Predict the crop using the loaded model
            predicted_crop_index = crop_model.predict(sample_test_case_scaled)
            logger.info(f"Predicted Crop Index: {predicted_crop_index[0]}")

            # Return the predicted crop index as a JSON response
            return JsonResponse({'predicted_crop_index': int(predicted_crop_index[0])})

        else:
            return JsonResponse({'error': 'Invalid request method'}, status=400)

    except Exception as e:
        logger.error(f"Error during crop prediction: {e}")
        return JsonResponse({'error': str(e)}, status=500)

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

            # Return the predicted class as a JSON response
            return JsonResponse({'predicted_class': int(predicted_class)})
        else:
            return JsonResponse({'error': 'Invalid request'}, status=400)
    
    except Exception as e:
        logger.error(f"Error during disease prediction: {e}")
        return JsonResponse({'error': str(e)}, status=500)
