from django.db import models
from apps.accounts.models import User


class Notification(models.Model):

    TYPE_CHOICES = [
        ('application_update', 'Application Update'),
        ('grievance_update',   'Grievance Update'),
        ('document_verified',  'Document Verified'),
        ('general',            'General'),
    ]

    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title      = models.CharField(max_length=200)
    message    = models.TextField()
    notif_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='general')
    is_read    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.full_name} — {self.title}'