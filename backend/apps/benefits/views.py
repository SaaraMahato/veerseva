from rest_framework             import status
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from django.utils               import timezone
from datetime                   import timedelta

from .models       import BenefitScheme, Application, StatusHistory
from .serializers  import (
    BenefitSchemeSerializer,
    ApplicationSerializer,
    ApplicationCreateSerializer,
    ApplicationUpdateSerializer,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_schemes(request):
    schemes = BenefitScheme.objects.filter(is_active=True)
    return Response(BenefitSchemeSerializer(schemes, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scheme(request, pk):
    try:
        scheme = BenefitScheme.objects.get(pk=pk, is_active=True)
        return Response(BenefitSchemeSerializer(scheme).data)
    except BenefitScheme.DoesNotExist:
        return Response(
            {'error': 'Scheme not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def applications(request):
    if request.method == 'GET':
        if request.user.role in ['officer', 'ministry']:
            apps = Application.objects.all()
        else:
            apps = Application.objects.filter(veteran=request.user)
        return Response(ApplicationSerializer(apps, many=True).data)

    # POST — create new application
    serializer = ApplicationCreateSerializer(data=request.data)
    if serializer.is_valid():
        scheme = serializer.validated_data['scheme']
        sla_deadline = timezone.now() + timedelta(days=scheme.sla_days)
        app = serializer.save(
            veteran      = request.user,
            sla_deadline = sla_deadline,
        )
        # Record status history
        StatusHistory.objects.create(
            application = app,
            status      = 'submitted',
            remarks     = 'Application submitted by veteran',
            changed_by  = request.user,
        )
        return Response(
            ApplicationSerializer(app).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def application_detail(request, pk):
    try:
        if request.user.role in ['officer', 'ministry']:
            app = Application.objects.get(pk=pk)
        else:
            app = Application.objects.get(pk=pk, veteran=request.user)
    except Application.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        return Response(ApplicationSerializer(app).data)

    # PATCH — officer updates status
    if request.user.role not in ['officer', 'ministry']:
        return Response(
            {'error': 'Permission denied'},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = ApplicationUpdateSerializer(app, data=request.data, partial=True)
    if serializer.is_valid():
        old_status = app.status
        app = serializer.save()
        if app.status != old_status:
            StatusHistory.objects.create(
                application = app,
                status      = app.status,
                remarks     = app.officer_remarks,
                changed_by  = request.user,
            )
        return Response(ApplicationSerializer(app).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_application(request, pk):
    try:
        application = Application.objects.get(pk=pk)
    except Application.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    action  = request.data.get('action')
    remarks = request.data.get('remarks', '')

    if action not in ['approve', 'reject']:
        return Response(
            {'error': 'Invalid action'},
            status=status.HTTP_400_BAD_REQUEST
        )

    new_status = 'approved' if action == 'approve' else 'rejected'
    application.status = new_status
    application.save()

    StatusHistory.objects.create(
        application = application,
        status      = new_status,
        remarks     = remarks,
        changed_by  = request.user,
    )

    # Send Telegram notification to veteran
    try:
        veteran = application.veteran
        emoji   = '✅' if new_status == 'approved' else '❌'
        if veteran.telegram_chat_id:
            from apps.notifications.telegram_bot import send_telegram_notification
            text = (
                f"🇮🇳 <b>VeerSeva — Application Update</b>\n\n"
                f"{emoji} Your application for "
                f"<b>{application.scheme.name}</b> has been "
                f"<b>{new_status.upper()}</b>.\n\n"
                f"Remarks: {remarks}\n\n"
                f"<i>Jai Hind!</i>"
            )
            send_telegram_notification(veteran.telegram_chat_id, text)
        # Save to DB notifications
        from apps.notifications.models import Notification
        Notification.objects.create(
            user       = veteran,
            title      = f'Application {new_status.capitalize()}',
            message    = f'Your application for {application.scheme.name} has been {new_status}. {remarks}',
            notif_type = 'application_update',
        )
    except Exception as e:
        print(f'Notification error: {e}')

    return Response({'message': f'Application {new_status} successfully.'})