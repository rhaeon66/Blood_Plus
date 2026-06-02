from rest_framework import serializers
from apps.donations.models import Donation
from apps.users.serializers import UserSerializer


class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)

    class Meta:
        model = Donation
        fields = [
            'id', 'donor', 'blood_request', 'donation_date', 'location',
            'hospital', 'units_donated', 'status', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'donor', 'created_at', 'updated_at']


class DonationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'blood_request', 'donation_date', 'location', 'hospital',
            'units_donated', 'status', 'notes'
        ]

    def create(self, validated_data):
        validated_data['donor'] = self.context['request'].user
        return super().create(validated_data)
