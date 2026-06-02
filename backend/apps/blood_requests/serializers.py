from rest_framework import serializers
from apps.blood_requests.models import BloodRequest
from apps.users.serializers import UserSerializer


class BloodRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)

    class Meta:
        model = BloodRequest
        fields = [
            'id', 'requester', 'patient_name', 'blood_group', 'units_needed',
            'hospital_name', 'location', 'division', 'district', 'upazila',
            'address', 'description', 'is_fulfilled', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'requester', 'is_fulfilled', 'created_at', 'updated_at']


class BloodRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = [
            'patient_name', 'blood_group', 'units_needed', 'hospital_name',
            'location', 'division', 'district', 'upazila', 'address', 'description'
        ]

    def create(self, validated_data):
        validated_data['requester'] = self.context['request'].user
        return super().create(validated_data)
