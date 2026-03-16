from apps.accounts.models import User
from apps.benefits.models import BenefitScheme

if not User.objects.filter(email='admin@veerseva.com').exists():
    User.objects.create_superuser(email='admin@veerseva.com', password='admin1234', full_name='Admin', role='ministry')

if not User.objects.filter(email='veteran@veerseva.com').exists():
    u = User.objects.create_user(email='veteran@veerseva.com', password='veteran123', full_name='Subedar Ram Kumar', role='veteran')
    u.is_verified = True
    u.telegram_chat_id = '6451897457'
    u.save()

if not User.objects.filter(email='officer@veerseva.com').exists():
    u = User.objects.create_user(email='officer@veerseva.com', password='officer123', full_name='Captain Raj Singh', role='officer')
    u.is_verified = True
    u.save()

if not BenefitScheme.objects.exists():
    BenefitScheme.objects.create(name='Disability Pension', category='pension', description='Monthly pension for veterans with service-related disability.', required_documents=['discharge_certificate','medical_certificate','id_proof'], sla_days=30)
    BenefitScheme.objects.create(name='ECHS Medical Card', category='medical', description='Free medical treatment at ECHS polyclinics and empanelled hospitals.', required_documents=['discharge_certificate','service_record','id_proof'], sla_days=21)
    BenefitScheme.objects.create(name='Education Scholarship', category='education', description='Scholarship for children of veterans for higher education.', required_documents=['discharge_certificate','service_record','id_proof'], sla_days=45)
    BenefitScheme.objects.create(name='Housing Loan Subsidy', category='housing', description='Subsidized housing loan for veterans to build or buy a home.', required_documents=['discharge_certificate','service_record','bank_details'], sla_days=60)
    BenefitScheme.objects.create(name='Resettlement Training', category='resettlement', description='Free skill training and job placement assistance for veterans.', required_documents=['discharge_certificate','id_proof'], sla_days=15)

print('Done!')
