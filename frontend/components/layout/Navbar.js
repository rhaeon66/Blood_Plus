'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, logout, loadFromStorage } = useAuthStore();

  const isActive = (path) => {
    return pathname === path;
  };

  useEffect(() => {
    setIsMounted(true);
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-subtle'
          : 'bg-white/80 backdrop-blur-md border-b border-border/20'
      }`}
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo with Icon */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
              <span className="text-white text-lg font-bold">🩸</span>
            </div>
            <span className="text-xl font-bold bg-gradient-red bg-clip-text text-transparent hidden sm:inline">
              BloodPlus
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            <Link
              href="/"
              className={`link-underline font-medium transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-primary font-bold' 
                  : 'text-secondary-light hover:text-primary'
              }`}
            >
              Home
            </Link>
            {token && user && (
              <Link
                href="/profile"
                className={`link-underline font-medium transition-colors duration-300 ${
                  isActive('/profile')
                    ? 'text-primary font-bold'
                    : 'text-secondary-light hover:text-primary'
                }`}
              >
                Profile
              </Link>
            )}
            <Link
              href="/blood-requests"
              className={`link-underline font-medium transition-colors duration-300 ${
                isActive('/blood-requests')
                  ? 'text-primary font-bold'
                  : 'text-secondary-light hover:text-primary'
              }`}
            >
              Blood Requests
            </Link>
            <Link
              href="/request-blood"
              className={`link-underline font-medium transition-colors duration-300 ${
                isActive('/request-blood')
                  ? 'text-primary font-bold'
                  : 'text-secondary-light hover:text-primary'
              }`}
            >
              Request Blood
            </Link>
            <Link
              href="/about"
              className={`link-underline font-medium transition-colors duration-300 ${
                isActive('/about')
                  ? 'text-primary font-bold'
                  : 'text-secondary-light hover:text-primary'
              }`}
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {token && user ? (
              <button
                onClick={handleLogout}
                className="btn-gradient px-6 py-2.5 text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="btn-ghost px-6 py-2.5 text-sm font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-gradient px-6 py-2.5 text-sm font-semibold"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 text-secondary hover:text-primary transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-all duration-300 ${isOpen ? 'rotate-45' : ''}`}
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-white border-b border-border shadow-lg animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2 transition-colors duration-300 ${
                  isActive('/') 
                    ? 'text-primary font-bold' 
                    : 'text-secondary-light hover:text-primary'
                }`}
              >
                Home
              </Link>
              {token && user && (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors duration-300 ${
                    isActive('/profile')
                      ? 'text-primary font-bold'
                      : 'text-secondary-light hover:text-primary'
                  }`}
                >
                  Profile
                </Link>
              )}
              <Link
                href="/blood-requests"
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2 transition-colors duration-300 ${
                  isActive('/blood-requests')
                    ? 'text-primary font-bold'
                    : 'text-secondary-light hover:text-primary'
                }`}
              >
                Find Blood
              </Link>
              <Link
                href="/request-blood"
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2 transition-colors duration-300 ${
                  isActive('/request-blood')
                    ? 'text-primary font-bold'
                    : 'text-secondary-light hover:text-primary'
                }`}
              >
                Request Blood
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2 transition-colors duration-300 ${
                  isActive('/about')
                    ? 'text-primary font-bold'
                    : 'text-secondary-light hover:text-primary'
                }`}
              >
                About
              </Link>

              <div className="border-t border-border pt-4 mt-4 space-y-3">
                {token && user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="btn-gradient w-full py-2.5 text-sm font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/auth/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="btn-ghost w-full py-2.5 text-sm font-semibold text-center block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="btn-gradient w-full py-2.5 text-sm font-semibold text-center block"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
