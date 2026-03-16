from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display  = ['veteran', 'doc_type', 'is_verified', 'uploaded_at']
    list_filter   = ['doc_type', 'is_verified']
    search_fields = ['veteran__email', 'veteran__full_name']