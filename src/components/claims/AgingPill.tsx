import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AGING_BUCKETS } from '@/features/claims/constants';

interface AgingPillProps {
  days: number;
  size?: 'sm' | 'md';
}

export default function AgingPill({ days, size = 'md' }: AgingPillProps) {
  const getBucket = (agingDays: number) => {
    if (agingDays <= 3) return AGING_BUCKETS['0-3'];
    if (agingDays <= 7) return AGING_BUCKETS['4-7'];
    if (agingDays <= 14) return AGING_BUCKETS['8-14'];
    return AGING_BUCKETS['15+'];
  };

  const bucket = getBucket(days);

  return (
    <Badge
      className={`
        ${bucket.color} border-0 font-mono
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
        font-medium
      `}
    >
      {days}d
    </Badge>
  );
}