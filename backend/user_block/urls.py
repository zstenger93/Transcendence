from django.urls import path
from . import views

urlpatterns = [
	# can delete, just for testing
    path('user_data/', views.UserData.as_view(), name='user_data'),
	# can delete, just for testing
	path('users_data/', views.UsersData.as_view(), name='users_data'),
	path('block/', views.BlockUser.as_view(), name='block_user'),
	path('unblock/', views.UnblockUser.as_view(), name='unblock_user'),
	# can delete, just for testing
	path('all_blocks/', views.AllBlocks.as_view(), name='all_blocks'),
	path('user_blocks/', views.UserBlocks.as_view(), name='all_blocks'),

]