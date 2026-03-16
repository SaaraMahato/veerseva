import os
from django.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'veerseva.settings')

application = get_asgi_application()