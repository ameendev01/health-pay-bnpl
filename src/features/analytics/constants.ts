import { 
  RevenueData, 
  ClinicPerformanceData, 
  ProcedureData, 
  GeographicData, 
  PaymentPerformanceMetric, 
  RiskMetric, 
  HourlyPaymentData, 
  WeeklyPerformanceData 
} from './types';

export const chartData = {
  revenue: [
    { month: 'Jan', amount: 185000, plans: 234, clinics: 45 },
    { month: 'Feb', amount: 220000, plans: 287, clinics: 48 },
    { month: 'Mar', amount: 195000, plans: 256, clinics: 52 },
    { month: 'Apr', amount: 260000, plans: 345, clinics: 55 },
    { month: 'May', amount: 245000, plans: 312, clinics: 58 },
    { month: 'Jun', amount: 290000, plans: 398, clinics: 62 },
  ] as RevenueData[],
  clinicPerformance: [
    { name: 'Sunrise Medical', revenue: 125000, plans: 45, growth: 12.5, defaultRate: 2.1, avgPayment: 2780 },
    { name: 'Valley Health', revenue: 89500, plans: 32, growth: 8.2, defaultRate: 1.8, avgPayment: 2797 },
    { name: 'Metro Dental', revenue: 67800, plans: 28, growth: -2.1, defaultRate: 3.2, avgPayment: 2421 },
    { name: 'Westside Cardiology', revenue: 198400, plans: 67, growth: 15.7, defaultRate: 1.2, avgPayment: 2963 },
    { name: 'Family Health', revenue: 45200, plans: 18, growth: 22.3, defaultRate: 2.8, avgPayment: 2511 },
  ] as ClinicPerformanceData[],
  procedures: [
    { name: 'Dental Implants', count: 145, revenue: 348000, avgAmount: 2400, growth: 18.5 },
    { name: 'Orthodontic Treatment', count: 89, revenue: 160200, avgAmount: 1800, growth: 12.3 },
    { name: 'Cardiac Surgery', count: 23, revenue: 126500, avgAmount: 5500, growth: 8.7 },
    { name: 'Cosmetic Surgery', count: 67, revenue: 201000, avgAmount: 3000, growth: 25.1 },
    { name: 'Root Canal', count: 78, revenue: 66300, avgAmount: 850, growth: -5.2 },
  ] as ProcedureData[],
  geographic: [
    { state: 'California', revenue: 785000, clinics: 28, plans: 324, growth: 15.2 },
    { state: 'Texas', revenue: 456000, clinics: 18, plans: 198, growth: 22.1 },
    { state: 'Florida', revenue: 324000, clinics: 12, plans: 145, growth: 8.9 },
    { state: 'New York', revenue: 298000, clinics: 14, plans: 134, growth: 11.4 },
    { state: 'Arizona', revenue: 187000, clinics: 8, plans: 89, growth: 18.7 },
  ] as GeographicData[],
  paymentPerformance: [
    { metric: 'On-Time Payments', value: 94.2, trend: 2.1, status: 'excellent' },
    { metric: 'Default Rate', value: 2.8, trend: -0.5, status: 'good' },
    { metric: 'Early Payments', value: 18.3, trend: 3.2, status: 'excellent' },
    { metric: 'Late Payments', value: 5.8, trend: -1.2, status: 'good' },
    { metric: 'Collection Rate', value: 97.2, trend: 1.8, status: 'excellent' },
    { metric: 'Average Days Late', value: 3.2, trend: -0.8, status: 'good' },
  ] as PaymentPerformanceMetric[],
  riskMetrics: [
    { clinic: 'Sunrise Medical', riskScore: 15, trend: -2, status: 'low' },
    { clinic: 'Valley Health', riskScore: 28, trend: 3, status: 'medium' },
    { clinic: 'Metro Dental', riskScore: 45, trend: 8, status: 'high' },
    { clinic: 'Family Health', riskScore: 22, trend: -1, status: 'medium' },
    { clinic: 'Westside Cardiology', riskScore: 12, trend: -5, status: 'low' },
  ] as RiskMetric[]
};

export const timeAnalytics = {
  hourly: [
    { hour: '9AM', payments: 45, amount: 12500 },
    { hour: '10AM', payments: 67, amount: 18900 },
    { hour: '11AM', payments: 89, amount: 24500 },
    { hour: '12PM', payments: 78, amount: 21200 },
    { hour: '1PM', payments: 56, amount: 15800 },
    { hour: '2PM', payments: 92, amount: 28900 },
    { hour: '3PM', payments: 85, amount: 25600 },
    { hour: '4PM', payments: 73, amount: 19800 },
  ] as HourlyPaymentData[],
  weekly: [
    { day: 'Mon', payments: 234, amount: 67800, completion: 96.2 },
    { day: 'Tue', payments: 287, amount: 78500, completion: 94.8 },
    { day: 'Wed', payments: 298, amount: 82100, completion: 95.6 },
    { day: 'Thu', payments: 267, amount: 74300, completion: 93.2 },
    { day: 'Fri', payments: 189, amount: 52900, completion: 91.8 },
    { day: 'Sat', payments: 145, amount: 41200, completion: 88.5 },
    { day: 'Sun', payments: 98, amount: 28100, completion: 85.2 },
  ] as WeeklyPerformanceData[]
};
