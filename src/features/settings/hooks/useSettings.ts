import { useState } from 'react';
import { initialProfile, initialNotifications, initialCompanyInfo, initialGeneralSettings } from '../constants';
import { UserProfile, NotificationSettings, CompanyInfo, GeneralSettings } from '../types';

export function useSettings() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialCompanyInfo);
  const [notifications, setNotifications] = useState<NotificationSettings>(initialNotifications);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(initialGeneralSettings);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    // In a real app, you'd make an API call here
    // Avoid logging potentially sensitive user data
  };

  const updateCompanyInfo = (newCompanyInfo: CompanyInfo) => {
    setCompanyInfo(newCompanyInfo);
    // Avoid logging company data in client console
  };

  const updateNotifications = (newNotifications: NotificationSettings) => {
    setNotifications(newNotifications);
    // Avoid logging notification preferences
  };

  const updateGeneralSettings = (newGeneralSettings: GeneralSettings) => {
    setGeneralSettings(newGeneralSettings);
    // Avoid logging general settings
  };

  return {
    profile,
    companyInfo,
    notifications,
    generalSettings,
    updateProfile,
    updateCompanyInfo,
    updateNotifications,
    updateGeneralSettings,
    isLoading: false,
    error: null,
  };
}
