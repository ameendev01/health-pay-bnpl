import { useEffect, useState, useRef } from 'react';
import { DollarSign, Building2, Users, Clock } from 'lucide-react';
import { useSupabaseClient } from '../../../../utils/supabase/client';

/* ---------- types ---------- */

interface Metrics {
  updatedAt: Date;
  totalRevenueCents: number;
  activeClinics: number;
  activePlans: number;
  avgProcessingMs: number;
}

interface StatItem {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string }>;
}

/* ---------- helpers ---------- */

// Supabase sends BIGINT / NUMERIC as strings ⇒ cast once here
const parseRow = (row: any): Metrics => ({
  updatedAt: new Date(row.updated_at),
  totalRevenueCents: Number(row.total_revenue_cents),
  activeClinics: Number(row.active_clinics),
  activePlans: Number(row.active_plans),
  avgProcessingMs: Number(row.avg_processing_ms)
});

const moneyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact'
});

const pct = (delta: number, base: number) =>
  base === 0 ? 0 : +(100 * delta / base).toFixed(1);

/* ---------- main hook ---------- */

export function useAdminStats(): StatItem[] | null {
  const [stats, setStats] = useState<StatItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const prev = useRef<Metrics | null>(null);
  const { supabase } = useSupabaseClient();

  const buildStats = (row: Metrics, prevRow: Metrics | null): StatItem[] => {
    // fall back to current row if no previous row yet
    const base = prevRow ?? row;

    const deltaRevenue = pct(row.totalRevenueCents - base.totalRevenueCents, base.totalRevenueCents);
    const deltaClin    = pct(row.activeClinics     - base.activeClinics,     base.activeClinics);
    const deltaPlans   = pct(row.activePlans       - base.activePlans,       base.activePlans);
    // lower processing time is better  → delta = old − new
    const deltaProc    = pct(base.avgProcessingMs  - row.avgProcessingMs,    base.avgProcessingMs);

    return [
      {
        name: 'Total Revenue',
        value: moneyFmt.format(row.totalRevenueCents / 100),
        change: `${deltaRevenue >= 0 ? '+' : ''}${deltaRevenue}%`,
        changeType: deltaRevenue >= 0 ? 'positive' : 'negative',
        icon: DollarSign
      },
      {
        name: 'Active Clinics',
        value: row.activeClinics.toLocaleString(),
        change: `${deltaClin >= 0 ? '+' : ''}${deltaClin}%`,
        changeType: deltaClin >= 0 ? 'positive' : 'negative',
        icon: Building2
      },
      {
        name: 'Active Plans',
        value: row.activePlans.toLocaleString(),
        change: `${deltaPlans >= 0 ? '+' : ''}${deltaPlans}%`,
        changeType: deltaPlans >= 0 ? 'positive' : 'negative',
        icon: Users
      },
      {
        name: 'Avg. Processing Time',
        value: `${(row.avgProcessingMs / 1000 / 60).toFixed(1)} min`,
        change: `${deltaProc >= 0 ? '+' : ''}${deltaProc}%`,
        changeType: deltaProc >= 0 ? 'positive' : 'negative',
        icon: Clock
      }
    ];
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    /* 1️⃣  initial snapshot */
    supabase
      .from('admin_dashboard_metrics')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (!isMounted || abortController.signal.aborted) return;
        if (!error && data) {
          const row = parseRow(data);
          prev.current = row;
          setStats(buildStats(row, null));
        } else if (error) {
          setError(error.message || 'Failed to fetch admin stats');
        }
      });

    /* 2️⃣  realtime subscription */
    const channel = supabase
      .channel('admin_kpi')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'admin_dashboard_metrics', filter: 'id=eq.1' },
        payload => {
          if (!isMounted || abortController.signal.aborted) return;
          const row = parseRow(payload.new);
          setStats(buildStats(row, prev.current));
          prev.current = row;
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      abortController.abort();
      supabase.removeChannel(channel);
    };
  }, []);

  if (error) {
    
    console.error(error);
    return null;
  }

  return stats;
}
