from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255)
    email = models.EmailField()
    picture = models.URLField()