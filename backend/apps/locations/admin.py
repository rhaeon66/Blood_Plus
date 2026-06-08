from django.contrib import admin
from apps.locations.models import Division, District, Upazila


@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    ordering = ['name']


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ['name', 'division']
    list_filter = ['division']
    search_fields = ['name']
    ordering = ['division', 'name']


@admin.register(Upazila)
class UpazilaAdmin(admin.ModelAdmin):
    list_display = ['name', 'district', 'get_division']
    list_filter = ['district__division', 'district']
    search_fields = ['name', 'district__name']
    ordering = ['district', 'name']
    
    def get_division(self, obj):
        return obj.district.division.name
    get_division.short_description = 'Division'
