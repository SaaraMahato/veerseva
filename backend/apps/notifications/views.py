from rest_framework             import status
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from .models                    import Notification
from .serializers               import NotificationSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_notifications(request):
    notifications = Notification.objects.filter(
        user=request.user
    ).order_by('-created_at')[:50]
    serializer = NotificationSerializer(notifications, many=True)
    return Response({
        'results':      serializer.data,
        'unread_count': Notification.objects.filter(
            user=request.user, is_read=False
        ).count()
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_read(request, pk):
    try:
        notif = Notification.objects.get(pk=pk, user=request.user)
        notif.is_read = True
        notif.save()
        return Response({'message': 'Marked as read'})
    except Notification.DoesNotExist:
        return Response(
            {'error': 'Notification not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_all_read(request):
    Notification.objects.filter(
        user=request.user, is_read=False
    ).update(is_read=True)
    return Response({'message': 'All marked as read'})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def test_telegram(request):
    from .telegram_bot import send_telegram_notification
    from django.conf import settings
    
    chat_id = settings.TELEGRAM_CHAT_ID
    if not chat_id:
        return Response(
            {'error': 'Telegram not configured'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    message = (
        "🇮🇳 <b>VeerSeva Bot Connected!</b>\n\n"
        "You will receive notifications for:\n"
        "✅ Application status updates\n"
        "📋 Grievance responses\n"
        "🔔 Document verification\n\n"
        "<i>Jai Hind!</i>"
    )
    success = send_telegram_notification(chat_id, message)
    if success:
        return Response({'message': 'Telegram notification sent!'})
    return Response(
        {'error': 'Failed to send Telegram notification'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )