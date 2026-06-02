'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading-md text-white mb-3">Stay Updated</h3>
              <p className="text-secondary-light">
                Get notified about blood requests and donation opportunities in your area.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-button text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-gradient-red text-white px-6 py-3 rounded-button font-semibold hover:shadow-red-glow transition-all duration-300"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-red rounded-button flex items-center justify-center">
                <span className="text-white text-lg font-bold">🩸</span>
              </div>
              <span className="text-xl font-bold bg-gradient-red bg-clip-text text-transparent">
                BloodPlus
              </span>
            </div>
            <p className="text-secondary-light leading-relaxed mb-6">
              Saving lives through blood donation. A modern platform dedicated to connecting donors with those in urgent need.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-secondary-light/20 hover:bg-primary rounded-button flex items-center justify-center transition-all duration-300">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-light/20 hover:bg-primary rounded-button flex items-center justify-center transition-all duration-300">
                <span className="text-sm">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-light/20 hover:bg-primary rounded-button flex items-center justify-center transition-all duration-300">
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-secondary-light hover:text-primary transition-colors duration-300 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blood-requests" className="text-secondary-light hover:text-primary transition-colors duration-300 font-medium">
                  Find Blood
                </Link>
              </li>
              <li>
                <Link href="/request-blood" className="text-secondary-light hover:text-primary transition-colors duration-300 font-medium">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-light hover:text-primary transition-colors duration-300 font-medium">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-secondary-light">
              <li className="flex gap-3">
                <span>📧</span>
                <a href="mailto:info@bloodplus.com" className="hover:text-primary transition-colors duration-300">
                  info@bloodplus.com
                </a>
              </li>
              <li className="flex gap-3">
                <span>📱</span>
                <a href="tel:+88017000000" className="hover:text-primary transition-colors duration-300">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex gap-3">
                <span>🚨</span>
                <a href="tel:+88018000000" className="hover:text-primary transition-colors duration-300">
                  +880 1800-000000
                </a>
              </li>
              <li className="flex gap-3">
                <span>📍</span>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Emergency CTA */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Emergency</h4>
            <p className="text-secondary-light mb-6">
              Need blood urgently? Our team is available 24/7 to help you.
            </p>
            <button className="w-full bg-gradient-red text-white px-6 py-3 rounded-button font-semibold hover:shadow-red-glow transition-all duration-300 hover:scale-105 transform">
              Call Emergency
            </button>
            <p className="text-xs text-secondary-light mt-4">
              Response time: &lt;15 minutes
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-light/20 pt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-secondary-light text-sm">
            <p>&copy; 2026 BloodPlus. All rights reserved.</p>
            <p className="mt-2">
              <Link href="#" className="hover:text-primary transition-colors duration-300 mr-4">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-primary font-semibold text-lg">
              🩸 Donate Blood, Save Lives
            </p>
            <p className="text-secondary-light text-sm mt-1">
              Every donation saves up to 3 lives
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
