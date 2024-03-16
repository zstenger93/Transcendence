from django.db import models
from user_api.models import AppUser

class Room(models.Model):
	id = models.AutoField(primary_key=True)
	users = models.ManyToManyField(AppUser)
	
	# function checks if a user is in the room
	def user_in_room(self, user):
		return user in self.users.all()

	# function returns the other user in the room
	def other_user(self, user):
		if self.user_in_room(user):
			return self.users.exclude(id=user.id)[0]
		else:
			return None
	
	def room_size(self):
		return len(self.users.all())

	# # function returns the room's id
	# def room_id(self):
	# 	return self.id

	# # function returns the room's user1
	# def room_user1(self):
	# 	return self.user1

	# # function returns the room's user2
	# def room_user2(self):
	# 	return self.user2

	# # function returns the room's user1's username
	# def room_user1_username(self):
	# 	return self.user1.username

	# # function returns the room's user2's username
	# def room_user2_username(self):
	# 	return self.user2.username

	# # function returns the room's user1's id
	# def room_user1_id(self):
	# 	return self.user1.id

	# # function returns the room's user2's id
	# def room_user2_id(self):
	# 	return self.user2.id


class Message(models.Model):
	room = models.ForeignKey(Room, on_delete=models.CASCADE)
	user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now_add=True)

class UserChannelName(models.Model):
	user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name='chat_channel_name')
	channel_name = models.CharField(max_length=100)

	def update_channel_name(self, channel_name):
		self.channel_name = channel_name
		self.save()
	
	def delete_channel_name(self):
		self.delete()

	class Meta:
		unique_together = ('user', 'channel_name',)
	
	def __str__(self):
		return self.user.username + ' ' + self.channel_name