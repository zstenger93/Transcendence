from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.exceptions import StopConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.room_name = 'chat_room'
		self.room_group_name = 'chat_%s' % self.room_name

		# Join room group
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		await self.accept()

	async def disconnect(self, close_code):
		# Leave room group
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	# Receive message from WebSocket
	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']

		# Get the username from the user in the connection scope
		username = self.scope['user'].username if self.scope['user'].is_authenticated else 'Anonymous'

		# Include the username in the message
		message = f'{username}: {message}'

		# Send message to room group
		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'chat_message',
				'message': message
			}
		)

	# Receive message from room group
	async def chat_message(self, event):
		message = event['message']

		# Send message to WebSocket
		await self.send(text_data=json.dumps({
			'message': message
		}))