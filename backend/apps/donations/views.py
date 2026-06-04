from django.utils import timezone

from rest_framework import status
from rest_framework import permissions
from rest_framework import viewsets

from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

from django_filters.rest_framework import (
    DjangoFilterBackend,
)

from apps.donations.models import Donation
from apps.donations.serializers import (
    DonationSerializer,
    DonationCreateSerializer,
    DonationUpdateSerializer,
    QuickDonationSerializer,
)


class DonationViewSet(
    viewsets.ModelViewSet
):
    queryset = (
        Donation.objects
        .select_related(
            "donor",
            "blood_request",
            "verified_by",
        )
        .all()
    )

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "is_verified",
    ]

    search_fields = [
        "donor__first_name",
        "donor__last_name",
        "hospital",
        "location",
    ]

    ordering_fields = [
        "created_at",
        "donation_date",
    ]

    ordering = [
        "-donation_date"
    ]

    def get_serializer_class(
        self
    ):
        if self.action == "create":
            return DonationCreateSerializer

        if self.action in [
            "update",
            "partial_update",
        ]:
            return DonationUpdateSerializer

        return DonationSerializer

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            donor=self.request.user
        )

    def get_queryset(self):
        queryset = super().get_queryset()

        donor_id = (
            self.request.query_params.get(
                "donor"
            )
        )

        if donor_id:
            queryset = queryset.filter(
                donor_id=donor_id
            )

        return queryset

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[
            permissions.IsAuthenticated
        ],
    )
    def my_donations(
        self,
        request
    ):
        queryset = (
            self.get_queryset()
            .filter(
                donor=request.user
            )
        )

        page = self.paginate_queryset(
            queryset
        )

        if page is not None:
            serializer = (
                self.get_serializer(
                    page,
                    many=True
                )
            )

            return self.get_paginated_response(
                serializer.data
            )

        serializer = (
            self.get_serializer(
                queryset,
                many=True
            )
        )

        return Response(
            serializer.data
        )

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[
            permissions.IsAuthenticated
        ],
    )
    def history(
        self,
        request
    ):
        queryset = (
            self.get_queryset()
            .filter(
                donor=request.user,
                status="completed",
                is_verified=True,
            )
        )

        page = self.paginate_queryset(
            queryset
        )

        if page is not None:
            serializer = (
                self.get_serializer(
                    page,
                    many=True
                )
            )

            return self.get_paginated_response(
                serializer.data
            )

        serializer = (
            self.get_serializer(
                queryset,
                many=True
            )
        )

        return Response(
            serializer.data
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[
            permissions.IsAuthenticated
        ],
    )
    def approve(self, request, pk=None):
        """
        Approve a donation (only requestor can approve)
        Automatically sets approved_at timestamp
        """
        donation = self.get_object()

        # Check if the user is the blood request requester
        if (
            donation.blood_request
            and donation.blood_request.requester
            != request.user
        ):
            return Response(
                {
                    "error": "Only the blood request requester can approve donations"
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if donation.status != "pending":
            return Response(
                {
                    "error": f"Cannot approve a {donation.status} donation"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        donation.status = "approved"
        donation.approved_at = timezone.now()
        donation.save()

        return Response(
            DonationSerializer(
                donation
            ).data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[
            permissions.IsAuthenticated
        ],
    )
    def reject(self, request, pk=None):
        """
        Reject a donation (only requestor can reject)
        """
        donation = self.get_object()

        # Check if the user is the blood request requester
        if (
            donation.blood_request
            and donation.blood_request.requester
            != request.user
        ):
            return Response(
                {
                    "error": "Only the blood request requester can reject donations"
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if donation.status != "pending":
            return Response(
                {
                    "error": f"Cannot reject a {donation.status} donation"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        donation.status = "rejected"
        donation.save()

        return Response(
            DonationSerializer(
                donation
            ).data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[
            permissions.IsAuthenticated
        ],
    )
    def cancel(
        self,
        request,
        pk=None
    ):
        donation = self.get_object()

        if donation.donor != request.user:
            return Response(
                {
                    "detail":
                    "You do not have permission to cancel this donation."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if donation.status == "completed":
            return Response(
                {
                    "detail":
                    "Completed donations cannot be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        donation.status = "cancelled"

        donation.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        serializer = (
            DonationSerializer(
                donation
            )
        )

        return Response(
            serializer.data
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[
            permissions.IsAdminUser
        ],
    )
    def verify(
        self,
        request,
        pk=None
    ):
        donation = self.get_object()

        donation.status = "completed"

        donation.is_verified = True

        donation.verified_by = (
            request.user
        )

        donation.verified_at = (
            timezone.now()
        )

        donation.save(
            update_fields=[
                "status",
                "is_verified",
                "verified_by",
                "verified_at",
                "updated_at",
            ]
        )

        serializer = (
            DonationSerializer(
                donation
            )
        )

        return Response(
            serializer.data
        )