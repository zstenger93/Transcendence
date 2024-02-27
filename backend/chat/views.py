from django.shortcuts import render
from .models import Room

def room(request, room_id):
    # room = Room.objects.get(id=room_id)
    # return render(request, 'chat/room.html', {
    #     'room_id': room.id,
    #     'username': request.user.username,
    # })
	return render(request, 'chat/room.html' )