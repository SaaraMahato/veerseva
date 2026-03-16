from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from rest_framework             import status
import re

# Knowledge base for veteran benefits
KB = {
    'disability pension': """**Disability Pension** is available to veterans with service-related disability.
- Eligibility: Minimum 10% disability attributable to military service
- Required Documents: Discharge Certificate, Medical Board Report, Service Record, ID Proof
- SLA: 30 days processing time
- Apply through VeerSeva portal under Benefits section.""",

    'echs': """**ECHS Medical Card** provides free medical treatment at ECHS polyclinics and empanelled hospitals.
- Eligibility: All retired Armed Forces personnel and dependents
- Required Documents: Discharge Certificate, Service Record, ID Proof, PPO
- SLA: 21 days processing time
- Nearest ECHS polyclinic can be located via the Sainik Welfare Office.""",

    'education': """**Education Scholarship** supports children of veterans for higher education.
- Eligibility: Children of veterans pursuing graduation/post-graduation
- Required Documents: Discharge Certificate, Marksheets, Bonafide Certificate, Bank Details
- SLA: 45 days processing time
- Scholarship amount varies based on course and institution.""",

    'housing': """**Housing Loan Subsidy** provides subsidized housing loans for veterans.
- Eligibility: Veterans who have not availed government housing
- Required Documents: Discharge Certificate, Service Record, Bank Details, Property Documents
- SLA: 60 days processing time
- Subsidy up to 2.5% on home loan interest rates.""",

    'resettlement': """**Resettlement Training** provides skill development and job assistance for veterans.
- Eligibility: All retired Armed Forces personnel within 2 years of retirement
- Required Documents: Discharge Certificate, Service Record, Educational Certificates
- SLA: 15 days processing time
- Courses available in IT, management, security, and technical fields.""",

    'apply': """To **apply for a benefit scheme**:
1. Go to Benefits section in the sidebar
2. Browse available schemes
3. Click "Apply Now" on your chosen scheme
4. Fill in the 3-step application form
5. Submit and track status on your Dashboard""",

    'documents': """To **upload documents**:
1. Go to Documents section in the sidebar
2. Click "Upload Document"
3. Select document type and file (PDF/JPG/PNG, max 5MB)
4. Documents are stored securely and verified on blockchain""",

    'grievance': """To **file a grievance**:
1. Go to Grievances section in the sidebar
2. Click "File Grievance"
3. Select category and describe your issue
4. Submit — you will receive a response within 7 working days
5. Track status in the Grievances section""",

    'status': """To **track application status**:
1. Go to Dashboard — recent applications are shown
2. Status can be: Submitted → Under Review → Approved/Rejected
3. You will receive notifications for any status updates
4. Check Notifications (bell icon) for real-time updates""",

    'contact': """For further assistance:
- **Toll Free**: 1800-XXX-XXXX (9 AM to 5 PM, Mon-Sat)
- **Email**: support@veerseva.gov.in
- **Nearest Sainik Welfare Office**: Contact your district office
- **Kendriya Sainik Board**: New Delhi - 011-XXXXXXXX""",

    'profile': """To **complete your profile**:
1. Go to My Profile in the sidebar
2. Fill in your Service Number, Rank, Regiment
3. Add Date of Joining and Retirement
4. Save — this helps process your applications faster""",
}

def get_response(message: str) -> str:
    msg = message.lower()

    # Greeting
    if any(w in msg for w in ['hello', 'hi', 'namaste', 'jai hind', 'good morning', 'good evening']):
        return "Jai Hind! 🇮🇳 I am VeerSeva Assistant. I am here to help you with veteran benefits, schemes, documents and grievances. How may I assist you today, Sir/Ma'am?"

    # Disability pension
    if any(w in msg for w in ['disability', 'disabled', 'pension', 'disability pension']):
        return KB['disability pension']

    # ECHS / Medical
    if any(w in msg for w in ['echs', 'medical', 'hospital', 'health', 'treatment', 'polyclinic']):
        return KB['echs']

    # Education
    if any(w in msg for w in ['education', 'scholarship', 'study', 'children', 'school', 'college']):
        return KB['education']

    # Housing
    if any(w in msg for w in ['housing', 'house', 'home', 'loan', 'property']):
        return KB['housing']

    # Resettlement
    if any(w in msg for w in ['resettlement', 'job', 'employment', 'training', 'skill', 'career']):
        return KB['resettlement']

    # Apply
    if any(w in msg for w in ['apply', 'application', 'how to apply', 'submit']):
        return KB['apply']

    # Documents
    if any(w in msg for w in ['document', 'upload', 'certificate', 'discharge', 'ipfs', 'blockchain']):
        return KB['documents']

    # Grievance
    if any(w in msg for w in ['grievance', 'complaint', 'issue', 'problem', 'file']):
        return KB['grievance']

    # Status
    if any(w in msg for w in ['status', 'track', 'pending', 'approved', 'rejected', 'review']):
        return KB['status']

    # Contact
    if any(w in msg for w in ['contact', 'phone', 'email', 'helpline', 'toll', 'office']):
        return KB['contact']

    # Profile
    if any(w in msg for w in ['profile', 'service number', 'rank', 'regiment']):
        return KB['profile']

    # Benefits list
    if any(w in msg for w in ['benefit', 'scheme', 'available', 'list', 'what']):
        return """Available benefit schemes on VeerSeva:
1. 🏥 **Disability Pension** — For service-related disability
2. 💊 **ECHS Medical Card** — Free medical treatment
3. 🎓 **Education Scholarship** — For children's higher education
4. 🏠 **Housing Loan Subsidy** — Subsidized home loans
5. 💼 **Resettlement Training** — Skill development & jobs

Type the name of any scheme for more details, Sir/Ma'am."""

    # Default
    return """I am sorry, I could not find specific information for your query. Here is what I can help you with:

- **Benefits & Schemes** — Type "benefits" or scheme name
- **How to Apply** — Type "apply"
- **Documents** — Type "documents"
- **Grievances** — Type "grievance"
- **Track Status** — Type "status"
- **Contact Info** — Type "contact"

For urgent assistance, please contact your nearest Sainik Welfare Office. Jai Hind! 🇮🇳"""


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat(request):
    message = request.data.get('message', '').strip()
    if not message:
        return Response(
            {'error': 'Message is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    reply = get_response(message)
    return Response({'reply': reply})