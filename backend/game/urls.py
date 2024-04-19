from django.urls import path
from . import views

app_name = "game"

urlpatterns = [
    # path("1v1/<str:room_name>/", views.room, name="room"),
    path("ending/", views.game_ending, name="game_ending"),
    # path('send_push', views.send_push, name='send_push'),
]