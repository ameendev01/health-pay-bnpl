import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSupabaseClient } from '../../../../supabase/client';

dayjs.extend(relativeTime);

// Types
type RawTx = {
  id: string;
  amount_cents: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  clinic: { name: string } | { name: string }[];
  patient: { full_name: string } | { full_name: string }[];
};

export interface RecentTxItem {
  id: number;
  clinic: string;
  patient: string;
  amount: string;
  status: string;
  time: string;
}

// Helper functions
const moneyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const getName = <T extends { [k: string]: any } | T[]>(src: T, key: string) => {
  if (!src) return '—';
  return Array.isArray(src) ? (src[0] as any)?.[key] ?? '—' : (src as any)[key] ?? '—';
};

const toItem = (row: RawTx, idx: number): RecentTxItem => ({
  id: idx + 1,
  clinic: getName(row.clinic, 'name'),
  patient: getName(row.patient, 'full_name'),
  amount: moneyFmt.format(row.amount_cents / 100),
  status: row.status,
  time: dayjs(row.created_at).fromNow(),
});

// Main hook using React Query
export function useRecentTransactions() {
  const { supabase } = useSupabaseClient();

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transaction')
      .select('*, clinic:clinic_id(name), patient:patient_id(full_name)')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      throw new Error(error.message);
    }

    return data.map((row, idx) => toItem(row as RawTx, idx));
  };

  const { data: transactions, error } = useQuery<RecentTxItem[]>({ 
    queryKey: ['recent_transactions'], 
    queryFn: fetchTransactions, 
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return {
    transactions: transactions ?? [],
    isLoading: !transactions && !error,
    error: error?.message || null,
  };
}