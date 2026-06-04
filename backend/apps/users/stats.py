from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from apps.users.models import User
from apps.donations.models import Donation


class StatisticsViewSet(viewsets.ViewSet):
    """
    API endpoint for platform statistics
    GET /api/statistics/summary/
    """

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Get platform statistics
        Returns:
        - lives_saved: Count of completed donations
        - active_donors: Count of active users
        """
        try:
            # Count completed donations (lives saved)
            lives_saved = Donation.objects.filter(
                status='completed'
            ).count()

            # Count active donors (active users)
            active_donors = User.objects.filter(
                is_active=True
            ).count()

            return Response(
                {
                    'lives_saved': lives_saved,
                    'active_donors': active_donors,
                    'status': 'success'
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    'error': str(e),
                    'status': 'error'
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
