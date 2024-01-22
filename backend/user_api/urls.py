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
	path('activateTwoFa/',
		views.activateTwoFa,
		name='activateTwoFa'
	),
	path('deactivateTwoFa/',
		views.deactivateTwoFa,
		name='deactivateTwoFa'
	),
	path('sendQrCode/',
		views.sendQrCode,
		name='sendQrCode'
	),
	path('verifyTwoFaToken/',
		views.verifyTwoFaToken,
		name='verifyTwoFaToken'
	),

]