from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='admin/', permanent=False), name='root-redirect'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/blood-requests/', include('apps.blood_requests.urls')),
    path('api/donations/', include('apps.donations.urls')),
]
