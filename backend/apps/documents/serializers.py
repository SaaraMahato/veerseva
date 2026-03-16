from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Document
        fields = [
            'id', 'doc_type', 'file_name',
            'ipfs_hash', 'blockchain_tx_hash',
            'is_verified', 'uploaded_at',
        ]
        read_only_fields = [
            'id', 'ipfs_hash', 'blockchain_tx_hash',
            'is_verified', 'uploaded_at',
        ]


class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Document
        fields = ['doc_type', 'file']