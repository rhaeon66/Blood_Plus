from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "nid",
            "blood_group",
            "division",
            "district",
            "upazila",
            "address",
            "is_verified",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "is_verified",
            "created_at",
        ]

    def get_full_name(self, obj):
        return obj.get_full_name().strip()


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(
        write_only=True,
        required=True
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            "full_name",
            "email",
            "phone_number",
            "nid",
            "blood_group",
            "division",
            "district",
            "upazila",
            "address",
            "password",
            "confirm_password",
        ]

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError(
                "Phone number already exists."
            )
        return value

    def validate_nid(self, value):
        if User.objects.filter(nid=value).exists():
            raise serializers.ValidationError(
                "NID already exists."
            )
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )

        if not attrs.get("division"):
            raise serializers.ValidationError(
                {"division": "Division is required."}
            )

        if not attrs.get("district"):
            raise serializers.ValidationError(
                {"district": "District is required."}
            )

        if not attrs.get("upazila"):
            raise serializers.ValidationError(
                {"upazila": "Upazila is required."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        full_name = validated_data.pop("full_name").strip()

        first_name = ""
        last_name = ""

        if full_name:
            parts = full_name.split()

            first_name = parts[0]

            if len(parts) > 1:
                last_name = " ".join(parts[1:])

        user = User.objects.create_user( 
            phone_number=validated_data["phone_number"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
            first_name=first_name,
            last_name=last_name,
            nid=validated_data["nid"],
            blood_group=validated_data["blood_group"],
            division=validated_data["division"],
            district=validated_data["district"],
            upazila=validated_data["upazila"],
            address=validated_data["address"],
        )

        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        password = attrs.get("password")

        try:
            user = User.objects.get(
                phone_number=phone_number
            )
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid phone number or password."
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                "Invalid phone number or password."
            )

        attrs["user"] = user

        return attrs


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField(
        read_only=True
    )

    refresh = serializers.CharField(
        read_only=True
    )

    user = UserSerializer(
        read_only=True
    )