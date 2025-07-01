import { Clinic } from './types';

export const clinics: Clinic[] = [
  {
    id: 1,
    name: 'Sunrise Medical Center',
    type: 'General Practice',
    location: 'Los Angeles, CA',
    phone: '(555) 123-4567',
    email: 'contact@sunrisemedical.com',
    status: 'active',
    totalPlans: 45,
    monthlyRevenue: '$125,000',
    joinDate: '2023-01-15',
    rating: 4.8,
    patients: 1250,
    growth: '+12.5%'
  },
  {
    id: 2,
    name: 'Valley Health Clinic',
    type: 'Family Medicine',
    location: 'Phoenix, AZ',
    phone: '(555) 234-5678',
    email: 'info@valleyhealth.com',
    status: 'active',
    totalPlans: 32,
    monthlyRevenue: '$89,500',
    joinDate: '2023-03-22',
    rating: 4.6,
    patients: 890,
    growth: '+8.2%'
  },
  {
    id: 3,
    name: 'Metro Dental Care',
    type: 'Dental',
    location: 'Denver, CO',
    phone: '(555) 345-6789',
    email: 'hello@metrodental.com',
    status: 'active',
    totalPlans: 28,
    monthlyRevenue: '$67,800',
    joinDate: '2023-02-10',
    rating: 4.9,
    patients: 650,
    growth: '-2.1%'
  },
  {
    id: 4,
    name: 'Family Health Partners',
    type: 'Pediatrics',
    location: 'Austin, TX',
    phone: '(555) 456-7890',
    email: 'support@familyhealth.com',
    status: 'pending',
    totalPlans: 0,
    monthlyRevenue: '$0',
    joinDate: '2024-01-08',
    rating: 0,
    patients: 0,
    growth: '0%'
  },
  {
    id: 5,
    name: 'Westside Cardiology',
    type: 'Cardiology',
    location: 'San Diego, CA',
    phone: '(555) 567-8901',
    email: 'admin@westsidecardio.com',
    status: 'active',
    totalPlans: 67,
    monthlyRevenue: '$198,400',
    joinDate: '2022-11-30',
    rating: 4.7,
    patients: 2100,
    growth: '+15.7%'
  }
];
