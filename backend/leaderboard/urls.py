# users_list/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('send_friend_request/', views.send_friend_request, name='send_friend_request'),
    # Add other URL patterns as needed
]