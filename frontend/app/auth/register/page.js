'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

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
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'division') {
        updated.district = '';
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

      const response = await api.post('/auth/register/', submitData);
      saveToStorage(response.data.access, response.data.user);
      router.push('/');
    } catch (err) {
      const errorData = err.response?.data;
      if (typeof errorData === 'object') {
        const firstError = Object.values(errorData)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError(errorData?.detail || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Create Account</h1>
        <p className="text-gray-600 mb-8">Join BloodPlus and become a blood donor</p>

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
              placeholder="+880 1700 000000"
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
              placeholder="19-digit NID"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
