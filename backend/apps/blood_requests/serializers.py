from rest_framework import serializers
from apps.blood_requests.models import BloodRequest
from apps.users.serializers import UserSerializer
from apps.locations.models import Upazila


class BloodRequestLocationSerializer(serializers.Serializer):
    """Nested location information for blood requests"""
    upazila_id = serializers.IntegerField(source='location.id')
    upazila_name = serializers.CharField(source='location.name')
    district_id = serializers.IntegerField(source='location.district.id')
    district_name = serializers.CharField(source='location.district.name')
    division_id = serializers.IntegerField(source='location.district.division.id')
    division_name = serializers.CharField(source='location.district.division.name')


class BloodRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(
        source='location',
        queryset=Upazila.objects.all(),
        write_only=True,
        required=False
    )
    division = serializers.CharField(read_only=True)
    district = serializers.CharField(read_only=True)
    upazila_name = serializers.CharField(read_only=True)

    class Meta:
        model = BloodRequest
        fields = [
            'id', 'requester', 'patient_name', 'blood_group', 'units_needed',
            'hospital_name', 'location', 'location_id', 'division', 'district', 'upazila_name',
            'address', 'description', 'is_fulfilled', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'requester', 'is_fulfilled', 'created_at', 'updated_at', 'location']


class BloodRequestDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with nested location information"""
    requester = UserSerializer(read_only=True)
    location_info = serializers.SerializerMethodField()
    division = serializers.CharField(read_only=True)
    district = serializers.CharField(read_only=True)
    upazila_name = serializers.CharField(read_only=True)

    class Meta:
        model = BloodRequest
        fields = [
            'id', 'requester', 'patient_name', 'blood_group', 'units_needed',
            'hospital_name', 'location', 'location_info', 'division', 'district', 'upazila_name',
            'address', 'description', 'is_fulfilled', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'requester', 'is_fulfilled', 'created_at', 'updated_at']

    def get_location_info(self, obj):
        return {
            'upazila_id': obj.location.id,
            'upazila_name': obj.location.name,
            'district_id': obj.location.district.id,
            'district_name': obj.location.district.name,
            'division_id': obj.location.district.division.id,
            'division_name': obj.location.district.division.name,
        }


class BloodRequestCreateSerializer(serializers.ModelSerializer):
    location_id = serializers.PrimaryKeyRelatedField(
        source='location',
        queryset=Upazila.objects.all()
    )

    class Meta:
        model = BloodRequest
        fields = [
            'patient_name', 'blood_group', 'units_needed', 'hospital_name',
            'location_id', 'address', 'description'
        ]

    def create(self, validated_data):
        validated_data['requester'] = self.context['request'].user
        return super().create(validated_data)
