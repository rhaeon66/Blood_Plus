import React from 'react';

export default function DonationHistorySection({ donationHistory }) {
  return (
    <div className="premium-card p-8">
      <h2 className="text-heading-sm text-secondary mb-6">Donation History</h2>
      {donationHistory.length === 0 ? (
        <p className="text-gray-600">No donations yet. Start donating today!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Hospital</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map(donation => (
                <tr key={donation.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(donation.donation_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{donation.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{donation.hospital}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}