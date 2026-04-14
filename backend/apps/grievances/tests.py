from django.test import TestCase
from apps.grievances.models import Grievance, GrievanceUpdate
from apps.veterans.models import VeteranProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class GrievanceModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='grievance@example.com',
            password='pass123'
        )
        self.veteran = VeteranProfile.objects.create(
            user=self.user,
            service_number='SN345678',
            rank='Lieutenant',
            regiment='Air Force',
            date_of_joining='2012-03-20',
            date_of_retirement='2022-03-20',
            home_state='Bangalore',
            phone='9988776655',
            address='789 Grievance Ave',
            disability_percentage=25
        )
        self.grievance = Grievance.objects.create(
            veteran=self.user,
            title='Pension Issue',
            category='PENSION',
            description='Issue with pension payment',
            status='FILED'
        )

    def test_submission_process(self):
        """Test grievance submission"""
        self.assertEqual(self.grievance.veteran, self.user)
        self.assertEqual(self.grievance.title, 'Pension Issue')
        self.assertEqual(self.grievance.status, 'FILED')

    def test_resolution_process(self):
        """Test grievance update/resolution"""
        self.grievance.status = 'RESOLVED'
        self.grievance.save()
        updated = Grievance.objects.get(id=self.grievance.id)
        self.assertEqual(updated.status, 'RESOLVED')

    def test_grievance_update(self):
        """Test grievance update creation"""
        update = GrievanceUpdate.objects.create(
            grievance=self.grievance,
            message='Grievance under review',
            updated_by=self.user
        )
        self.assertEqual(update.grievance, self.grievance)
        self.assertEqual(update.message, 'Grievance under review')
