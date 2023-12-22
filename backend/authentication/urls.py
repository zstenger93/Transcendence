from django.urls import path
from . import views


# Create different uri roots to connect them to a view 

urlpatterns = [
    path("", views.home, name="home"),
    path("login/", views.my_login, name="login"),
    path('logout/', views.my_logout, name='logout'),
    path("auth/", views.auth, name="auth"),
    path("auth_callback/", views.auth_callback, name="auth_callback"),
    path("register/", views.register, name="register"),
    path("users_list/", views.users_list, name="users_list"),
    path("test/", views.test, name="test"),

]
