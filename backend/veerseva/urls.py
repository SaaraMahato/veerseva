from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/',      admin.site.urls),
    path('api/auth/',   include('apps.accounts.urls')),
    path('api/',        include('apps.veterans.urls')),
    path('api/',        include('apps.benefits.urls')),
    path('api/',        include('apps.documents.urls')),
    path('api/',        include('apps.grievances.urls')),
    path('api/',        include('apps.notifications.urls')),
    path('api/',        include('apps.assistant.urls')),

    # Swagger
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/',   SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)