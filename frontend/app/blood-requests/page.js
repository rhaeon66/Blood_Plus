'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

const BLOOD_GROUPS = [
  'O+',
  'O-',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
];

export default function BloodRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bloodGroup, setBloodGroup] = useState('');
  const [showFulfilled, setShowFulfilled] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await api.get('/blood-requests/');

      const data = response.data;

      if (Array.isArray(data)) {
        setRequests(data);
      } else if (
        data &&
        Array.isArray(data.results)
      ) {
        setRequests(data.results);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error(
        'Failed to load blood requests',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const bloodMatch =
        !bloodGroup ||
        request.blood_group === bloodGroup;

      const fulfilledMatch =
        showFulfilled ||
        !request.is_fulfilled;

      return (
        bloodMatch &&
        fulfilledMatch
      );
    });
  }, [
    requests,
    bloodGroup,
    showFulfilled,
  ]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Blood Requests
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">
            Blood Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Find patients currently looking for blood donors.
          </p>
        </div>

        <Link
          href="/blood-requests/create"
          className="bg-primary text-white px-5 py-3 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Create Request
        </Link>
      </div>

      {/* Filters */}

      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Blood Group
            </label>

            <select
              value={bloodGroup}
              onChange={(e) =>
                setBloodGroup(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                All Blood Groups
              </option>

              {BLOOD_GROUPS.map(
                (group) => (
                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showFulfilled}
                onChange={() =>
                  setShowFulfilled(
                    !showFulfilled
                  )
                }
              />

              <span>
                Show fulfilled requests
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Empty State */}

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h2 className="text-xl font-semibold mb-2">
            No requests found
          </h2>

          <p className="text-gray-600">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map(
            (request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">
                    {
                      request.patient_name
                    }
                  </h3>

                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {
                      request.blood_group
                    }
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>
                      Hospital:
                    </strong>{' '}
                    {
                      request.hospital_name
                    }
                  </p>

                  <p>
                    <strong>
                      Location:
                    </strong>{' '}
                    {
                      request.location
                    }
                  </p>

                  <p>
                    <strong>
                      Units:
                    </strong>{' '}
                    {
                      request.units_needed
                    }
                  </p>

                  {request.required_date && (
                    <p>
                      <strong>
                        Needed By:
                      </strong>{' '}
                      {new Date(
                        request.required_date
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  {request.is_fulfilled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Fulfilled
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                      Active Request
                    </span>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/blood-requests/${request.id}`}
                    className="flex-1 border border-gray-300 text-center py-2 rounded-lg hover:bg-gray-50"
                  >
                    View
                  </Link>

                  {!request.is_fulfilled && (
                    <Link
                      href={`/blood-requests/${request.id}`}
                      className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-red-700"
                    >
                      Donate
                    </Link>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}