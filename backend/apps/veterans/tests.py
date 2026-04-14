from django.test import TestCase
from apps.veterans.models import VeteranProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class VeteranProfileTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='veteran@example.com',
            password='pass123'
        )
        self.veteran = VeteranProfile.objects.create(
            user=self.user,
            service_number='SN123456',
            rank='Captain',
            regiment='Infantry Regiment',
            date_of_joining='2010-01-15',
            date_of_retirement='2020-01-15',
            home_state='Delhi',
            phone='9876543210',
            address='123 Veteran Street',
            disability_percentage=20
        )

    def test_veteran_creation(self):
        """Test veteran profile creation"""
        self.assertEqual(self.veteran.user, self.user)
        self.assertEqual(self.veteran.service_number, 'SN123456')
        self.assertEqual(self.veteran.rank, 'Captain')

    def test_veteran_user_relationship(self):
        """Test veteran-user relationship"""
        self.assertEqual(self.veteran.user.email, 'veteran@example.com')
