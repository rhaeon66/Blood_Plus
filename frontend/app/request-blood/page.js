'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
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

export default function RequestBloodPage() {
  const router = useRouter();
  const { user, token } =
    useAuthStore();

  const [formData, setFormData] =
    useState({
      patient_name: '',
      blood_group: 'O+',
      units_needed: 1,
      hospital_name: '',
      location: '',
      division: '',
      district: '',
      upazila: '',
      address: '',
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  if (!token || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">
          Please sign in to request blood.
        </p>

        <a
          href="/auth/sign-in"
          className="text-primary hover:underline font-semibold"
        >
          Sign In
        </a>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === 'division') {
        updated.district = '';
        updated.upazila = '';
      }

      if (name === 'district') {
        updated.upazila = '';
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (
      !formData.division ||
      !formData.district ||
      !formData.upazila
    ) {
      setError(
        'Please select Division, District and Upazila'
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        location: `${formData.upazila}, ${formData.district}, ${formData.division}`,
      };

      await api.post(
        '/blood-requests/',
        payload
      );

      router.push(
        '/blood-requests?success=Request created successfully'
      );
    } catch (err) {
      const errorData =
        err.response?.data;

      if (
        typeof errorData ===
        'object'
      ) {
        const firstError =
          Object.values(
            errorData
          )[0];

        setError(
          Array.isArray(
            firstError
          )
            ? firstError[0]
            : firstError
        );
      } else {
        setError(
          errorData?.detail ||
            'Failed to create request'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const availableDistricts =
    districtsByDivision[
      formData.division
    ] || [];

  const availableUpazilas =
    upazilasByDivisionDistrict[
      formData.division
    ]?.[
      formData.district
    ] || [];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-2">
        Request Blood
      </h1>

      <p className="text-gray-600 mb-8">
        Fill out the form to
        request blood for a
        patient
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white rounded-lg shadow-sm p-8"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Patient Name *
          </label>

          <input
            type="text"
            name="patient_name"
            value={
              formData.patient_name
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Blood Group *
          </label>

          <select
            name="blood_group"
            value={
              formData.blood_group
            }
            onChange={
              handleChange
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[
              'O+',
              'O-',
              'A+',
              'A-',
              'B+',
              'B-',
              'AB+',
              'AB-',
            ].map(
              (group) => (
                <option
                  key={
                    group
                  }
                  value={
                    group
                  }
                >
                  {group}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Units Needed *
          </label>

          <input
            type="number"
            name="units_needed"
            min="1"
            value={
              formData.units_needed
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Hospital Name *
          </label>

          <input
            type="text"
            name="hospital_name"
            value={
              formData.hospital_name
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Division *
          </label>

          <select
            name="division"
            value={
              formData.division
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">
              Select Division
            </option>

            {bangladeshDivisions.map(
              (
                division
              ) => (
                <option
                  key={
                    division
                  }
                  value={
                    division
                  }
                >
                  {division}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            District *
          </label>

          <select
            name="district"
            value={
              formData.district
            }
            onChange={
              handleChange
            }
            disabled={
              !formData.division
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          >
            <option value="">
              Select District
            </option>

            {availableDistricts.map(
              (
                district
              ) => (
                <option
                  key={
                    district
                  }
                  value={
                    district
                  }
                >
                  {district}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Upazila *
          </label>

          <select
            name="upazila"
            value={
              formData.upazila
            }
            onChange={
              handleChange
            }
            disabled={
              !formData.district
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          >
            <option value="">
              Select Upazila
            </option>

            {availableUpazilas.map(
              (
                upazila
              ) => (
                <option
                  key={
                    upazila
                  }
                  value={
                    upazila
                  }
                >
                  {upazila}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-2">
            Exact Address *
          </label>

          <textarea
            name="address"
            rows={3}
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={
            loading
          }
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
        >
          {loading
            ? 'Submitting...'
            : 'Request Blood'}
        </button>
      </form>
    </div>
  );
}