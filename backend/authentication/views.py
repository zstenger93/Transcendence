from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.conf import settings
import requests
import os
import urllib


@login_required(login_url='/login/')
def home(request):
    return render(request, "home.html")

# don't name it 'login' because it will conflict with the built-in login function
def myLogin(request):
	if request.user.is_authenticated:
		return redirect("home")
	return render(request, "login.html")

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
		username = user_response.json()["login"]
		first_name = user_response.json()["first_name"]
		last_name = user_response.json()["last_name"]
		email = user_response.json()["email"]
		# picture will be implemented later, once we have a modified User model
		# picture = user_response.json()["image"]["link"]


		# -----------------------------------------––-------------- CREATE USER TO AUTHENTICATE AND LOGIN
		# user is a Model variable
		# created is a boolean variable
		user, created = User.objects.get_or_create(
			username=username, 
			defaults={
				'username' : username,
				'first_name': first_name, 
				'last_name': last_name, 
				'email': email
			}
		)
		if created:
			print("\t\t\tNew user has been added!!!")
		else:
			print("\t\t\tUser already exists!!!")
		login(request, user)

		# ---------------------------------------––---------------- REDIRECT TO HOME PAGE
		return redirect("home")                                  
	return HttpResponse("Auth callback Error, bad token maybe!!")

def auth(request):
	auth_url = "https://api.intra.42.fr/oauth/authorize"
	params = {
		"client_id": os.environ.get("UID"),
		"redirect_uri": settings.REDIRECT_URI,
		"response_type": "code",
	}
	return redirect(f"{auth_url}?{urllib.parse.urlencode(params)}")

def logout(request):
    request.session.flush()
    return redirect('login')

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
		# login(request, user)
		print("\t\t\tNew user has been added!!!")
		print(f'Username: {user.username}')
		print(f'Email: {user.email}')
		print(f'First Name: {user.first_name}')
		print(f'Last Name: {user.last_name}')

		# Redirect to a success page or home
		return redirect('home')  # Change 'home' to the actual name of your home page or dashboard
	return render(request, 'register.html')
