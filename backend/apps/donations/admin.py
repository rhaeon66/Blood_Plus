from django.contrib import admin
from .models import Donation

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['donor', 'donation_date', 'hospital', 'status', 'units_donated', 'created_at']
    list_filter = ['status', 'donation_date', 'created_at']
    search_fields = ['donor__username', 'donor__phone_number', 'hospital', 'location']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        ('Donor Info', {
            'fields': ('id', 'donor', 'blood_request')
        }),
        ('Donation Details', {
            'fields': ('donation_date', 'location', 'hospital', 'units_donated', 'status')
        }),
        ('Additional', {
            'fields': ('notes', 'created_at', 'updated_at')
        }),
    )
