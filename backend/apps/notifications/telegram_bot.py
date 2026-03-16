import requests
from django.conf import settings


TELEGRAM_URL = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"


def send_telegram_notification(chat_id: str, message: str) -> bool:
    try:
        response = requests.post(
            TELEGRAM_URL,
            json={
                'chat_id':    chat_id,
                'text':       message,
                'parse_mode': 'HTML',
            },
            timeout=10
        )
        return response.status_code == 200
    except Exception as e:
        print(f'Telegram error: {e}')
        return False


def notify_veteran(user, title: str, message: str):
    """Send notification to veteran via Telegram and save to DB"""
    from .models import Notification

    # Save to database
    Notification.objects.create(
        user       = user,
        title      = title,
        message    = message,
        notif_type = 'general',
    )

    # Send Telegram if chat_id exists
    if hasattr(user, 'telegram_chat_id') and user.telegram_chat_id:
        text = f"🇮🇳 <b>VeerSeva Notification</b>\n\n<b>{title}</b>\n\n{message}"
        send_telegram_notification(user.telegram_chat_id, text)


def send_test_notification(chat_id: str) -> bool:
    message = (
        "🇮🇳 <b>VeerSeva Bot Connected!</b>\n\n"
        "You will receive notifications for:\n"
        "✅ Application status updates\n"
        "📋 Grievance responses\n"
        "🔔 Document verification\n\n"
        "<i>Jai Hind!</i>"
    )
    return send_telegram_notification(chat_id, message)