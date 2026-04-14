import os
import dj_database_url
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-veerseva-dev-key-change-in-production')

DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['*']

# ─── Applications ────────────────────────────────────────────
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_otp',
    'django_otp.plugins.otp_email',
    'drf_spectacular',  # ← add this
]

LOCAL_APPS = [
    'apps.accounts',
    'apps.veterans',
    'apps.benefits',
    'apps.documents',
    'apps.grievances',
    'apps.notifications',
    'apps.assistant',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# ─── Middleware ───────────────────────────────────────────────
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django_otp.middleware.OTPMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'veerseva.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'veerseva.wsgi.application'

# ─── Database ─────────────────────────────────────────────────
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME':   BASE_DIR / 'db.sqlite3',
        }
    }

# ─── Password Validation ──────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ─── Internationalization ─────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE     = 'Asia/Kolkata'
USE_I18N      = True
USE_TZ        = True

# ─── Static & Media ───────────────────────────────────────────
STATIC_URL  = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL   = '/media/'
MEDIA_ROOT  = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ─── Custom User Model ────────────────────────────────────────
AUTH_USER_MODEL = 'accounts.User'

# ─── REST Framework ───────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',  # ← add this
}

# ─── Spectacular (Swagger) ────────────────────────────────────
SPECTACULAR_SETTINGS = {
    'TITLE': 'VeerSeva API',
    'DESCRIPTION': 'API documentation for VeerSeva - Veteran Services Platform',
    'VERSION': '1.0.0',
}


# ─── JWT Settings ─────────────────────────────────────────────
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':  timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS':  True,
    'AUTH_HEADER_TYPES':      ('Bearer',),
}

# ─── CORS ─────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://veerseva-frontend.onrender.com',
]
CORS_ALLOW_CREDENTIALS = True

# ─── Email (OTP) ──────────────────────────────────────────────
EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = os.getenv('EMAIL_HOST',      'smtp.gmail.com')
EMAIL_PORT          = int(os.getenv('EMAIL_PORT',  '587'))
EMAIL_USE_TLS       = True
EMAIL_HOST_USER     = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL  = os.getenv('EMAIL_HOST_USER', 'veerseva@gmail.com')

# ─── OTP Settings ────────────────────────────────────────────
OTP_EMAIL_SENDER  = DEFAULT_FROM_EMAIL
OTP_EMAIL_SUBJECT = 'VeerSeva — Your OTP Code'
OTP_EMAIL_BODY    = 'Your VeerSeva OTP is: {token}\n\nValid for 10 minutes.'
OTP_EMAIL_TOKEN_VALIDITY = 600

# ─── Telegram Bot ─────────────────────────────────────────────
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID   = os.environ.get('TELEGRAM_CHAT_ID', '')

# ─── SLA Days ─────────────────────────────────────────────────
SLA_DAYS = {
    'pension':      30,
    'medical':      15,
    'education':    21,
    'housing':      45,
    'resettlement': 30,
}

# ─── Testing ──────────────────────────────────────────────────
import sys
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        }
    }
    PASSWORD_HASHERS = [
        'django.contrib.auth.hashers.MD5PasswordHasher',
    ]
    EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
