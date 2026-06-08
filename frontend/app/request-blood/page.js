'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import SignInPrompt from '@/components/request-blood-page/SignInPrompt';
import BloodRequestForm from '@/components/request-blood-page/BloodRequestForm';

export default function RequestBloodPage() {
  const { token, isInitialized, loadFromStorage } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
  }, [loadFromStorage]);

  if (!mounted || !isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <h1 className="text-heading-lg text-secondary mb-4 leading-tight">
            Request
            <span className="text-primary-gradient"> Life-Saving Blood</span>
          </h1>
          <p className="text-xl text-secondary-light max-w-2xl leading-relaxed">
            Fill out the form below to request blood for your patient. Our network of donors will respond quickly to help.
          </p>
        </div>
      </section>

      {token ? <BloodRequestForm /> : <SignInPrompt />}
    </div>
  );
}