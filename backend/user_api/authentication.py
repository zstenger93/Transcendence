from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import BlacklistedToken
from rest_framework import exceptions

class BlacklistCheckJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        data = super().authenticate(request)
        if data is not None:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            is_blacklisted = BlacklistedToken.objects.filter(token=token).exists()
            if is_blacklisted:
                raise exceptions.AuthenticationFailed('Token is blacklisted, login again to get another token')
        return data