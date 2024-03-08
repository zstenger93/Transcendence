from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from channels.exceptions import StopConsumer
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		from .models import UserChannelName
		################# USER IS AUTHENTICATED CHECK #################
		if not self.scope['user'].is_authenticated:
			await self.close()
			raise StopConsumer('User is not authenticated')

		username = self.scope['user'].username
		self.room_name = username + '_chat_room'
		self.room_group_name = 'general_group'

		################ JOIN GENERAL GROUP ################
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		################# CREATE USER CHANNEL NAME ################# for private messaging
		myChannelName, created = await self.get_or_create_user_channel_name()
		if not created:
			await self.update_channel_name(myChannelName)

		################# ACCEPT CONNECTION #################
		await self.accept()


		# testing purposes
		users = await self.get_all_user_channel_names()
		await self.write_to_file_connection(users)

		################# NOTIFY EVERYONE THAT THE USER (CONSUMER) JOINED. (GROUP_SEND) #################
		online_users = await self.get_all_user_channel_names()
		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'notify_user_joined',
				'message': f'{self.scope["user"].username} has joined the chat.',
				'online_users': online_users,
			}
		)




	async def disconnect(self, close_code):

		################# DELETE USER CHANNEL NAME #################
		userChannelName = await self.get_user_channel_name()
		if userChannelName:
			await self.delete_channel_name(userChannelName)

		################# NOTIFY EVERYONE THAT THE USER (CONSUMER) LEFT. (GROUP_SEND) #################
		online_users = await self.get_all_user_channel_names()
		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'notify_user_left',
				'message': f'{self.scope["user"].username} has left the chat.',
				'online_users': online_users,
			}
		)
		# testing purposes
		users = await self.get_all_user_channel_names()
		await self.write_to_file_disconnection(users)

		################ LEAVE GENERAL GROUP ################
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)



	# Receive message from WebSocket
	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json.get('message', None)
		receiver = text_data_json.get('receiver', None)
		function_name = text_data_json.get('function_name', None)

		################# USER IS AUTHENTICATED CHECK #################
		if not self.scope['user'].is_authenticated:
			await self.close()
			raise StopConsumer('User is not authenticated')

		username = self.scope['user'].username
		message = f'{username}: {message}'

		################# SEND TO GENERAL OR PRIVATE #################
		if receiver == 'general_group':
			await self.channel_layer.group_send(
				self.room_group_name,
				{
					# type is the reserved word for the function to call
					'type': 'chat_message',
					'receiver': 'general_channel',
					'message': message
				}
			)
		else:
			userChannelName = await self.get_user_channel_name_by_username(receiver)
			if userChannelName:
				await self.channel_layer.send(
					userChannelName.channel_name,
					{
						'type': 'chat_message',
						'receiver': 'private_channel',
						'message': message
					}
				)
		# await self.send(text_data=json.dumps({
		# 	'message': message
		# }))
		

	# Receive message from room group
	async def chat_message(self, event):
		message = event['message']
		receiver = event['receiver']

		# Send message to WebSocket
		await self.send(text_data=json.dumps({
			'message': message,
			'type' : receiver,
		}))
	

	async def notify_user_joined(self, event):
		message = event['message']
		online_users = await sync_to_async(list)(event['online_users'])
		online_users = await self.get_usernames_from_user_channel_names(online_users)

		# Send message to WebSocket
		await self.send(text_data=json.dumps({
			'type': 'notify_user_joined',
			'message': message,
			'online_users': online_users
		}))

	async def notify_user_left(self, event):
		message = event['message']
		online_users = await sync_to_async(list)(event['online_users'])
		online_users = await self.get_usernames_from_user_channel_names(online_users)

		# Send message to WebSocket
		await self.send(text_data=json.dumps({
			'type': 'notify_user_left',
			'message': message,
			'online_users': online_users
		}))
	
	@database_sync_to_async
	def get_usernames_from_user_channel_names(self, user_channel_names):
		return [user_channel_name.user.username for user_channel_name in user_channel_names]


	@database_sync_to_async
	def get_all_user_channel_names(self):
		from .models import UserChannelName
		return list(UserChannelName.objects.values('user__username'))


	@database_sync_to_async
	def get_or_create_user_channel_name(self):
		from .models import UserChannelName
		if UserChannelName.objects.filter(user=self.scope['user']).exists():
			return UserChannelName.objects.get(user=self.scope['user']), False
		else:
			return UserChannelName.objects.create(user=self.scope['user']), True

	@database_sync_to_async
	def update_channel_name(self, userChannelName):
		from .models import UserChannelName
		userChannelName.update_channel_name(self.channel_name)

	@database_sync_to_async
	def get_user_channel_name(self):
		from .models import UserChannelName
		return UserChannelName.objects.get(user=self.scope['user'])

	@database_sync_to_async
	def delete_channel_name(self, userChannelName):
		userChannelName.delete_channel_name()

	@database_sync_to_async
	def get_user_channel_name_by_username(self, username):
		from .models import UserChannelName
		return UserChannelName.objects.get(user__username=username)
	
	@database_sync_to_async
	def get_all_user_channel_names(self):
		from .models import UserChannelName
		return UserChannelName.objects.all()


# testing purposes
	@sync_to_async
	def write_to_file_connection(self, users):
		from datetime import datetime
		with open('text.txt', 'a') as f:
			f.write('\t\t\t NEW CONNECTION: ')
			f.write(f'{datetime.now().strftime("%H:%M:%S")}\n')
			f.write(f'Username: {self.scope["user"].username}\n')
			f.write(f'Room name: {self.room_name}\n')
			f.write(f'Room group name: {self.room_group_name}\n')
			f.write(f'Channel name: {self.channel_name}\n')
			f.write('\tActive users:\n')
			for user in users:
				f.write(f'\t\tUsername: {user.user.username}\n')
			f.write('\n\n')
	
	@sync_to_async
	def write_to_file_disconnection(self, users):
		from datetime import datetime
		with open('text.txt', 'a') as f:
			f.write('\t\t\t DISCONNECT: ')
			f.write(f'{datetime.now().strftime("%H:%M:%S")}\n')
			f.write(f'Disconnected user: {self.scope["user"].username}\n')
			f.write('\tActive users:\n')
			for user in users:
				f.write(f'\t\tUsername: {user.user.username}\n')
			f.write('\n\n')



	# NOT USED
	async def group_send_online_users(self, event):
		all_users = await self.get_all_user_channel_names()
		self.chanel_layer.group_send(
			self.room_group_name,
			{
				'type': 'send_online_users',
				'users': all_users,
			}
		)

	async def send_online_users(self, event):
		users = event['users']
		await self.send(text_data=json.dumps({
			'type': 'online_users',
			'users': users,
		}))