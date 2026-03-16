from rest_framework             import status
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from .models                    import Grievance, GrievanceUpdate
from .serializers               import GrievanceSerializer, GrievanceCreateSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def grievances(request):
    if request.method == 'GET':
        if request.user.role in ['officer', 'ministry']:
            g = Grievance.objects.all().order_by('-filed_at')
        else:
            g = Grievance.objects.filter(
                veteran=request.user
            ).order_by('-filed_at')
        return Response(GrievanceSerializer(g, many=True).data)

    # POST — file new grievance
    serializer = GrievanceCreateSerializer(data=request.data)
    if serializer.is_valid():
        grievance = serializer.save(veteran=request.user)
        GrievanceUpdate.objects.create(
            grievance  = grievance,
            message    = 'Grievance filed successfully.',
            updated_by = request.user,
        )
        return Response(
            GrievanceSerializer(grievance).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def grievance_detail(request, pk):
    try:
        if request.user.role in ['officer', 'ministry']:
            g = Grievance.objects.get(pk=pk)
        else:
            g = Grievance.objects.get(pk=pk, veteran=request.user)
    except Grievance.DoesNotExist:
        return Response(
            {'error': 'Grievance not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        return Response(GrievanceSerializer(g).data)

    # PATCH — officer update
    if request.user.role not in ['officer', 'ministry']:
        return Response(
            {'error': 'Permission denied'},
            status=status.HTTP_403_FORBIDDEN
        )

    new_status     = request.data.get('status')
    message        = request.data.get('message', '')
    update_message = message or f'Status updated to {new_status}'

    if new_status:
        g.status = new_status
        g.save()

    GrievanceUpdate.objects.create(
        grievance  = g,
        message    = update_message,
        updated_by = request.user,
    )

    # Send Telegram notification to veteran
    try:
        from apps.notifications.telegram_bot import notify_veteran
        from django.conf import settings
        veteran = g.veteran
        if veteran.telegram_chat_id:
            from apps.notifications.telegram_bot import send_telegram_notification
            text = (
                f"🇮🇳 <b>VeerSeva — Grievance Update</b>\n\n"
                f"<b>{g.title}</b>\n\n"
                f"Status: <b>{new_status.replace('_', ' ').title()}</b>\n"
                f"Response: {update_message}\n\n"
                f"<i>Jai Hind!</i>"
            )
            send_telegram_notification(veteran.telegram_chat_id, text)
        # Always save to DB notifications
        from apps.notifications.models import Notification
        Notification.objects.create(
            user       = veteran,
            title      = f'Grievance Update — {g.title}',
            message    = update_message,
            notif_type = 'grievance_update',
        )
    except Exception as e:
        print(f'Notification error: {e}')

    return Response(GrievanceSerializer(g).data)