import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '../../../../supabase/client';
import { DollarSign, Building2, Users, Clock } from 'lucide-react';

// Types
interface Metrics {
  updatedAt: Date;
  totalRevenueCents: number;
  activeClinics: number;
  activePlans: number;
  avgProcessingMs: number;
}

export interface StatItem {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string }>;
}

// Helper functions
const parseRow = (row: any): Metrics => ({
  updatedAt: new Date(row.updated_at),
  totalRevenueCents: Number(row.total_revenue_cents),
  activeClinics: Number(row.active_clinics),
  activePlans: Number(row.active_plans),
  avgProcessingMs: Number(row.avg_processing_ms),
});

const moneyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});



// Main hook using React Query
export function useAdminStats() {
  const { supabase } = useSupabaseClient();

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('admin_dashboard_metrics')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      return null;
    }
    return parseRow(data);
  };

  const { data: currentStats, error } = useQuery<Metrics | null>({
    queryKey: ['admin_stats'],
    queryFn: fetchStats,
    refetchInterval: 15000, // Refetch every 15 seconds
  });

  // For now, we will not calculate change until we have a historical snapshot
  const buildStats = (row: Metrics | null): StatItem[] | null => {
    if (!row) {
      return null;
    }

    return [
      {
        name: 'Total Revenue',
        value: moneyFmt.format(row.totalRevenueCents / 100),
        change: '+0.0%',
        changeType: 'positive',
        icon: DollarSign,
      },
      {
        name: 'Active Clinics',
        value: row.activeClinics.toLocaleString(),
        change: '+0.0%',
        changeType: 'positive',
        icon: Building2,
      },
      {
        name: 'Active Plans',
        value: row.activePlans.toLocaleString(),
        change: '+0.0%',
        changeType: 'positive',
        icon: Users,
      },
      {
        name: 'Avg. Processing Time',
        value: `${(row.avgProcessingMs / 1000).toFixed(2)}s`,
        change: '0.0%',
        changeType: 'positive',
        icon: Clock,
      },
    ];
  };

  return {
    stats: buildStats(currentStats ?? null),
    isLoading: !currentStats && !error,
    error: error?.message || null,
  };
}