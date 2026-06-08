'use client';

import HeroSection from '@/components/homepage/HeroSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import CallToActionSection from '@/components/homepage/CallToActionSection';
import StatisticsSection from '@/components/homepage/StatisticsSection';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-bg-primary">
      <HeroSection />

      {/* Section Divider */}
      <div className="section-divider max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>

      <FeaturesSection />

      {/* Impact Statistics Section - Dynamic */}
      <StatisticsSection />

      <CallToActionSection />
    </div>
  );
}
