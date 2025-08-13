"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
// at top of RevenueCycleManagement.tsx
import { LabelWithHelp } from "../shared/Tooltip";
import {
  AlertTriangle,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ClaimsStatusCard, { StatusItem } from "./rcm/ClaimStatusCard";

const BRAND = {
  primary500: "#1E40AF",
  primary400: "#1D4ED8",
  info: "#4A90E2",
  softInfoBg: "#EAF2FF",
  warnBg: "#FEF3C7",
  warnBorder: "#FDE68A",
  warnFg: "#B45309",
  softChipBg: "#F4F6FB",
};

const clsNum = "[font-variant-numeric:tabular-nums_lining-nums]";
const fmtUSD = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const fmtPct = (n: number) => `${n.toFixed(1)}%`;

// ---- sample status (adapt to API) ----
const STATUS_ITEMS: StatusItem[] = [
  { label: "Submitted", value: 156 },
  { label: "In Review", value: 67 },
  { label: "Pending Info", value: 24 },
];

type TimeRange = "this_month" | "last_30d" | "this_quarter";
const KPIS = [
  { id: "pending", label: "Pending Claims", value: 247, deltaPct: -4.6 },
  {
    id: "denied",
    label: "Denied Claims",
    value: 45200,
    deltaPct: 5.9,
    money: true,
  },
  {
    id: "days",
    label: "Avg Days to Pay",
    value: 18.5,
    deltaPct: -10.9,
    unit: "days",
  },
  {
    id: "clean",
    label: "Clean Claim Rate",
    value: 94.7,
    deltaPct: 1.2,
    percent: true,
  },
];

type Row = {
  id: string;
  patient: string;
  reason: "Prior Auth" | "Duplicate" | "Medical Necessity";
  payer: "Blue Cross" | "Aetna" | "Cigna";
  amount: number;
  aging: number;
};

const ALL_ROWS: Row[] = [
  {
    id: "CLM-001",
    patient: "John D.",
    reason: "Prior Auth",
    payer: "Blue Cross",
    amount: 1250,
    aging: 3,
  },
  {
    id: "CLM-002",
    patient: "Sarah M.",
    reason: "Duplicate",
    payer: "Aetna",
    amount: 890,
    aging: 2,
  },
  {
    id: "CLM-003",
    patient: "Mike R.",
    reason: "Medical Necessity",
    payer: "Cigna",
    amount: 2100,
    aging: 1,
  },

  {
    id: "CLM-004",
    patient: "Emily K.",
    reason: "Prior Auth",
    payer: "Blue Cross",
    amount: 1450,
    aging: 5,
  },
  {
    id: "CLM-005",
    patient: "David P.",
    reason: "Duplicate",
    payer: "Cigna",
    amount: 620,
    aging: 4,
  },
  {
    id: "CLM-006",
    patient: "Nora L.",
    reason: "Medical Necessity",
    payer: "Aetna",
    amount: 1750,
    aging: 7,
  },
  {
    id: "CLM-007",
    patient: "Omar H.",
    reason: "Duplicate",
    payer: "Blue Cross",
    amount: 430,
    aging: 1,
  },
  {
    id: "CLM-008",
    patient: "Priya V.",
    reason: "Prior Auth",
    payer: "Cigna",
    amount: 980,
    aging: 2,
  },
  {
    id: "CLM-009",
    patient: "Leo S.",
    reason: "Medical Necessity",
    payer: "Aetna",
    amount: 2550,
    aging: 9,
  },
  {
    id: "CLM-010",
    patient: "Ava T.",
    reason: "Duplicate",
    payer: "Blue Cross",
    amount: 760,
    aging: 3,
  },
  {
    id: "CLM-011",
    patient: "Ben R.",
    reason: "Prior Auth",
    payer: "Aetna",
    amount: 1320,
    aging: 6,
  },
  {
    id: "CLM-012",
    patient: "Chloe W.",
    reason: "Medical Necessity",
    payer: "Cigna",
    amount: 2890,
    aging: 11,
  },
  {
    id: "CLM-013",
    patient: "Dan M.",
    reason: "Duplicate",
    payer: "Blue Cross",
    amount: 540,
    aging: 2,
  },
  {
    id: "CLM-014",
    patient: "Ella F.",
    reason: "Prior Auth",
    payer: "Aetna",
    amount: 1180,
    aging: 5,
  },
  {
    id: "CLM-015",
    patient: "Farah Q.",
    reason: "Medical Necessity",
    payer: "Cigna",
    amount: 2100,
    aging: 8,
  },
  {
    id: "CLM-016",
    patient: "George B.",
    reason: "Duplicate",
    payer: "Aetna",
    amount: 830,
    aging: 4,
  },
  {
    id: "CLM-017",
    patient: "Hana Y.",
    reason: "Medical Necessity",
    payer: "Blue Cross",
    amount: 1900,
    aging: 6,
  },
  {
    id: "CLM-018",
    patient: "Ian C.",
    reason: "Prior Auth",
    payer: "Cigna",
    amount: 990,
    aging: 1,
  },
  {
    id: "CLM-019",
    patient: "Jade N.",
    reason: "Duplicate",
    payer: "Blue Cross",
    amount: 450,
    aging: 3,
  },
  {
    id: "CLM-020",
    patient: "Karim D.",
    reason: "Medical Necessity",
    payer: "Aetna",
    amount: 2400,
    aging: 12,
  },
  {
    id: "CLM-021",
    patient: "Lina P.",
    reason: "Prior Auth",
    payer: "Cigna",
    amount: 1340,
    aging: 7,
  },
  {
    id: "CLM-022",
    patient: "Max G.",
    reason: "Duplicate",
    payer: "Aetna",
    amount: 710,
    aging: 2,
  },
  {
    id: "CLM-023",
    patient: "Noor S.",
    reason: "Prior Auth",
    payer: "Blue Cross",
    amount: 1600,
    aging: 4,
  },
];

// ---- small pieces -----------------------------------------------------------
function KPITile({
  label,
  value,
  unit,
  money,
  percent,
  deltaPct,
}: {
  label: string;
  value: number;
  unit?: string;
  money?: boolean;
  percent?: boolean;
  deltaPct: number;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-[#FAFAFA] px-4 py-3 min-h-[104px] flex flex-col justify-between">
      <div className="flex items-center">
        <LabelWithHelp
          side="top"
          className="text-[13px] font-medium text-neutral-600 whitespace-nowrap"
          label={<span>{label}</span>}
          help={
            <span className="max-w-[260px] block">
              Calculated for the selected period.
            </span>
          }
        />
      </div>

      <div className={`flex items-end justify-between ${clsNum}`}>
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-[22px] leading-tight font-semibold text-neutral-900">
            {money
              ? fmtUSD.format(value)
              : percent
              ? `${value}%`
              : value.toLocaleString()}
          </span>
          {unit && <span className="text-sm text-neutral-500">{unit}</span>}
        </div>
        <div
          className={`text-xs ${
            deltaPct >= 0 ? "text-emerald-600" : "text-rose-600"
          } whitespace-nowrap`}
        >
          {deltaPct >= 0 ? "▲" : "▼"} {fmtPct(Math.abs(deltaPct))}{" "}
          <span className="text-neutral-400">vs last period</span>
        </div>
      </div>
    </div>
  );
}

// function ReasonBadge({ reason }: { reason: Row["reason"] }) {
//   return (
//     <Badge
//       variant="outline"
//       className="text-[12px]"
//       style={{
//         background: BRAND.warnBg,
//         borderColor: BRAND.warnBorder,
//         color: BRAND.warnFg,
//       }}
//     >
//       {reason}
//     </Badge>
//   );
// }

function AgingBadge({ days }: { days: number }) {
  return (
    <span
      className={`inline-flex h-6 items-center justify-center rounded-md px-2 text-[12px] ${clsNum}`}
      style={{ background: BRAND.softChipBg, color: "#475569" }}
    >
      {days}d
    </span>
  );
}

type SortKey = "amount" | "aging" | null;
type SortDir = "asc" | "desc";

export default function RevenueCycleManagement() {
  const [range, setRange] = React.useState<TimeRange>("this_month");

  // filters
  const [q, setQ] = React.useState("");
  const [payer, setPayer] = React.useState<"All" | Row["payer"]>("All");
  const [reason, setReason] = React.useState<"All" | Row["reason"]>("All");
  const [aging, setAging] = React.useState<"Any" | "≤2d" | "≤5d" | ">5d">(
    "Any"
  );

  // sorting
  const [sortKey, setSortKey] = React.useState<SortKey>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>("desc");

  // pagination
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // derived: active filter chips (currently not shown)
  const chips = React.useMemo(
    () =>
      [
        payer !== "All" && { key: "payer", label: payer },
        reason !== "All" && { key: "reason", label: reason },
        aging !== "Any" && { key: "aging", label: aging },
      ].filter(Boolean) as { key: string; label: string }[],
    [payer, reason, aging]
  );

  const clearAll = () => {
    setPayer("All");
    setReason("All");
    setAging("Any");
    setPage(1);
  };

  // filter
  const filtered = React.useMemo(() => {
    return ALL_ROWS.filter((r) => {
      const matchQ =
        q.trim().length === 0 ||
        r.patient.toLowerCase().includes(q.toLowerCase()) ||
        r.id.toLowerCase().includes(q.toLowerCase());
      const matchPayer = payer === "All" || r.payer === payer;
      const matchReason = reason === "All" || r.reason === reason;
      const matchAging =
        aging === "Any"
          ? true
          : aging === "≤2d"
          ? r.aging <= 2
          : aging === "≤5d"
          ? r.aging <= 5
          : r.aging > 5;
      return matchQ && matchPayer && matchReason && matchAging;
    });
  }, [q, payer, reason, aging]);

  // sort (stable)
  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * pageSize;
  const rows = sorted.slice(start, start + pageSize);

  // pagination helpers
  const pageItems = React.useMemo<(number | "…")[]>(() => {
    const total = totalPages;
    const cur = pageClamped;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const items: (number | "…")[] = [1];
    const startW = Math.max(2, cur - 1);
    const endW = Math.min(total - 1, cur + 1);
    if (startW > 2) items.push("…");
    for (let p = startW; p <= endW; p++) items.push(p);
    if (endW < total - 1) items.push("…");
    items.push(total);
    return items;
  }, [totalPages, pageClamped]);

  const showingFrom = sorted.length ? start + 1 : 0;
  const showingTo = start + rows.length;

  // arrow key navigation (optional, safe)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      if (e.key === "ArrowRight") setPage((p) => Math.min(totalPages, p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  return (
    <Card className="border border-neutral-200">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-[18px] font-semibold text-neutral-900">
              <span
                className="inline-grid h-5 w-5 place-items-center rounded-md"
                style={{ background: BRAND.softInfoBg }}
              >
                <CheckIcon />
              </span>
              Revenue Cycle Management
            </CardTitle>
            <p className="mt-1 text-[14px] text-neutral-600">
              Processing & collections at a glance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={range}
              onValueChange={(v) => setRange(v as TimeRange)}
            >
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="This month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_month">This month</SelectItem>
                <SelectItem value="last_30d">Last 30 days</SelectItem>
                <SelectItem value="this_quarter">This quarter</SelectItem>
              </SelectContent>
            </Select>

            <LabelWithHelp
              side="left"
              className="text-neutral-300 hover:text-neutral-400"
              label={""}
              help="A clean claim is processed on first pass without edits."
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* KPI rail */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {KPIS.map((k) => (
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

        {/* Context banner */}
        <div
          className="mt-5 rounded-lg border px-4 py-2 text-[14px]"
          style={{
            borderColor: BRAND.warnBorder,
            background: BRAND.warnBg,
            color: BRAND.warnFg,
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className={clsNum}>
                <strong>23</strong> denials need resubmission
              </span>
              <span className="hidden md:inline opacity-90">
                Top reasons: Prior Auth (12), Duplicate (6), Med. Necessity (5)
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Button
                size="sm"
                className="h-8"
                style={{ background: BRAND.primary500 }}
              >
                Review &amp; resubmit
              </Button>
              <Button size="sm" variant="ghost" className="h-8">
                Learn what resubmission means
              </Button>
            </div>
          </div>
        </div>

        {/* Split: Worklist + Status */}
        <div className="mt-6 grid items-stretch grid-cols-12 gap-6">
          {/* Worklist */}
          <section className="col-span-12 lg:col-span-8 flex flex-col">
            {/* Compact toolbar */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-lg font-semibold text-neutral-800 mr-2">
                Recent Claim Denials
              </span>

              <div className="flex gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
                  <Input
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search patient or claim ID…"
                    className="h-9 pl-8 w-[240px]"
                  />
                </div>

                {/* Filters popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {chips.length > 0 && (
                        <span
                          className="ml-1 rounded-full px-1.5 text-[11px]"
                          style={{ background: BRAND.softChipBg }}
                        >
                          {chips.length}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[340px] p-3">
                    <div className="space-y-3">
                      <div className="text-[12px] font-medium text-neutral-500">
                        Refine list
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <div className="text-[12px] text-neutral-600">
                            Payer
                          </div>
                          <Select
                            value={payer}
                            onValueChange={(v) => {
                              setPayer(v as any);
                              setPage(1);
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="All payers" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="All">All payers</SelectItem>
                              <SelectItem value="Blue Cross">
                                Blue Cross
                              </SelectItem>
                              <SelectItem value="Aetna">Aetna</SelectItem>
                              <SelectItem value="Cigna">Cigna</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5">
                          <div className="text-[12px] text-neutral-600">
                            Reason
                          </div>
                          <Select
                            value={reason}
                            onValueChange={(v) => {
                              setReason(v as any);
                              setPage(1);
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="All reasons" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="All">All reasons</SelectItem>
                              <SelectItem value="Prior Auth">
                                Prior Auth
                              </SelectItem>
                              <SelectItem value="Duplicate">
                                Duplicate
                              </SelectItem>
                              <SelectItem value="Medical Necessity">
                                Medical Necessity
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5 col-span-2">
                          <div className="text-[12px] text-neutral-600">
                            Aging
                          </div>
                          <Select
                            value={aging}
                            onValueChange={(v) => {
                              setAging(v as any);
                              setPage(1);
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Any aging" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Any">Any aging</SelectItem>
                              <SelectItem value="≤2d">≤ 2d</SelectItem>
                              <SelectItem value="≤5d">≤ 5 d</SelectItem>
                              <SelectItem value=">5d">&gt; 5 d</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            clearAll();
                          }}
                        >
                          Clear all
                        </Button>
                        <Button
                          size="sm"
                          className="h-8"
                          style={{ background: BRAND.primary500 }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Table container */}
            <div className="rounded-lg border border-neutral-200 flex-1 flex flex-col max-h-[480px] min-h-[480px]">
              {/* Sticky header with fixed column grid */}
              <div className="sticky top-[64px] z-10 bg-white">
                <Table>
                  <colgroup>
                    <col style={{ width: "2rem" }} /> {/* checkbox */}
                    <col style={{ width: "28%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: "15%" }} /> {/* Amount */}
                    <col style={{ width: "9%" }} /> {/* Aging */}
                    <col style={{ width: "8%" }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-neutral-200">
                      <TableHead className="px-4 py-2.5 text-[12px] font-medium text-neutral-600" />
                      <TableHead className="px-4 py-2.5 text-[12px] font-medium text-neutral-600">
                        Patient
                      </TableHead>
                      <TableHead className="px-4 py-2.5 text-[12px] font-medium text-neutral-600">
                        Reason
                      </TableHead>
                      <TableHead className="px-4 py-2.5 text-[12px] font-medium text-neutral-600">
                        Payer
                      </TableHead>
                      <TableHead className="px-5 py-2.5 text-right text-[12px] font-medium text-neutral-600">
                        Amount
                      </TableHead>
                      <TableHead className="px-5 py-2.5 text-right text-[12px] font-medium text-neutral-600">
                        Aging
                      </TableHead>
                      <TableHead className="px-4 py-2.5 text-right text-[12px] font-medium text-neutral-600">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>

              {/* Body uses the SAME padding & a true right edge */}
              <div className="flex-1 overflow-auto">
                <Table>
                  <colgroup>
                    <col style={{ width: "2rem" }} />
                    <col style={{ width: "28%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "9%" }} />
                    <col style={{ width: "8%" }} />
                  </colgroup>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow
                        key={r.id}
                        className="group border-b last:border-0 border-neutral-100 hover:bg-neutral-50/60"
                      >
                        <TableCell className="px-4 py-4">
                          <Checkbox aria-label={`Select ${r.id}`} />
                        </TableCell>

                        <TableCell className="px-4 py-4">
                          <div className="text-[14px] font-semibold leading-5 text-neutral-900">
                            {r.patient}
                          </div>
                          <div className="text-[12px] leading-4 text-neutral-500">
                            {r.id}
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-4">
                          <Badge
                            variant="outline"
                            className="text-[12px] bg-amber-50 border-amber-200 text-amber-800"
                          >
                            {r.reason}
                          </Badge>
                        </TableCell>

                        <TableCell className="px-4 py-4 text-[13px] text-neutral-700">
                          {r.payer}
                        </TableCell>

                        {/* Amount: hard right edge */}
                        <TableCell className="px-5 py-4">
                          <div className="flex w-full justify-end">
                            <span className="text-[14px] font-semibold text-neutral-900 [font-variant-numeric:tabular-nums_lining-nums]">
                              {fmtUSD.format(r.amount)}
                            </span>
                          </div>
                        </TableCell>

                        {/* Aging: chip locked to right edge */}
                        <TableCell className="px-5 py-4">
                          <div className="flex w-full justify-end">
                            <AgingBadge days={r.aging} />
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 text-neutral-700 hover:text-neutral-900"
                          >
                            Fix <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="p-8 text-center text-neutral-500">
                            No rows match your filters.&nbsp;
                            <button
                              className="underline"
                              onClick={() => {
                                setQ("");
                                setPayer("All");
                                setReason("All");
                                setAging("Any");
                              }}
                            >
                              Clear filters
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex flex-wrap items-center gap-3 justify-between border-t border-neutral-200 px-3 py-2">
                {/* left: range summary */}
                <div className="text-xs text-neutral-500">
                  Showing <span className={clsNum}>{showingFrom}</span>–
                  <span className={clsNum}>{showingTo}</span> of{" "}
                  <span className={clsNum}>{sorted.length}</span>
                </div>

                {/* right: controls */}
                <div className="flex items-center gap-2">
                  {/* desktop: full pager */}
                  <div className="hidden sm:flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setPage(1)}
                      disabled={pageClamped === 1}
                      aria-label="First page"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={pageClamped === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {pageItems.map((it, i) =>
                      it === "…" ? (
                        <span
                          key={`gap-${i}`}
                          className="px-1 text-neutral-400 select-none"
                        >
                          …
                        </span>
                      ) : (
                        <Button
                          key={it}
                          size="sm"
                          variant={it === pageClamped ? "default" : "ghost"}
                          className={`h-8 px-3 ${clsNum}`}
                          aria-current={it === pageClamped ? "page" : undefined}
                          onClick={() => setPage(it)}
                        >
                          {it}
                        </Button>
                      )
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={pageClamped === totalPages}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setPage(totalPages)}
                      disabled={pageClamped === totalPages}
                      aria-label="Last page"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* mobile: compact */}
                  <div className="sm:hidden flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={pageClamped === 1}
                    >
                      Prev
                    </Button>
                    <span className={`text-sm ${clsNum}`}>
                      {pageClamped} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={pageClamped === totalPages}
                    >
                      Next
                    </Button>
                  </div>

                  {/* rows per page */}
                  <Select
                    value={String(pageSize)}
                    onValueChange={(v) => {
                      setPageSize(Number(v));
                      setPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-[110px]">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 / page</SelectItem>
                      <SelectItem value="20">20 / page</SelectItem>
                      <SelectItem value="50">50 / page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Status (kept equal height via grid + items-stretch) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <ClaimsStatusCard status={STATUS_ITEMS} />
          </aside>
        </div>

        {/* Quiet footer */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
          <div className="flex items-baseline gap-2">
            {/* <span className="text-emerald-600">$</span> */}
            <span
              className={`text-[20px] font-semibold text-neutral-900 ${clsNum}`}
            >
              {fmtUSD.format(1_800_000)}
            </span>
            <span className="text-xs text-neutral-500">
              Monthly Collections
            </span>
          </div>
          <div className="flex items-baseline justify-end gap-2">
            <span
              className={`text-[20px] font-semibold text-neutral-900 ${clsNum}`}
            >
              96.2%
            </span>
            <span className="text-xs text-neutral-500">Collection Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** tiny brand mark to avoid another icon import */
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      style={{ color: BRAND.info }}
    >
      <path
        d="M7.5 13.5L3.5 9.5l1.4-1.4 2.6 2.6 7.6-7.6L16.5 4l-9 9z"
        fill="currentColor"
      />
    </svg>
  );
}
