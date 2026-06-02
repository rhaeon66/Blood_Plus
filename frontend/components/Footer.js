'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">About</h3>
            <p className="text-gray-300 text-sm">
              BloodPlus is a modern blood donation platform dedicated to saving lives in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blood-requests" className="hover:text-primary transition">
                  Blood Requests
                </Link>
              </li>
              <li>
                <Link href="/request-blood" className="hover:text-primary transition">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Email: info@bloodplus.com</li>
              <li>Phone: +880 1700-000000</li>
              <li>Emergency: +880 1800-000000</li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Emergency</h3>
            <p className="text-gray-300 text-sm mb-4">
              In case of emergency, call our hotline immediately.
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full">
              Call Now
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; 2026 BloodPlus. All rights reserved.
            </p>
            <p className="text-primary font-semibold text-center">
              Donate Blood, Save Lives.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
