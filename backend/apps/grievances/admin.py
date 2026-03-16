from django.contrib import admin
from .models import Grievance, GrievanceUpdate


@admin.register(Grievance)
class GrievanceAdmin(admin.ModelAdmin):
    list_display  = ['veteran', 'title', 'category', 'status', 'filed_at']
    list_filter   = ['status', 'category']
    search_fields = ['veteran__email', 'title']


@admin.register(GrievanceUpdate)
class GrievanceUpdateAdmin(admin.ModelAdmin):
    list_display = ['grievance', 'updated_by', 'updated_at']