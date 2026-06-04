from django.db import models
from apps.users.models import User
from apps.blood_requests.models import BloodRequest
import uuid


class Donation(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("completed", "Completed"),
        ("rejected", "Rejected"),
        ("cancelled", "Cancelled"),
    )

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    donor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="donations",
    )

    blood_request = models.ForeignKey(
        BloodRequest,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="donations",
    )

    donation_date = models.DateTimeField(
        null=True,
        blank=True
    )

    location = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    hospital = models.CharField(
        max_length=255,
        blank=True,
    )

    units_donated = models.PositiveIntegerField(
        default=1
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    notes = models.TextField(
        blank=True,
        null=True,
    )

    is_verified = models.BooleanField(
        default=False
    )

    verified_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verified_donations",
    )

    verified_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    approved_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Date when donation was approved by blood request requester"
    )

    proof_image = models.ImageField(
        upload_to="donation_proofs/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-donation_date"]

        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["donation_date"]),
            models.Index(fields=["donor"]),
            models.Index(fields=["is_verified"]),
            models.Index(fields=["blood_request"]),
        ]

    def __str__(self):
        return (
            f"{self.donor.get_full_name()} "
            f"- {self.donation_date.date()}"
        )