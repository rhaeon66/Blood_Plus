from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.blood_requests.views import BloodRequestViewSet

router = DefaultRouter()
router.register(r'', BloodRequestViewSet)

app_name = 'blood_requests'

urlpatterns = [
    path('', include(router.urls)),
]
