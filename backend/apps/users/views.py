from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response

from rest_framework.filters import SearchFilter
from rest_framework.filters import OrderingFilter

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(
                    refresh.access_token
                ),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data[
            "user"
        ]

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(
                    refresh.access_token
                ),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(
    generics.RetrieveUpdateAPIView
):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_object(self):
        return self.request.user

    def perform_update(
        self,
        serializer
    ):
        serializer.save()


class UserListView(
    generics.ListAPIView
):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "blood_group",
        "division",
        "district",
        "upazila",
        "is_verified",
    ]

    search_fields = [
        "first_name",
        "last_name",
        "phone_number",
        "district",
        "upazila",
    ]

    ordering_fields = [
        "created_at",
        "first_name",
    ]

    ordering = [
        "-created_at"
    ]

    def get_queryset(self):
        queryset = User.objects.all()

        verified = self.request.query_params.get(
            "verified"
        )

        if verified == "true":
            queryset = queryset.filter(
                is_verified=True
            )

        return queryset