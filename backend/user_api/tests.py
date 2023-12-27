# tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import FriendRequest

class FriendRequestTestCase(TestCase):
    def setUp(self):
        self.user1 = get_user_model().objects.create_user(email='testmain1@gmail.com', password='password')
        self.user2 = get_user_model().objects.create_user(email='testmain2@gmail.com', password='password')

    def test_send_friend_request(self):
        FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)
        self.assertEqual(FriendRequest.objects.count(), 1)
        self.assertEqual(FriendRequest.objects.first().from_user, self.user1)
        self.assertEqual(FriendRequest.objects.first().to_user, self.user2)

    def test_send_friend_request_to_self(self):
        with self.assertRaises(Exception):
            FriendRequest.objects.create(from_user=self.user1, to_user=self.user1)

    def test_send_multiple_friend_requests(self):
        FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)
        with self.assertRaises(Exception):
            FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)

    def test_send_friend_request_after_receiving_one(self):
        FriendRequest.objects.create(from_user=self.user2, to_user=self.user1)
        with self.assertRaises(Exception):
            FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)