'use client';

import * as React from 'react';
import {
  Card, CardHeader, CardContent, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  AlertTriangle, Info, Search, Filter, ArrowUpRight, CheckCircle2,
} from 'lucide-react';
import ClaimsStatusCard, { StatusItem } from './rcm/ClaimStatusCard';

const clsNum = '[font-variant-numeric:tabular-nums_lining-nums]';
const fmtUSD = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const fmtPct = (n: number) => `${n.toFixed(1)}%`;

// ---------- Sample data (replace with API) ----------
// you already have STATUS in the parent; adapt it to StatusItem[]
const STATUS_ITEMS: StatusItem[] = [
  { label: 'Submitted', value: 156 },
  { label: 'In Review', value: 67 },
  { label: 'Pending Info', value: 24 },
];

type TimeRange = 'this_month'|'last_30d'|'this_quarter';
const KPIS = [
  { id: 'pending', label: 'Pending Claims', value: 247, deltaPct: -4.6 },
  { id: 'denied', label: 'Denied Claims', value: 45200, deltaPct: 5.9, money: true },
  { id: 'days', label: 'Avg Days to Pay', value: 18.5, deltaPct: -10.9, unit: 'days' },
  { id: 'clean', label: 'Clean Claim Rate', value: 94.7, deltaPct: 1.2, percent: true },
];

type Row = { id: string; patient: string; reason: 'Prior Auth'|'Duplicate'|'Medical Necessity'; payer: 'Blue Cross'|'Aetna'|'Cigna'; amount: number; aging: number };
const ALL_ROWS: Row[] = [
  { id: 'CLM-001', patient: 'John D.', reason: 'Prior Auth', payer: 'Blue Cross', amount: 1250, aging: 3 },
  { id: 'CLM-002', patient: 'Sarah M.', reason: 'Duplicate', payer: 'Aetna', amount: 890, aging: 2 },
  { id: 'CLM-003', patient: 'Mike R.', reason: 'Medical Necessity', payer: 'Cigna', amount: 2100, aging: 1 },
  // … add realistic volume to validate pagination
];

// ---------- Subcomponents ----------
function KPITile({
  label, value, unit, money, percent, deltaPct,
}: { label: string; value: number; unit?: string; money?: boolean; percent?: boolean; deltaPct: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3 min-h-[104px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-medium text-neutral-600 whitespace-nowrap">{label}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-neutral-300 hover:text-neutral-400" aria-label={`About ${label}`}><Info className="h-4 w-4" /></button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[260px] text-xs">Calculated for the selected period.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={`flex items-end justify-between ${clsNum}`}>
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-[22px] leading-tight font-semibold text-neutral-900">
            {money ? fmtUSD.format(value) : percent ? `${value}%` : value.toLocaleString()}
          </span>
          {unit && <span className="text-sm text-neutral-500">{unit}</span>}
        </div>
        <div className={`text-xs ${deltaPct >= 0 ? 'text-emerald-600' : 'text-rose-600'} whitespace-nowrap`}>
          {deltaPct >= 0 ? '▲' : '▼'} {fmtPct(Math.abs(deltaPct))} <span className="text-neutral-400">vs last period</span>
        </div>
      </div>
    </div>
  );
}

// function ClaimsStatusCard() {
//   // Map STATUS -> chart-friendly data with tokenized colors
//   type StatusKey = "submitted" | "in_review" | "pending";
//   const keyOrder: StatusKey[] = ["submitted", "in_review", "pending"];
//   const total = STATUS.reduce((s, x) => s + x.value, 0);

//   const data = STATUS.map((s, i) => ({
//     key: keyOrder[i] ?? (`k${i}` as StatusKey),
//     label: s.label,
//     value: s.value,
//   }));

//   // Use shadcn chart tokens so theme controls colors
//   const config = {
//     submitted: { label: "Submitted", color: "hsl(var(--chart-1))" },
//     in_review: { label: "In Review", color: "hsl(var(--chart-2))" },
//     pending: { label: "Pending Info", color: "hsl(var(--chart-3))" },
//   } satisfies ChartConfig

//   return (
//     <div className="rounded-lg border border-neutral-200 p-4 h-full flex flex-col">
//       {/* Header */}
//       <div className="mb-2 flex items-center justify-between">
//         <h4 className="text-[13px] font-semibold text-neutral-800">Claims Status</h4>
//         <span className={`text-xs text-neutral-500 ${clsNum}`}>{total.toLocaleString()} total</span>
//       </div>

//       {/* Chart + Legend */}
//       <div className="flex items-center gap-5">
//         {/* Compact donut keeps the vertical rhythm tight */}
//         <ChartContainer config={config} className="h-[180px] w-[180px] shrink-0">
//           <PieChart>
//             <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="label"
//               innerRadius={58}
//               outerRadius={78}
//               strokeWidth={2}
//             >
//               {data.map((d) => (
//                 <Cell key={d.key} fill={`var(--color-${d.key})`} />
//               ))}
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     const { cx, cy } = viewBox as { cx: number; cy: number };
//                     return (
//                       <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan className={`text-[20px] font-semibold fill-neutral-900 ${clsNum}`}>
//                           {total.toLocaleString()}
//                         </tspan>
//                         <tspan x={cx} dy="1.2em" className="text-[11px] fill-neutral-500">
//                           Total
//                         </tspan>
//                       </text>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>

//         {/* Tight, readable legend with % + count */}
//         <div className="grid grid-cols-1 gap-2">
//           {data.map((d) => {
//             const pct = total ? (d.value / total) * 100 : 0;
//             return (
//               <div key={d.key} className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span
//                     className="h-2.5 w-2.5 rounded-full"
//                     style={{ background: `var(--color-${d.key})` }}
//                     aria-hidden
//                   />
//                   <span className="text-[13px] text-neutral-700">{d.label}</span>
//                 </div>
//                 <div className={`text-[12px] text-neutral-500 ${clsNum}`}>
//                   {d.value.toLocaleString()} ({pct.toFixed(1)}%)
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Reasons keep their place but with tighter type scale */}
//       <div className="mt-4">
//         <h5 className="mb-1 text-[12px] font-medium text-neutral-500">Top denial reasons</h5>
//         <div className="flex flex-wrap gap-2">
//           <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">Prior Auth (9)</Badge>
//           <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">Duplicate (6)</Badge>
//           <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">Medical Necessity (4)</Badge>
//         </div>
//       </div>

