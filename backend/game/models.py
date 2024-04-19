
from django.db import models
from django.conf import settings
from django.core.serializers import serialize
import json

# Create your models here.
class GameRoom(models.Model):
    name = models.CharField(max_length=255)
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="game_user1", null=True)
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="game_user2", null=True)
    online = models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Game Room"
        verbose_name_plural = "Game Rooms"



class UserChannelName(models.Model):
    AppUser = settings.AUTH_USER_MODEL
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name='game_channel_name')
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