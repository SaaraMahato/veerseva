from django.test import TestCase
from apps.notifications.models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()

class NotificationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='notif@example.com',
            password='pass123'
        )
        self.notification = Notification.objects.create(
            user=self.user,
            message="Test notification"
        )

    def test_notification_creation(self):
        """Test notification creation"""
        self.assertEqual(self.notification.user, self.user)
        self.assertEqual(self.notification.message, "Test notification")

    def test_notification_retrieval(self):
        """Test notification retrieval"""
        notifs = Notification.objects.filter(user=self.user)
        self.assertEqual(notifs.count(), 1)
        self.assertEqual(notifs.first(), self.notification)
