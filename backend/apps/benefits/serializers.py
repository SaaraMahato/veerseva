from rest_framework import serializers
from .models import BenefitScheme, Application, StatusHistory


class BenefitSchemeSerializer(serializers.ModelSerializer):
    is_eligible = serializers.SerializerMethodField()

    class Meta:
        model  = BenefitScheme
        fields = [
            'id', 'name', 'category', 'description',
            'eligibility_criteria', 'required_documents',
            'sla_days', 'is_active', 'is_eligible',
        ]

    def get_is_eligible(self, obj):
        # Basic eligibility — expand later with actual rules
        return True


class StatusHistorySerializer(serializers.ModelSerializer):
    changed_by = serializers.StringRelatedField()

    class Meta:
        model  = StatusHistory
        fields = ['id', 'status', 'remarks', 'changed_by', 'changed_at']


class ApplicationSerializer(serializers.ModelSerializer):
    scheme_name  = serializers.CharField(source='scheme.name',     read_only=True)
    scheme_category = serializers.CharField(source='scheme.category', read_only=True)
    veteran_name = serializers.CharField(source='veteran.full_name', read_only=True)
    history      = StatusHistorySerializer(many=True, read_only=True)

    class Meta:
        model  = Application
        fields = [
            'id', 'veteran_name', 'scheme', 'scheme_name',
            'scheme_category', 'status', 'reason', 'remarks',
            'officer_remarks', 'submitted_at', 'updated_at',
            'sla_deadline', 'blockchain_tx_hash', 'history',
        ]
        read_only_fields = [
            'id', 'status', 'submitted_at', 'updated_at',
            'sla_deadline', 'blockchain_tx_hash',
        ]


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = ['scheme', 'reason', 'remarks']


class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = ['status', 'officer_remarks']