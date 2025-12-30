from django.urls import path
from .views import recommend_crop, predict, health_check

urlpatterns = [
    path('recommend_crop/', recommend_crop, name='recommend_crop'),
    path('predict/', predict, name='predict'),
    path('health/', health_check, name='health_check'),
]
