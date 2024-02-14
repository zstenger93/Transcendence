from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db.models import JSONField

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, username=None, password=None, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	is_staff = models.BooleanField(default=True)
	## user identity
	id = models.AutoField(primary_key=True)
	profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	title = models.CharField(max_length=100, null=True, blank=True)
	intra_level = models.FloatField(default=0)
	TwoFA = models.BooleanField(default=False)
	AboutMe = models.TextField(max_length=500, null=True, blank=True)
	school = models.CharField(max_length=100, null=True, blank=True)
	wins = models.PositiveIntegerField(default=0)
	losses = models.PositiveIntegerField(default=0)
	win_rate = models.FloatField(default=0)
	total_matches = models.PositiveIntegerField(default=0)
	match_history = JSONField(default=dict)
	ft_user = models.BooleanField(default=False)
	ft_url = models.URLField(max_length=200, null=True, blank=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()

	def __str__(self):
		return self.username


class BlacklistedToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['token', 'user']
