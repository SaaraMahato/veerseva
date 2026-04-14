from django.test import TestCase
from apps.documents.models import Document
from apps.veterans.models import VeteranProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class DocumentModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='doc@example.com',
            password='pass123'
        )
        self.veteran = VeteranProfile.objects.create(
            user=self.user,
            service_number='SN789012',
            rank='Major',
            regiment='Artillery Regiment',
            date_of_joining='2008-06-01',
            date_of_retirement='2018-06-01',
            home_state='Mumbai',
            phone='9123456789',
            address='456 Doc Street',
            disability_percentage=15
        )
        self.document = Document.objects.create(
            veteran=self.user,
            doc_type='DISCHARGE_CERTIFICATE',
            file='documents/test.pdf',
            file_name='discharge.pdf'
        )

    def test_document_creation(self):
        """Test document creation"""
        self.assertEqual(self.document.veteran, self.user)
        self.assertEqual(self.document.doc_type, 'DISCHARGE_CERTIFICATE')
        self.assertEqual(self.document.file_name, 'discharge.pdf')

    def test_document_veteran_relationship(self):
        """Test document-veteran relationship"""
        user_docs = Document.objects.filter(veteran=self.user)
        self.assertEqual(user_docs.count(), 1)
        self.assertEqual(user_docs.first(), self.document)
