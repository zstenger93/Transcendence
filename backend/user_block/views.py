from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.forms.models import model_to_dict
from user_api.models import AppUser
from django.core.exceptions import ObjectDoesNotExist
from .models import Block, BlockSerializer

class UserData(APIView):
    def get(self, request, username):
        user = AppUser.objects.get(username=username)
        if not user:
            response = Response({
                "detail": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)
            response["Access-Control-Allow-Credentials"] = 'true'
            return response
        data = user_to_dict(user)
        response = Response({
            "user": data,
        }, status=status.HTTP_200_OK)
        response["Access-Control-Allow-Credentials"] = 'true'
        return response

def user_to_dict(user):
    user_dict = model_to_dict(user)
    if user.profile_picture and user.profile_picture.file:
        user_dict['profile_picture'] = user.profile_picture.url
    else:
        user_dict['profile_picture'] = None
    # keep only fields : email, username, profile_picture, title, school, intra_level
    user_dict = {key: user_dict[key] for key in ['email', 'username', 'profile_picture', 'title', 'school', 'intra_level']}
    return user_dict

class UsersData(APIView):
    def get(self, request):
        users = AppUser.objects.all()  # get all users
        users_data = [user_to_dict(user) for user in users]  # convert all users to dictionaries
        response = Response(users_data, status=status.HTTP_200_OK)
        response["Access-Control-Allow-Credentials"] = 'true'
        return response

# get all Block objects
class AllBlocks(APIView):
    def get(self, request):
        blocks = Block.objects.all()
        serializer = BlockSerializer(blocks, many=True)
        return Response(serializer.data)

# get usernames of users whom the current user has blocked
class UserBlocks(APIView):
    def get(self, request):
        user = request.user  # get the current user
        blocks = Block.objects.filter(blocker=user)  # get blocks created by the current user
        blocked_users = [block.blocked.username for block in blocks]  # get usernames of blocked users
        response = Response(blocked_users, status=status.HTTP_200_OK)
        return response

# block another user
class BlockUser(APIView):
    def post(self, request):
        user = request.user
        # get blocked_username
        blocked_username = request.data.get('blocked_username')

        # TODO: FRONTEND needs to send the username of the user to be blocked
        try:
            blocked_user = AppUser.objects.get(username=blocked_username)
        except ObjectDoesNotExist:
            response = Response({
                "detail": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)
            response["Access-Control-Allow-Credentials"] = 'true'
            return response

        if user.username == blocked_user.username:
            response = Response({
                "detail": "User cannot block himself"
            }, status=status.HTTP_400_BAD_REQUEST)
            response["Access-Control-Allow-Credentials"] = 'true'
            return response

        # check if the user is already blocked
        if Block.objects.filter(blocker=user, blocked=blocked_user).exists():
            response = Response({
                "detail": "User already blocked"
            }, status=status.HTTP_400_BAD_REQUEST)
            response["Access-Control-Allow-Credentials"] = 'true'
            return response

        # create block itself
        Block.objects.create(blocker=user, blocked=blocked_user)
        response = Response({
            "detail": "User blocked"
        }, status=status.HTTP_200_OK)
        response["Access-Control-Allow-Credentials"] = 'true'
        return response

# user unblock another user
class UnblockUser(APIView):

	def post(self, request):
		user = request.user

		# TODO: FRONTEND needs to send the username of the user to be unblocked
		blocked_username = request.data.get('blocked_username')
		try:
			blocked_user = AppUser.objects.get(username=blocked_username)
		except ObjectDoesNotExist:
			response = Response({
				"detail": "User not found"
			}, status=status.HTTP_404_NOT_FOUND)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
        
		# check if the block exists
		if not Block.objects.filter(blocker=user, blocked=blocked_user).exists():
			response = Response({
				"detail": "User not blocked"
			}, status=status.HTTP_400_BAD_REQUEST)
			response["Access-Control-Allow-Credentials"] = 'true'
			return response
        
		# delete block itself
		Block.objects.filter(blocker=user, blocked=blocked_user).delete()
		response = Response({
			"detail": "User unblocked"
		}, status=status.HTTP_200_OK)
		response["Access-Control-Allow-Credentials"] = 'true'
		return response