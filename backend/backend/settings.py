from pathlib import Path
from datetime import timedelta
import os
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG')


# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = [
        '*', 
        'localhost', 
        '172.19.0.4',
        '127.0.0.1', 
        '0.0.0.0', 
        '10.13.7.5', 
        'transcendence-backend-znhl.onrender.com', 
        'https://transcendence-frontend-3otz.onrender.com'
    ]

# Authentication settings
if DEBUG == 'True':
    REDIRECT_URI = "https://localhost"
else:
	REDIRECT_URI = "https://transcendence-backend-znhl.onrender.com"

if DEBUG == 'True':
	print("DEBUG: True: ", DEBUG)
else:
	print("DEBUG: False: ", DEBUG)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
	'django_otp',
    'django_otp.plugins.otp_totp',
    'friendship',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'user_api.apps.UserApiConfig',
    'friendship_api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
	'django_otp.middleware.OTPMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]
CSRF_ALLOWED_ORIGINS = [
    "*",
    "https://localhost",
	"https://api.intra.42.fr",
    "http://localhost:3000",
    "http://frontend:3000",
    "https://transcendence-frontend-3otz.onrender.com",
    "https://zstenger93.github.io"
]

CORS_ALLOWED_ORIGINS = [
        "http://frontend:3000",
	    "https://api.intra.42.fr",
		"https://localhost",
	    "http://localhost:3000",
		"https://transcendence-frontend-3otz.onrender.com",
		"https://zstenger93.github.io"
	]

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
# SESSION_COOKIE_SAMESITE = None
# SESSION_COOKIE_SECURE = False
# SESSION_COOKIE_SAMESITE = 'Lax'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'user_api.authentication.BlacklistCheckJWTAuthentication',
    ),
}


ROOT_URLCONF = 'backend.urls'

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

WSGI_APPLICATION = 'backend.wsgi.application'

## User model
AUTH_USER_MODEL = 'user_api.AppUser'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# THIS IS THE DEFAULT DATABASE CONFIGURATION
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# THIS IS THE DATABASE CONFIGURATION FOR THE DOCKER CONTAINER
if DEBUG == 'True':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'transcend_users_db',
            'USER': 'transcend_user',
            'PASSWORD': 'transcend_pwd',
            'HOST': 'db',
            'PORT': '5432',
        }
    }
else:
	DATABASES = {
		'default': dj_database_url.parse(os.getenv('DATABASE_URL'))
	}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'
# STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# For the custom user model to work we need to include this line
# AUTH_USER_MODEL = 'authentication.User'



MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}


EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'sioudazer8@gmail.com'
EMAIL_HOST_PASSWORD = 'sayy uonp nado adlm'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'