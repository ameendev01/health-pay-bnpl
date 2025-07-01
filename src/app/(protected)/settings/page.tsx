'use client'

import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Save } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import BillingSettings from '@/components/settings/BillingSettings';
import GeneralSettings from '@/components/settings/GeneralSettings';
import { useSettings } from '@/features/settings/hooks/useSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { 
    profile, 
    companyInfo, 
    notifications, 
    generalSettings, 
    updateProfile, 
    updateCompanyInfo, 
    updateNotifications, 
    updateGeneralSettings,
    isLoading,
    error
  } = useSettings();

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'general', name: 'General', icon: Globe },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return <div>Loading settings...</div>; // Replace with a proper loading spinner
    }
    if (error) {
      return <div>Error loading settings.</div>; // Replace with a proper error component
    }

    switch (activeTab) {
      case 'profile':
        return <ProfileSettings 
          profile={profile} 
          companyInfo={companyInfo}
          onProfileChange={updateProfile}
          onCompanyInfoChange={updateCompanyInfo}
        />;
      case 'notifications':
        return <NotificationsSettings 
          notifications={notifications} 
          onNotificationsChange={updateNotifications}
        />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'general':
        return <GeneralSettings 
          generalSettings={generalSettings} 
          onGeneralSettingsChange={updateGeneralSettings}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and system preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      activeTab === tab.id ? 'text-teal-600' : 'text-gray-400'
                    }`} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button className="inline-flex items-center px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200">
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
