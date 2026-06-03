from rest_framework import serializers

from apps.donations.models import Donation
from apps.users.serializers import UserSerializer


class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)

    verified_by = UserSerializer(
        read_only=True
    )

    class Meta:
        model = Donation

        fields = [
            "id",
            "donor",
            "blood_request",
            "donation_date",
            "location",
            "hospital",
            "units_donated",
            "status",
            "notes",
            "is_verified",
            "verified_by",
            "verified_at",
            "proof_image",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "donor",
            "is_verified",
            "verified_by",
            "verified_at",
            "created_at",
            "updated_at",
        ]


class DonationCreateSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Donation

        fields = [
            "blood_request",
            "donation_date",
            "location",
            "hospital",
            "units_donated",
            "notes",
            "proof_image",
        ]

    def validate_units_donated(
        self,
        value
    ):
        if value <= 0:
            raise serializers.ValidationError(
                "Units donated must be greater than 0."
            )

        return value

    def create(
        self,
        validated_data
    ):
        validated_data["donor"] = (
            self.context["request"].user
        )

        validated_data["status"] = (
            "scheduled"
        )

        return Donation.objects.create(
            **validated_data
        )


class DonationUpdateSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Donation

        fields = [
            "donation_date",
            "location",
            "hospital",
            "units_donated",
            "status",
            "notes",
            "proof_image",
        ]

    def validate_units_donated(
        self,
        value
    ):
        if value <= 0:
            raise serializers.ValidationError(
                "Units donated must be greater than 0."
            )

        return value