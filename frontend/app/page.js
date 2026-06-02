'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, token, loadFromStorage } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    loadFromStorage();
  }, [loadFromStorage]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Save Lives Through Blood Donation
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          BloodPlus is a modern platform connecting blood donors with those in need. Every donation saves lives.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {token && user ? (
            <>
              <Link
                href="/blood-requests"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Browse Blood Requests
              </Link>
              <Link
                href="/request-blood"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition font-semibold"
              >
                Request Blood
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition font-semibold"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white rounded-lg shadow-sm p-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">Why Choose BloodPlus?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl text-primary mb-4">🩸</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Easy Donation</h3>
            <p className="text-gray-600">
              Simple process to register and become a blood donor in minutes.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl text-primary mb-4">🔍</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Find Donors</h3>
            <p className="text-gray-600">
              Quickly search for available donors by blood group and location.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl text-primary mb-4">💙</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Save Lives</h3>
            <p className="text-gray-600">
              Make a real difference by donating blood when needed most.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 mb-20">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">1000+</h3>
            <p className="text-gray-600">Active Donors</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-600">Hospitals Partner</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">24/7</h3>
            <p className="text-gray-600">Emergency Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}
