from django.urls import path
from . import views

# Create different uri roots to connect them to a view 
urlpatterns = [
    path("", views.home, name="home"),
    path("login/", views.myLogin, name="myLogin"),
    path('logout/', views.logout, name='logout'),
    path("auth/", views.auth, name="auth"),
    path("auth_callback/", views.auth_callback, name="auth_callback"),
    path("register/", views.register, name="register"),
]

