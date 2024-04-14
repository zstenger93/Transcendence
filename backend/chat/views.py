from django.shortcuts import render
from django.core import serializers
from user_api.models import AppUser
from .models import Room, Message
import json

def mychat(request):
    general_room, created = Room.objects.get_or_create(id=1)
    users = AppUser.objects.all()
    rooms = Room.objects.all()
    all_messages = []
    for room in rooms:
        messages_in_one_room = Message.objects.filter(room=room).values()
        all_messages.append(list(messages_in_one_room))

    # Convert QuerySets to JSON
    users_json = serializers.serialize('json', users)
    rooms_json = serializers.serialize('json', rooms)
    all_messages_json = json.dumps(all_messages)

    return render(request, 'chat/index.html', {
        "users" : users_json,
        "rooms" : rooms_json,
        "all_messages" : all_messages_json,
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
	