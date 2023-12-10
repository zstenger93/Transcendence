from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate, login
from django.conf import settings
import requests
import os
import urllib

# Create your views that you will be able to access on website.

def home(request):
	if not request.session.get('username', False):
		return redirect('login')
	username = request.session.get('username', '')
	display_name = request.session.get('display_name', '')
	email = request.session.get('email', '')

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
		print(code)
		data = {
			"grant_type": "authorization_code",
			"client_id": os.environ.get("UID"),
			"client_secret": os.environ.get("SECRET"),
			"code": code,
			"redirect_uri": settings.REDIRECT_URI,
		}
		print(data)

		auth_response = requests.post("https://api.intra.42.fr/oauth/token", data=data)
		access_token = auth_response.json()["access_token"]
		user_response = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})
		username = user_response.json()["login"]
		display_name = user_response.json()["displayname"]
		email = user_response.json()["email"]

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