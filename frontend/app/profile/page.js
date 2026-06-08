'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import DonationStatsSection from '@/components/profile/DonationStatsSection';
import ScheduleDonationModal from '@/components/profile/ScheduleDonationModal';
import DonationHistorySection from '@/components/profile/DonationHistorySection';
import EditProfileModal from '@/components/profile/EditProfileModal';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, loadFromStorage, isInitialized } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationHistory, setDonationHistory] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState('');
  const [editSuccess, setEditSuccess] = useState(''); // State for success message in modal
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    nid: '',
    blood_group: '',
    address: '',
    division: '',
    district: '',
    upazila: '',
  });

  useEffect(() => {
    loadFromStorage();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching profile from /auth/profile/');
      const profileRes = await api.get('/auth/profile/');
      console.log('Profile response:', profileRes.data);
      setProfile(profileRes.data);
      
      // Initialize form data
      setFormData({
        first_name: profileRes.data.first_name || '',
        last_name: profileRes.data.last_name || '',
        phone_number: profileRes.data.phone_number || '',
        nid: profileRes.data.nid || '',
        blood_group: profileRes.data.blood_group || 'O+',
        address: profileRes.data.address || '',
      });
      
      console.log('Fetching donations from /donations/my_donations/');
      const donationRes = await api.get('/donations/my_donations/');
      console.log('Donations response:', donationRes.data);
      const donations = donationRes.data.results || donationRes.data || [];
      setDonationHistory(Array.isArray(donations) ? donations : []);
      
    } catch (error) {
      console.error('Failed to fetch profile');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!token) {
      router.push('/auth/sign-in');
      return;
    }

    fetchProfile();
  }, [isInitialized, token, router]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setEditError('');
    setEditSuccess('');
    setEditLoading(true);

    try {
      const response = await api.put('/auth/profile/', formData);
      setProfile(response.data);
      setEditSuccess('Profile updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        setEditSuccess('');
      }, 2000);
    } catch (error) {
      const errorData = error.response?.data;
      if (typeof errorData === 'object') {
        const errorMessages = Object.entries(errorData)
          .map(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : messages;
            return msg;
          })
          .join(', ');
        setEditError(errorMessages);
      } else {
        setEditError('Failed to update profile. Please try again.');
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleScheduleDonation = async (donationData) => {
    setScheduleError('');
    setEditSuccess(''); // Clear any previous success message from edit modal
    setScheduleLoading(true);

    try {
      // Assuming a POST endpoint for scheduling donations
      const response = await api.post('/donations/schedule/', donationData);
      console.log('Donation scheduled:', response.data);
      setEditSuccess('Donation scheduled successfully!'); // Reusing editSuccess for simplicity, consider a separate state
      // Optionally refetch donation history to show the newly scheduled donation
      fetchProfile(); 
      setTimeout(() => {
        setShowScheduleModal(false);
        setEditSuccess('');
      }, 2000);
    } catch (error) {
      console.error('Failed to schedule donation:', error);
      const errorData = error.response?.data;
      if (errorData) {
        const messages = Object.values(errorData).flat().join(' ');
        setScheduleError(messages);
      } else {
        setScheduleError('Failed to schedule donation. Please try again.');
      }
    } finally {
      setScheduleLoading(false);
    }
  };
  const getLastDonationDate = () => {
    if (donationHistory.length === 0) return null;
    const sorted = [...donationHistory].sort((a, b) => 
      new Date(b.donation_date) - new Date(a.donation_date)
    );
    return sorted[0]?.donation_date ? new Date(sorted[0].donation_date).toLocaleDateString() : null;
  };

  if (!token) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600">
          {loading ? 'Loading profile...' : 'Failed to load profile. Please try again.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
         
          <h1 className="text-heading-lg text-secondary mb-4 leading-tight">
            Your Blood Donor
            <span className="text-primary-gradient"> Profile</span>
          </h1>
          <p className="text-xl text-secondary-light max-w-2xl leading-relaxed">
            Manage your profile information and view your donation history.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PersonalInfoSection profile={profile} onEditClick={() => setShowEditModal(true)} />
          <DonationStatsSection
            profile={profile}
            donationHistory={donationHistory}
            getLastDonationDate={getLastDonationDate}
          />
        </div>

        {/* The "Update Your Information" section is now redundant as the edit button is in PersonalInfoSection */}
        {/* Keeping the Donation History section here as per the request */}

        <DonationHistorySection donationHistory={donationHistory} />
      </div>

      <EditProfileModal
        showEditModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        formData={formData}
        onInputChange={handleEditInputChange}
        onSave={handleSaveProfile}
        loading={editLoading}
        error={editError}
        success={editSuccess}
      />

      <ScheduleDonationModal
        showScheduleModal={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSave={handleScheduleDonation}
        loading={scheduleLoading}
        error={scheduleError}
        success={editSuccess} // Reusing editSuccess for simplicity
      />
    </div>
  );
}
