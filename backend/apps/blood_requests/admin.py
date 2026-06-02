from django.contrib import admin
from .models import BloodRequest

@admin.register(BloodRequest)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'blood_group', 'units_needed', 'hospital_name', 'status', 'created_at']
    list_filter = ['blood_group', 'status', 'is_fulfilled', 'created_at']
    search_fields = ['patient_name', 'hospital_name', 'location']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        ('Request Info', {
            'fields': ('id', 'requester', 'patient_name', 'blood_group', 'units_needed')
        }),
        ('Hospital & Location', {
            'fields': ('hospital_name', 'location', 'division', 'district', 'upazila', 'address')
        }),
        ('Status', {
            'fields': ('status', 'is_fulfilled', 'description')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
