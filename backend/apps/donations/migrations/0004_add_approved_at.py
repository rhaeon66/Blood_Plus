# Generated migration for adding approved_at field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0003_update_donation_statuses'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='approved_at',
            field=models.DateTimeField(
                blank=True,
                help_text='Date when donation was approved by blood request requester',
                null=True,
            ),
        ),
    ]
