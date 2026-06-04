from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
import uuid


BLOOD_GROUP_CHOICES = (
    ("O+", "O+"),
    ("O-", "O-"),
    ("A+", "A+"),
    ("A-", "A-"),
    ("B+", "B+"),
    ("B-", "B-"),
    ("AB+", "AB+"),
    ("AB-", "AB-"),
)


class User(AbstractUser):
    username = None
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )


    phone_number = models.CharField(
        max_length=15,
        unique=True,
        validators=[
            RegexValidator(
    regex=r"^(\+8801|8801|01)[3-9]\d{8}$",
    message="Enter a valid Bangladeshi phone number.",
)
        ],
    )

    nid = models.CharField(
        max_length=20,
        unique=True,
        help_text="National ID Number",
    )

    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES,
        default="O+",
        db_index=True,
    )

    division = models.CharField(
        max_length=50,
        db_index=True,
    )

    district = models.CharField(
        max_length=100,
        db_index=True,
    )

    upazila = models.CharField(
        max_length=100,
        db_index=True,
    )

    address = models.TextField()

    is_verified = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    USERNAME_FIELD = "phone_number"

    REQUIRED_FIELDS = [
        "nid",
        "first_name",
        "last_name",
    ]
    objects = CustomUserManager()

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["blood_group"]),
            models.Index(fields=["division"]),
            models.Index(fields=["district"]),
            models.Index(fields=["upazila"]),
            models.Index(fields=["blood_group", "district"]),
            models.Index(fields=["blood_group", "upazila"]),
        ]

    def __str__(self):
        full_name = self.get_full_name().strip()

        if full_name:
            return f"{full_name} ({self.phone_number})"

        return self.phone_number

    @property
    def location(self):
        return f"{self.upazila}, {self.district}, {self.division}"