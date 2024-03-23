from django.shortcuts import render

from friendship.models import Friend, Block, FriendshipManager
from user_api.models import AppUser as User

from django.http import JsonResponse
from friendship.exceptions import AlreadyExistsError
from django.db import IntegrityError
# Create your views here.

def add_friend(request, username):
	try:
		from_user = request.user
		to_user = User.objects.get(username=username)
	except User.DoesNotExist:
		return JsonResponse({'error': 'User does not exist'}, status=400)
	if from_user == to_user:
		return JsonResponse({'error': 'You cannot add yourself as a friend'}, status=400)
	try:
		Friend.objects.create(from_user=from_user, to_user=to_user)
	except IntegrityError:
		return JsonResponse({'error': 'Friendship already exists'}, status=400)
	return JsonResponse({'success': 'Friend added'}, status=200)

def get_friends_list(request):
	try:
		user = request.user
	except User.DoesNotExist:
		return JsonResponse({'error': 'User does not exist'}, status=400)
	# from_user or to_user should be user himself
	from_user = Friend.objects.filter(from_user=user)
	to_user = Friend.objects.filter(to_user=user)
	friends = list(set([f.to_user for f in from_user] + [f.from_user for f in to_user]))
	if user in friends:
		friends.remove(user)
	response = {
		'friends': [f.username for f in friends]
	}
	return JsonResponse(response, status=200)

def block_user(request, username):
	try:
		blocker = request.user
		blocked = User.objects.get(username=username)
	except User.DoesNotExist:
		return JsonResponse({'error': 'User does not exist'}, status=400)
	if blocker == blocked:
		return JsonResponse({'error': 'You cannot block yourself'}, status=400)
	try:
		Block.objects.create(blocker=blocker, blocked=blocked)
	except IntegrityError:
		return JsonResponse({'error': 'Block already exists'}, status=400)
	return JsonResponse({'success': 'User blocked'}, status=200)

def unblock_user(request, username):
	try:
		blocker = request.user
		blocked = User.objects.get(username=username)
	except User.DoesNotExist:
		return JsonResponse({'error': 'User does not exist'}, status=400)
	if blocker == blocked:
		return JsonResponse({'error': 'You cannot unblock yourself'}, status=400)
	try:
		Block.objects.get(blocker=blocker, blocked=blocked).delete()
	except Block.DoesNotExist:
		return JsonResponse({'error': 'Block does not exist'}, status=400)
	return JsonResponse({'success': 'User unblocked'}, status=200)

def get_block_list(request):
	try:
		user = request.user
	except User.DoesNotExist:
		return JsonResponse({'error': 'User does not exist'}, status=400)
	blocks = Block.objects.filter(blocker=user)
	blocked = [b.blocked for b in blocks]
	response = {
		'blocked_users': [b.username for b in blocked]
	}
	return JsonResponse(response, status=200)