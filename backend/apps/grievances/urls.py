from django.urls import path
from . import views

urlpatterns = [
    path('grievances/',          views.grievances,       name='grievances'),
    path('grievances/<int:pk>/', views.grievance_detail, name='grievance-detail'),
]