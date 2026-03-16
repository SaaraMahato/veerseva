from django.urls import path
from . import views

urlpatterns = [
    path('benefits/schemes/',                    views.list_schemes,        name='list_schemes'),
    path('benefits/schemes/<int:pk>/',           views.get_scheme,          name='get_scheme'),
    path('benefits/applications/',               views.applications,        name='applications'),
    path('benefits/applications/<int:pk>/',      views.application_detail,  name='application_detail'),
    path('benefits/applications/<int:pk>/review/', views.review_application, name='review_application'),
]