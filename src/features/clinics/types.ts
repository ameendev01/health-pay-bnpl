export type ClinicStatus = 'active' | 'pending' | 'inactive';

export interface Clinic {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  email: string;
  status: ClinicStatus;
  totalPlans: number;
  monthlyRevenue: string; // Will be number in the future
  joinDate: string;
  rating: number;
  patients: number;
  growth: string;
}
