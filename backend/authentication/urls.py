from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("login/", views.my_login, name="login"),
    path('logout/', views.my_logout, name='logout'),
    path("auth/", views.auth, name="auth"),
    path("auth_callback/", views.auth_callback, name="auth_callback"),
    path("register/", views.register, name="register"),
    path("users_list/", views.users_list, name="users_list"),
	path('send_friend_request/<int:to_user_id>/', views.send_friend_request, name='send_friend_request'),
    path("test/", views.test, name="test"),

]
