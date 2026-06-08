'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import locationData from '@/app/bangladesh_upazilas.json';

const bangladeshDivisions = locationData.divisions.map(
  (division) => division.name
);

const districtsByDivision = {};
const upazilasByDivisionDistrict = {};

locationData.divisions.forEach((division) => {
  districtsByDivision[division.name] =
    division.districts.map(
      (district) => district.name
    );

  upazilasByDivisionDistrict[
    division.name
  ] = {};

  division.districts.forEach(
    (district) => {
      upazilasByDivisionDistrict[
        division.name
      ][district.name] =
        district.upazilas;
    }
  );
});

const BLOOD_GROUPS = [
  'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-',
];

export default function BloodRequestForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_group: '',
    contact_number: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    required_date: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    if (selectedDivision) {
      setDistricts(districtsByDivision[selectedDivision] || []);
      setSelectedDistrict('');
      setUpazilas([]);
    } else {
      setDistricts([]);
      setSelectedDistrict('');
      setUpazilas([]);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDivision && selectedDistrict) {
      setUpazilas(upazilasByDivisionDistrict[selectedDivision][selectedDistrict] || []);
    } else {
      setUpazilas([]);
    }
  }, [selectedDivision, selectedDistrict]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'division') {
      setSelectedDivision(value);
      setFormData((prev) => ({ ...prev, district: '', upazila: '' }));
    } else if (name === 'district') {
      setSelectedDistrict(value);
      setFormData((prev) => ({ ...prev, upazila: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/blood_requests/', formData);
      setSuccess('Blood request submitted successfully!');
      setFormData({
        patient_name: '',
        blood_group: '',
        contact_number: '',
        division: '',
        district: '',
        upazila: '',
        address: '',
        required_date: '',
        reason: '',
      });
      setSelectedDivision('');
      setSelectedDistrict('');
      router.push('/blood-requests'); // Redirect to blood requests list
    } catch (err) {
      console.error('Blood request submission error:', err);
      const errorData = err.response?.data;
      if (errorData) {
        const messages = Object.values(errorData).flat().join(' ');
        setError(messages);
      } else {
        setError('Failed to submit blood request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="premium-card p-8">
        <h2 className="text-heading-sm text-secondary mb-6">Request Blood</h2>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label htmlFor="patient_name" className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              id="patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="blood_group" className="block text-sm font-semibold text-gray-700 mb-2">
              Required Blood Group
            </label>
            <select
              id="blood_group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contact_number" className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="+8801XXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Division */}
          <div>
            <label htmlFor="division" className="block text-sm font-semibold text-gray-700 mb-2">
              Division
            </label>
            <select
              id="division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Division</option>
              {bangladeshDivisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={!selectedDivision}
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label htmlFor="upazila" className="block text-sm font-semibold text-gray-700 mb-2">
              Upazila
            </label>
            <select
              id="upazila"
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={!selectedDistrict}
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Address (e.g., Street, House No.)
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* Required Date */}
          <div>
            <label htmlFor="required_date" className="block text-sm font-semibold text-gray-700 mb-2">
              When is the blood required?
            </label>
            <input
              type="date"
              id="required_date"
              name="required_date"
              value={formData.required_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
              Reason for Request (Optional)
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-gradient w-full px-8 py-3 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Blood Request'}
          </button>
        </form>
      </div>
    </div>
  );
}