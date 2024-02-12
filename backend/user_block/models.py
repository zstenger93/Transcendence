from django.db import models
from django.conf import settings
from rest_framework import serializers

class Block(models.Model):
	blocker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blocker')
	blocked = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blocked')
	date = models.DateTimeField(auto_now_add=True)

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ['blocker', 'blocked', 'date']  # add other fields if needed
