
// This component has been replaced by ModernRevenueChart.tsx
// Keeping this file for backward compatibility but redirecting to the new component

import ModernRevenueChart from './ModernRevenueChart';
import { RevenueData } from '@/features/analytics/types';

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ModernRevenueChart 
      data={data} 
      compareMode="off"
      onCompareModeChange={() => {}}
    />
  );
}


