import asyncio
import json
import random
import math

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from channels.exceptions import StopConsumer
from rest_framework.request import Request
import secrets
import string


## The consumer will be responsible for handling the game logic and updating the game state(websockets)
def generate_random_string(length):
    characters = string.ascii_letters + string.digits + "_"
    random_string = "".join(secrets.choice(characters) for _ in range(length))
    return random_string


import logging

logger = logging.getLogger(__name__)


class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_state = {}

    user_ids = {}

    connected_clients = {}
    game_tasks = {}
    users = {}
    connected_users = set()
    async def connect(self):
        self.connected_users.add(self.scope["user"].id)
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"game_{self.room_name}"
        if not self.scope["user"].is_authenticated:
            await self.close()
            logger.info("User is not authenticated!!!!!")
            raise StopConsumer("User is not authenticated")
        logger.info(f"connected clients: {self.connected_clients}")

        user = self.scope["user"]
        if self.room_name in self.connected_clients:
            self.game_instance = self.connected_clients[self.room_name]
            if self.user_ids[self.room_name][0] != user.id:
                self.user_ids[self.room_name][1] = user.id
                self.users[self.room_name][1] = user
                self.game_state[self.room_name] = "starting"
        else:
            self.user_ids[self.room_name] = [user.id, None]
            self.users[self.room_name] = [user, None]
            if (
                self.room_name not in self.connected_clients
                or self.connected_clients[self.room_name] is None
            ):
                self.connected_clients[self.room_name] = GameInstance()
            self.game_instance = self.connected_clients[self.room_name]
            self.game_state[self.room_name] = "waiting"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        if self.room_name not in self.game_state:
            self.game_state[self.room_name] = "waiting"

        if (self.game_state[self.room_name] != "waiting"):
            await self.send_room_info_to_group()
            await self.startGame()

    async def send_room_info_to_group(self):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "room_info",
                    "room_name": self.room_name,
                    "game_state": self.game_state.get(self.room_name),
                    "user_ids": self.user_ids.get(self.room_name),
                    "users": [str(user) for user in self.users.get(self.room_name)],
                }
            )
        )

    async def receive(self, text_data):
        game_event = text_data
        cmd = str(game_event[:2])
        userid = int(game_event[2:])
        # if connected client < 2, then create a new game instance
        logger.info(f"connected clientssssssss: {self.connected_clients}")
        if (self.room_name not in self.connected_clients and len(self.connected_clients) < 2):
            # add user to the room
            self.user_ids[self.room_name][1] = userid
            self.users[self.room_name][1] = self.scope["user"]
            self.game_instance = self.connected_clients[self.room_name]

        logger.info(f"ccccccconnected clients: {self.connected_clients}")
        await self.handleInput(cmd, userid)

    async def handleInput(self, cmd, userid):
        logger.info(f"users in room: {self.users[self.room_name]}")
        logger.info(f"User {userid} sent command: {cmd}")
        if cmd == "pw" and userid == self.user_ids[self.room_name][0]:
            await self.game_instance.move_p0_up("press")
        elif cmd == "ps" and userid == self.user_ids[self.room_name][0]:
            await self.game_instance.move_p0_down("press")
        elif cmd == "rw" and userid == self.user_ids[self.room_name][0]:
            await self.game_instance.move_p0_up("release")
        elif cmd == "rs" and userid == self.user_ids[self.room_name][0]:
            await self.game_instance.move_p0_down("release")
        elif cmd == "pw" and userid == self.user_ids[self.room_name][1]:
            await self.game_instance.move_p1_up("press")
        elif cmd == "ps" and userid == self.user_ids[self.room_name][1]:
            await self.game_instance.move_p1_down("press")
        elif cmd == "rw" and userid == self.user_ids[self.room_name][1]:
            await self.game_instance.move_p1_up("release")
        elif cmd == "rs" and userid == self.user_ids[self.room_name][1]:
            await self.game_instance.move_p1_down("release")
        await self.send_game_state_to_clients()

    async def disconnect(self, close_code):
        logger.info(f"User disconnected: {self.scope['user'].id}")
        self.connected_users.remove(self.scope["user"].id)
        if not self.connected_users:
            self.game_state = {}
            self.connected_clients = {}
            # self.game_instance = None
            self.game_tasks = {}
            # self.connected_users = set()

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def startGame(self):
        logger.info(f"Game loop started status: {self.game_state[self.room_name]}")
        self.game_state[self.room_name] = "starting"
        await self.send_game_state_to_clients()
        if self.room_name in self.connected_clients:
            self.game_instance = self.connected_clients[self.room_name]
        else:
            self.connected_clients[self.room_name] = GameInstance()
            self.game_instance = self.connected_clients[self.room_name]
        if self.room_name not in self.game_tasks:
            self.game_tasks[self.room_name] = asyncio.create_task(self.gameLoop())

    async def gameLoop(self):
        while self.game_state[self.room_name] == "starting" or self.game_state[self.room_name] == "waiting":
            await self.game_instance.update_game(
                self.game_state,
                self.room_name,
                self.user_ids[self.room_name][0],
                self.user_ids[self.room_name][1],
            )
            await asyncio.sleep(0.015625)
            await self.send_game_state_to_clients()
        self.game_tasks.pop(self.room_name)
        await self.send_game_end()

    async def send_game_end(self):
        game_tag = generate_random_string(20)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "ending_message",
                "score": self.game_instance.score,
                "player0": self.game_instance.player0,
                "player1": self.game_instance.player1,
                "room_name": self.room_name,
                "game_state": self.game_state.get(self.room_name),
                "users": [str(user) for user in self.users.get(self.room_name)],
                "game_tag": game_tag,
            },
        )

    async def ending_message(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "ending_message",
                    "score": event["score"],
                    "player0": event["player0"],
                    "player1": event["player1"],
                    "room_name": event["room_name"],
                    "game_state": event["game_state"],
                    "users": event["users"],
                    "user_ids": self.user_ids.get(self.room_name),
                    "game_tag": event["game_tag"],
                }
            )
        )

    async def send_game_state_to_clients(self):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "game_message",
                "ball_x": self.game_instance.ball_x,
                "ball_y": self.game_instance.ball_y,
                "ball_speed_x": self.game_instance.ball_speed_x,
                "ball_speed_y": self.game_instance.ball_speed_y,
                "score": self.game_instance.score,
                "player0": self.game_instance.player0,
                "player1": self.game_instance.player1,
                "hit": self.game_instance.hit,
                "ball_speed": self.game_instance.ball_speed,
                "room_name": self.room_name,
                "game_state": self.game_state.get(self.room_name),
                "w": self.user_ids.get(self.room_name),
                "users": [str(user) for user in self.users.get(self.room_name)],
                "sender": self.scope["user"].id,
            },
        )
        # logger.info(f"Game state sent: {self.game_instance.ball_x}, {self.game_instance.ball_y},  {self.game_instance.score},  {self.game_instance.player0},  {self.game_instance.player1},  {self.game_instance.hit},  {self.game_instance.ball_speed},  {self.room_name},  {self.game_state.get(self.room_name)},  {self.user_ids.get(self.room_name)},  {[str(user) for user in self.users.get(self.room_name)]}")

    async def game_message(self, event):
        # This method is called when the group receives a message
        await self.send(
            text_data=json.dumps(
                {
                    "type": "game_message",
                    "ball_x": event["ball_x"],
                    "ball_y": event["ball_y"],
                    "ball_speed_x": event["ball_speed_x"],
                    "ball_speed_y": event["ball_speed_y"],
                    "score": event["score"],
                    "player0": event["player0"],
                    "player1": event["player1"],
                    "hit": event["hit"],
                    "ball_speed": event["ball_speed"],
                    "room_name": self.room_name,
                    "game_state": self.game_state.get(self.room_name),
                    "user_ids": self.user_ids.get(self.room_name),
                    "users": [str(user) for user in self.users.get(self.room_name)],
                    "sender": self.scope["user"].id,
                }
            )
        )

    @database_sync_to_async
    def get_room(self, room_name):
        from game.models import GameRoom

        return GameRoom.objects.get(name=room_name)

    @database_sync_to_async
    def get_all_user_channel_names(self):
        from .models import UserChannelName

        return list(UserChannelName.objects.values("user__username"))


