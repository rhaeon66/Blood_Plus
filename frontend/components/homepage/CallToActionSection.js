'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';

export default function CallToActionSection() {
  const { user, token } = useAuthStore();

  return (
    <section className="py-20 md:py-32 bg-gradient-red">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-heading-lg text-white mb-6">Ready to Make a Difference?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of donors saving lives every day. Your contribution matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {token && user ? (
            <>
              <Link
                href="/request-blood"
                className="bg-white text-primary px-8 py-4 rounded-button text-lg font-semibold hover:bg-bg-primary transition-all duration-300 hover:shadow-lg inline-block"
              >
                Request Blood
              </Link>
              <Link
                href="/blood-requests"
                className="border-2 border-white text-white px-8 py-4 rounded-button text-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-block"
              >
                Become a Donor
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="bg-white text-primary px-8 py-4 rounded-button text-lg font-semibold hover:bg-bg-primary transition-all duration-300 hover:shadow-lg inline-block"
              >
                Get Started
              </Link>
              <Link
                href="/auth/sign-in"
                className="border-2 border-white text-white px-8 py-4 rounded-button text-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-block"
              >
                Already a Member
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}