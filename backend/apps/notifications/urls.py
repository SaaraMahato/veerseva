from django.urls import path
from . import views

urlpatterns = [
    path('notifications/',               views.list_notifications, name='list_notifications'),
    path('notifications/<int:pk>/read/', views.mark_read,          name='mark_read'),
    path('notifications/read-all/',      views.mark_all_read,      name='mark_all_read'),
    path('notifications/test-telegram/', views.test_telegram,      name='test_telegram'),
]