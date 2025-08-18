'use client';

import React, {
  useMemo, useState, useEffect, useRef, useCallback, useLayoutEffect
} from 'react';
import {
  ChevronDown, ChevronRight, Search as SearchIcon, Filter as FilterIcon,
  Plus, Download, MoreHorizontal, Eye, RefreshCw, FileText, ArrowUpDown, Bell
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Popover, PopoverTrigger, PopoverContent
} from '@/components/ui/popover';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import { Claim } from '@/features/claims/types';

/* ---------------- Types & styles ---------------- */

type ClaimStatus = 'pending' | 'processing' | 'paid' | 'denied' | 'rejected';

const STATUS_LABEL: Record<ClaimStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  paid: 'Paid',
  denied: 'Denied',
  rejected: 'Rejected',
};

const STATUS_STYLES: Record<ClaimStatus, { pill: string; icon: string }> = {
  pending:   { pill: 'bg-blue-500/10 border-blue-500/30 border-[1.5px] text-blue-700',   icon: 'text-blue-600' },
  processing:{ pill: 'bg-amber-500/10 border-amber-500/30 border-[1.5px] text-amber-700', icon: 'text-amber-600' },
  paid:      { pill: 'bg-emerald-500/10 border-emerald-500/30 border-[1.5px] text-emerald-700', icon: 'text-emerald-600' },
  denied:    { pill: 'bg-rose-500/10 border-rose-500/30 border-[1.5px] text-rose-700',   icon: 'text-rose-600' },
  rejected:  { pill: 'bg-red-500/10 border-red-500/30 border-[1.5px] text-red-700',       icon: 'text-red-600' },
};

type SortKey =
  | 'claim'
  | 'patient'
  | 'clinic'
  | 'payer'
  | 'amount'
  | 'status'
  | 'aging'
  | 'updated';

type SortState = { key: SortKey; dir: 'asc' | 'desc' };

/* ---------------- Helpers ---------------- */

const money = (n: number) =>
  Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getAgingDays = (claim: Claim) => {
  const submission = claim.submissionDate ? new Date(claim.submissionDate) : new Date(claim.createdAt);
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - submission.getTime()) / (1000 * 60 * 60 * 24)));
};

/* ---------------- Component ---------------- */

