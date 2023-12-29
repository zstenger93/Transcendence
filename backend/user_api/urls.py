from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    ## user_management
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('oauth/authorize/', views.OAuthAuthorize.as_view(), name='oauth_authorize'),
    path('oauth/callback/', views.OAuthCallback.as_view(), name='oauth_callback'),
    path('users/', views.UserViewSet.as_view({'get': 'list'}), name='users'),
    path('friend-requests/', views.FriendRequestViewSet.as_view({'get': 'list', 'post': 'create'}), name='FriendRequest'),
    path('friend-requests/<int:pk>/', views.FriendRequestViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name='update_friend_request'),
    ## jwt
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]