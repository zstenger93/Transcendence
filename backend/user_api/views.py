from django.contrib.auth import login, logout
from django.core.files.base import ContentFile
from django.shortcuts import HttpResponse, redirect
from django.conf import settings


from django.http import HttpResponseRedirect
from django.core.exceptions import ValidationError

from rest_framework import permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


from django_otp.forms import OTPAuthenticationForm
from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.core.mail import EmailMessage
from django_otp import match_token
from email.mime.image import MIMEImage

from .authentication import account_activation_token, is_authenticated
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import user_registration, is_valid_email, is_valid_password
from .authentication import BlacklistCheckJWTAuthentication
from .models import AppUser, BlacklistedToken

from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string

import requests
import urllib
import json
import os
import qrcode
import logging

logger = logging.getLogger(__name__)


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)

	def post(self, request):
		try:
			clean_data = user_registration(request.data)
			serializer = UserRegisterSerializer(data=clean_data)
			if serializer.is_valid(raise_exception=True):
				user = serializer.create(clean_data)
				token = RefreshToken.for_user(user)
				token['email'] = user.email
				token['username'] = user.username
				response = Response({
					'refresh': str(token),
					'access': str(token.access_token),
				}, status=status.HTTP_200_OK)
				response["Access-Control-Allow-Credentials"] = 'true'
				return response
		except ValidationError as e:
			response = Response({
				'detail': str(e),
			}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		
		response = Response({
			}, status=status.HTTP_400_BAD_REQUEST)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			response = Response({
				"detail": "You are already logged in, logout if you want to identify as someone else ;)",
			}, status=status.HTTP_400_BAD_REQUEST)
		data = request.data
		try:
			assert is_valid_email(data)
			assert is_valid_password(data)
			serializer = UserLoginSerializer(data=data)
			if serializer.is_valid(raise_exception=True):
				user = serializer.check_user(data)
				login(request, user)
				token = RefreshToken.for_user(user)
				token['email'] = user.email
				token['username'] = user.username
				response = Response({
					'refresh': str(token),
					'access': str(token.access_token),
				}, status=status.HTTP_200_OK)
				response["Access-Control-Allow-Credentials"] = 'true'
				return response
		except ValidationError as e:
			response = Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			# Add the token to the blacklist
			token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
			BlacklistedToken.objects.create(user=request.user, token=token)
			response = Response({"detail": "Logged out Successfully"}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response

class UserProfileView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		response = Response({'user': serializer.data}, status=status.HTTP_200_OK)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response

class UserViewSet(viewsets.ModelViewSet):
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	queryset = AppUser.objects.all()
	serializer_class = UserSerializer
	##
	def create(self, request, *args, **kwargs):
		response = super().create(request, *args, **kwargs)
		email = request.data.get('email', '')
		user = AppUser.objects.get(email=email)
		refresh = RefreshToken.for_user(user)
		response.data['refresh'] = str(refresh)
		response.data['access'] = str(refresh.access_token)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response


class updateProfile(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			data = request.data
			if data.get('profile_picture'):
				request.user.profile_picture = data.get('profile_picture')
			if data.get('email'):
				request.user.email = data.get('email')
			if data.get('username'):
				request.user.username = data.get('username')
			if data.get('title'):
				request.user.title = data.get('title')
			if data.get('AboutMe'):
				request.user.AboutMe = data.get('AboutMe')
			if data.get('school'):
				request.user.school = data.get('school')
			if data.get('wins'):
				request.user.wins = data.get('wins')
			if data.get('losses'):
				request.user.losses = data.get('losses')
			if data.get('win_rate'):
				if request.user.total_matches == 0:
					request.user.win_rate = 0
				else:
					request.user.win_rate = request.user.wins / request.user.total_matches
			if data.get('total_matches'):
				request.user.total_matches = data.get('total_matches')
			if data.get('match_history'):
				history = request.user.match_history
				if history is None:
					history = []
				history.append(data.get('match_history'))
				request.user.match_history = history
			if data.get('TwoFA'):
				request.user.TwoFA = data.get('TwoFA')
			request.user.save()
			
			response = Response({
				"detail": "Profile updated",
			}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({
				"detail": "No active user session",
			}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response


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
				"redirect_uri": settings.REDIRECT_URI + "/api/oauth/callback/",
			}
			auth_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)

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
			response = requests.get(picture_url)
			if response.status_code == 200:
				user.profile_picture.save(f"{username}_profile_picture.jpg", ContentFile(response.content), save=True)
			login(request, user)
			token = RefreshToken.for_user(user)
			token['email'] = user.email
			token['username'] = user.username
			response = Response({
				'refresh': str(token),
				'access': str(token.access_token),
			}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			redirect_url = 'https://localhost/home?' + urllib.parse.urlencode({'token': str(token.access_token)})
			return redirect(redirect_url)

		response = Response({'detail': "Check you 42API keys"}, status=status.HTTP_400_BAD_REQUEST)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response


class OAuthAuthorize(APIView):
	permission_classes = (permissions.AllowAny,)
	##
	def get(self, request):
		auth_url = "https://api.intra.42.fr/oauth/authorize"
		params = {
			"client_id": os.environ.get("UID"),
			"redirect_uri": settings.REDIRECT_URI + "/api/oauth/callback/",
			"response_type": "code",
		}
		response = HttpResponseRedirect(f"{auth_url}?{urllib.parse.urlencode(params)}")
		response["Access-Control-Allow-Credentials"] = 'true'
		return response


class accountDeletion(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.delete()
			response = Response({"detail": "Account deleted"}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response


class updateProfile(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			data = request.data
			if data.get('profile_picture'):
				request.user.profile_picture = data.get('profile_picture')
			if data.get('email'):
				request.user.email = data.get('email')
			if data.get('username'):
				request.user.username = data.get('username')
			if data.get('title'):
				request.user.title = data.get('title')
			if data.get('AboutMe'):
				request.user.AboutMe = data.get('AboutMe')
			if data.get('school'):
				request.user.school = data.get('school')
			if data.get('wins'):
				request.user.wins = data.get('wins')
			if data.get('losses'):
				request.user.losses = data.get('losses')
			if data.get('win_rate'):
				if request.user.total_matches == 0:
					request.user.win_rate = 0
				else:
					request.user.win_rate = request.user.wins / request.user.total_matches
			if data.get('total_matches'):
				request.user.total_matches = data.get('total_matches')
			if data.get('match_history'):
				history = request.user.match_history
				if history is None:
					history = []
				history.append(data.get('match_history'))
				request.user.match_history = history
			if data.get('TwoFA'):
				request.user.TwoFA = data.get('TwoFA')
			if data.get('password'):
				request.user.set_password(data.get('password'))
			request.user.save()
			
			return Response({"detail": "Profile updated"}, status=status.HTTP_200_OK)
		else:
			return Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)


class activateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = True
			request.user.save()
			response = Response({"detail": "Two Factor Authentication activated"}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response


class deactivateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = False
			request.user.save()
			response = Response({"detail": "Two Factor Authentication deactivated"}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		

class sendQrCode(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def get_user_totp_device(self,user, confirmed=None):
		devices = devices_for_user(user, confirmed=confirmed)
		for device in devices:
			if isinstance(device, TOTPDevice):
				return device

	def post(self, request):
		if request.user.is_authenticated:
			if request.user.TwoFA:
				device = self.get_user_totp_device(request.user)
				if not device:
					device = request.user.totpdevice_set.create(confirmed=True)
				current_site = get_current_site(request)

				# Generate QR code
				img = qrcode.make(device.config_url)
				img.save("qrcode.png")

				mail_subject = 'DJANGO OTP DEMO'
				message = f"Hello {request.user},\n\nYour QR Code is: <img src='cid:image1'>"
				to_email = request.user.email
				email = EmailMessage(
					mail_subject, message, to=[to_email]
				)

				# Attach image
				fp = open('qrcode.png', 'rb')
				msg_image = MIMEImage(fp.read())
				fp.close()
				msg_image.add_header('Content-ID', '<image1>')
				email.attach(msg_image)

				email.content_subtype = "html"
				email.send()
				messages.success(request, ('Please Confirm your email to complete registration.'))
				response = Response({"detail": "QR Code sent to your email"}, status=status.HTTP_200_OK)
				response["Access-Control-Allow-Credentials"] = 'true'
				return response
			else:
				response = Response({"detail": "Two Factor Authentication is not activated"}, status=status.HTTP_400_BAD_REQUEST)
				response["Access-Control-Allow-Credentials"] = 'true'
				return response
		else:
			response = Response({"detail": "No active user session"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response


class TwoFactorAuth(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	## check if use is authenticated
	def post(self, request):
		otp_code = request.data.get('otp_code')
		device = TOTPDevice.objects.filter(user=request.user).first()

		if device and device.verify_token(otp_code):
			response = Response({"detail": "OTP verified"}, status=status.HTTP_200_OK)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		else:
			response = Response({"detail": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response