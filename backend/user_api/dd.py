#######################################
# User Management
#######################################

class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			response = Response({
				"detail": "You are already logged in, logout if you want to identify as someone else ;)",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)
			return response
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
					"Access-Control-Allow-Credentials":"true"
				}, status=status.HTTP_200_OK)
				return response
		except ValidationError as e:
			response = Response({
				'detail': str(e),
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)
			return response
		

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		try:
			clean_data = user_registration(request.data)
			serializer = UserRegisterSerializer(data=clean_data)
			if serializer.is_valid(raise_exception=True):
				user = serializer.create(clean_data)
				if user:
					response = Response(serializer.data, status=status.HTTP_201_CREATED)
					response["Access-Control-Allow-Credentials"] = 'true'
					return response
		except ValidationError as e:
			response = Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		
		response = Response(status=status.HTTP_400_BAD_REQUEST)
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
			return Response({
				"detail": "Logged out Successfully",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({
			'user': serializer.data,
			"Access-Control-Allow-Credentials":"true"
		}, status=status.HTTP_200_OK)


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
		return response


class accountDeletion(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.delete()
			return Response({
				"detail": "Account deleted",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


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
			
			return Response({
				"detail": "Profile updated",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


#######################################
# Two Factor Authentication
#######################################
class activateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = True
			request.user.save()
			return Response({
				"detail": "Two Factor Authentication activated",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


class deactivateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = False
			request.user.save()
			return Response({
				"detail": "Two Factor Authentication deactivated",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)
		

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
				return Response({
					"detail": "QR Code sent to your email",
					"Access-Control-Allow-Credentials":"true"
				}, status=status.HTTP_200_OK)
			else:
				return Response({
					"detail": "Two Factor Authentication is not activated",
					"Access-Control-Allow-Credentials":"true"
				}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


# class TwoFactorAuth(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	## check if use is authenticated
	def post(self, request):
		otp_code = request.data.get('otp_code')
		device = TOTPDevice.objects.filter(user=request.user).first()

		if device and device.verify_token(otp_code):
			return Response({
				"detail": "OTP verified",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "Invalid OTP",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)
	permission_classes = (permissions.AllowAny,)
	# authentication_classes = (JWTAuthentication,)
	# authentication_classes = (BlacklistCheckJWTAuthentication,)

	def post(self, request):
		try:
			clean_data = user_registration(request.data)
			serializer = UserRegisterSerializer(data=clean_data)
			if serializer.is_valid(raise_exception=True):
				user = serializer.create(clean_data)
				if user:
					response = Response(serializer.data, status=status.HTTP_201_CREATED)
					response["Access-Control-Allow-Credentials"] = 'true'
					return response
		except ValidationError as e:
			response = Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
		
		response = Response(status=status.HTTP_400_BAD_REQUEST)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response

	def post(self, request):
		if request.user.is_authenticated:
				return Response({"detail": "You are already logged in, logout if you want to identify as someone else ;)"}, status=status.HTTP_400_BAD_REQUEST)
		data = request.data
		# assert validate_email(data)
		# assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			token = RefreshToken.for_user(user)
			token['email'] = user.email
			token['username'] = user.username
			return Response({
				'refresh': str(token),
				'access': str(token.access_token),
			}, status=status.HTTP_200_OK)


class accountDeletion(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.delete()
			return Response({
				"detail": "Account deleted",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)

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
			print(user_response.json())
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
			print(user_response.json())
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
	##
	def get(self, request):
		auth_url = "https://api.intra.42.fr/oauth/authorize"
		params = {
			"client_id": os.environ.get("UID"),
			"redirect_uri": settings.REDIRECT_URI + "/api/oauth/callback/",
			"response_type": "code",
		}
		return HttpResponseRedirect(f"{auth_url}?{urllib.parse.urlencode(params)}")

#######################################
# Two Factor Authentication
#######################################
class activateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = True
			request.user.save()
			return Response({
				"detail": "Two Factor Authentication activated",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


class deactivateTwoFa(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	##
	def post(self, request):
		if request.user.is_authenticated:
			request.user.TwoFA = False
			request.user.save()
			return Response({
				"detail": "Two Factor Authentication deactivated",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)
		

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
				return Response({
					"detail": "QR Code sent to your email",
					"Access-Control-Allow-Credentials":"true"
				}, status=status.HTTP_200_OK)
			else:
				return Response({
					"detail": "Two Factor Authentication is not activated",
					"Access-Control-Allow-Credentials":"true"
				}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({
				"detail": "No active user session",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)


class TwoFactorAuth(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (BlacklistCheckJWTAuthentication,)
	## check if use is authenticated
	def post(self, request):
		otp_code = request.data.get('otp_code')
		device = TOTPDevice.objects.filter(user=request.user).first()

		if device and device.verify_token(otp_code):
			return Response({
				"detail": "OTP verified",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_200_OK)
		else:
			return Response({
				"detail": "Invalid OTP",
				"Access-Control-Allow-Credentials":"true"
			}, status=status.HTTP_400_BAD_REQUEST)