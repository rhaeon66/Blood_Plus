'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function StatisticsSection() {
  const [stats, setStats] = useState({
    lives_saved: 0,
    active_donors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        '/auth/statistics/summary/'
      );
      setStats(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to load statistics');
      // Set default values on error
      setStats({
        lives_saved: 0,
        active_donors: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-secondary-light max-w-2xl mx-auto">
            Together, we're saving lives and building a healthier community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Lives Saved */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-4xl">💧</span>
              </div>
            </div>
            <p className="text-secondary-light font-medium mb-2">
              Lives Saved
            </p>
            <p className="text-5xl font-bold text-primary">
              {loading ? '-' : stats.lives_saved}
              {!loading && stats.lives_saved > 0 && '+'}
            </p>
            <p className="text-sm text-secondary-light mt-2">
              {loading
                ? 'Loading...'
                : `${stats.lives_saved} lives saved through donations`}
            </p>
          </div>

          {/* Active Donors */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-4xl">🫂</span>
              </div>
            </div>
            <p className="text-secondary-light font-medium mb-2">
              Active Donors
            </p>
            <p className="text-5xl font-bold text-primary">
              {loading ? '-' : stats.active_donors}
              {!loading && stats.active_donors > 0 && '+'}
            </p>
            <p className="text-sm text-secondary-light mt-2">
              {loading
                ? 'Loading...'
                : `${stats.active_donors} verified donors in our community`}
            </p>
          </div>
        </div>

        {error && (
          <p className="text-center text-red-600 mt-4 text-sm">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
