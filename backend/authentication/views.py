from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate, login
from django.conf import settings
from .models import User
import requests
import os
import urllib


def home(request):
	if not request.session.get('username', False):
		return redirect('login')
	username = request.session.get('username', '')
	display_name = request.session.get('display_name', '')
	email = request.session.get('email', '')


# PRINTING
# ---------------------------------------------------------------
	# users = User.objects.all()
	# print("LEN1: ")
	# print(len(users))
	# print(users)
	# for user in users:
	# 	print(user)

	# print("method: ", request.method, type(request.method))
	# print("GET: ", request.GET, type(request.GET))
	# print("POST: ", request.POST, type(request.POST))
	# print("FILES", request.FILES, type(request.FILES))
	# print("path: ", request.path, type(request.path))
	# print("user: ",request.user, type(request.user))

	# print("Type of request:", type(request))
	# for i in request:
	# 	print(i)
# ---------------------------------------------------------------

	context = {
		'username': username,
		'display_name': display_name,
		'email': email,
	}
	return render(request, "home.html", context)

def login(request):
	return render(request, "login.html")

def auth_callback(request):
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
		
		id = user_response.json()["id"]
		username = user_response.json()["login"]
		display_name = user_response.json()["displayname"]
		email = user_response.json()["email"]
		picture = user_response.json()["image"]["link"]

		user = User(id=id, username=username, display_name=display_name, email=email, picture=picture)
		if user.user_exists() == False:
			print("\t\t\tNew user has been added!!!")
			user.save()
		else:
			print("\t\t\tUser already exists!!!")

		request.session['username'] = username
		request.session['display_name'] = display_name
		request.session['email'] = email
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