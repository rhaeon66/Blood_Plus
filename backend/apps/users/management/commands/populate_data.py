import json
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.users.models import User

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate Bangladesh divisions, districts, upazilas data and create 5 test users'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data population...'))
        
        # Create 5 users
        self.create_users()
        
        self.stdout.write(self.style.SUCCESS('✓ Successfully populated database and created users'))

    def create_users(self):
        """Create 5 test users with the Bangladesh data"""
        users_data = [
            {
                'username': 'user1',
                'password': 'pass1',
                'email': 'user1@example.com',
                'first_name': 'Test',
                'last_name': 'User1',
                'phone_number': '+8801700000001',
                'nid': '1234567890001',
                'blood_group': 'O+',
                'division': 'Dhaka',
                'district': 'Dhaka',
                'upazila': 'Dhamrai',
                'address': 'Dhaka, Bangladesh'
            },
            {
                'username': 'user2',
                'password': 'pass2',
                'email': 'user2@example.com',
                'first_name': 'Test',
                'last_name': 'User2',
                'phone_number': '+8801700000002',
                'nid': '1234567890002',
                'blood_group': 'A+',
                'division': 'Chattogram',
                'district': 'Chattogram',
                'upazila': 'Anwara',
                'address': 'Chattogram, Bangladesh'
            },
            {
                'username': 'user3',
                'password': 'pass3',
                'email': 'user3@example.com',
                'first_name': 'Test',
                'last_name': 'User3',
                'phone_number': '+8801700000003',
                'nid': '1234567890003',
                'blood_group': 'B+',
                'division': 'Khulna',
                'district': 'Khulna',
                'upazila': 'Batiaghata',
                'address': 'Khulna, Bangladesh'
            },
            {
                'username': 'user4',
                'password': 'pass4',
                'email': 'user4@example.com',
                'first_name': 'Test',
                'last_name': 'User4',
                'phone_number': '+8801700000004',
                'nid': '1234567890004',
                'blood_group': 'AB+',
                'division': 'Rajshahi',
                'district': 'Rajshahi',
                'upazila': 'Bagha',
                'address': 'Rajshahi, Bangladesh'
            },
            {
                'username': 'user5',
                'password': 'pass5',
                'email': 'user5@example.com',
                'first_name': 'Test',
                'last_name': 'User5',
                'phone_number': '+8801700000005',
                'nid': '1234567890005',
                'blood_group': 'O-',
                'division': 'Sylhet',
                'district': 'Sylhet',
                'upazila': 'Balaganj',
                'address': 'Sylhet, Bangladesh'
            }
        ]

        for user_data in users_data:
            password = user_data.pop('password')
            username = user_data['username']
            
            # Check if user already exists
            if User.objects.filter(username=username).exists():
                self.stdout.write(self.style.WARNING(f'User {username} already exists, skipping...'))
                continue
            
            # Create user
            user = User.objects.create_user(**user_data, password=password)
            self.stdout.write(self.style.SUCCESS(f'✓ Created user: {username}'))
