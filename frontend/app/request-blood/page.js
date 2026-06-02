'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import api from '@/lib/api';

const bangladeshDivisions = [
  'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

const districtsByDivision = {
  'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
  'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Rangamati', 'Bandarban'],
  'Khulna': ['Khulna', 'Bagerhat', 'Satkhira', 'Jhenaidah'],
  'Rajshahi': ['Rajshahi', 'Bogra', 'Natore', 'Naogaon'],
  'Barisal': ['Barisal', 'Patuakhali', 'Pirojpur', 'Bhola'],
  'Sylhet': ['Sylhet', 'Moulvibazar', 'Sunamganj', 'Habiganj'],
  'Rangpur': ['Rangpur', 'Dinajpur', 'Nilphamari', 'Thakurgaon'],
  'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

const upazilas = ['Upazila 1', 'Upazila 2', 'Upazila 3', 'Upazila 4'];

export default function RequestBloodPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_group: 'O+',
    units_needed: 1,
    hospital_name: '',
    location: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!token || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">Please sign in to request blood.</p>
        <a href="/auth/sign-in" className="text-primary hover:underline font-semibold">
          Sign In
        </a>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'division') {
        updated.district = '';
        updated.upazila = '';
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/blood-requests/', formData);
      router.push('/blood-requests?success=Request created successfully');
    } catch (err) {
      const errorData = err.response?.data;
      if (typeof errorData === 'object') {
        const firstError = Object.values(errorData)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError(errorData?.detail || 'Failed to create request');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-2">Request Blood</h1>
      <p className="text-gray-600 mb-8">Fill out the form to request blood for a patient</p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
        {/* Patient Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Blood Group */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Blood Group *
          </label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Units Needed */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Units Needed *
          </label>
          <input
            type="number"
            name="units_needed"
            value={formData.units_needed}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Hospital Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Hospital Name *
          </label>
          <input
            type="text"
            name="hospital_name"
            value={formData.hospital_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Division */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Division *
          </label>
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Division</option>
            {bangladeshDivisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>

        {/* District */}
        {formData.division && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              District *
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select District</option>
              {(districtsByDivision[formData.division] || []).map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        )}

        {/* Upazila */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Upazila *
          </label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(upazila => (
              <option key={upazila} value={upazila}>{upazila}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Exact Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Request Blood'}
        </button>
      </form>
    </div>
  );
}
