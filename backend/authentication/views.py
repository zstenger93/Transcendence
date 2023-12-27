from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.shortcuts import render, HttpResponse, redirect
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404

from .models import FriendRequest
from .models import User
from django.conf import settings

import requests
import urllib
import os

from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# ----------------------------------------––--------------- HOME FUNCTION
@login_required(login_url='/login/')
def home(request):
	context = {
		'username': request.user.username,
		'email': request.user.email,
	}
	print(request.user)
	return render(request, 'home.html', context)


# ----------------------------------------––--------------- LOGIN FUNCTION
# don't name it 'login' because it will conflict with the built-in login function
def my_login(request):
	if request.user.is_authenticated:
		return redirect("home")
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')


        # Authenticate the user
		user = authenticate(request, username=username, password=password)
		print(f'Username: {username}')
		print(f'Password: {password}')
		print(f'User: {user}')

		if user is not None:
            # Authentication successful, log in the user
			login(request, user)
			return redirect('home')  # Redirect to the home page or another desired destination
		else:
            # Authentication failed, display an error message
			error_message = 'Invalid username or password. Please try again.'
			return render(request, 'login.html', {'error_message': error_message})

    # Render the login form
	return render(request, 'login.html')

# ----------------------------------------––--------------- LOGOUT FUNCTION
def my_logout(request):
    # Log the user out using Django's built-in logout function
	logout(request)
    # Redirect the user to the login page
	return redirect('login')  # Replace 'login' with the actual name or URL of your login view


# ----------------------------------------––--------------- AUTHENTICATION CALLBACK FUNCTIONS
def auth_callback(request):
	if request.method == "GET":

		# ----------------------------------------––--------------- PREPARE DATA FOR REQUEST
		code = request.GET.get("code")
		data = {
			"grant_type": "authorization_code",
			"client_id": os.environ.get("UID"),
			"client_secret": os.environ.get("SECRET"),
			"code": code,
			"redirect_uri": settings.REDIRECT_URI,
		}

		# ----------------------------------------––--------------- REQEST TO 42 SERVER
		auth_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)
		access_token = auth_response.json()["access_token"]
		user_response = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})			


		# ---------------------------------------––---------------- GET USER DATA FROM 42 SERVER RESPONSE
		# id will be implemented later, once we have a modified User model
		# id = user_response.json()["id"]
		# Extract user information from the response
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

		user, created = User.objects.get_or_create(
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

		print(user)
		login(request, user)

		# ---------------------------------------––---------------- REDIRECT TO HOME PAGE
		return redirect("home")                                  
	return HttpResponse("Auth callback Error, bad token maybe!!")

# ----------------------------------------––--------------- AUTHENTICATION FUNCTIONS
def auth(request):
	auth_url = "https://api.intra.42.fr/oauth/authorize"
	params = {
		"client_id": os.environ.get("UID"),
		"redirect_uri": settings.REDIRECT_URI,
		"response_type": "code",
	}
	return redirect(f"{auth_url}?{urllib.parse.urlencode(params)}")


# ----------------------------------------––--------------- REGISTER FUNCTION
def register(request):
	if request.user.is_authenticated:
		return redirect("home")
	if request.method == 'POST':
		# Get data from the form
		username = request.POST.get('username').lower()
		email = request.POST.get('email').lower()
		password = request.POST.get('password')
		first_name = request.POST.get('first_name').lower()
		last_name = request.POST.get('last_name').lower()

		# Create a new user
		user = User.objects.create_user(username=username, email=email, password=password,
										first_name=first_name, last_name=last_name)
		# Log the user in
		login(request, user)
		print("\t\t\tNew user has been added!!!")
		print(f'Username: {user.username}')
		print(f'Email: {user.email}')
		print(f'First Name: {user.first_name}')
		print(f'Last Name: {user.last_name}')

		# Redirect to a success page or home
		return redirect('home')  # Change 'home' to the actual name of your home page or dashboard
	return render(request, 'register.html')


# ----------------------------------------––--------------- TEST FUNCTION
def test(request):
    # User data
    username = 'Jason'
    password = 'Bourne'

    # Create or get the user
    user, created = User.objects.get_or_create(username=username)
    user.set_password(password)
    user.save()

    # Print messages for demonstration purposes
    if created:
        print("User created")
    else:
        print("User already exists")

    print(user)

    # Pass the user object to the template
    return render(request, 'test.html', {'user': user})


# ----------------------------------------––--------------- USERS LIST FUNCTION
def users_list(request):
	# Get all users from the database
	users = User.objects.all()

	# Pass the users to the template
	return render(request, 'users_list.html', {'users': users})


def has_friend_request_sent(from_user, to_user):
    return FriendRequest.objects.filter(from_user=from_user, to_user=to_user, status='pending').exists()

def send_friend_request(request, to_user_id):
    # Get the 'to_user' object using the 'to_user_id'
    to_user = get_object_or_404(User, pk=to_user_id)

    # Check if a friend request already exists or if the users are the same
    existing_request = FriendRequest.objects.filter(from_user=request.user, to_user=to_user).first()
    if existing_request or request.user == to_user:
        # Handle the case where a request already exists or trying to send a request to oneself
        # You may want to display an error message or redirect to a different page
        pass
    else:
        # Create a new friend request
        friend_request = FriendRequest(from_user=request.user, to_user=to_user)
        friend_request.save()

    return redirect('users_list')  # Redirect to the user's profile page or any other desired page