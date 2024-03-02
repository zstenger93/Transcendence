from django.urls import path
from . import views

urlpatterns = [
    path('', views.mychat, name='webchat'),
]