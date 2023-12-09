from django.urls import path
from . import views

# Create different uri roots to connect them to a view 
urlpatterns = [
    path("", views.login, name="login"),
    path("main/", views.main, name="main"),
]

