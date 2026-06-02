'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { user, token, logout, loadFromStorage } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    loadFromStorage();
  }, [loadFromStorage]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">BloodPlus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary hover:text-primary transition">
              Home
            </Link>
            <Link href="/blood-requests" className="text-secondary hover:text-primary transition">
              Blood Requests
            </Link>
            <Link href="/request-blood" className="text-secondary hover:text-primary transition">
              Request Blood
            </Link>
            <Link href="/about" className="text-secondary hover:text-primary transition">
              About Us
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token && user ? (
              <>
                <Link href="/profile" className="text-secondary hover:text-primary transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-secondary hover:text-primary transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blood-requests"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Blood Requests
            </Link>
            <Link
              href="/request-blood"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              Request Blood
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <hr className="my-2" />
            {token && user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-primary hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 bg-primary text-white hover:bg-red-700 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
