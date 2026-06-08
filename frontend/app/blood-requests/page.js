'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

const BLOOD_GROUPS = [
  'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-',
];

export default function BloodRequestsPage() {
  const { user, isInitialized } = useAuthStore();
  
  const [requests, setRequests] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bloodGroup, setBloodGroup] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [quickFilter, setQuickFilter] = useState('all');

  // Fetch divisions on mount
  useEffect(() => {
    fetchDivisions();
  }, []);

  // Fetch requests when filters change
  useEffect(() => {
    if (isInitialized) {
      fetchRequests();
    }
  }, [isInitialized, bloodGroup, selectedDivision, selectedDistrict, selectedUpazila]);

  useEffect(() => {
    if (selectedDivision) {
      fetchDistricts(selectedDivision);
    } else {
      setDistricts([]);
      if (quickFilter === 'all') {
        setSelectedDistrict('');
        setSelectedUpazila('');
      }
    }
  }, [selectedDivision, quickFilter]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchUpazilas(selectedDistrict);
    } else {
      setUpazilas([]);
      if (quickFilter === 'all') {
        setSelectedUpazila('');
      }
    }
  }, [selectedDistrict, quickFilter]);

  const fetchDivisions = async () => {
    try {
      const response = await api.get('/locations/divisions/');
      setDivisions(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to load divisions', error);
    }
  };

  const fetchDistricts = async (divisionId) => {
    try {
      const response = await api.get(`/locations/districts/?division_id=${divisionId}`);
      setDistricts(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to load districts', error);
    }
  };

  const fetchUpazilas = async (districtId) => {
    try {
      const response = await api.get(`/locations/upazilas/?district_id=${districtId}`);
      setUpazilas(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to load upazilas', error);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (bloodGroup) params.append('blood_group', bloodGroup);
      if (selectedDivision) params.append('division_id', selectedDivision);
      if (selectedDistrict) params.append('district_id', selectedDistrict);
      if (selectedUpazila) params.append('upazila_id', selectedUpazila);

      const url = `/blood-requests/user_requests_sorted/?${params.toString()}`;
      const response = await api.get(url);

      const data = response.data;
      if (Array.isArray(data)) {
        setRequests(data);
      } else if (data && Array.isArray(data.results)) {
        setRequests(data.results);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Failed to load blood requests', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedRequests = useMemo(() => {
    let sorted = [...requests];

    if (sortBy === 'by-blood-group') {
      sorted.sort((a, b) => a.blood_group.localeCompare(b.blood_group));
    } else if (sortBy === 'by-location') {
      sorted.sort((a, b) => 
        (a.upazila_name || '').localeCompare(b.upazila_name || '')
      );
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return sorted;
  }, [requests, sortBy]);

  const handleClearFilters = () => {
    setBloodGroup('');
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazila('');
    setSortBy('default');
    setQuickFilter('all');
  };

  const applyUserLocationFilter = async (level) => {
    if (!user) return;
    setQuickFilter(level);
    
    const div = divisions.find(d => d.name === user.division);
    if (!div) return;
    
    setSelectedDivision(div.id);
    const distData = await fetchDistricts(div.id);
    
    const dist = distData.find(d => d.name === user.district);
    if (!dist) return;
    
    setSelectedDistrict(dist.id);
    
    if (level === 'district') {
      setSelectedUpazila('');
      return;
    }
    
    const upaData = await fetchUpazilas(dist.id);
    const upa = upaData.find(u => u.name === user.upazila);
    if (!upa) return;
    
    setSelectedUpazila(upa.id);
  };

  if (loading && requests.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Blood Requests</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <h1 className="text-heading-lg text-secondary mb-4 leading-tight">
            Blood
            <span className="text-primary-gradient"> Requests</span>
          </h1>
          <p className="text-xl text-secondary-light max-w-2xl leading-relaxed">
            Browse active blood requests and connect with donors who can help save lives in your community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-heading-sm text-secondary">Available Requests</h2>
            <p className="text-secondary-light mt-2">
              Browse all active blood requests and help someone in need.
            </p>
          </div>

          <Link
            href="/request-blood"
            className="btn-gradient px-8 py-3 rounded-button font-semibold inline-flex items-center justify-center gap-2"
          >
            <span>🆘</span>
            Post New Request
          </Link>
        </div>

                {/* Quick Filters */}
        {user && (
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              onClick={handleClearFilters} 
              className={"px-6 py-2 rounded-full text-sm font-semibold transition " + (quickFilter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200')}
            >
              All Requests
            </button>
            <button 
              onClick={() => applyUserLocationFilter('district')} 
              className={"px-6 py-2 rounded-full text-sm font-semibold transition " + (quickFilter === 'district' ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200')}
            >
              My District ({user.district})
            </button>
            <button 
              onClick={() => applyUserLocationFilter('upazila')} 
              className={"px-6 py-2 rounded-full text-sm font-semibold transition " + (quickFilter === 'upazila' ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200')}
            >
              My Upazila ({user.upazila})
            </button>
          </div>
        )}

        {/* Filters Section */}
        <div className="premium-card p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-heading-sm text-secondary">Filters & Sorting</h3>
            {(bloodGroup || selectedDivision || selectedDistrict || selectedUpazila || sortBy !== 'default') && (
              <button
                onClick={handleClearFilters}
                className="text-primary hover:underline text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Blood Group Filter */}
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition text-secondary"
              >
                <option value="">All Blood Groups</option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Filter */}
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition text-secondary"
              >
                <option value="">All Divisions</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedDivision}
              className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-secondary"
            >
              <option value="">All Districts</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Filter */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              Upazila
            </label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-secondary"
            >
              <option value="">All Upazilas</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-border rounded-button px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition text-secondary"
            >
              <option value="default">My Requests First</option>
              <option value="by-blood-group">Blood Group (A-Z)</option>
              <option value="by-location">Location (A-Z)</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {sortedRequests.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <h2 className="text-heading-sm text-secondary mb-2">No Requests Found</h2>
          <p className="text-secondary-light">
            {bloodGroup || selectedDivision || selectedDistrict || selectedUpazila
              ? 'Try changing your filters.'
              : 'No blood requests available at the moment.'}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {sortedRequests.length} request{sortedRequests.length !== 1 ? 's' : ''}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedRequests.map((request) => (
              <div
                key={request.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border-l-4 ${
                  user?.id === request.requester?.id
                    ? 'border-blue-500'
                    : request.status === 'pending'
                    ? 'border-orange-500'
                    : 'border-primary'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-secondary">
                      {request.patient_name}
                    </h3>
                    {user?.id === request.requester?.id && (
                      <p className="text-xs text-blue-600 font-semibold">Your Request</p>
                    )}
                  </div>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {request.blood_group}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p>
                    <strong>Hospital:</strong> {request.hospital_name}
                  </p>
                  <p>
                    <strong>Location:</strong>{' '}
                    <span className="text-gray-700">
                      {request.upazila_name}, {request.district}, {request.division}
                    </span>
                  </p>
                  <p>
                    <strong>Units Needed:</strong> {request.units_needed}
                  </p>
                  <p>
                    <strong>Posted:</strong>{' '}
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-4">
                  {request.status === 'fulfilled' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      ✓ Fulfilled
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                      ⧗ Active Request
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/blood-requests/${request.id}`}
                    className="flex-1 border border-gray-300 text-center py-2 rounded-lg hover:bg-gray-50 font-medium text-sm"
                  >
                    View Details
                  </Link>

                  {!request.is_fulfilled && user?.id !== request.requester?.id && (
                    <Link
                      href={`/blood-requests/${request.id}`}
                      className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-red-700 font-medium text-sm"
                    >
                      Donate
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
}