"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  DollarSign,
  CreditCard,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LabelWithHelp } from "../shared/Tooltip";

/** ─────────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────────────*/
export type StatusKey = "excellent" | "good" | "needs_attention";

export interface ClinicMetrics {
  id: string;
  name: string;
  location: string;
  financingVolume: number; // BNPL Volume (booked or collected)
  insuranceCollections: number; // Insurance Collections
  activePlans: number;
  approvalRate: number; // 0..100
  avgPlanValue: number; // dollars
  arDays: number; // days
  growth: number; // % vs selected period
  status: StatusKey;
  bnplTrend?: number[]; // optional: tiny sparkline points
  logoUrl?: string; // optional: clinic logo URL
}

type SortKey = "bnpl" | "growth" | "approval" | "ar" | "apv";
type FocusKey = "all" | "bnpl" | "insurance" | "plans";

/** ─────────────────────────────────────────────────────────────────────────────
 * Local tokens & formatters (kept inline for easy drop-in)
 * ────────────────────────────────────────────────────────────────────────────*/
const fmtMoney = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${Math.round(n / 1_000)}k`
    : `$${n.toLocaleString()}`;

const fmtMoneyExact = (n: number) => `$${n.toLocaleString()}`;
const fmtPct = (p: number, d = 1) => `${p.toFixed(d)}%`;
const fmtDays = (d: number, digits = 1) => `${d.toFixed(digits)} days`;

const STATUS_CFG: Record<
  StatusKey,
  {
    label: string;
    explain: string;
    Icon: React.ComponentType<any>;
    cls: string; // static tailwind (avoid dynamic class pitfalls)
  }
> = {
  excellent: {
    label: "Excellent",
    explain: "Approval ≥95% and A/R ≤25 days",
    Icon: CheckCircle2,
    cls: "bg-emerald-100 text-emerald-800",
  },
  good: {
    label: "Good",
    explain: "Approval ≥90% and A/R ≤32 days",
    Icon: ThumbsUp,
    cls: "bg-blue-100 text-blue-800",
  },
  needs_attention: {
    label: "Needs attention",
    explain: "Approval <90% or A/R >32 days",
    Icon: AlertTriangle,
    cls: "bg-amber-100 text-amber-800",
  },
};

const SORTS: { key: SortKey; label: string }[] = [
  { key: "bnpl", label: "BNPL Volume" },
  { key: "growth", label: "Growth" },
  { key: "approval", label: "Approval Rate" },
  { key: "ar", label: "A/R Days (low → high)" },
  { key: "apv", label: "Avg Plan Value" },
];

/** ─────────────────────────────────────────────────────────────────────────────
 * Demo data (can be removed when wiring API)
 * ────────────────────────────────────────────────────────────────────────────*/
const demoData: ClinicMetrics[] = [
  {
    id: "CLI-004",
    name: "Heart Health Specialists",
    location: "Austin, TX",
    financingVolume: 198_400,
    insuranceCollections: 420_000,
    activePlans: 187,
    approvalRate: 97.1,
    avgPlanValue: 3_200,
    arDays: 22.1,
    growth: 22.3,
    status: "excellent",
    bnplTrend: [150, 155, 160, 165, 168, 175, 190, 198],
    logoUrl: "",
  },
  {
    id: "CLI-001",
    name: "Sunrise Dental Center",
    location: "Los Angeles, CA",
    financingVolume: 125_000,
    insuranceCollections: 280_000,
    activePlans: 145,
    approvalRate: 96.2,
    avgPlanValue: 2_400,
    arDays: 24.5,
    growth: 15.2,
    status: "excellent",
    bnplTrend: [92, 95, 94, 97, 101, 108, 116, 125],
    logoUrl: "",
  },
  {
    id: "CLI-003",
    name: "Valley Orthodontics",
    location: "Phoenix, AZ",
    financingVolume: 89_500,
    insuranceCollections: 195_000,
    activePlans: 98,
    approvalRate: 94.8,
    avgPlanValue: 1_850,
    arDays: 28.2,
    growth: 8.7,
    status: "good",
    bnplTrend: [78, 82, 86, 84, 88, 92, 91, 90],
    logoUrl: "",
  },
  {
    id: "CLI-002",
    name: "Metro Dental Care",
    location: "Denver, CO",
    financingVolume: 67_800,
    insuranceCollections: 145_000,
    activePlans: 76,
    approvalRate: 91.3,
    avgPlanValue: 2_100,
    arDays: 35.8,
    growth: -2.1,
    status: "needs_attention",
    bnplTrend: [74, 72, 70, 69, 68, 68, 68, 67],
    logoUrl: "",
  },
  {
    id: "CLI-005",
    name: "Family Wellness Center",
    location: "San Diego, CA",
    financingVolume: 45_200,
    insuranceCollections: 98_000,
    activePlans: 52,
    approvalRate: 89.4,
    avgPlanValue: 1_650,
    arDays: 31.2,
    growth: 5.8,
    status: "good",
    bnplTrend: [40, 41, 42, 43, 44, 45, 45, 45],
    logoUrl: "",
  },
];

/** ─────────────────────────────────────────────────────────────────────────────
 * Small helpers
 * ────────────────────────────────────────────────────────────────────────────*/

function StatusBadge({ status }: { status: StatusKey }) {
  const S = STATUS_CFG[status];
  return (
    <Badge
      className={`gap-1 ${S.cls}`}
      title={S.explain}
      aria-label={`${S.label}. ${S.explain}`}
    >
      <S.Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {S.label}
    </Badge>
  );
}

function Sparkline({
  points,
  width = 72,
  height = 24,
}: {
  points: number[];
  width?: number;
  height?: number;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const norm = (v: number) =>
    max === min ? height / 2 : height - ((v - min) / (max - min)) * height;
  const step = width / Math.max(points.length - 1, 1);
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`)
    .join(" ");
  const lastUp = points[points.length - 1] >= points[0];
  const stroke = lastUp ? "#16a34a" : "#dc2626";
  return (
    <svg width={width} height={height} aria-hidden="true">
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

function KpiCard(props: {
  title: string;
  value: string;
  context?: string;
  Icon: React.ComponentType<any>;
  active?: boolean;
  onClick?: () => void;
}) {
  const { title, value, context, Icon, active, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!active}
      className={`text-left rounded-lg border border-neutral-200 bg-[#FAFAFA] p-4 transition focus-visible:ring-2 focus-visible:ring-blue-600 ${
        active ? "ring-2 ring-blue-600" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[14px] font-medium text-neutral-600">
            {title}
          </div>
          <div className="text-[20px] font-semibold text-neutral-900">
            {value}
          </div>
          {context && (
            <div className="text-[12px] font-medium text-neutral-500">
              {context}
            </div>
          )}
        </div>
        <Icon className="w-7 h-7 text-neutral-400" aria-hidden="true" />
      </div>
    </button>
  );
}

/** ─────────────────────────────────────────────────────────────────────────────
 * Drop-in main component
 * ────────────────────────────────────────────────────────────────────────────*/
export default function MultiClinicDashboard({
  data = demoData,
  dateLabel = "last 30 days",
}: {
  data?: ClinicMetrics[];
  /** Used in copy like “vs last 30 days” */
  dateLabel?: string;
}) {
  const router = useRouter();

  // Controls
  const [sortBy, setSortBy] = useState<SortKey>("bnpl");
  const [focus, setFocus] = useState<FocusKey>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusKey>("all");
  const [q, setQ] = useState("");

  // Aggregates
  const totals = useMemo(
    () => ({
      financing: data.reduce((s, c) => s + c.financingVolume, 0),
      insurance: data.reduce((s, c) => s + c.insuranceCollections, 0),
      plans: data.reduce((s, c) => s + c.activePlans, 0),
    }),
    [data]
  );

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      switch (sortBy) {
        case "bnpl":
          return b.financingVolume - a.financingVolume;
        case "growth":
          return b.growth - a.growth;
        case "approval":
          return b.approvalRate - a.approvalRate;
        case "ar":
          return a.arDays - b.arDays;
        case "apv":
          return b.avgPlanValue - a.avgPlanValue;
      }
    });
    return arr;
  }, [data, sortBy]);

  // Filters
  const filtered = useMemo(() => {
    let arr = [...sorted];
    if (focus === "bnpl") arr = arr.filter((c) => c.financingVolume > 0);
    if (focus === "insurance")
      arr = arr.filter((c) => c.insuranceCollections > 0);
    if (focus === "plans") arr = arr.filter((c) => c.activePlans > 0);
    if (statusFilter !== "all")
      arr = arr.filter((c) => c.status === statusFilter);
    if (q.trim()) {
      const qq = q.toLowerCase();
      arr = arr.filter((c) =>
        (c.name + " " + c.location).toLowerCase().includes(qq)
      );
    }
    return arr;
  }, [sorted, focus, statusFilter, q]);

  const lastUpdated = useMemo(() => {
    const d = new Date();
    const hh = d.getHours().toString().padStart(2, "0");
    const mm = d.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }, []);

  const getInitials = (s: string) =>
    s
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join("");

  return (
    <Card className="bg-white border border-neutral-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Multi-Clinic Performance Dashboard
            </CardTitle>
            <p className="text-sm text-neutral-500 mt-1">
              Compare financing and collection metrics across all locations
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              Updated {lastUpdated}
            </p>
          </div>

          {/* Sort control */}
          <div className="flex items-center gap-2">
            <label htmlFor="sortby" className="sr-only">
              Sort by
            </label>
            <select
              id="sortby"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              aria-label="Sort clinics by metric"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <KpiCard
            title="Total BNPL Volume"
            value={fmtMoney(totals.financing)}
            context="vs network avg +8.1%"
            Icon={DollarSign}
            active={focus === "bnpl"}
            onClick={() => setFocus(focus === "bnpl" ? "all" : "bnpl")}
          />
          <KpiCard
            title="Insurance Collections"
            value={fmtMoney(totals.insurance)}
            context="collection rate 94.2%"
            Icon={Building2}
            active={focus === "insurance"}
            onClick={() =>
              setFocus(focus === "insurance" ? "all" : "insurance")
            }
          />
          <KpiCard
            title="Active Plans"
            value={totals.plans.toLocaleString()}
            context="+18 this week"
            Icon={CreditCard}
            active={focus === "plans"}
            onClick={() => setFocus(focus === "plans" ? "all" : "plans")}
          />
        </div>

        {/* Filters: chips + search */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "excellent", "good", "needs_attention"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s as any)}
                aria-pressed={statusFilter === s}
                className={`px-3 py-1.5 rounded-full border border-neutral-200 text-sm transition ${
                  statusFilter === s
                    ? "bg-neutral-100"
                    : "bg-white hover:bg-neutral-50"
                }`}
              >
                {s === "all" ? "All" : STATUS_CFG[s as StatusKey].label}
              </button>
            )
          )}

          <div className="relative ml-auto">
            <Search
              className="absolute left-2 top-2.5 w-4 h-4 text-neutral-400"
              aria-hidden="true"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search clinics or cities…"
              aria-label="Search clinics or cities"
              className="pl-8 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((clinic) => {
            // rank within current filtered + sorted view
            // const rank = i + 1;
            const GrowthIcon =
              clinic.growth >= 0 ? ArrowUpRight : ArrowDownRight;
            const growthCls =
              clinic.growth >= 0 ? "text-green-600" : "text-red-600";

            return (
              <button
                key={clinic.id}
                type="button"
                onClick={() => router.push(`/clinics/${clinic.id}`)}
                className="w-full text-left rounded-lg border border-neutral-200 bg-white p-4 hover:shadow-md focus:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition"
                aria-label={`Open details for ${clinic.name}`}
              >
                {/* Row header */}
                <div className="flex items-center justify-between gap-3 mb-8">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-10 w-10 shrink-0 rounded-lg">
                      <AvatarImage
                        src={"https://github.com/evilrabbit.png"}
                        alt={`${clinic.name} logo`}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-600 to-green-500 text-white text-xs font-semibold">
                        {getInitials(clinic.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="font-semibold text-neutral-900 truncate">
                          {clinic.name}
                        </h4>
                        <StatusBadge status={clinic.status} />
                      </div>
                      <p className="text-sm text-neutral-500 truncate">
                        {clinic.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <GrowthIcon
                      className={`w-4 h-4 ${growthCls}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm font-medium ${growthCls}`}>
                      {clinic.growth > 0 ? "+" : ""}
                      {fmtPct(clinic.growth)} · vs {dateLabel}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end">
                  <div>
                    <LabelWithHelp
                      label="BNPL Volume"
                      help="Total financed amount during the selected period."
                    />
                    <p className="font-semibold text-neutral-900">
                      {fmtMoneyExact(clinic.financingVolume)}
                    </p>
                  </div>
                  <div>
                    <LabelWithHelp
                      label="Insurance Collections"
                      help="Total insurance payments collected during the selected period."
                    />
                    <p className="font-semibold text-neutral-900">
                      {fmtMoneyExact(clinic.insuranceCollections)}
                    </p>
                  </div>
                  <div>
                    <LabelWithHelp
                      label="Active Plans"
                      help="Number of plans currently active."
                    />
                    <p className="font-semibold text-neutral-900">
                      {clinic.activePlans.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <LabelWithHelp
                      label="Approval Rate"
                      help="Approved / Total applications within the selected period."
                    />
                    <p className="font-semibold text-neutral-900">
                      {fmtPct(clinic.approvalRate)}
                    </p>
                  </div>
                  <div>
                    <LabelWithHelp
                      label="Avg Plan Value"
                      help="Average amount per approved financing plan."
                    />
                    <p className="font-semibold text-neutral-900">
                      {fmtMoneyExact(clinic.avgPlanValue)}
                    </p>
                  </div>
                  <div>
                    <LabelWithHelp
                      label="A/R Days"
                      help="Average days outstanding for receivables (lower is better)."
                    />
                    <p
                      className={`font-semibold ${
                        clinic.arDays < 30
                          ? "text-green-600"
                          : clinic.arDays < 40
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {fmtDays(clinic.arDays)}
                    </p>
                  </div>

                  {/* Inline sparkline trend */}
                  <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-end">
                    <span className="text-[12px] text-neutral-500 mb-1">
                      BNPL trend
                    </span>
                    <Sparkline
                      points={
                        clinic.bnplTrend ?? [90, 92, 95, 96, 94, 98, 103, 110]
                      }
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
          {/* Top Performer */}
          <div className="rounded-lg p-4 border border-green-200 bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight
                className="w-4 h-4 text-green-600"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-700">
                Top Performer
              </span>
            </div>
            <p className="font-semibold text-neutral-900">
              {filtered.sort((a, b) => b.growth - a.growth)[0]?.name ?? "—"}
            </p>
            <p className="text-xs text-neutral-600">
              {filtered.length
                ? `+${fmtPct(
                    Math.max(
                      0,
                      filtered.sort((a, b) => b.growth - a.growth)[0].growth
                    )
                  ).replace("+", "")} growth, ${fmtPct(
                    filtered.sort((a, b) => b.growth - a.growth)[0].approvalRate
                  )} approval`
                : "—"}
            </p>
          </div>

          {/* Needs Attention */}
          <div className="rounded-lg p-4 border border-amber-200 bg-amber-50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle
                className="w-4 h-4 text-amber-600"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-neutral-700">
                Needs Attention
              </span>
            </div>
            <p className="font-semibold text-neutral-900">
              {filtered.sort((a, b) => b.arDays - a.arDays)[0]?.name ?? "—"}
            </p>
            <p className="text-xs text-neutral-600">
              {filtered.length
                ? `${fmtPct(
                    filtered.sort((a, b) => b.arDays - a.arDays)[0].growth
                  )} growth, ${fmtDays(
                    filtered.sort((a, b) => b.arDays - a.arDays)[0].arDays
                  )} A/R`
                : "—"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
