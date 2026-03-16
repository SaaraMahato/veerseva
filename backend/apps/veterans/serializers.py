from rest_framework import serializers
from .models import VeteranProfile


class VeteranProfileSerializer(serializers.ModelSerializer):
    email     = serializers.EmailField(source='user.email',    read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model  = VeteranProfile
        fields = [
            'id', 'email', 'full_name',
            'service_number', 'rank', 'regiment',
            'date_of_joining', 'date_of_retirement',
            'home_state', 'phone', 'address',
            'disability_percentage',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class VeteranProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = VeteranProfile
        fields = [
            'service_number', 'rank', 'regiment',
            'date_of_joining', 'date_of_retirement',
            'home_state', 'phone', 'address',
            'disability_percentage',
        ]
        extra_kwargs = {
            'service_number':     {'required': False},
            'rank':               {'required': False},
            'date_of_joining':    {'required': False, 'allow_null': True},
            'date_of_retirement': {'required': False, 'allow_null': True},
        }