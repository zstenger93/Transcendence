from django.db import models
from django.contrib.auth.models import AbstractUser
from .utils import user_profile_picture_path
# Create your models here.

class User(AbstractUser):
        
	profile_picture = models.ImageField(upload_to=user_profile_picture_path, null=True, blank=True, default='default_profile_picture.PNG')
	total_matches = models.PositiveIntegerField(default=0)
	wins = models.PositiveIntegerField(default=0)
	losses = models.PositiveIntegerField(default=0)
	title = models.CharField(max_length=100, null=True, blank=True)

	def __str__(self) -> str:
		return "Custom User: " + super().__str__() + ' . Total matches: ' + str(self.total_matches) + ' . Wins: ' + str(self.wins) + ' . Losses: ' + str(self.losses)

