# Generated migration for donation status changes

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='donation_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='donation',
            name='location',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='donation',
            name='status',
            field=models.CharField(
                choices=[
                    ('pending', 'Pending'),
                    ('approved', 'Approved'),
                    ('completed', 'Completed'),
                    ('rejected', 'Rejected'),
                    ('cancelled', 'Cancelled'),
                ],
                default='pending',
                max_length=20,
            ),
        ),
    ]
