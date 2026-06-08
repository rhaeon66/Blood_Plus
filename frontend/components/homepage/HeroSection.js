'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function HeroSection() {
  const { user, token, loadFromStorage } = useAuthStore();
  const [stats, setStats] = useState({
    lives_saved: 0,
    active_donors: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
    fetchStats();
  }, [loadFromStorage]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await api.get(
        '/auth/statistics/summary/'
      );
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setStats({
        lives_saved: 0,
        active_donors: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 hero-gradient relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-6 inline-block">
              <span className="inline-block px-4 py-2 bg-primary-lighter/20 text-primary rounded-full text-sm font-semibold">
                ✓ Trusted by {statsLoading ? '-' : stats.active_donors}+ Donors
              </span>
            </div>
            
            <h1 className="text-display-lg text-secondary mb-6 leading-tight">
              Save Lives Through Blood
              <span className="text-primary-gradient"> Donation</span>
            </h1>
            
            <p className="text-xl text-secondary-light mb-8 max-w-lg leading-relaxed">
              BloodPlus connects compassionate donors with those in urgent need. Every donation is a gift of life. Join our community of lifesavers today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {token && user ? (
                <>
                  <Link
                    href="/blood-requests"
                    className="btn-gradient px-8 py-4 rounded-button text-lg font-semibold inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300"
                  >
                    <span>🔍</span>
                    Donate Blood Now
                  </Link>
                  <Link
                    href="/request-blood"
                    className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-button text-lg font-semibold inline-flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <span>🆘</span>
                    Request Blood Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    className="btn-gradient px-8 py-4 rounded-button text-lg font-semibold inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300"
                  >
                    <span>🔐</span>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-button text-lg font-semibold inline-flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <span>✨</span>
                    Join Now - It's Free
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-secondary-light font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-secondary-light font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-secondary-light font-medium">HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in">
            <div className="relative w-full max-w-md">
              {/* Gradient Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-red opacity-10 rounded-full blur-3xl"></div>
              
              {/* Hero Illustration */}
              <div className="relative z-10 bg-white rounded-card shadow-lg p-12 glass">
                <div className="space-y-8">
                  {/* Blood Drop */}
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-red rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-5xl">🩸</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="p-4 bg-primary-lighter/10 rounded-button text-center">
                      <p className="text-sm text-secondary-light">Lives Saved</p>
                      <p className="text-2xl font-bold text-primary">
                        {statsLoading ? '-' : stats.lives_saved}
                        {!statsLoading && stats.lives_saved > 0 && '+'}
                      </p>
                    </div>
                    <div className="p-4 bg-primary-lighter/10 rounded-button text-center">
                      <p className="text-sm text-secondary-light">Active Donors</p>
                      <p className="text-2xl font-bold text-primary">
                        {statsLoading ? '-' : stats.active_donors}
                        {!statsLoading && stats.active_donors > 0 && '+'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}