//       <div className="mt-auto" />
//     </div>
//   );
// }


// ---------- Main ----------
export default function RevenueCycleManagement() {
  const [range, setRange] = React.useState<TimeRange>('this_month');

  // filters
  const [q, setQ] = React.useState('');
  const [payer, setPayer] = React.useState<'All'|'Blue Cross'|'Aetna'|'Cigna'>('All');
  const [reason, setReason] = React.useState<'All'|'Prior Auth'|'Duplicate'|'Medical Necessity'>('All');
  const [aging, setAging] = React.useState<'Any'|'≤2d'|'≤5d'|'>5d'>('Any');

  // pagination
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const filtered = React.useMemo(() => {
    return ALL_ROWS.filter(r => {
      const matchQ = q.trim().length === 0 || r.patient.toLowerCase().includes(q.toLowerCase()) || r.id.toLowerCase().includes(q.toLowerCase());
      const matchPayer = payer === 'All' || r.payer === payer;
      const matchReason = reason === 'All' || r.reason === reason;
      const matchAging =
        aging === 'Any' ? true :
        aging === '≤2d' ? r.aging <= 2 :
        aging === '≤5d' ? r.aging <= 5 :
        r.aging > 5;
      return matchQ && matchPayer && matchReason && matchAging;
    });
  }, [q, payer, reason, aging]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  return (
    <Card className="border border-neutral-200">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-[18px] font-semibold text-neutral-900">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              Revenue Cycle Management
            </CardTitle>
            <p className="mt-1 text-[14px] text-neutral-600">Processing & collections at a glance.</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={range} onValueChange={(v) => setRange(v as TimeRange)}>
              <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="This month" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="this_month">This month</SelectItem>
                <SelectItem value="last_30d">Last 30 days</SelectItem>
                <SelectItem value="this_quarter">This quarter</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-neutral-300 hover:text-neutral-400" aria-label="What is a clean claim?"><Info className="h-4 w-4" /></button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px] text-xs">A clean claim is processed on first pass without edits.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* KPI rail (equal height, non-wrapping values) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {KPIS.map(k => (
            <KPITile
              key={k.id}
              label={k.label}
              value={k.value}
              unit={k.unit}
              money={k.money}
              percent={k.percent}
              deltaPct={k.deltaPct}
            />
          ))}
        </div>

        {/* Worklist header with contextual action banner */}
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-[14px] text-amber-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className={clsNum}><strong>23</strong> denials need resubmission</span>
              <span className="hidden md:inline text-amber-800/90">Top reasons: Prior Auth (12), Duplicate (6), Med. Necessity (5)</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Button size="sm" className="h-8">Review &amp; resubmit</Button>
              <Button size="sm" variant="ghost" className="h-8">Learn what resubmission means</Button>
            </div>
          </div>
        </div>

        {/* Split pane: Worklist (dominant) + Status (supportive & equal height) */}
        <div className="mt-6 grid grid-cols-12 gap-6 items-stretch">
          {/* Worklist */}
          <section className="col-span-12 lg:col-span-8 flex flex-col">
            {/* Toolbar */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-neutral-800 mr-2">Recent Claim Denials</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
                <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search patient or claim ID…" className="h-9 pl-8 w-[240px]" />
              </div>
              <Select value={payer} onValueChange={(v) => { setPayer(v as any); setPage(1); }}>
                <SelectTrigger className="h-9 w-[150px]"><Filter className="mr-1 h-4 w-4" /> <SelectValue placeholder="Payer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All payers</SelectItem>
                  <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                  <SelectItem value="Aetna">Aetna</SelectItem>
                  <SelectItem value="Cigna">Cigna</SelectItem>
                </SelectContent>
              </Select>
              <Select value={reason} onValueChange={(v) => { setReason(v as any); setPage(1); }}>
                <SelectTrigger className="h-9 w-[190px]"><Filter className="mr-1 h-4 w-4" /> <SelectValue placeholder="Reason" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All reasons</SelectItem>
                  <SelectItem value="Prior Auth">Prior Auth</SelectItem>
                  <SelectItem value="Duplicate">Duplicate</SelectItem>
                  <SelectItem value="Medical Necessity">Medical Necessity</SelectItem>
                </SelectContent>
              </Select>
              <Select value={aging} onValueChange={(v) => { setAging(v as any); setPage(1); }}>
                <SelectTrigger className="h-9 w-[120px]"><SelectValue placeholder="Aging" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any aging</SelectItem>
                  <SelectItem value="≤2d">≤ 2d</SelectItem>
                  <SelectItem value="≤5d">≤ 5d</SelectItem>
                  <SelectItem value=">5d">&gt; 5d</SelectItem>
                </SelectContent>
              </Select>
              {(q || payer!=='All' || reason!=='All' || aging!=='Any') && (
                <Button variant="ghost" size="sm" className="h-9" onClick={() => { setQ(''); setPayer('All'); setReason('All'); setAging('Any'); setPage(1); }}>
                  Clear filters
                </Button>
              )}
            </div>

            {/* Table (sticky header) */}
            <div className="rounded-lg border border-neutral-200 flex-1 flex flex-col min-h-[420px]">
              <div className="sticky top-[64px] z-10 border-b border-neutral-200 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-8" />
                      <TableHead className="text-[13px]">Patient</TableHead>
                      <TableHead className="text-[13px]">Reason</TableHead>
                      <TableHead className="text-[13px]">Payer</TableHead>
                      <TableHead className="text-right text-[13px]">Amount</TableHead>
                      <TableHead className="text-right text-[13px]">Aging</TableHead>
                      <TableHead className="text-right text-[13px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>

              <div className="flex-1 overflow-auto">
                <Table>
                  <TableBody>
                    {rows.map(r => (
                      <TableRow key={r.id}>
                        <TableCell className="w-8"><Checkbox aria-label={`Select ${r.id}`} /></TableCell>
                        <TableCell className="text-[15px]">{r.patient}</TableCell>
                        <TableCell><Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">{r.reason}</Badge></TableCell>
                        <TableCell className="text-neutral-700">{r.payer}</TableCell>
                        <TableCell className={`text-right font-medium ${clsNum}`}>{fmtUSD.format(r.amount)}</TableCell>
                        <TableCell className={`text-right ${clsNum}`}><Badge variant="secondary" className="bg-neutral-100 text-neutral-700">{r.aging}d</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="h-8 px-2">Fix <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rows.length === 0 && (
                      <TableRow><TableCell colSpan={7}><div className="p-8 text-center text-neutral-500">No rows match your filters.</div></TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-neutral-200 px-3 py-2">
                <div className="text-xs text-neutral-500">
                  Showing <span className={clsNum}>{rows.length}</span> of <span className={clsNum}>{filtered.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
                    <SelectTrigger className="h-8 w-[110px]"><SelectValue placeholder="Rows" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 / page</SelectItem>
                      <SelectItem value="20">20 / page</SelectItem>
                      <SelectItem value="50">50 / page</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" className="h-8" onClick={() => setPage(p => Math.max(1, p-1))} disabled={pageClamped===1}>Prev</Button>
                  <span className={`text-sm ${clsNum}`}>{pageClamped} / {totalPages}</span>
                  <Button size="sm" variant="outline" className="h-8" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={pageClamped===totalPages}>Next</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Status panel (equal height) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <ClaimsStatusCard status={STATUS_ITEMS} />
          </aside>
        </div>

        {/* Quiet footer */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-emerald-600">$</span>
            <span className={`text-[20px] font-semibold text-neutral-900 ${clsNum}`}>{fmtUSD.format(1_800_000)}</span>
            <span className="text-xs text-neutral-500">Monthly Collections</span>
          </div>
          <div className="flex items-baseline justify-end gap-2">
            <span className={`text-[20px] font-semibold text-neutral-900 ${clsNum}`}>96.2%</span>
            <span className="text-xs text-neutral-500">Collection Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
