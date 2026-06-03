'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';
import locationData from '@/app/bangladesh_upazilas.json';

const bangladeshDivisions = locationData.divisions.map(
  (division) => division.name
);

const districtsByDivision = {};
const upazilasByDivisionDistrict = {};

locationData.divisions.forEach((division) => {
  districtsByDivision[division.name] = division.districts.map(
    (district) => district.name
  );

  upazilasByDivisionDistrict[division.name] = {};

  division.districts.forEach((district) => {
    upazilasByDivisionDistrict[division.name][district.name] =
      district.upazilas;
  });
});

export default function RegisterPage() {
  const router = useRouter();
  const { saveToStorage } = useAuthStore();

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    nid: '',
    blood_group: 'O+',
    division: '',
    district: '',
    upazila: '',
    address: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === 'division') {
        updated.district = '';
        updated.upazila = '';
      }

      if (name === 'district') {
        updated.upazila = '';
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    if (
      !formData.division ||
      !formData.district ||
      !formData.upazila
    ) {
      setError('Please select Division, District and Upazila');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        nid: formData.nid,
        blood_group: formData.blood_group,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        address: formData.address,
        password: formData.password,
        confirm_password: formData.confirm_password,
      };

      const response = await api.post(
        '/auth/register/',
        submitData
      );

      saveToStorage(
        response.data.access,
        response.data.user
      );

      router.push('/');
    } catch (err) {
      const errorData = err.response?.data;

      const formatError = (data) => {
        if (!data) return 'Registration failed';

        if (typeof data === 'string') return data;

        if (Array.isArray(data)) return data[0];

        if (typeof data === 'object') {
          const first = Object.values(data)[0];

          if (Array.isArray(first)) return first[0];

          if (typeof first === 'string') return first;
        }

        return 'Registration failed';
      };

      setError(
        formatError(errorData) ||
          errorData?.detail ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const availableDistricts =
    districtsByDivision[formData.division] || [];

  const availableUpazilas =
    upazilasByDivisionDistrict[
      formData.division
    ]?.[formData.district] || [];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Create Account
        </h1>

        <p className="text-gray-600 mb-8">
          Join BloodPlus and become a blood donor
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Full Name *
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+8801700000000"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* NID */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              NID Number *
            </label>

            <input
              type="text"
              name="nid"
              value={formData.nid}
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
              {[
                'O+',
                'O-',
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
              ].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
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

              {bangladeshDivisions.map((division) => (
                <option
                  key={division}
                  value={division}
                >
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              District *
            </label>

            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.division}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
            >
              <option value="">
                Select District
              </option>

              {availableDistricts.map((district) => (
                <option
                  key={district}
                  value={district}
                >
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Upazila *
            </label>

            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!formData.district}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
            >
              <option value="">
                Select Upazila
              </option>

              {availableUpazilas.map((upazila) => (
                <option
                  key={upazila}
                  value={upazila}
                >
                  {upazila}
                </option>
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
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Password *
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">
              Confirm Password *
            </label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            href="/auth/sign-in"
            className="text-primary hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}