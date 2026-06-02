from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'nid', 'blood_group', 'division', 'district',
            'upazila', 'address', 'is_verified', 'created_at'
        ]
        read_only_fields = ['id', 'is_verified', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'password', 'confirm_password',
            'first_name', 'last_name', 'phone_number', 'nid', 'blood_group',
            'division', 'district', 'upazila', 'address'
        ]

    def validate(self, attrs):
        # Ensure password confirmation matches
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        # Map full_name -> first_name, last_name
        full_name = validated_data.pop('full_name', '')
        first_name = ''
        last_name = ''
        if full_name:
            parts = full_name.strip().split(' ')
            first_name = parts[0]
            last_name = ' '.join(parts[1:]) if len(parts) > 1 else ''

        # Use phone_number as username if username not provided
        username = validated_data.get('username') or validated_data.get('phone_number')

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            phone_number=validated_data['phone_number'],
            nid=validated_data['nid'],
            blood_group=validated_data['blood_group'],
            division=validated_data['division'],
            district=validated_data['district'],
            upazila=validated_data['upazila'],
            address=validated_data['address'],
        )
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        try:
            user = User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid phone number or password.")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid phone number or password.")

        attrs['user'] = user
        return attrs


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)
