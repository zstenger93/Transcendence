from django.urls import path
from . import views

urlpatterns = [
    path('chat/<int:room_id>/', views.room, name='room'),
]