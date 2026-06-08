from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.locations.views import DivisionViewSet, DistrictViewSet, UpazilaViewSet

router = DefaultRouter()
router.register(r'divisions', DivisionViewSet)
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'upazilas', UpazilaViewSet, basename='upazila')

app_name = 'locations'

urlpatterns = [
    path('', include(router.urls)),
]