export default function ClaimsTable({
  claims,
  onViewClaim,
  onResubmitClaim,
}: {
  claims: Claim[];
  onViewClaim: (c: Claim) => void;
  onResubmitClaim: (c: Claim) => void;
  onOpenShortcuts?: () => void;
}) {
  /* ------- header controls ------- */
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<ClaimStatus | 'all'>('all');
  const [payer, setPayer] = useState<string | 'all'>('all');
  const [clinic, setClinic] = useState<string | 'all'>('all');
  const [aging, setAging] = useState<'all' | '<7' | '7-30' | '>30'>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const [sort, setSort] = useState<SortState>({ key: 'updated', dir: 'desc' });

  // selection (visible-scope)
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // derived select options
  const payers = useMemo(
    () => Array.from(new Set(claims.map((c) => c.payerName).filter(Boolean))).sort(),
    [claims]
  );
  const clinics = useMemo(
    () => Array.from(new Set(claims.map((c) => c.clinicId ?? 'N/A'))).sort(),
    [claims]
  );

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (status !== 'all') n++;
    if (payer !== 'all') n++;
    if (clinic !== 'all') n++;
    if (aging !== 'all') n++;
    if (from || to) n++;
    return n;
  }, [status, payer, clinic, aging, from, to]);

  const clearFilters = () => {
    setStatus('all'); setPayer('all'); setClinic('all'); setAging('all'); setFrom(''); setTo('');
  };

  /* ------- filtering → sorting pipeline ------- */
  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return claims.filter((c) => {
      const matchesText =
        !lower ||
        c.claimNumber.toLowerCase().includes(lower) ||
        c.payerName.toLowerCase().includes(lower) ||
        c.patientId.toLowerCase().includes(lower) ||
        (c.clinicId ?? '').toLowerCase().includes(lower);

      const s = (c.status as string).toLowerCase() as ClaimStatus;
      const matchesStatus = status === 'all' || s === status;
      const matchesPayer = payer === 'all' || c.payerName === payer;
      const matchesClinic = clinic === 'all' || (c.clinicId ?? 'N/A') === clinic;

      const a = getAgingDays(c);
      const matchesAging =
        aging === 'all' ||
        (aging === '<7' && a < 7) ||
        (aging === '7-30' && a >= 7 && a <= 30) ||
        (aging === '>30' && a > 30);

      const t = new Date(c.updatedAt).getTime();
      const after = from ? t >= new Date(from).getTime() : true;
      const before = to ? t <= new Date(to).getTime() : true;

      return matchesText && matchesStatus && matchesPayer && matchesClinic && matchesAging && after && before;
    });
  }, [claims, q, status, payer, clinic, aging, from, to]);

  const sorted = useMemo(() => {
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      let va: string | number = '';
      let vb: string | number = '';
      switch (sort.key) {
        case 'claim':   va = a.claimNumber; vb = b.claimNumber; break;
        case 'patient': va = a.patientId;   vb = b.patientId;   break;
        case 'clinic':  va = a.clinicId ?? ''; vb = b.clinicId ?? ''; break;
        case 'payer':   va = a.payerName;   vb = b.payerName;   break;
        case 'amount':  va = a.totalAmount; vb = b.totalAmount; break;
        case 'status':  va = String(a.status); vb = String(b.status); break;
        case 'aging':   va = getAgingDays(a);  vb = getAgingDays(b);  break;
        case 'updated':
        default:        va = new Date(a.updatedAt).getTime(); vb = new Date(b.updatedAt).getTime(); break;
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return  1 * dir;
      return 0;
    });
  }, [filtered, sort]);

  /* ------- grouping by status (Notion style) ------- */
  const GROUPS: ClaimStatus[] = ['pending', 'processing', 'paid', 'denied', 'rejected'];
  const grouped = useMemo(() => {
    const by: Record<ClaimStatus, Claim[]> = { pending:[], processing:[], paid:[], denied:[], rejected:[] };
    sorted.forEach((c) => {
      const s = (c.status as string).toLowerCase() as ClaimStatus;
      if (by[s]) by[s].push(c);
    });
    return by;
  }, [sorted]);

  const [collapsed, setCollapsed] = useState<Record<ClaimStatus, boolean>>({
    pending:false, processing:false, paid:false, denied:false, rejected:false
  });

  const DEFAULT_GROUP_LIMIT = 15, STEP = 15;
  const [visibleByGroup, setVisibleByGroup] = useState<Record<ClaimStatus, number>>({
    pending: DEFAULT_GROUP_LIMIT,
    processing: DEFAULT_GROUP_LIMIT,
    paid: DEFAULT_GROUP_LIMIT,
    denied: DEFAULT_GROUP_LIMIT,
    rejected: DEFAULT_GROUP_LIMIT,
  });

  useEffect(() => {
    setVisibleByGroup({
      pending: DEFAULT_GROUP_LIMIT,
      processing: DEFAULT_GROUP_LIMIT,
      paid: DEFAULT_GROUP_LIMIT,
      denied: DEFAULT_GROUP_LIMIT,
      rejected: DEFAULT_GROUP_LIMIT,
    });
    setSelected({});
  }, [q, status, payer, clinic, aging, from, to, sort]);

  const visibleIds = useMemo(() => {
    const ids: string[] = [];
    GROUPS.forEach((g) => {
      const list = grouped[g] || [];
      const lim = Math.min(visibleByGroup[g], list.length);
      for (let i=0; i<lim; i++) ids.push(list[i].id);
    });
    return ids;
  }, [grouped, visibleByGroup]);

  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selected[id]);

  const toggleAllVisible = (checked: boolean) => {
    const next = { ...selected }; visibleIds.forEach((id) => (next[id] = checked)); setSelected(next);
  };

  /* ------- dynamic rows-only scroll sizing ------- */
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [bodyMaxH, setBodyMaxH] = useState<number | null>(null);

  const recomputeBodyMaxH = useCallback(() => {
    if (!rootRef.current) return;
    const top = rootRef.current.getBoundingClientRect().top;
    const headerH = headerRef.current?.offsetHeight ?? 0;
    const footerH = footerRef.current?.offsetHeight ?? 0;
    const offset =
      parseFloat(getComputedStyle(rootRef.current).getPropertyValue('--table-body-offset')) || 0;
    const available = window.innerHeight - top - headerH - footerH - offset;
    setBodyMaxH(Math.max(0, Math.floor(available)));
  }, []);

  useLayoutEffect(() => {
    recomputeBodyMaxH();
    const onResize = () => recomputeBodyMaxH();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recomputeBodyMaxH]);

  useEffect(() => {
    const ro = new ResizeObserver(() => recomputeBodyMaxH());
    if (headerRef.current) ro.observe(headerRef.current);
    if (footerRef.current) ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, [recomputeBodyMaxH, activeFilterCount]);

  /* ------- small utilities ------- */
  const exportCSV = () => {
    const header = [
      'Claim','Patient','Clinic','Payer','Amount','Paid','Status','AgingDays','UpdatedAt','ID'
    ];
    const lines = [header.join(',')];
    sorted.forEach((c) => {
      const row = [
        c.claimNumber,
        c.patientId,
        c.clinicId ?? 'N/A',
        c.payerName,
        String(c.totalAmount),
        String(c.paidAmount ?? 0),
        titleCase(String(c.status)),
        String(getAgingDays(c)),
        new Date(c.updatedAt).toISOString(),
        c.id,
      ].map((v) => `"${String(v).replace(/"/g,'""')}"`);
      lines.push(row.join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'claims_view.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const total = sorted.length;

  /* ------- render ------- */
  return (
    <div
      ref={rootRef}
      style={{ '--table-body-offset': '38px' } as React.CSSProperties}
      className="rounded-xl border border-[#e7e4db] bg-white shadow-sm overflow-hidden flex flex-col"
    >
      {/* Header / toolbar */}
      <div ref={headerRef} className="shrink-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-gray-900">Claims</h1>

          <div className="ml-auto flex items-center gap-3">
            {/* Find cluster (md+) */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative min-w-[220px] w-[340px] max-w-[380px]">
                <label htmlFor="claim-search" className="sr-only">Search claims</label>
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="claim-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search claims, patients, clinics, payers…"
                  className="h-9 pl-8 w-full"
                />
              </div>

              <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0 relative" aria-label="Open filters">
                    <FilterIcon className="h-8 w-8" strokeWidth={2.1} />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-gray-900 text-white text-[10px] leading-4 px-1 text-center">
                        {activeFilterCount > 9 ? "9+" : activeFilterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  sideOffset={10}
                  role="dialog"
                  aria-label="Filters"
                  className={[
                    'z-50 w-full p-0 overflow-hidden',
                    'rounded-2xl border border-black/10',
                    'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90',
                    'shadow-[0_20px_70px_rgba(0,0,0,0.20)] ring-1 ring-black/5',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                  ].join(' ')}
                >
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-black/10 bg-white/90 backdrop-blur">
                    <div className="text-[13px] font-semibold text-gray-900">Filters</div>
                  </div>

                  {/* Body */}
                  <div className="px-4 max-h-[70vh] overflow-auto">
                    <Section title="Status" defaultOpen>
                      <PillRow
                        value={status}
                        options={[
                          { label: 'All', value: 'all' },
                          ...(['pending','processing','paid','denied','rejected'] as const).map(s => ({
                            label: STATUS_LABEL[s], value: s,
                          })),
                        ]}
                        onChange={(v) => setStatus(v as any)}
                      />
                    </Section>

                    <Section title="Payer" defaultOpen>
                      <Select value={payer} onValueChange={(v:any)=>setPayer(v)}>
                        <SelectTrigger className="h-9 w-full"><SelectValue placeholder="All payers" /></SelectTrigger>
                        <SelectContent className="max-h-64">
                          <SelectItem value="all">All payers</SelectItem>
                          {payers.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Section>

                    <Section title="Clinic" defaultOpen>
                      <Select value={clinic} onValueChange={(v:any)=>setClinic(v)}>
                        <SelectTrigger className="h-9 w-full"><SelectValue placeholder="All clinics" /></SelectTrigger>
                        <SelectContent className="max-h-64">
                          <SelectItem value="all">All clinics</SelectItem>
                          {clinics.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Section>

                    <Section title="Aging" defaultOpen>
                      <PillRow
                        value={aging}
                        options={[
                          { label:'All', value:'all' },
                          { label:'< 7 days', value:'<7' },
                          { label:'7–30 days', value:'7-30' },
                          { label:'> 30 days', value:'>30' },
                        ]}
                        onChange={(v)=>setAging(v as any)}
                      />
                    </Section>

                    <Section title="Updated (date range)" defaultOpen>
                      <div className="flex items-center gap-2">
                        <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)}
                          className="h-9 w-full rounded-md border px-2 text-[13px] ring-1 ring-inset ring-black/5 focus:outline-none focus:ring-2 focus:ring-black/20" />
                        <span className="text-gray-400">–</span>
                        <input type="date" value={to} onChange={(e)=>setTo(e.target.value)}
                          className="h-9 w-full rounded-md border px-2 text-[13px] ring-1 ring-inset ring-black/5 focus:outline-none focus:ring-2 focus:ring-black/20" />
                      </div>
                    </Section>
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 border-t border-black/10 bg-white/90 backdrop-blur px-4 py-3 flex items-center justify-between">
                    <button className="text-[13px] text-gray-500 hover:text-gray-900" onClick={()=>setFilterOpen(false)}>Hide filters</button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8" onClick={clearFilters}>Clear</Button>
                      <Button size="sm" className="h-8" onClick={()=>setFilterOpen(false)}>Apply</Button>
                    </div>
                  </div>
                </PopoverContent>
                {filterOpen && (
                  <div
                    className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
                    onClick={() => setFilterOpen(false)}
                    aria-hidden="true"
                  />
                )}
              </Popover>
            </div>

            {/* divider */}
            <span className="hidden md:block h-6 w-px bg-[#ece9dd]" />

            {/* actions cluster */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-9 gap-1"><Plus className="h-4 w-4" /> New claim</Button>
              <Button variant="outline" size="sm" className="h-9 gap-1" onClick={exportCSV}>
                <Download className="h-4 w-4" /> Export
              </Button>
              {/* {onOpenShortcuts && (
                <Button variant="outline" size="sm" className="h-9" onClick={onOpenShortcuts}>Shortcuts</Button>
              )} */}
            </div>
          </div>

          {/* applied chips */}
          {activeFilterCount > 0 && (
            <div className="px-4 pb-2 flex flex-wrap items-center gap-2">
              <AppliedChips
                entries={[
                  status!=='all' && { key:'status', label:`Status: ${titleCase(String(status))}` },
                  payer!=='all' && { key:'payer', label:`Payer: ${payer}` },
                  clinic!=='all' && { key:'clinic', label:`Clinic: ${clinic}` },
                  aging!=='all' && { key:'aging', label:`Aging: ${aging}` },
                  from && { key:'from', label:`From: ${from}` },
                  to && { key:'to', label:`To: ${to}` },
                ].filter(Boolean) as {key:string;label:string}[]}
                onClear={(k)=>{
                  if (k==='status') setStatus('all');
                  if (k==='payer') setPayer('all');
                  if (k==='clinic') setClinic('all');
                  if (k==='aging') setAging('all');
                  if (k==='from') setFrom('');
                  if (k==='to') setTo('');
                }}
                onClearAll={clearFilters}
              />
            </div>
          )}
        </div>
      </div>

      {/* Body (rows-only scroll) */}
      <div className="min-h-0 grow overflow-y-auto overscroll-contain"
           style={bodyMaxH!==null ? { maxHeight: `${bodyMaxH}px` } : undefined}>
        {/* sticky column header */}
        <div className="sticky top-0 z-10 bg-white grid grid-cols-[24px_minmax(220px,1.2fr)_1fr_.9fr_.9fr_.8fr_.8fr_.7fr_.8fr_48px] gap-3 px-4 pt-3 pb-2 text-[12px] font-semibold text-gray-500 border-t border-[#ece9dd]">
          <div className="flex items-center">
            <Checkbox checked={allVisibleSelected} onCheckedChange={(v:boolean)=>toggleAllVisible(!!v)} aria-label="Select all visible" />
          </div>
          <HeaderButton label="Claim"    active={sort.key==='claim'}   dir={sort.dir}   onClick={()=>toggleSort(setSort,'claim')} />
          <HeaderButton label="Patient"  active={sort.key==='patient'} dir={sort.dir}   onClick={()=>toggleSort(setSort,'patient')} />
          <HeaderButton label="Clinic"   active={sort.key==='clinic'}  dir={sort.dir}   onClick={()=>toggleSort(setSort,'clinic')} />
          <HeaderButton label="Payer"    active={sort.key==='payer'}   dir={sort.dir}   onClick={()=>toggleSort(setSort,'payer')} />
          <HeaderButton label="Amount"   active={sort.key==='amount'}  dir={sort.dir}   onClick={()=>toggleSort(setSort,'amount')} />
          <HeaderButton label="Status"   active={sort.key==='status'}  dir={sort.dir}   onClick={()=>toggleSort(setSort,'status')} />
          <HeaderButton label="Aging"    active={sort.key==='aging'}   dir={sort.dir}   onClick={()=>toggleSort(setSort,'aging')} />
          <HeaderButton label="Updated"  active={sort.key==='updated'} dir={sort.dir}   onClick={()=>toggleSort(setSort,'updated')} />
          <div className="text-right pr-1">⋯</div>
        </div>

        {/* Bulk bar */}
        {Object.values(selected).some(Boolean) && (
          <div className="px-4 py-2 border-t bg-[#fafafa] text-[13px] flex items-center justify-between">
            <div>{Object.values(selected).filter(Boolean).length} selected</div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1"><Bell className="h-4 w-4" /> Assign</Button>
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={()=>{
                // you can gather selected IDs from Object.keys(selected).filter(id => selected[id])
                const selIds = Object.keys(selected).filter((id)=>selected[id]);
                const candidates = sorted.filter(c=>selIds.includes(c.id) && (c.status==='denied' || c.status==='rejected'));
                if (candidates[0]) onResubmitClaim(candidates[0]);
              }}>
                <RefreshCw className="h-4 w-4" /> Resubmit
              </Button>
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={exportCSV}>
                <FileText className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        )}

        {/* groups */}
        {(['pending','processing','paid','denied','rejected'] as ClaimStatus[]).map((g) => {
          const list = grouped[g] || [];
          const styles = STATUS_STYLES[g];
          const isCollapsed = collapsed[g];
          const visible = Math.min(visibleByGroup[g], list.length);

          if (list.length === 0) return null;

          return (
            <div key={g} className="border-t border-[#ece9dd]">
              {/* group header pill */}
              <button
                onClick={()=>setCollapsed((s)=>({ ...s, [g]: !s[g] }))}
                className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50/70"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                <span className={['inline-flex items-center gap-2 rounded-lg border px-2.5 py-1', styles.pill].join(' ')}>
                  <span className={['h-2.5 w-2.5 rounded-full', styles.icon, 'bg-current'].join(' ')} />
                  <span>{STATUS_LABEL[g]}</span>
                  <span className="opacity-50">•</span>
                  <span className="opacity-80">{list.length}</span>
                </span>
              </button>

              {/* rows */}
              {!isCollapsed && list.slice(0, visible).map((c) => {
                const isSelected = !!selected[c.id];
                const a = getAgingDays(c);
                const s = (c.status as string).toLowerCase() as ClaimStatus;

                return (
                  <div
                    key={c.id}
                    className="grid grid-cols-[24px_minmax(220px,1.2fr)_1fr_.9fr_.9fr_.8fr_.8fr_.7fr_.8fr_48px] gap-3 items-center px-4 py-3"
                  >
                    {/* select */}
                    <div className="flex items-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(v:boolean)=>setSelected((st)=>({ ...st, [c.id]: !!v }))}
                        aria-label={`Select ${c.claimNumber}`}
                      />
                    </div>

                    {/* Claim */}
                    <div className="min-w-0">
                      <div className="truncate font-medium text-[14px] text-gray-900 leading-5">{c.claimNumber}</div>
                      <div className="text-[12px] text-gray-500">
                        {c.procedureCodes?.slice(0,2).join(', ')}
                        {c.procedureCodes && c.procedureCodes.length>2 && ` +${c.procedureCodes.length-2}`}
                      </div>
                    </div>

                    {/* Patient */}
                    <div className="text-[13px] text-gray-800">
                      Patient {c.patientId.slice(-3)} <span className="text-gray-500">• ID {c.patientId}</span>
                    </div>

                    {/* Clinic */}
                    <div className="text-[13px] text-gray-800">{c.clinicId ?? 'N/A'}</div>

                    {/* Payer */}
                    <div className="text-[13px] text-gray-800">{c.payerName}</div>

                    {/* Amount */}
                    <div className="text-[13px] text-gray-900">
                      <span className="font-semibold">{money(c.totalAmount)}</span>
                      {c.paidAmount ? (
                        <span className="ml-2 text-[12px] text-emerald-600">Paid: {money(c.paidAmount)}</span>
                      ) : null}
                    </div>

                    {/* Status */}
                    <div>
                      <Badge className="rounded-md bg-[#f6f7f9] text-gray-700 border border-[#e7e4db]">
                        {STATUS_LABEL[s]}
                      </Badge>
                    </div>

                    {/* Aging */}
                    <div>
                      <Badge className="rounded-md bg-[#faf9f6] text-gray-700 border border-[#ece9dd]">
                        {a}d
                      </Badge>
                    </div>

                    {/* Updated */}
                    <div className="text-[13px] text-gray-800">
                      {new Date(c.updatedAt).toLocaleDateString()}
                    </div>

                    {/* Row actions */}
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-md hover:bg-gray-100" aria-label="Row actions">
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                          <DropdownMenuItem className="gap-2" onClick={()=>onViewClaim(c)}>
                            <Eye className="h-4 w-4" /> View details
                          </DropdownMenuItem>
                          {(s==='denied' || s==='rejected') && (
                            <DropdownMenuItem className="gap-2" onClick={()=>onResubmitClaim(c)}>
                              <RefreshCw className="h-4 w-4" /> Resubmit
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="gap-2" onClick={exportCSV}>
                            <FileText className="h-4 w-4" /> Export
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}

              {/* show more */}
              {!isCollapsed && visible < list.length && (
                <div className="px-4 pb-4">
                  <Button
                    variant="outline" size="sm" className="h-8"
                    onClick={()=>setVisibleByGroup((s)=>({ ...s, [g]: Math.min(list.length, s[g] + STEP) }))}
                  >
                    Show {Math.min(STEP, list.length - visible)} more
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div ref={footerRef} className="border-t border-[#e6e6e6] px-4 py-2 text-[12px] text-gray-600 flex items-center justify-between">
        <div>{total} results • showing {visibleIds.length} on screen</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8"
                  onClick={()=>setVisibleByGroup((s)=> {
                    const next = { ...s };
                    (Object.keys(grouped) as (keyof typeof grouped)[]).forEach((k)=> next[k] = grouped[k].length);
                    return next;
                  })}>
            Show all
          </Button>
          <Button variant="outline" size="sm" className="h-8"
                  onClick={()=>setVisibleByGroup({
                    pending: DEFAULT_GROUP_LIMIT, processing: DEFAULT_GROUP_LIMIT, paid: DEFAULT_GROUP_LIMIT,
                    denied: DEFAULT_GROUP_LIMIT, rejected: DEFAULT_GROUP_LIMIT
                  })}>
            Show less
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small shared UI bits (same as Patients) ---------- */

function Section({ title, children, defaultOpen = true }:{ title:string; children:React.ReactNode; defaultOpen?:boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border-t first:border-t-0 border-[#ece9dd]">
      <button type="button" onClick={()=>setOpen((s)=>!s)}
        className="w-full flex items-center justify-between py-3 text-[13px] font-semibold text-gray-900"
        aria-expanded={open}>
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

function PillRow<T extends string>({
  value, options, onChange,
}: { value:T; options:{label:string; value:T}[]; onChange:(v:T)=>void; }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button key={String(o.value)} type="button" onClick={()=>onChange(o.value)}
            className={[
              'inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ring-1',
              'active:scale-[.98]',
              active ? 'bg-black text-white ring-black shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]'
                     : 'bg-gray-100 text-gray-800 ring-transparent hover:bg-gray-200',
            ].join(' ')}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function AppliedChips({
  entries, onClear, onClearAll,
}:{ entries:{key:string;label:string}[]; onClear:(k:string)=>void; onClearAll:()=>void; }) {
  if (!entries.length) return null;
  return (
    <>
      <div className="flex flex-wrap gap-1.5 mr-auto">
        {entries.map((c)=>(
          <span key={c.key} className="inline-flex items-center gap-1 px-2 h-7 rounded-full border text-[12px] bg-[#fafafa] border-[#e6e6e6] text-gray-700">
            {c.label}
            <button onClick={()=>onClear(c.key)} aria-label={`Clear ${c.label}`} className="hover:text-gray-900">×</button>
          </span>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="h-7 text-[12px]" onClick={onClearAll}>Clear all</Button>
    </>
  );
}

function HeaderButton({
  label, onClick, active, dir,
}:{ label:string; onClick:()=>void; active?:boolean; dir?:'asc'|'desc'; }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-left hover:text-gray-700" aria-label={`Sort by ${label}`}>
      <span>{label}</span>
      <ArrowUpDown className={`h-3.5 w-3.5 ${active ? 'opacity-100' : 'opacity-40'}`} data-dir={dir} />
    </button>
  );
}

function toggleSort(set: React.Dispatch<React.SetStateAction<SortState>>, key: SortKey) {
  set((s)=> s.key===key ? { key, dir: s.dir==='asc' ? 'desc':'asc' } : { key, dir:'asc' });
}
