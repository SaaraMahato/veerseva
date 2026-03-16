from django.db import models
from apps.accounts.models import User


class Document(models.Model):

    DOC_TYPE_CHOICES = [
        ('discharge_certificate', 'Discharge Certificate'),
        ('service_record',        'Service Record'),
        ('medical_certificate',   'Medical Certificate'),
        ('id_proof',              'ID Proof'),
        ('address_proof',         'Address Proof'),
        ('bank_details',          'Bank Details'),
        ('pension_ppo',           'Pension PPO'),
        ('photo',                 'Photograph'),
    ]

    veteran          = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    doc_type         = models.CharField(max_length=50, choices=DOC_TYPE_CHOICES)
    file             = models.FileField(upload_to='documents/%Y/%m/')
    file_name        = models.CharField(max_length=200)
    ipfs_hash        = models.CharField(max_length=200, blank=True)
    blockchain_tx_hash = models.CharField(max_length=200, blank=True)
    is_verified      = models.BooleanField(default=False)
    uploaded_at      = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'documents'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f'{self.veteran.full_name} — {self.doc_type}'