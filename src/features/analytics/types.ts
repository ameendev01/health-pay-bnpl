export interface RevenueData {
  month: string;
  amount: number;
  plans: number;
  clinics: number;
}

export interface ClinicPerformanceData {
  name: string;
  revenue: number;
  plans: number;
  growth: number;
  defaultRate: number;
  avgPayment: number;
}

export interface ProcedureData {
  name: string;
  count: number;
  revenue: number;
  avgAmount: number;
  growth: number;
}

export interface GeographicData {
  state: string;
  revenue: number;
  clinics: number;
  plans: number;
  growth: number;
}

export interface PaymentPerformanceMetric {
  metric: string;
  value: number;
  trend: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

export interface RiskMetric {
  clinic: string;
  riskScore: number;
  trend: number;
  status: 'low' | 'medium' | 'high';
}

export interface HourlyPaymentData {
  hour: string;
  payments: number;
  amount: number;
}

export interface WeeklyPerformanceData {
  day: string;
  payments: number;
  amount: number;
  completion: number;
}
