from django.urls import path
from .views import recommend_crop, predict

urlpatterns = [
    path('recommend_crop/', recommend_crop, name='recommend_crop'),
    path('predict/', predict, name='predict'),
]
