from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'phone_number', 'blood_group', 'division', 'is_verified', 'created_at']
    list_filter = ['blood_group', 'division', 'is_verified', 'created_at']
    search_fields = ['username', 'phone_number', 'nid', 'email']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        ('Personal Info', {
            'fields': ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'nid')
        }),
        ('Blood & Location Info', {
            'fields': ('blood_group', 'division', 'district', 'upazila', 'address')
        }),
        ('Account Status', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified')
        }),
        ('Important Dates', {
            'fields': ('created_at', 'updated_at', 'last_login', 'date_joined')
        }),
    )
