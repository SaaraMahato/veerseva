from django.db import models
from apps.accounts.models import User


class VeteranProfile(models.Model):

    RANK_CHOICES = [
        ('sepoy',       'Sepoy'),
        ('naik',        'Naik'),
        ('havildar',    'Havildar'),
        ('subedar',     'Subedar'),
        ('subedar_major', 'Subedar Major'),
        ('lieutenant',  'Lieutenant'),
        ('captain',     'Captain'),
        ('major',       'Major'),
        ('lt_colonel',  'Lt. Colonel'),
        ('colonel',     'Colonel'),
        ('brigadier',   'Brigadier'),
        ('major_general', 'Major General'),
        ('lt_general',  'Lt. General'),
        ('general',     'General'),
    ]

    user            = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    service_number  = models.CharField(max_length=20, unique=True)
    rank            = models.CharField(max_length=30, choices=RANK_CHOICES)
    regiment        = models.CharField(max_length=200, blank=True)
    date_of_joining = models.DateField(null=True, blank=True)
    date_of_retirement = models.DateField(null=True, blank=True)
    home_state      = models.CharField(max_length=100, blank=True)
    phone           = models.CharField(max_length=15, blank=True)
    address         = models.TextField(blank=True)
    disability_percentage = models.IntegerField(default=0)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'veteran_profiles'

    def __str__(self):
        return f'{self.rank} {self.user.full_name} ({self.service_number})'