import tensorflow as tf
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import numpy as np
from tensorflow.keras.preprocessing import image
from django.conf import settings
import os
import logging

logger = logging.getLogger(__name__)

# Load the model
model = tf.keras.models.load_model('plant_disease_model.h5')
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

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
            
            # Predict using the model
            predictions = model.predict(img_array)
            logger.info(f"Predictions: {predictions}")
            predicted_class = np.argmax(predictions)
            logger.info(f"Predicted class: {predicted_class}")

            return JsonResponse({'predicted_class': int(predicted_class)})
        else:
            return JsonResponse({'error': 'Invalid request'}, status=400)
    
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return JsonResponse({'error': str(e)}, status=500)
