'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, loadFromStorage, isInitialized } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch profile first
      console.log('Fetching profile from /auth/profile/');
      const profileRes = await api.get('/auth/profile/');
      console.log('Profile response:', profileRes.data);
      setProfile(profileRes.data);
      
      // Fetch donations second
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

  const getLastDonationDate = () => {
    if (donationHistory.length === 0) return null;
    // Sort by donation_date descending and get the first one
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-8">My Profile</h1>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:col-span-2">
          <h2 className="text-2xl font-bold text-secondary mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Full Name</span>
              <span className="text-gray-600">{profile.full_name}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Phone Number</span>
              <span className="text-gray-600">{profile.phone_number}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">NID</span>
              <span className="text-gray-600">{profile.nid}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Blood Group</span>
              <span className="text-gray-600 font-bold text-primary">{profile.blood_group}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Division</span>
              <span className="text-gray-600">{profile.division}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">District</span>
              <span className="text-gray-600">{profile.district}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Upazila</span>
              <span className="text-gray-600">{profile.upazila}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Address</span>
              <span className="text-gray-600">{profile.address}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6">Donation Stats</h2>
          <div className="space-y-4">
            <div className="bg-primary bg-opacity-10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">{donationHistory.length}</p>
              <p className="text-gray-600 text-sm">Times Donated</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{profile.blood_group}</p>
              <p className="text-gray-600 text-sm">Blood Type</p>
            </div>
            {getLastDonationDate() && (
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-blue-600">Last Donated</p>
                <p className="text-lg font-bold text-blue-700 mt-1">{getLastDonationDate()}</p>
              </div>
            )}
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold">
              Schedule Donation
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">Edit Profile</h2>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm">
            Edit Information
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">
            Update your personal information and preferences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={profile.full_name} 
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={profile.phone_number} 
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
              <input 
                type="text" 
                value={profile.blood_group} 
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input 
                type="text" 
                value={profile.address} 
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            📝 Contact support to edit your profile information
          </p>
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-secondary mb-6">Donation History</h2>
        {donationHistory.length === 0 ? (
          <p className="text-gray-600">No donations yet. Start donating today!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Hospital</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map(donation => (
                  <tr key={donation.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(donation.donation_date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{donation.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{donation.hospital}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
