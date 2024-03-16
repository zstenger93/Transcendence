
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
from webpush.models import PushInformation

from webpush.utils import send_to_subscription
from webpush import send_user_notification, send_group_notification

import string
import string
import random
import json
import logging
from django.http import JsonResponse

logger = logging.getLogger(__name__)

# Then, instead of print, use logger.info (or logger.debug, logger.warning, etc.)

def generate_random_room_name(length=10):
    # Generate a random string of the given length
    room_name = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))
    return room_name

def prepare_room(user1, user2):
    """
    Helper function to get the game room object for two users.
    """
    game_room = GameRoom.objects.filter(user1=user1, user2=user2).first()
    if not game_room:
        game_room = GameRoom.objects.filter(user1=user2, user2=user1).first()
    return game_room

def room(request, other_user):
    # Get the other user object
    other_user_obj = AppUser.objects.get(username=other_user)

    # Get or create the game room for the users
    room_obj = prepare_room(request.user, other_user_obj)
    if not room_obj:
        room_name = generate_random_room_name()
        room_obj = GameRoom.objects.create(user1=request.user, user2=other_user_obj, name=room_name)

    # Prepare data for rendering, will be passed to template
    context = {
        "room_name": room_obj.name,
        "sender": request.user.id,
        "user1": room_obj.user1.id,
        "user2": room_obj.user2.id,
        "player0": room_obj.user1.username,
        "player1": room_obj.user2.username,
    }
    # logger.info("-----------------------------------------")
    # logger.info(f"{context['room_name']}, {context['sender']}, {context['user1']}, {context['user2']}, {context['player0']}, {context['player1']}")
    # logger.info("-----------------------------------------")
    
    webpush_settings = getattr(settings, 'WEBPUSH_SETTINGS', {})
    vapid_key = webpush_settings.get('VAPID_PUBLIC_KEY')
    user = request.user

    notification = {
            'title': 'Your Notification Title',
            'body': 'Your Notification Body',
            'icon': 'URL to Notification Icon',
        }
    logger.info("-----------------------------------------")
    logger.info(notification)
    logger.info("-----------------------------------------")
        # Get user's subscriptions and send notification
    subscriptions = PushInformation.objects.filter(user=user)
    for subscription in subscriptions:
        send_to_subscription(subscription, payload=notification)

    return JsonResponse(context)

def game_ending(request):
    # Get parameters from request
    game_info = request.GET.get('gameinfo', None)
    game_tag = request.GET.get('gametag', None)
    room_name = request.GET.get('roomname', None)
    # Parse game_info string from request
    users = game_info.split('|')
    winner_id = users[0].split(':')[0]
    winner_score = users[0].split(':')[1]
    loser_id = users[1].split(':')[0]
    loser_score = users[1].split(':')[1]
    # Get User objects
    winner = get_object_or_404(AppUser, id=winner_id)
    loser = get_object_or_404(AppUser, id=loser_id)
    if winner.game_stats is None:
        winner.game_stats = GameStats.objects.create(user=winner)
        winner.save()
    if loser.game_stats is None:
        loser.game_stats = GameStats.objects.create(user=loser)
        loser.save()
    # logger.info("-----------------------------------------")
    # logger.info(f"{winner}, {loser}, {winner_score}, {loser_score}, {game_tag}, {room_name}")
    # logger.info("-----------------------------------------")

    # Set up variables to populate entry in GameHistory table
    final_score = f"{winner_score}:{loser_score}"
    # Check if the entry already exists
    existing_entry = GameHistory.objects.filter(game_tag=game_tag).first()
    if not existing_entry:
        # Entry does not exist, create a new one
        game_history = GameHistory(type="1v1", winner=winner, loser=loser, final_score=final_score, game_tag=game_tag)
        game_history.save()
        winner.game_stats.add_game_history(game_history)
        loser.game_stats.add_game_history(game_history)
        winner.game_stats.add_win()
        loser.game_stats.add_loss()
    # Return to game room
    room_obj = GameRoom.objects.filter(name=room_name).first()
    other_user = room_obj.user1.username if room_obj.user1.username != request.user.username else room_obj.user2.username
    # return game info to the room

    return JsonResponse(
        {
            "winner": winner.username,
            "loser": loser.username,
            "final_score": final_score,
            "other_user": other_user,
        }
    )

@require_POST
@csrf_exempt
def send_push(request):
    try:
        body = request.body
        data = json.loads(body)

        if 'head' not in data or 'body' not in data or 'id' not in data:
            return JsonResponse(status=400, data={"message": "Invalid data format"})

        user_id = data['id']
        user = get_object_or_404(AppUser, pk=user_id)
        payload = {'head': data['head'], 'body': data['body']}
        send_user_notification(user=user, payload=payload, ttl=1000)

        return JsonResponse(status=200, data={"message": "Web push successful"})
    except TypeError:
        return JsonResponse(status=500, data={"message": "An error occurred"})
    
