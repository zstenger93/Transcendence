from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from friendship.models import FriendshipRequest

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('id', 'email', 'username', 'profile_picture', \
			 	'total_matches', 'wins', 'losses', \
				'title', 'friends')


# class FriendSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()
#         fields = ('id', 'username', 'email')


# class FriendshipRequestSerializer(serializers.ModelSerializer):
#     to_user = serializers.CharField()
#     from_user = serializers.StringRelatedField()

#     class Meta:
#         model = FriendshipRequest
#         fields = ('id', 'from_user', 'to_user', 'message',
#                   'created', 'rejected', 'viewed')
#         extra_kwargs = {
#             'from_user': {'read_only': True},
#             'created': {'read_only': True},
#             'rejected': {'read_only': True},
#             'viewed': {'read_only': True},
#         }


# class FriendshipRequestResponseSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField()

#     class Meta:
#         model = FriendshipRequest
#         fields = ('id',)

