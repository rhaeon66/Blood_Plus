'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function BloodRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/blood-requests/');
      // DRF may return paginated responses with a `results` array
      const data = response.data;
      if (Array.isArray(data)) {
        setRequests(data);
      } else if (data && Array.isArray(data.results)) {
        setRequests(data.results);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(req =>
    filter === '' || req.blood_group === filter
  );

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-8">Blood Requests</h1>

      {/* Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-secondary mb-2">
          Filter by Blood Group
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">All Blood Groups</option>
          {bloodGroups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No blood requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-secondary">{request.patient_name}</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {request.blood_group}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {request.location}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Hospital:</span> {request.hospital_name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Units Needed:</span> {request.units_needed}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Status:</span>{' '}
                <span className={request.is_fulfilled ? 'text-green-600' : 'text-orange-600'}>
                  {request.is_fulfilled ? 'Fulfilled' : 'Pending'}
                </span>
              </p>
              {!request.is_fulfilled && (
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition">
                  Donate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
