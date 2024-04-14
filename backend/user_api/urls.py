from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [

    ## user_management
	path('register',
		views.UserRegister.as_view(),
		name='register'
	),
	path('login',
		views.UserLogin.as_view(),
		name='login'
	),
	path('logout',
		views.UserLogout.as_view(),
		name='logout'
	),
	path('profile',
		views.UserProfileView.as_view(),
		name='profile'
	),
    path('users/',
		views.UserViewSet.as_view({'get': 'list'}),
		name='users'
	),
	path('accountDeletion',
		views.accountDeletion.as_view(),
		name='accountDeletion'
	),
    path('updateProfile',
		views.updateProfile.as_view(),
		name='updateProfile'
	),

	path('user_data/<str:username>/', 
		views.UserData.as_view(),
		name='user_data'
	),

	## JWT Authentication
    path('oauth/authorize/',
		views.OAuthAuthorize.as_view(),
		name='oauth_authorize'
	),
    path('oauth/callback/',
		views.OAuthCallback.as_view(),
		name='oauth_callback'
	),
	path('is_authenticated/',
		views.is_authenticated,
		name='is_authenticated'
	),
	path('token/refresh/',
		TokenRefreshView.as_view(),
		name='token_refresh'
	),
	path('token/',
		TokenObtainPairView.as_view(),
		name='token_obtain_pair'
	),
    

	## Two Factor Authentication
	path('activateTwoFa',
		views.activateTwoFa.as_view(),
		name='activateTwoFa'
	),
	path('deactivateTwoFa',
		views.deactivateTwoFa.as_view(),
		name='deactivateTwoFa'
	),
	path('sendQrCode',
		views.sendQrCode.as_view(),
		name='sendQrCode'
	),
	path('TwoFactorAuth',
		views.TwoFactorAuth.as_view(),
		name='TwoFactorAuth'
	),
]
