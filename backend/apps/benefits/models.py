from django.db import models
from apps.accounts.models import User


class BenefitScheme(models.Model):

    CATEGORY_CHOICES = [
        ('pension',       'Pension'),
        ('medical',       'Medical'),
        ('education',     'Education'),
        ('housing',       'Housing'),
        ('resettlement',  'Resettlement'),
    ]

    name                = models.CharField(max_length=200)
    category            = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description         = models.TextField()
    eligibility_criteria = models.TextField()
    required_documents  = models.JSONField(default=list)
    sla_days            = models.IntegerField(default=30)
    is_active           = models.BooleanField(default=True)
    created_at          = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'benefit_schemes'

    def __str__(self):
        return self.name


class Application(models.Model):

    STATUS_CHOICES = [
        ('draft',        'Draft'),
        ('submitted',    'Submitted'),
        ('under_review', 'Under Review'),
        ('approved',     'Approved'),
        ('rejected',     'Rejected'),
        ('escalated',    'Escalated'),
    ]

    veteran         = models.ForeignKey(User,          on_delete=models.CASCADE, related_name='applications')
    scheme          = models.ForeignKey(BenefitScheme, on_delete=models.CASCADE, related_name='applications')
    status          = models.CharField(max_length=20,  choices=STATUS_CHOICES, default='submitted')
    reason          = models.TextField()
    remarks         = models.TextField(blank=True)
    officer_remarks = models.TextField(blank=True)
    submitted_at    = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    sla_deadline    = models.DateTimeField(null=True, blank=True)
    blockchain_tx_hash = models.CharField(max_length=200, blank=True)

    class Meta:
        db_table = 'applications'
        ordering = ['-submitted_at']

    def __str__(self):
        return f'{self.veteran.full_name} — {self.scheme.name} ({self.status})'


class StatusHistory(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='history')
    status      = models.CharField(max_length=20)
    remarks     = models.TextField(blank=True)
    changed_by  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    changed_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'status_history'
        ordering = ['changed_at']