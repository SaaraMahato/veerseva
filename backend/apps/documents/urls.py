from django.urls import path
from . import views

urlpatterns = [
    path('documents/',              views.list_documents,  name='list-documents'),
    path('documents/upload/',       views.upload_document, name='upload-document'),
    path('documents/<int:pk>/',     views.delete_document, name='delete-document'),
    path('documents/verify/<str:hash>/', views.verify_document, name='verify-document'),
]