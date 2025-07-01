import { chartData, timeAnalytics } from '../constants';
import { 
  RevenueData, 
  ClinicPerformanceData, 
  ProcedureData, 
  GeographicData, 
  PaymentPerformanceMetric, 
  RiskMetric, 
  HourlyPaymentData, 
  WeeklyPerformanceData 
} from '../types';

interface AnalyticsData {
  revenue: RevenueData[];
  clinicPerformance: ClinicPerformanceData[];
  procedures: ProcedureData[];
  geographic: GeographicData[];
  paymentPerformance: PaymentPerformanceMetric[];
  riskMetrics: RiskMetric[];
  hourly: HourlyPaymentData[];
  weekly: WeeklyPerformanceData[];
}

export function useAnalyticsData(): { data: AnalyticsData; isLoading: boolean; error: any } {
  // In a real application, you would use React Query's useQuery for each data set.
  // For now, we return the mock data directly.
  return {
    data: {
      revenue: chartData.revenue,
      clinicPerformance: chartData.clinicPerformance,
      procedures: chartData.procedures,
      geographic: chartData.geographic,
      paymentPerformance: chartData.paymentPerformance,
      riskMetrics: chartData.riskMetrics,
      hourly: timeAnalytics.hourly,
      weekly: timeAnalytics.weekly,
    },
    isLoading: false,
    error: null,
  };
}
