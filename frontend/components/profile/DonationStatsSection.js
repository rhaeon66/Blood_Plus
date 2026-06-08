import React from 'react';

export default function DonationStatsSection({ profile, donationHistory, getLastDonationDate }) {
  return (
    <div className="premium-card p-8">
      <h2 className="text-heading-sm text-secondary mb-6">Donation Stats</h2>
      <div className="space-y-4">
        <div className="bg-primary bg-opacity-10 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-primary">{donationHistory.length}</p>
          <p className="text-gray-600 text-sm">Times Donated</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{profile.blood_group}</p>
          <p className="text-gray-600 text-sm">Blood Type</p>
        </div>
        {getLastDonationDate() && (
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-blue-600">Last Donated</p>
            <p className="text-lg font-bold text-blue-700 mt-1">{getLastDonationDate()}</p>
          </div>
        )}
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold">
          Schedule Donation
        </button>
      </div>
    </div>
  );
}