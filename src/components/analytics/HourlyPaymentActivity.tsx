
// This component has been replaced by ModernHourlyActivity.tsx
// Keeping this file for backward compatibility but redirecting to the new component

import ModernHourlyActivity from './ModernHourlyActivity';
import { HourlyPaymentData } from '@/features/analytics/types';

interface HourlyPaymentActivityProps {
  data: HourlyPaymentData[];
}

export default function HourlyPaymentActivity({ data }: HourlyPaymentActivityProps) {
  return <ModernHourlyActivity data={data} />;
}