class GameInstance:
    def __init__(self):
        self.players_ready = 0
        self.ball_size = 5
        self.ball_max_speed = 40
        self.ball_speed_x = 5
        self.ball_x = 50
        self.ball_speed_y = 2
        self.ball_y = 50
        self.canvas_width = 1000
        self.canvas_height = 700
        self.player0 = 295
        self.player0_score = 0
        self.player1 = 295
        self.player1_score = 0
        self.paddle_height = 110
        self.paddle_width = 10
        self.score = "0:0"
        self.ball_hit_counter = 1
        self.hit = 0
        self.p0_moving = 0
        self.p1_moving = 0
        self.ball_speed = 0
        self.score_to_win = 2

    async def move_paddle(self, paddle, direction, state):
        if state == "press":
            if paddle == "player0":
                setattr(self, paddle, self.player0 + direction)
            else:
                setattr(self, paddle, self.player1 + direction)
        elif state == "release":
            if paddle == "player0":
                setattr(self, paddle, self.player0 + direction)
            else:
                setattr(self, paddle, self.player1 + direction)

    async def move_p0_up(self, state):
        await self.move_paddle("player0", -10, state)
        # self.player0 += 1

    async def move_p0_down(self, state):
        await self.move_paddle("player0", 10, state)

    async def move_p1_up(self, state):
        await self.move_paddle("player1", -10, state)

    async def move_p1_down(self, state):
        await self.move_paddle("player1", 10, state)

    async def update_game(self, game_state, room_name, user0, user1):
        """
        Updates the game state
        """
        self.player0 += self.p0_moving * 10
        self.player0 = max(
            0, min(self.canvas_height - self.paddle_height, self.player0)
        )
        self.player1 += self.p1_moving * 10
        self.player1 = max(
            0, min(self.canvas_height - self.paddle_height, self.player1)
        )
        await self.update_ball_position(game_state, room_name, user0, user1)
        self.score = f"{self.player0_score} : {self.player1_score}"
        self.ball_speed = math.sqrt(self.ball_speed_x**2 + self.ball_speed_y**2)

    async def update_ball_position(self, game_state, room_name, user0, user1):
        self.ball_x += self.ball_speed_x
        self.ball_y += self.ball_speed_y

        # Handle collision with Player 0 paddle
        if (
            self.ball_x - self.ball_size < self.paddle_width
            and self.player0 < self.ball_y < self.player0 + self.paddle_height
            and self.ball_speed_x < 0
        ):  # Check if ball is moving towards the paddle
            await self.handle_collision_with_paddle(
                self.player0, self.paddle_height, self.paddle_width
            )

        # Handle collision with Player 1 paddle
        elif (
            self.ball_x + self.ball_size > self.canvas_width - self.paddle_width
            and self.player1 < self.ball_y < self.player1 + self.paddle_height
            and self.ball_speed_x > 0
        ):  # Check if ball is moving towards the paddle
            await self.handle_collision_with_paddle(
                self.player1, self.paddle_height, self.paddle_width
            )

        # Handle scoring and ball reset
        if self.ball_x < 0 or self.ball_x + self.ball_size > self.canvas_width:
            await self.handle_goal(
                "player0" if self.ball_x < 0 else "player1",
                game_state,
                room_name,
                user0,
                user1,
            )

        # Handle ball collision with top or bottom wall
        elif self.is_ball_colliding_with_walls():
            self.handle_wall_collision()

    async def handle_goal(self, player_id, game_state, room_name, user0, user1):
        self.ball_hit_counter = 1
        self.ball_speed_x = 5 if player_id == "player0" else -5
        self.ball_speed_y = random.uniform(-2, 2)
        self.ball_x = 50 if player_id == "player0" else 750
        self.ball_y = random.uniform(20, 370)
        if player_id == "player0":
            self.player0_score += 1
            if self.player0_score == self.score_to_win:
                game_state[room_name] = f"{self.player0_score} : {self.player1_score}"
                self.player1_score = 0
                self.player0_score = 0
                self.player0 = 200 - self.paddle_height / 2
                self.player1 = 200 - self.paddle_height / 2
        else:
            self.player1_score += 1
            if self.player1_score == self.score_to_win:
                game_state[room_name] = f"{self.player0_score} : {self.player1_score}"
                self.player1_score = 0
                self.player0_score = 0
                self.player0 = 200 - self.paddle_height / 2
                self.player1 = 200 - self.paddle_height / 2

    def handle_wall_collision(self):
        if self.ball_y - self.ball_size < 0:
            self.ball_y = self.ball_size
            self.ball_speed_y = abs(self.ball_speed_y)
        elif self.ball_y + self.ball_size > self.canvas_height:
            self.ball_y = self.canvas_height - self.ball_size
            self.ball_speed_y = -abs(self.ball_speed_y)

    async def handle_collision_with_paddle(self, player, paddle_height, paddle_width):
        paddle_hit = (self.ball_y - player) / paddle_height
        deviate = (2 * ((paddle_hit - 0.5) ** 2)) + 1
        if paddle_hit < 0.5:
            deviate *= -1
        if player == self.player0:
            self.ball_x = self.paddle_width + self.ball_size
            self.ball_speed_x = abs(self.ball_speed_x)
        elif player == self.player1:
            self.ball_x = self.canvas_width - self.paddle_width - self.ball_size
            self.ball_speed_x = -abs(self.ball_speed_x)
        self.ball_hit_counter += 1
        self.ball_speed_x *= 1 + (1 / self.ball_hit_counter) / 2
        self.ball_speed_y *= 1 + (1 / self.ball_hit_counter) / 2
        angle = math.pi / 14 * deviate
        magnitude = math.sqrt(self.ball_speed_x**2 + self.ball_speed_y**2)
        normalized_speed_x = self.ball_speed_x / magnitude
        normalized_speed_y = self.ball_speed_y / magnitude
        self.ball_speed_x = normalized_speed_x * math.cos(
            angle
        ) - normalized_speed_y * math.sin(angle)
        self.ball_speed_y = normalized_speed_x * math.sin(
            angle
        ) + normalized_speed_y * math.cos(angle)
        self.ball_speed_x *= magnitude
        self.ball_speed_y *= magnitude
        magnitude = math.sqrt(self.ball_speed_x**2 + self.ball_speed_y**2)
        self.hit = 1

    def is_ball_colliding_with_walls(self):
        return (
            self.ball_y - self.ball_size < 0
            or self.ball_y + self.ball_size > self.canvas_height
        )

    def is_colliding_with_paddle(self, player, paddle_height, paddle_width):
        return (
            self.ball_x - self.ball_size < paddle_width
            and player < self.ball_y < player + paddle_height
        )
