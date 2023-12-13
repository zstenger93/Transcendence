from django.db import models
from authentication.models import User


class Friendship(models.Model):
    sender = models.ForeignKey(User, related_name='sent_friend_requests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_friend_requests', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username} - {self.receiver.username} ({'Accepted' if self.accepted else 'Pending'})"