from core.user.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_farmer', 'created', 'updated']
        read_only_field = ['is_farmer', 'created', 'updated']