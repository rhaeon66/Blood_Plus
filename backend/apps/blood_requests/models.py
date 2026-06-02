from django.db import models
from apps.users.models import User, BLOOD_GROUP_CHOICES
import uuid

class BloodRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('fulfilled', 'Fulfilled'),
        ('cancelled', 'Cancelled'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blood_requests')
    patient_name = models.CharField(max_length=200)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    units_needed = models.IntegerField(default=1)
    hospital_name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    division = models.CharField(max_length=50)
    district = models.CharField(max_length=100)
    upazila = models.CharField(max_length=100)
    address = models.TextField()
    description = models.TextField(blank=True, null=True)
    is_fulfilled = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['blood_group']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"Blood Request: {self.patient_name} ({self.blood_group})"
