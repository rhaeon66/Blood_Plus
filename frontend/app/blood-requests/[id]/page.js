'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

export default function BloodRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token, loadFromStorage, isInitialized } = useAuthStore();
  const [request, setRequest] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!token) {
      router.push('/auth/sign-in');
      return;
    }

    fetchRequest();
  }, [isInitialized, params.id, token, router]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/blood-requests/${params.id}/`
      );
      setRequest(response.data);
      
      // Fetch donations for this blood request
      const donationsResponse = await api.get(
        `/donations/?blood_request=${params.id}`
      );
      setDonations(donationsResponse.data.results || donationsResponse.data);
    } catch (error) {
      console.error('Error fetching request:', error);
      setError(
        'Failed to load blood request'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDonateNow = async () => {
    setError('');
    setSuccess('');
    setDonating(true);

    try {
      const payload = {
        blood_request: request.id,
      };

      const response = await api.post(
        '/donations/',
        payload
      );

      setSuccess(
        'Donation registered successfully! Status: Pending'
      );
      
      // Add the new donation to the list
      setDonations([response.data, ...donations]);
      
      setTimeout(() => {
        fetchRequest();
      }, 2000);
    } catch (err) {
      const errorData = err.response?.data;

      if (typeof errorData === 'object') {
        const firstError = Object.values(errorData)[0];
        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        );
      } else {
        setError('Failed to register donation');
      }
    } finally {
      setDonating(false);
    }
  };

  const handleApproveDonation = async (donationId) => {
    try {
      setError('');
      const response = await api.post(
        `/donations/${donationId}/approve/`
      );
      
      setDonations(
        donations.map(d =>
          d.id === donationId ? response.data : d
        )
      );
      setSuccess('Donation approved!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to approve donation');
      console.error(err);
    }
  };

  const handleRejectDonation = async (donationId) => {
    try {
      setError('');
      const response = await api.post(
        `/donations/${donationId}/reject/`
      );
      
      setDonations(
        donations.map(d =>
          d.id === donationId ? response.data : d
        )
      );
      setSuccess('Donation rejected!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to reject donation');
      console.error(err);
    }
  };

  const isRequestor = request && user && request.requester?.id === user.id;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">
          {error || 'Blood request not found'}
        </p>
        <Link
          href="/blood-requests"
          className="text-primary hover:underline font-semibold"
        >
          Back to Blood Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blood-requests"
        className="text-primary hover:underline mb-6 inline-block"
      >
        ← Back to Blood Requests
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-secondary mb-6">
            {request.patient_name}
          </h1>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Blood Group
              </span>
              <span className="text-lg font-bold text-primary">
                {request.blood_group}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Units Needed
              </span>
              <span className="text-gray-600">
                {request.units_needed}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Hospital
              </span>
              <span className="text-gray-600">
                {request.hospital_name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Location
              </span>
              <span className="text-gray-600">
                {request.location}
              </span>
            </div>

            <div className="pt-4">
              <span className="font-semibold text-gray-700 block mb-2">
                Address
              </span>
              <p className="text-gray-600">
                {request.address}
              </p>
            </div>

            <div className="pt-4">
              <span className="font-semibold text-gray-700 block mb-2">
                Description
              </span>
              <p className="text-gray-600">
                {request.description ||
                  'No additional information'}
              </p>
            </div>

            <div className="pt-4">
              <span className="font-semibold text-gray-700 block mb-2">
                Request Status
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                request.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Donation Panel */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Donate Now
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {!isRequestor && (
            <>
              <p className="text-gray-600 mb-6">
                Click the button below to express your willingness to donate. The blood request requester will review and accept your donation.
              </p>

              <button
                onClick={handleDonateNow}
                disabled={donating}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:bg-gray-400"
              >
                {donating ? 'Registering...' : 'Donate Now'}
              </button>
            </>
          )}

          {isRequestor && (
            <div className="text-gray-600">
              <p className="mb-4">You are the blood request requester.</p>
              <p className="text-sm">You can accept or reject donations from the list below.</p>
            </div>
          )}
        </div>
      </div>

      {/* Donations List */}
      {donations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Donations ({donations.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-secondary">
                      {donation.donor.first_name}{' '}
                      {donation.donor.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {donation.donor.phone}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : donation.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {donation.status.charAt(0).toUpperCase() +
                      donation.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>
                    <strong>Blood Group:</strong>{' '}
                    {donation.donor.blood_group}
                  </p>
                  <p>
                    <strong>Registered:</strong>{' '}
                    {new Date(donation.created_at).toLocaleDateString()}
                  </p>
                </div>

                {donation.notes && (
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Notes:</strong> {donation.notes}
                  </p>
                )}

                {isRequestor && donation.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleApproveDonation(
                          donation.id
                        )
                      }
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleRejectDonation(
                          donation.id
                        )
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
