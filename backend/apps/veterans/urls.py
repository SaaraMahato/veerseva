from django.urls import path
from . import views

urlpatterns = [
     path('veterans/profile/', views.get_profile, name='get-profile'),
     path('veterans/profile/update/', views.update_profile, name='update-profile'),
     path('veterans/profile/create/', views.create_profile, name='create-profile'),
]
