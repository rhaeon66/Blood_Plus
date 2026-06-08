from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Case, When, BooleanField
from apps.blood_requests.models import BloodRequest
from apps.blood_requests.serializers import (
    BloodRequestSerializer, BloodRequestCreateSerializer, BloodRequestDetailSerializer
)


class BloodRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodRequest.objects.select_related('location', 'location__district', 'location__district__division', 'requester')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['blood_group', 'status', 'location__district__division', 'location__district', 'location']
    search_fields = ['patient_name', 'hospital_name', 'address']
    ordering_fields = ['created_at', 'units_needed', 'blood_group']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return BloodRequestCreateSerializer
        elif self.action == 'retrieve':
            return BloodRequestDetailSerializer
        return BloodRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        output_serializer = BloodRequestDetailSerializer(instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BloodRequestDetailSerializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_requests(self, request):
        """Get user's own blood requests"""
        requests_qs = self.queryset.filter(requester=request.user)
        
        # Apply ordering
        ordered_by = request.query_params.get('ordering', '-created_at')
        requests_qs = requests_qs.order_by(ordered_by)
        
        serializer = BloodRequestDetailSerializer(requests_qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def user_requests_sorted(self, request):
        """Get user's own blood requests with sorting and filtering by blood group and location"""
        # Get authenticated user's requests or public requests
        if request.user.is_authenticated:
            user_requests = BloodRequest.objects.filter(requester=request.user)
        else:
            user_requests = BloodRequest.objects.none()

        # Get other requests, sorting pending to bottom
        other_requests = BloodRequest.objects.exclude(requester=request.user).annotate(
            is_pending=Case(When(status='pending', then=True), default=False, output_field=BooleanField())
        ).order_by('is_pending', '-created_at')

        # Combine: user's requests first, then other requests
        queryset = list(user_requests.order_by('-created_at')) + list(other_requests)
        
        # Filter by blood group
        blood_group = request.query_params.get('blood_group')
        if blood_group:
            queryset = [r for r in queryset if r.blood_group == blood_group]
        
        # Filter by location
        division_id = request.query_params.get('division_id')
        district_id = request.query_params.get('district_id')
        upazila_id = request.query_params.get('upazila_id')
        
        if upazila_id:
            queryset = [r for r in queryset if r.location.id == int(upazila_id)]
        elif district_id:
            queryset = [r for r in queryset if r.location.district.id == int(district_id)]
        elif division_id:
            queryset = [r for r in queryset if r.location.district.division.id == int(division_id)]
        
        # Pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = BloodRequestDetailSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = BloodRequestDetailSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_fulfilled(self, request, pk=None):
        blood_request = self.get_object()
        
        # Check if user is the requester
        if blood_request.requester != request.user:
            return Response(
                {"error": "Only the requester can mark a request as fulfilled"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        blood_request.is_fulfilled = True
        blood_request.status = 'fulfilled'
        blood_request.save()
        return Response(
            BloodRequestDetailSerializer(blood_request).data,
            status=status.HTTP_200_OK
        )

