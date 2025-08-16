
// This component has been replaced by ModernWeeklyPerformance.tsx
// Keeping this file for backward compatibility but redirecting to the new component

import ModernWeeklyPerformance from './ModernWeeklyPerformance';
import { WeeklyPerformanceData } from '@/features/analytics/types';

interface WeeklyPerformanceProps {
  data: WeeklyPerformanceData[];
}

export default function WeeklyPerformance({ data }: WeeklyPerformanceProps) {
  return <ModernWeeklyPerformance data={data} />;
}

