'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, token, loadFromStorage } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 hero-gradient relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="mb-6 inline-block">
                <span className="inline-block px-4 py-2 bg-primary-lighter/20 text-primary rounded-full text-sm font-semibold">
                  ✓ Trusted by 1000+ Donors
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
                      Find Blood Donors
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
                        <p className="text-2xl font-bold text-primary">500+</p>
                      </div>
                      <div className="p-4 bg-primary-lighter/10 rounded-button text-center">
                        <p className="text-sm text-secondary-light">Active Donors</p>
                        <p className="text-2xl font-bold text-primary">1000+</p>
                      </div>
                      <div className="p-4 bg-primary-lighter/10 rounded-button text-center">
                        <p className="text-sm text-secondary-light">Hospitals Partnered</p>
                        <p className="text-2xl font-bold text-primary">50+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Why Choose BloodPlus */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-heading-lg text-secondary mb-4">Why Choose BloodPlus?</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              The most trusted platform for blood donation in Bangladesh. Here's what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Easy Donation</h3>
              <p className="text-secondary-light leading-relaxed">
                Simple process to register and become a blood donor in just a few minutes. No hidden fees, no complexity.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-primary">→ Get started instantly</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">🔍</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Find Donors Fast</h3>
              <p className="text-secondary-light leading-relaxed">
                Advanced search and matching system to find compatible donors by blood group, location, and availability.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-primary">→ Search in real-time</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">💚</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Save Lives Now</h3>
              <p className="text-secondary-light leading-relaxed">
                Make a real difference by donating blood when it's needed most. Every donation saves up to 3 lives.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-primary">→ Impact lives today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>

      {/* Impact Statistics Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-heading-lg text-secondary mb-4">Our Impact</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              Together, we're saving lives every single day across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat Card 1 */}
            <div className="premium-card p-8 text-center hover-lift group">
              <div className="mb-4 flex justify-center">
                <div className="w-14 h-14 bg-primary-lighter/20 rounded-button flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <h3 className="text-display-md text-primary font-bold mb-2">1000+</h3>
              <p className="text-secondary-light font-medium">Active Donors</p>
              <p className="text-xs text-secondary-light mt-3">Growing community of lifesavers</p>
            </div>

            {/* Stat Card 2 */}
            <div className="premium-card p-8 text-center hover-lift group">
              <div className="mb-4 flex justify-center">
                <div className="w-14 h-14 bg-primary-lighter/20 rounded-button flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
              <h3 className="text-display-md text-primary font-bold mb-2">500+</h3>
              <p className="text-secondary-light font-medium">Lives Saved</p>
              <p className="text-xs text-secondary-light mt-3">Real lives changed forever</p>
            </div>

            {/* Stat Card 3 */}
            <div className="premium-card p-8 text-center hover-lift group">
              <div className="mb-4 flex justify-center">
                <div className="w-14 h-14 bg-primary-lighter/20 rounded-button flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="text-2xl">🏥</span>
                </div>
              </div>
              <h3 className="text-display-md text-primary font-bold mb-2">50+</h3>
              <p className="text-secondary-light font-medium">Hospitals Partner</p>
              <p className="text-xs text-secondary-light mt-3">Trusted by leading healthcare providers</p>
            </div>

            {/* Stat Card 4 */}
            <div className="premium-card p-8 text-center hover-lift group">
              <div className="mb-4 flex justify-center">
                <div className="w-14 h-14 bg-primary-lighter/20 rounded-button flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="text-2xl">🛡️</span>
                </div>
              </div>
              <h3 className="text-display-md text-primary font-bold mb-2">24/7</h3>
              <p className="text-secondary-light font-medium">Emergency Support</p>
              <p className="text-xs text-secondary-light mt-3">Always here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
}
