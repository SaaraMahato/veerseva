from django.contrib import admin
from .models import BenefitScheme, Application, StatusHistory


@admin.register(BenefitScheme)
class BenefitSchemeAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'sla_days', 'is_active']
    list_filter   = ['category', 'is_active']
    search_fields = ['name']


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display  = ['veteran', 'scheme', 'status', 'submitted_at']
    list_filter   = ['status', 'scheme__category']
    search_fields = ['veteran__email', 'veteran__full_name']


@admin.register(StatusHistory)
class StatusHistoryAdmin(admin.ModelAdmin):
    list_display  = ['application', 'status', 'changed_by', 'changed_at']
    list_filter   = ['status']