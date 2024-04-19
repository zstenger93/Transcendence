from django.urls import path
from . import views

app_name = "game"

urlpatterns = [
    path("ending/", views.end_game, name="end_game"),
]
