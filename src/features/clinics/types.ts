export type ClinicStatus = 'active' | 'pending' | 'inactive';

export interface Clinic {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  email: string;
  status: 'active' | 'paused' | 'discontinued';
  activePlans: number;
  revenue: string;
  joinDate: string;
  rating: number;
  reviews: number;
  patients: number;
  growth: string;
}
