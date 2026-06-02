from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.blood_requests.models import BloodRequest
from apps.blood_requests.serializers import (
    BloodRequestSerializer, BloodRequestCreateSerializer
)


class BloodRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodRequest.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['blood_group', 'status', 'division']
    search_fields = ['patient_name', 'hospital_name', 'location']
    ordering_fields = ['created_at', 'units_needed']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return BloodRequestCreateSerializer
        return BloodRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        output_serializer = BloodRequestSerializer(instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_requests(self, request):
        requests_qs = self.queryset.filter(requester=request.user)
        serializer = self.get_serializer(requests_qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_fulfilled(self, request, pk=None):
        blood_request = self.get_object()
        blood_request.is_fulfilled = True
        blood_request.status = 'fulfilled'
        blood_request.save()
        return Response(
            BloodRequestSerializer(blood_request).data,
            status=status.HTTP_200_OK
        )
