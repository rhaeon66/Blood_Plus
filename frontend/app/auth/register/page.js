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
    <div className="bg-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="mb-4 inline-block">
            <span className="inline-block px-4 py-2 bg-primary-lighter/20 text-primary rounded-full text-sm font-semibold">
              ✨ Join Us Today
            </span>
          </div>
          <h1 className="text-heading-lg text-secondary mb-4 leading-tight">
            Become a Blood
            <span className="text-primary-gradient"> Donor Today</span>
          </h1>
          <p className="text-xl text-secondary-light max-w-2xl leading-relaxed">
            Register now and join thousands of lifesavers in Bangladesh. Your donation can save up to 3 lives.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="premium-card p-8">
          <div className="mb-8">
            <h2 className="text-heading-sm text-secondary mb-2">Create Your Account</h2>
            <p className="text-secondary-light">Fill in your details to become a blood donor</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-button mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+8801700000000"
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              {/* NID */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  NID Number *
                </label>
                <input
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Blood Group *
                </label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Division, District, Upazila */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Division *
                </label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Select Division</option>
                  {bangladeshDivisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  District *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!formData.division}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Upazila *
                </label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!formData.district}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Upazila</option>
                  {availableUpazilas.map((upazila) => (
                    <option key={upazila} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-secondary mb-2">
                Exact Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient py-3 rounded-button text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mb-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="pt-6 border-t border-border text-center">
            <p className="text-secondary-light mb-2">
              Already have an account?
            </p>
            <Link
              href="/auth/sign-in"
              className="text-primary hover:text-primary-dark font-semibold link-underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
