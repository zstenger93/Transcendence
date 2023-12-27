from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status, viewsets, authentication
from .validations import custom_validation, validate_email, validate_password
from django.shortcuts import render, HttpResponse, redirect
from django.core.files.base import ContentFile
from .models import AppUser
from django.conf import settings
import requests
import urllib
import os


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
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
	authentication_classes = (SessionAuthentication,)
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
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = UserSerializer


class OAuthCallback(APIView):
	permission_classes = (permissions.AllowAny,)
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

