from rest_framework import serializers
from apps.locations.models import Division, District, Upazila


class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ['id', 'name']


class DistrictSerializer(serializers.ModelSerializer):
    division_name = serializers.CharField(source='division.name', read_only=True)
    
    class Meta:
        model = District
        fields = ['id', 'name', 'division', 'division_name']


class UpazilaSerializer(serializers.ModelSerializer):
    district_name = serializers.CharField(source='district.name', read_only=True)
    division_name = serializers.CharField(source='district.division.name', read_only=True)
    
    class Meta:
        model = Upazila
        fields = ['id', 'name', 'district', 'district_name', 'division_name']
