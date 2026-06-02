from django.db import models
from apps.users.models import User
from apps.blood_requests.models import BloodRequest
import uuid

class Donation(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    blood_request = models.ForeignKey(
        BloodRequest,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='donations'
    )
    donation_date = models.DateTimeField()
    location = models.CharField(max_length=200)
    hospital = models.CharField(max_length=200)
    units_donated = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['donation_date']),
        ]

    def __str__(self):
        return f"Donation by {self.donor.get_full_name()} - {self.status}"
