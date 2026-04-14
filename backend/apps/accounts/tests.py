from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
        self.email = 'testuser@example.com'
        self.password = 'testpass123'
        self.user = User.objects.create_user(
            email=self.email,
            password=self.password
        )

    def test_user_creation(self):
        """Test user creation"""
        self.assertEqual(self.user.email, self.email)
        self.assertTrue(self.user.check_password(self.password))

    def test_user_email(self):
        """Test user email"""
        self.assertEqual(self.user.email, 'testuser@example.com')

class UserAuthenticationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='auth@example.com',
            password='securepass123'
        )

    def test_user_authentication(self):
        """Test user can authenticate"""
        self.assertTrue(
            self.user.check_password('securepass123')
        )
        self.assertFalse(
            self.user.check_password('wrongpassword')
        )
