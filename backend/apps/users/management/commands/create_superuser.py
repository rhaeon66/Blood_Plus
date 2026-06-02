from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a superuser with required fields'

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, required=True)
        parser.add_argument('--password', type=str, required=True)
        parser.add_argument('--nid', type=str, default='9999999999999')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        nid = options['nid']

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'User {username} already exists'))
            return

        user = User.objects.create_superuser(
            username=username,
            email=f'{username}@example.com',
            password=password,
            phone_number='+8801700000000',
            nid=nid,
            blood_group='O+',
            division='Dhaka',
            district='Dhaka',
            upazila='Dhamrai',
            address='Dhaka, Bangladesh'
        )
        self.stdout.write(self.style.SUCCESS(f'✓ Created superuser: {username}'))
