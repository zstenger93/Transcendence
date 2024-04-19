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


def end_game(request):
    lobby_info = request.GET.get("gameinfo", None)
    score_board = lobby_info.split(" ")
    winner_score = score_board[0]
    user1_id = score_board[1]
    user2_id = score_board[3]
    loser_score = score_board[4]
    logger.info(f"Game ended with score: {score_board}")
    user1 = get_object_or_404(AppUser, id=user1_id)
    user2 = get_object_or_404(AppUser, id=user2_id)

    logger.info(f"Game ended with score: {score_board}")

    return JsonResponse(
        {
            "winner": user1,
            "score": winner_score,
            
            "loser": user2,
            "scoree": loser_score,
        }
    )


# id1 score1 id2 score2
