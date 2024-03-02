from django.shortcuts import render
from django.shortcuts import get_object_or_404
from user_api.models import AppUser
from .models import Room

def mychat(request):
	# return a list of users with html
	users = AppUser.objects.all()
	return render(request, 'chat/index.html', {
		"users" : users,
		})
	# user = request.user

	# room, created = Room.objects.get_or_create(id=room_id, user1=user.id, user2=user.id)
	# if created:
	# 	print('\t\t\tRoom has been created')
	# else:
	# 	print('\t\t\tRoom has been found')
	# if created:
	# 	return render(request, 'chat/room.html', {
	# 	"state" : "created",
	# 	})
	# else:
	# 	return render(request, 'chat/room.html', {
	# 	"state" : "found",
	# 	})
	