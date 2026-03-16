from django.contrib import admin
from .models import VeteranProfile


@admin.register(VeteranProfile)
class VeteranProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'service_number', 'rank', 'home_state']
    search_fields = ['user__email', 'user__full_name', 'service_number']
    list_filter   = ['rank', 'home_state']