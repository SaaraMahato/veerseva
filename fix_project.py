import os
import re
from pathlib import Path

# Get the backend directory
BACKEND_DIR = Path(__file__).parent / 'backend'
APPS_DIR = BACKEND_DIR / 'apps'

def fix_documents_tests_correct():
    """Fix documents tests - veteran field is actually a User"""
    test_file = APPS_DIR / 'documents' / 'tests.py'
    
    content = '''from django.test import TestCase
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
'''
    
    test_file.write_text(content, encoding='utf-8')
    print(f"✅ Fixed {test_file.name}")

def fix_grievances_tests_correct():
    """Fix grievances tests - veteran field is actually a User"""
    test_file = APPS_DIR / 'grievances' / 'tests.py'
    
    content = '''from django.test import TestCase
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
'''
    
    test_file.write_text(content, encoding='utf-8')
    print(f"✅ Fixed {test_file.name}")

def main():
    """Run all fixes"""
    print("\n" + "="*70)
    print("🔧 VeerSeva Project Auto-Fixer - Final Correction")
    print("="*70 + "\n")
    
    try:
        print("1️⃣  Fixing documents tests (veteran=user)...")
        fix_documents_tests_correct()
        
        print("\n2️⃣  Fixing grievances tests (veteran=user)...")
        fix_grievances_tests_correct()
        
        print("\n" + "="*70)
        print("✅ All corrections completed successfully!")
        print("="*70)
        print("\n📝 Next steps:")
        print("   1. cd backend")
        print("   2. python manage.py test --verbosity=2")
        print("\n")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

if __name__ == '__main__':
    main()