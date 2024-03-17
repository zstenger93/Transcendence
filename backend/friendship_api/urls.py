from django.urls import path
from . import views

urlpatterns = [ 
	# path to friend/add/<str:username>
	path('friend/add/<str:username>/', views.add_friend, name='add_friend'),
	path('friends/', views.get_friends_list, name='get_friends_list'),
	path('friend/block/<str:username>/', views.block_user, name='block_user'),
	path('friend/unblock/<str:username>/', views.unblock_user, name='unblock_user'),
	path('friend/blocks/', views.get_block_list, name='get_block_list'),
	
]