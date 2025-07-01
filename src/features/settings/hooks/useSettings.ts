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
    console.log('Updating profile:', newProfile);
  };

  const updateCompanyInfo = (newCompanyInfo: CompanyInfo) => {
    setCompanyInfo(newCompanyInfo);
    console.log('Updating company info:', newCompanyInfo);
  };

  const updateNotifications = (newNotifications: NotificationSettings) => {
    setNotifications(newNotifications);
    console.log('Updating notifications:', newNotifications);
  };

  const updateGeneralSettings = (newGeneralSettings: GeneralSettings) => {
    setGeneralSettings(newGeneralSettings);
    console.log('Updating general settings:', newGeneralSettings);
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
