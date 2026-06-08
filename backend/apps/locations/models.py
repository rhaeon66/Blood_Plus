from django.db import models


class Division(models.Model):
    """Bangladesh divisions (8 total)"""
    name = models.CharField(max_length=100, unique=True)
    
    class Meta:
        ordering = ['name']
        indexes = [models.Index(fields=['name'])]
    
    def __str__(self):
        return self.name


class District(models.Model):
    """Bangladesh districts (64 total)"""
    division = models.ForeignKey(Division, on_delete=models.PROTECT, related_name='districts')
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['division', 'name']
        unique_together = ['division', 'name']
        indexes = [
            models.Index(fields=['division', 'name']),
            models.Index(fields=['division']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.division.name})"


class Upazila(models.Model):
    """Bangladesh upazilas (493 total)"""
    district = models.ForeignKey(District, on_delete=models.PROTECT, related_name='upazilas')
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['district', 'name']
        unique_together = ['district', 'name']
        indexes = [
            models.Index(fields=['district', 'name']),
            models.Index(fields=['district']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.district.name})"
