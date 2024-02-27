from django.db import models
from user_api.models import AppUser

class Room(models.Model):
	id = models.AutoField(primary_key=True)
	user1 = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='user1')
	user2 = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='user2')
	
	# function checks if a user is in the room
	def user_in_room(self, user):
		return user == self.user1 or user == self.user2

	# function returns the other user in the room
	def other_user(self, user):
		if user == self.user1:
			return self.user2
		elif user == self.user2:
			return self.user1
		else:
			return None

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