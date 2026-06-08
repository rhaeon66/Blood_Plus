import React, { useState, useEffect } from 'react';

export default function ScheduleDonationModal({
  showScheduleModal,
  onClose,
  onSave,
  loading,
  error,
  success,
}) {
  const [donationData, setDonationData] = useState({
    donation_date: '',
    location: '',
    hospital: '',
    notes: '',
  });

  useEffect(() => {
    if (!showScheduleModal) {
      // Reset form data when modal closes
      setDonationData({
        donation_date: '',
        location: '',
        hospital: '',
        notes: '',
      });
    }
  }, [showScheduleModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(donationData);
  };

  if (!showScheduleModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-secondary">Schedule New Donation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Donation Date */}
          <div>
            <label htmlFor="donation_date" className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Donation Date
            </label>
            <input
              type="date"
              id="donation_date"
              name="donation_date"
              value={donationData.donation_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              Location (e.g., Blood Bank, Camp Address)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={donationData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Hospital (Optional) */}
          <div>
            <label htmlFor="hospital" className="block text-sm font-semibold text-gray-700 mb-2">
              Hospital (Optional)
            </label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              value={donationData.hospital}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={donationData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>

          <div className="mt-8 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:bg-gray-400"
            >
              {loading ? 'Scheduling...' : 'Schedule Donation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}