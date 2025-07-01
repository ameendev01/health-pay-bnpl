/* /hooks/useRecentTransactions.ts */

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSupabaseClient } from '../../../../utils/supabase/client';

dayjs.extend(relativeTime);

/* Raw row coming from Supabase */
type RawTx = {
  id: string;
  amount_cents: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  clinic:  { name: string } | { name: string }[];      // could be obj OR array
  patient: { full_name: string } | { full_name: string }[];
};

/* Flat item the UI needs */
export interface RecentTxItem {
  id: number;
  clinic: string;
  patient: string;
  amount: string;
  status: string;
  time: string;
}

/* helpers */
const moneyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const getName = <T extends { [k: string]: any } | T[]>(src: T, key: string) => {
  if (!src) return '—';
  return Array.isArray(src) ? (src[0] as any)?.[key] ?? '—' : (src as any)[key] ?? '—';
};

const toItem = (row: RawTx, idx: number): RecentTxItem => ({
  id: idx + 1,
  clinic:  getName(row.clinic,  'name'),
  patient: getName(row.patient, 'full_name'),
  amount:  moneyFmt.format(row.amount_cents / 100),
  status:  row.status,
  time:    dayjs(row.created_at).fromNow()
});

export function useRecentTransactions(): RecentTxItem[] | null {
  const [items, setItems] = useState<RecentTxItem[] | null>(null);
  const { supabase } = useSupabaseClient();

  useEffect(() => {
    const fetchInitialTx = async () => {
      const { data, error } = await supabase
        .from('recent_transactions')
        .select('*, clinic:clinics(name), patient:patients(full_name)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching recent transactions:", error);
        return;
      }

      setItems(data.map((row, idx) => toItem(row as RawTx, idx)));
    };

    fetchInitialTx();

    const channel = supabase
      .channel('recent-transactions')
      .on('postgres_changes', { event: '*', schema: 'public' }, fetchInitialTx)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return items;
}
