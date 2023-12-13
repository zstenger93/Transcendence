from django.db import models

# Create your models here.

class User(models.Model):
	id = models.DecimalField(max_digits=10, decimal_places=0, unique=True, primary_key=True)
	username = models.CharField(max_length=255)
	display_name = models.CharField(max_length=255)
	email = models.EmailField()
	picture = models.URLField()

	def __str__(self):
		return str(self.id) + " " + self.username + " " + self.email

	def user_exists(self) -> bool:
		try:
			user = User.objects.get(email=self.email)
			return True
		except User.DoesNotExist:
			return False

        
