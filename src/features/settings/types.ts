export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CompanyInfo {
  companyName: string;
  role: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface GeneralSettings {
  timezone: string;
  dateFormat: string;
  currency: string;
}
