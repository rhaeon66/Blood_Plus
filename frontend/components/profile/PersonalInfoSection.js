import React from 'react';

export default function PersonalInfoSection({ profile, onEditClick }) {
  return (
    <div className="premium-card p-8 md:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-heading-sm text-secondary">Personal Information</h2>
        <button
          onClick={onEditClick}
          className="text-primary hover:text-primary-dark font-semibold text-sm"
        >
          ✏ Edit
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">Full Name</span>
          <span className="text-secondary">{profile.first_name} {profile.last_name}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">Phone Number</span>
          <span className="text-secondary">{profile.phone_number}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">NID</span>
          <span className="text-secondary">{profile.nid}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">Blood Group</span>
          <span className="text-primary font-bold text-lg">{profile.blood_group}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">Division</span>
          <span className="text-secondary">{profile.division}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">District</span>
          <span className="text-secondary">{profile.district}</span>
        </div>
        <div className="flex justify-between border-b border-border pb-4">
          <span className="font-semibold text-secondary-light">Upazila</span>
          <span className="text-secondary">{profile.upazila}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-secondary-light">Address</span>
          <span className="text-secondary">{profile.address}</span>
        </div>
      </div>
    </div>
  );
}