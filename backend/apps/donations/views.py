from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.donations.models import Donation
from apps.donations.serializers import DonationSerializer, DonationCreateSerializer


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['status', 'donation_date']
    search_fields = ['donor__first_name', 'donor__last_name', 'hospital']
    ordering_fields = ['created_at', 'donation_date']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return DonationCreateSerializer
        return DonationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        output_serializer = DonationSerializer(instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_donations(self, request):
        donations = self.queryset.filter(donor=request.user)
        serializer = self.get_serializer(donations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def history(self, request):
        donations = self.queryset.filter(donor=request.user, status='completed')
        page = self.paginate_queryset(donations)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(donations, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_completed(self, request, pk=None):
        donation = self.get_object()
        if donation.donor != request.user:
            return Response(
                {'detail': 'You do not have permission to mark this donation as completed.'},
                status=status.HTTP_403_FORBIDDEN
            )
        donation.status = 'completed'
        donation.save()
        return Response(DonationSerializer(donation).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def cancel(self, request, pk=None):
        donation = self.get_object()
        if donation.donor != request.user:
            return Response(
                {'detail': 'You do not have permission to cancel this donation.'},
                status=status.HTTP_403_FORBIDDEN
            )
        donation.status = 'cancelled'
        donation.save()
        return Response(DonationSerializer(donation).data, status=status.HTTP_200_OK)
