from django.shortcuts import render, HttpResponse 

# Create your views that you will be able to access on website.

def login(request):
    return render(request, "login.html")

def main(request):
    return render(request, "main.html")