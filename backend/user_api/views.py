from django.contrib.auth import login, logout
from django.core.files.base import ContentFile
from django.shortcuts import HttpResponse, redirect
from django.conf import settings


from django.http import HttpResponseRedirect, JsonResponse
from django.core.exceptions import ValidationError

from rest_framework import permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_email, validate_password
from .authentication import BlacklistCheckJWTAuthentication
from .models import AppUser, BlacklistedToken

import requests
import urllib
import os


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = (JWTAuthentication,)
    # authentication_classes = (BlacklistCheckJWTAuthentication,)

    def post(self, request):
        try:
            clean_data = custom_validation(request.data)
            serializer = UserRegisterSerializer(data=clean_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(clean_data)
                if user:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	# authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
				return Response({"detail": "You are already logged in, logout if you want to identify as someone else ;)"}, status=status.HTTP_400_BAD_REQUEST)
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			token = RefreshToken.for_user(user)
			return Response({
				'refresh': str(token),
				'access': str(token.access_token),
			}, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)

	def post(self, request):
		if request.user.is_authenticated:
			# Add the token to the blacklist
			token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
			BlacklistedToken.objects.create(user=request.user, token=token)
			print(BlacklistedToken.objects.all())
			logout(request)
			return Response(status=status.HTTP_200_OK)
		else:
			return Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	queryset = AppUser.objects.all()
	serializer_class = UserSerializer
	def create(self, request, *args, **kwargs):
		response = super().create(request, *args, **kwargs)
		email = request.data.get('email', '')
		user = AppUser.objects.get(email=email)
		refresh = RefreshToken.for_user(user)
		response.data['refresh'] = str(refresh)
		response.data['access'] = str(refresh.access_token)
		return response


class OAuthCallback(APIView):
	permission_classes = (permissions.AllowAny,)
	# authentication_classes = (JWTAuthentication,)
	##
	def get(self, request):
		if request.method == "GET":
			code = request.GET.get("code")
			data = {
				"grant_type": "authorization_code",
				"client_id": os.environ.get("UID"),
				"client_secret": os.environ.get("SECRET"),
				"code": code,
				"redirect_uri": settings.REDIRECT_URI + "/api/oauth/callback/",
			}
			print("Data sent to OAuth server:", data)
			auth_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)
			print("asfasfasf", auth_response.json())
			# return JsonResponse(auth_response.json(), safe=False)
			access_token = auth_response.json()["access_token"]
			user_response = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})
			
			username = user_response.json()["login"]
			email = user_response.json()["email"]
			picture_url = user_response.json()["image"]["versions"]["medium"]

			titles = user_response.json().get("titles", [])
			title = ""
			if titles:
				title = titles[0].get("name", "")
				title = str(title).split()[0] if title else ""

			user, created = AppUser.objects.get_or_create(
				username=username,
				defaults={
					'username': username,
					'email': email,
					'title': title,
				}
			)
			if created:
				print("\t\t\tNew user has been added!!!")
				response = requests.get(picture_url)
				if response.status_code == 200:
					user.profile_picture.save(f"{username}_profile_picture.jpg", ContentFile(response.content), save=True)
			else:
				print("\t\t\tUser already exists!!!")
			login(request, user)
			html = """
			<!DOCTYPE html>
			<html>
			<body>
			<script>
			// Check if window.opener is not null
			if (window.opener) {
			// Send a message to the original window with the authentication status
			window.opener.postMessage({ 'is_authenticated': true }, '*');
			}
			// Close this window
			window.close();
			</script>
			</body>
			</html>
			"""
			return HttpResponse(html)
		return HttpResponse("Auth callback Error, bad token maybe!!")


class OAuthAuthorize(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		auth_url = "https://api.intra.42.fr/oauth/authorize"
		params = {
			"client_id": os.environ.get("UID"),
			"redirect_uri": settings.REDIRECT_URI + "/api/oauth/callback/",
			"response_type": "code",
		}
		return HttpResponseRedirect(f"{auth_url}?{urllib.parse.urlencode(params)}")

def is_authenticated(request):
    response = JsonResponse({'is_authenticated': request.user.is_authenticated})
    response["Access-Control-Allow-Credentials"] = 'true'
    return response


