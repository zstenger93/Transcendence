from django.db import models
from django.contrib.auth.models import AbstractUser
from .utils import user_profile_picture_path

class User(AbstractUser):
	profile_picture = models.ImageField(upload_to=user_profile_picture_path, null=True, blank=True, default='default_profile_picture.PNG')
	total_matches = models.PositiveIntegerField(default=0)
	wins = models.PositiveIntegerField(default=0)
	losses = models.PositiveIntegerField(default=0)
	title = models.CharField(max_length=100, null=True, blank=True)

	def get_friends(self) -> list:
		accepted_requests = FriendRequest.objects.filter(
			models.Q(from_user=self, status='accepted') | models.Q(to_user=self, status='accepted')
		)
		friends = [request.to_user if request.from_user == self else request.from_user for request in accepted_requests]
		return friends

	def get_received_friend_requests(self) -> list:
		received_requests = FriendRequest.objects.filter(to_user=self, status='pending')
		users = [request.from_user for request in received_requests]
		return users

	

	def __str__(self) -> str:
		return "Custom User: " + super().__str__() + ' . Total matches: ' + str(self.total_matches) + ' . Wins: ' + str(self.wins) + ' . Losses: ' + str(self.losses)

class FriendRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_requests_sent')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_requests_received')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_user} to {self.to_user} ({self.status})"