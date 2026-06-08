'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

export default function SignInPage() {
  const router = useRouter();
  const { saveToStorage } = useAuthStore();
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login/', formData);
      saveToStorage(response.data.access, response.data.user);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid phone number or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="mb-4 inline-block">
            <span className="inline-block px-4 py-2 bg-primary-lighter/20 text-primary rounded-full text-sm font-semibold">
              🔐 Sign In to BloodPlus
            </span>
          </div>
          <h1 className="text-heading-lg text-secondary mb-4 leading-tight">
            Welcome
            <span className="text-primary-gradient"> Back</span>
          </h1>
          <p className="text-xl text-secondary-light max-w-2xl leading-relaxed">
            Sign in to your account and continue your mission to save lives. Every moment counts.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="premium-card p-8">
          <div className="mb-8">
            <h2 className="text-heading-sm text-secondary mb-2">Sign In</h2>
            <p className="text-secondary-light">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-button mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div className="mb-6">
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

            {/* Password */}
            <div className="mb-8">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient py-3 rounded-button text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-secondary-light mb-2">
              Don't have an account?
            </p>
            <Link href="/auth/register" className="text-primary hover:text-primary-dark font-semibold link-underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}