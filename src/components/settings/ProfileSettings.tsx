import React from 'react';
import { UserProfile, CompanyInfo } from '@/features/settings/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileSettingsProps {
  profile: UserProfile;
  companyInfo: CompanyInfo;
  onProfileChange: (newProfile: UserProfile) => void;
  onCompanyInfoChange: (newCompanyInfo: CompanyInfo) => void;
}

export default function ProfileSettings({ profile, companyInfo, onProfileChange, onCompanyInfoChange }: ProfileSettingsProps) {
  const handleProfileFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProfileChange({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyInfoFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onCompanyInfoChange({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyInfo.companyName}
                onChange={handleCompanyInfoFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select 
                name="role"
                value={companyInfo.role}
                onChange={handleCompanyInfoFieldChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option>System Administrator</option>
                <option>Operations Manager</option>
                <option>Finance Manager</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
