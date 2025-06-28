/* /hooks/useRecentTransactions.ts */

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../../../../utils/supabase/client';

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

  useEffect(() => {
    /* initial fetch */
    supabase
      .from('transaction')
      .select(`
        id,
        amount_cents,
        status,
        created_at,
        clinic:clinic_id ( name ),
        patient:patient_id ( full_name )
      `)
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        if (data) setItems((data as RawTx[]).map(toItem));
      });

    /* realtime */
    const channel = supabase
      .channel('recent_tx')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transaction' },
        async ({ new: { id } }) => {
          const { data, error } = await supabase
            .from('transaction')
            .select(`
              id,
              amount_cents,
              status,
              created_at,
              clinic:clinic_id ( name ),
              patient:patient_id ( full_name )
            `)
            .eq('id', id)
            .single();

          if (error) {
            console.error('Realtime fetch error:', error);
            return;
          }
          if (!data) return;
          const fresh = toItem(data as RawTx, 0);

          setItems(prev =>
            prev ? [fresh, ...prev].slice(0, 5).map((it, i) => ({ ...it, id: i + 1 }))
                 : [fresh]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return items;
}
