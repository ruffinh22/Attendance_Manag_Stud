"""
Django settings for attendance project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

# Load environment variables from .env
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = '#~>^4PR62=oq*@k`!pb}?@>D$A$lHWmTjE@tYv;Jvl%xSr:a:"'
import atexit


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG') == 'True'

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '10.210.100.123']

INSTALLED_APPS = [
    'django.contrib.admin',  # Activation de l'interface d'administration Django
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'firstapp',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'attendence.urls'

# Configuration des paramètres JWT
SIMPLE_JWT = {
    # Durée de vie du token d'accès (par exemple, 20 minutes)
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=20),
    
    # Durée de vie du token de rafraîchissement (par exemple, 1 jour)
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    
    # Rotation des tokens de rafraîchissement
    "ROTATE_REFRESH_TOKENS": False,
    
    # Blacklistage des tokens après rotation
    "BLACKLIST_AFTER_ROTATION": False,
    
    # Mise à jour de la dernière connexion de l'utilisateur
    "UPDATE_LAST_LOGIN": False,

    # Types d'en-tête d'authentification pris en charge
    "AUTH_HEADER_TYPES": ("Bearer",),
    
    # Nom de l'en-tête d'authentification
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    
    # Champ ID de l'utilisateur
    "USER_ID_FIELD": "id",
    
    # Claim ID de l'utilisateur
    "USER_ID_CLAIM": "user_id",
    
    # Règle d'authentification de l'utilisateur par défaut
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    # Classes de token d'authentification prises en charge
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    
    # Claim de type de token
    "TOKEN_TYPE_CLAIM": "token_type",
    
    # Classe utilisateur de token
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    # Claim JTI (JWT ID)
    "JTI_CLAIM": "jti",
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'attendence.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'attendance',
        'USER': 'admin',
        'PASSWORD': 'Admin123123@',
        'HOST': 'localhost',  # Ou l'adresse IP de votre serveur MySQL
        'PORT': '3306',       # Le port par défaut de MySQL
    }
}


DATABASE = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'attendance',  # Remplacez par le nom de votre base de données MongoDB
        'ENFORCE_SCHEMA': True,  # Facultatif : Définissez sur True pour appliquer des contraintes de schéma
        'CLIENT': {
            'host': 'localhost',
            'port': 27017,
            'username': 'admin1',  # Remplacez par votre nom d'utilisateur MongoDB
            'password': 'admin123',  # Remplacez par votre mot de passe MongoDB
            'authSource': 'admin',
            'authMechanism': 'SCRAM-SHA-1',
        }
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom user model
AUTH_USER_MODEL = 'firstapp.User'

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Simple JWT settings
PASSWORD_RESET_TIMEOUT = 900  # 900 Sec = 15 Min

# Whitenoise storage settings
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Add other origins as needed
]




LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
        'verbose': {
            'format': '%(asctime)s [%(levelname)s] %(name)s [%(module)s.%(funcName)s:%(lineno)d]: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'file.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
            'filters': [],  # Ajoutez des filtres si nécessaire
        },
        'firstapp': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
            'filters': [],  # Ajoutez des filtres si nécessaire
        },
    },
}