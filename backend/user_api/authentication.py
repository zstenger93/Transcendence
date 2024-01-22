from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import BlacklistedToken
from rest_framework import exceptions
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.http import JsonResponse

class BlacklistCheckJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        data = super().authenticate(request)
        if data is not None:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            is_blacklisted = BlacklistedToken.objects.filter(token=token).exists()
            if is_blacklisted:
                raise exceptions.AuthenticationFailed('Token is blacklisted, login again to get another token')
        return data
    


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.profile.email_confirmed)
        )

account_activation_token = AccountActivationTokenGenerator()

def is_authenticated(request):
	response = JsonResponse({'is_authenticated': request.user.is_authenticated})
	response["Access-Control-Allow-Credentials"] = 'true'
	return response