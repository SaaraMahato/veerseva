from rest_framework import serializers
from .models import Grievance, GrievanceUpdate


class GrievanceUpdateSerializer(serializers.ModelSerializer):
    updated_by = serializers.StringRelatedField()

    class Meta:
        model  = GrievanceUpdate
        fields = ['id', 'message', 'updated_by', 'updated_at']


class GrievanceSerializer(serializers.ModelSerializer):
    veteran_name = serializers.CharField(source='veteran.full_name', read_only=True)
    updates      = GrievanceUpdateSerializer(many=True, read_only=True)

    class Meta:
        model  = Grievance
        fields = [
            'id', 'veteran_name', 'title', 'category',
            'description', 'status', 'filed_at',
            'updated_at', 'updates',
        ]
        read_only_fields = ['id', 'status', 'filed_at', 'updated_at']


class GrievanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Grievance
        fields = ['title', 'category', 'description']