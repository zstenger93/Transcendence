
from django.shortcuts import redirect
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import AppUser
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse
from user_api.models import AppUser
from friendship_api.models import Follower
from friendship_api.serializers import FollowerSerializer
from rest_framework import generics, permissions

@login_required
def follow(request, pk):
	authentication_classes = (JWTAuthentication,)
	user = get_object_or_404(AppUser, pk = pk)
	already_followed = Follower.objects.filter(user = user, is_followed_by = request.user).first()
	if not already_followed:
		new_follower = Follower(user = user, is_followed_by = request.user)
		new_follower.save()
		follower_count = Follower.objects.filter(user = user).count()
		return JsonResponse({'status': 'Following', 'count': follower_count})
	else:
		already_followed.delete()
		follower_count = Follower.objects.filter(user = user).count()
		return JsonResponse({'status': 'Not following', 'count': follower_count})
	return redirect('/')

class Following(generics.ListCreateAPIView):
	authentication_classes = (JWTAuthentication,)
	serializer_class = FollowerSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		user = get_object_or_404(AppUser, pk = self.kwargs["pk"])
		return Follower.objects.filter(is_followed_by = user)

class Followers(generics.ListCreateAPIView):
	authentication_classes = (JWTAuthentication,)
	queryset = Follower.objects.all()
	serializer_class = FollowerSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		user = get_object_or_404(AppUser, pk = self.kwargs["pk"])
		return Follower.objects.filter(user = user).exclude(is_followed_by = user)
	
