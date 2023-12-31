from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from django.core.files.base import ContentFile
from django.shortcuts import render, HttpResponse, redirect
from django.conf import settings

from rest_framework import permissions, status, viewsets, authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_email, validate_password
from .models import AppUser

import requests
import urllib
import os

from django.contrib.auth.decorators import login_required

from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse

from user_api.models import AppUser, Follower
from user_api.serializers import FollowerSerializer
from rest_framework import generics, mixins, permissions


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (JWTAuthentication,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (JWTAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (JWTAuthentication,)
	def post(self, request):
		if request.user.is_authenticated:
			logout(request)
			localStorage.removeItem('jwtToken');
			return Response(status=status.HTTP_200_OK)
		else:
			return Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (JWTAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
	authentication_classes = (JWTAuthentication,)
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
				"redirect_uri": settings.REDIRECT_URI,
			}
		
			auth_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)
			access_token = auth_response.json()["access_token"]
			user_response = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})
			
			username = user_response.json()["login"]
			first_name = user_response.json()["first_name"]
			last_name = user_response.json()["last_name"]
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
					'first_name': first_name,
					'last_name': last_name,
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
			return redirect("home")                             
		return HttpResponse("Auth callback Error, bad token maybe!!")


class OAuthAuthorize(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		auth_url = "https://api.intra.42.fr/oauth/authorize"
		params = {
			"client_id": os.environ.get("UID"),
			"redirect_uri": settings.REDIRECT_URI,
			"response_type": "code",
		}
		return redirect(f"{auth_url}?{urllib.parse.urlencode(params)}")


@login_required
def follow(request, pk):
	authentication_classes = (JWTAuthentication,)
	user = get_object_or_404(AppUser, pk = pk)
	already_followed = Follower.objects.filter(user = user, is_followed_by = request.user).first()
	if not already_followed:
		new_follower = Follower(user = user, is_followed_by = request.user)
		new_follower.save()
		follower_count = Follower.objects.filter(user = user).count()
		return JsonResponse({'status': 'Following', 'count': follower_count})
	else:
		already_followed.delete()
		follower_count = Follower.objects.filter(user = user).count()
		return JsonResponse({'status': 'Not following', 'count': follower_count})
	return redirect('/')

class Following(generics.ListCreateAPIView):
	authentication_classes = (JWTAuthentication,)
	serializer_class = FollowerSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		user = get_object_or_404(AppUser, pk = self.kwargs["pk"])
		return Follower.objects.filter(is_followed_by = user)

class Followers(generics.ListCreateAPIView):
	authentication_classes = (JWTAuthentication,)
	queryset = Follower.objects.all()
	serializer_class = FollowerSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		user = get_object_or_404(AppUser, pk = self.kwargs["pk"])
		return Follower.objects.filter(user = user).exclude(is_followed_by = user)