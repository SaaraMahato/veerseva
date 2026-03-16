from django.db import models
from apps.accounts.models import User


class Grievance(models.Model):

    STATUS_CHOICES = [
        ('open',        'Open'),
        ('in_progress', 'In Progress'),
        ('resolved',    'Resolved'),
        ('closed',      'Closed'),
    ]

    CATEGORY_CHOICES = [
        ('pension',     'Pension'),
        ('medical',     'Medical'),
        ('documents',   'Documents'),
        ('application', 'Application'),
        ('other',       'Other'),
    ]

    veteran     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grievances')
    title       = models.CharField(max_length=200)
    category    = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.TextField()
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    filed_at    = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'grievances'
        ordering = ['-filed_at']

    def __str__(self):
        return f'{self.veteran.full_name} — {self.title}'


class GrievanceUpdate(models.Model):
    grievance  = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='updates')
    message    = models.TextField()
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'grievance_updates'
        ordering = ['updated_at']