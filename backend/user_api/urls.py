from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    ## user_management
	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('oauth/authorize/', views.OAuthAuthorize.as_view(), name='oauth_authorize'),
    path('oauth/callback/', views.OAuthCallback.as_view(), name='oauth_callback'),
    path('users/', views.UserViewSet.as_view({'get': 'list'}), name='users'),
	path('is_authenticated/', views.is_authenticated, name='is_authenticated'),
]