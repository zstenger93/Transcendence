from .models import *
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *
from user_api.models import AppUser
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .consumers import GameConsumer

from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

import string
import random
import json
import logging
from django.http import JsonResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def get_user_from_session(session_key):
    session = Session.objects.get(session_key=session_key)
    user_id = session.get_decoded().get("_auth_user_id")
    user = User.objects.get(id=user_id)
    return user


logger = logging.getLogger(__name__)

# Then, instead of print, use logger.info (or logger.debug, logger.warning, etc.)


def generate_random_lobby_name(length=10):
    # Generate a random string of the given length
    lobby_name = "".join(
        random.choice(string.ascii_letters + string.digits) for _ in range(length)
    )
    return lobby_name


def my_handler(message):
    user_id = message.get("user_id")
    room_name = message.get("room_name")
    print(f"User {user_id} joined room {room_name}")

def game_ending(request):
    # Get parameters from request
    game_info = request.GET.get("gameinfo", None)
    game_tag = request.GET.get("gametag", None)
    lobby_name = request.GET.get("roomname", None)
    users = game_info.split(" ")
    winner_id = users[0]
    winner_score = users[1]
    loser_id = users[4]
    loser_score = users[3]

    # Get User objects
    winner = get_object_or_404(AppUser, id=winner_id)
    loser = get_object_or_404(AppUser, id=loser_id)

    final_score = f"{winner_score}:{loser_score}"
    # Check if the entry already exists
    existing_entry = GameHistory.objects.filter(game_tag=game_tag).first()
    if not existing_entry:
        # Entry does not exist, create a new one
        game_history = GameHistory(
            type="1v1",
            winner=winner,
            loser=loser,
            final_score=final_score,
            game_tag=game_tag,
        )
        game_history.save()
        winner.game_stats.add_game_history(game_history)
        loser.game_stats.add_game_history(game_history)
        winner.game_stats.add_win()
        loser.game_stats.add_loss()
    # Return to game room
    room_obj = GameRoom.objects.filter(name=lobby_name).first()
    other_user = (
        room_obj.user1.username
        if room_obj.user1.username != request.user.username
        else room_obj.user2.username
    )
    # return game info to the room

    return JsonResponse(
        {
            "winner": winner.username,
            "loser": loser.username,
            "final_score": final_score,
            "other_user": other_user,
        }
    )
