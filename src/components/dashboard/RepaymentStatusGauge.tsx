"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Label, Cell, ResponsiveContainer } from "recharts";

type RepaymentStatus = {
  category: "On-Time" | "Grace Period" | "Delinquent" | "Default Risk";
  count: number;
  percentage?: number;
};

type Routes = {
  dueToday: string;
  urgent: string;
  grace: string;
  breakdown?: string;
};

type Props = {
  data?: RepaymentStatus[];
  outstandingBalance?: number; // dollars
  lastUpdated?: Date;
  error?: string;
  thresholdHighRiskPct?: number; // default 15
  useRedDanger?: boolean; // set true if brand allows red
  excludesClosed?: boolean; // default true
  routes?: Routes;
  onRefresh?: () => void;
};

const defaultData: RepaymentStatus[] = [
  { category: "On-Time", count: 274 },
  { category: "Grace Period", count: 148 },
  { category: "Delinquent", count: 112 },
  { category: "Default Risk", count: 78 },
];

// simple compact currency
const fmtMoney = (v: number) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(v);

// const timeAgo = (d: Date) => {
//   const diff = Math.floor((Date.now() - d.getTime()) / 1000);
//   if (diff < 60) return "just now";
//   const m = Math.floor(diff / 60);
//   if (m < 60) return `${m} min ago`;
//   const h = Math.floor(m / 60);
//   return `${h}h ago`;
// };

export const TOKENS = {
  success: "#87CEEB", // onTime
  warning: "#4A90E2", // grace
  warningBg: "#fef3c7",
  warningBorder: "#fde68a",
  warningFg: "#b45309",
  danger: "#2563EB", // delinquent (or red if allowed)
  neutral400: "#1D4ED8",
  neutral500: "#1E40AF", // defaultRisk
};

export default function RepaymentHealthCard({
  data = defaultData,
  outstandingBalance = 2_400_000,
  error,
  thresholdHighRiskPct = 15,
  excludesClosed = true,
  routes = {
    dueToday: "/followups?due=today",
    urgent: "/followups?tab=urgent",
    grace: "/followups?tab=grace",
    breakdown: "/followups/breakdown",
  },
  onRefresh,
}: Props) {
  const router = useRouter();

  // ===== tokens (kept your nomenclature, mapped to your 5 blues) =====

  const stats = useMemo(() => {
    const totalPlans = data.reduce((s, r) => s + r.count, 0);

    // derive percentages from counts (1 decimal)
    const enriched = data.map((r) => ({
      ...r,
      percentage: totalPlans
        ? Number(((r.count / totalPlans) * 100).toFixed(1))
        : 0,
    }));

    // (nice-to-have) ensure the rounded values sum to exactly 100.0
    if (totalPlans) {
      const sum = Number(
        enriched.reduce((s, r) => s + (r.percentage ?? 0), 0).toFixed(1)
      );
      const delta = Number((100 - sum).toFixed(1));
      if (delta !== 0) {
        const iLargest = enriched.reduce(
          (iMax, r, i, arr) =>
            r.percentage! > arr[iMax].percentage! ? i : iMax,
          0
        );
        enriched[iLargest].percentage = Number(
          (enriched[iLargest].percentage! + delta).toFixed(1)
        );
      }
    }

    const map = Object.fromEntries(enriched.map((r) => [r.category, r]));
    const urgentCount =
      (map["Delinquent"]?.count ?? 0) + (map["Default Risk"]?.count ?? 0);
    const atRiskCount = urgentCount + (map["Grace Period"]?.count ?? 0);

    return { totalPlans, map, urgentCount, atRiskCount, enriched };
  }, [data]);

  const donutData = [
    {
      id: "onTime",
      value: stats.map["On-Time"]?.count ?? 0,
      pct: stats.map["On-Time"]?.percentage ?? 0,
      fill: `var(--color-onTime, ${TOKENS.success})`,
    },
    {
      id: "grace",
      value: stats.map["Grace Period"]?.count ?? 0,
      pct: stats.map["Grace Period"]?.percentage ?? 0,
      fill: `var(--color-grace, ${TOKENS.warning})`,
    },
    {
      id: "delinquent",
      value: stats.map["Delinquent"]?.count ?? 0,
      pct: stats.map["Delinquent"]?.percentage ?? 0,
      fill: `var(--color-delinquent, ${TOKENS.danger})`,
    },
    {
      id: "defaultRisk",
      value: stats.map["Default Risk"]?.count ?? 0,
      pct: stats.map["Default Risk"]?.percentage ?? 0,
      fill: `var(--color-defaultRisk, ${TOKENS.neutral500})`,
    },
  ];

  const chartConfig = {
    onTime: { label: "On-time", color: TOKENS.success },
    grace: { label: "Grace (1–5d)", color: TOKENS.warning },
    delinquent: { label: "Delinquent", color: TOKENS.danger },
    defaultRisk: { label: "Default risk", color: TOKENS.neutral500 },
  } satisfies ChartConfig;

  const onTimePct = stats.map["On-Time"]?.percentage ?? 0;
  const percentAtRisk = stats.totalPlans
    ? Math.round((stats.atRiskCount / stats.totalPlans) * 1000) / 10
    : 0;

  return (
    <Card className="bg-white border border-neutral-200 overflow-hidden">
      {/* ---------- Header: responsive & non-clipping ---------- */}
      <CardHeader className="pb-2 sm:pb-3">
        <div className="grid gap-3 sm:gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          {/* Left: title + sub */}
          <div className="min-w-0">
            <CardTitle className="leading-tight text-lg sm:text-[1.1rem] font-semibold text-neutral-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="">Payment Plan Health</span>
            </CardTitle>
            <p className="mt-1 text-sm text-neutral-500">
              Live repayment health for{" "}
              <span className="font-medium text-neutral-700">
                {stats.totalPlans.toLocaleString()}
              </span>{" "}
              active plans
              {excludesClosed && (
                <span className="text-neutral-400"> (excludes closed)</span>
              )}
            </p>
          </div>

          {/* Right: pill (stays inside, aligns right on md+) */}
          <div className="md:justify-self-end">
            <Link
              href={routes.dueToday}
              className="inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-xs font-medium"
              style={{
                background: TOKENS.warningBg,
                borderColor: TOKENS.warningBorder,
                color: TOKENS.warningFg,
              }}
            >
              <span className="truncate">Due today: {stats.urgentCount}</span>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 sm:space-y-7">
        {/* ---------- Donut: clamped size, correct label ---------- */}
        <div className="min-w-0">
          <ChartContainer config={chartConfig} className="!h-auto !min-h-0 !aspect-auto p-0 sm:p-0 md:h-[220px]">
            {/* clamp so it never overwhelms the right column */}
            <div className="mx-auto w-[clamp(160px,30vw,220px)] h-[clamp(160px,30vw,220px)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="id"
                    innerRadius="65%"
                    outerRadius="90%"
                    strokeWidth={0}
                    isAnimationActive={false}
                  >
                    {donutData.map((d) => (
                      <Cell key={d.id} fill={d.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (
                          !viewBox ||
                          !("cx" in viewBox) ||
                          !("cy" in viewBox)
                        )
                          return null;
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {onTimePct.toLocaleString()}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              on-time
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* SR-only chart summary */}
          <div
            className="sr-only"
            role="table"
            aria-label="Repayment status breakdown"
          >
            {donutData.map((d) => (
              <div key={d.id} role="row">
                <span role="cell">{(chartConfig as any)[d.id].label}</span>
                <span role="cell">{d.value.toLocaleString()} plans</span>
                <span role="cell">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        {/* ---------- KPIs ---------- */}
        <div className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-3 sm:pb-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
          <div>
            <div className="text-2xl font-semibold text-neutral-900 tabular-nums">
              {stats.totalPlans.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-500">Active plans</div>
          </div>
          <div>
            <div
              className="text-2xl font-semibold text-neutral-900"
              title={Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(outstandingBalance)}
            >
              {fmtMoney(outstandingBalance)}
            </div>
            <div className="text-sm text-neutral-500">Outstanding balance</div>
          </div>
        </div>
        {/* ---------- Work queue ---------- */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-neutral-500">
              At-risk (1–30+ days)
            </span>
            <span className="text-sm font-medium text-neutral-900 shrink-0 tabular-nums">
              {stats.atRiskCount.toLocaleString()} ({percentAtRisk}%) of{" "}
              {stats.totalPlans.toLocaleString()}
            </span>
          </div>

          <ul className="space-y-2">
            {/* URGENT */}
            <li
              onClick={() => router.push(routes.urgent)}
              onKeyDown={(e) => e.key === "Enter" && router.push(routes.urgent)}
              role="button"
              tabIndex={0}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-neutral-200 px-3 py-3 hover:bg-neutral-50 focus-within:ring-2 focus-within:ring-neutral-300 cursor-pointer min-h-[44px]"
              aria-label="Open follow-ups for urgent plans"
            >
              <div className="min-w-0 flex items-center gap-2">
                <span
                  className="block size-2 rounded-full flex-none"
                  style={{ backgroundColor: TOKENS.danger }}
                />
                <div className="min-w-0 text-sm">
                  <div className="font-medium text-neutral-900 truncate">
                    Urgent (6+ days)
                  </div>
                  <div
                    className="text-xs text-neutral-500"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {stats.map["Delinquent"]?.count ?? 0} delinquent ·{" "}
                    {stats.map["Default Risk"]?.count ?? 0} default risk —
                    Manual outreach required.
                  </div>
                </div>
              </div>
              <span className="text-sm text-neutral-900 whitespace-nowrap flex items-center gap-1">
                Start follow-ups ({stats.urgentCount})
                <ArrowRight className="h-4 w-4" />
              </span>
            </li>

            {/* GRACE */}
            <li
              onClick={() => router.push(routes.grace)}
              onKeyDown={(e) => e.key === "Enter" && router.push(routes.grace)}
              role="button"
              tabIndex={0}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md bg-neutral-50 border border-neutral-200 px-3 py-3 hover:bg-neutral-100 focus-within:ring-2 focus-within:ring-neutral-300 cursor-pointer min-h-[44px]"
              aria-label="Open queue for grace-period plans"
            >
              <div className="min-w-0 flex items-center gap-2">
                <span
                  className="block size-2 rounded-full flex-none"
                  style={{ backgroundColor: TOKENS.warning }}
                />
                <div className="min-w-0 text-sm">
                  <div className="font-medium text-neutral-900 truncate">
                    Grace (1–5 days)
                  </div>
                  <div className="text-xs text-neutral-500">
                    Reminder queued (auto-send 5pm)
                  </div>
                </div>
              </div>
              <span className="text-sm text-neutral-900 whitespace-nowrap flex items-center gap-1">
                Open queue ({stats.map["Grace Period"]?.count ?? 0})
                <ArrowRight className="h-4 w-4" />
              </span>
            </li>
          </ul>

          {/* States */}
          {stats.atRiskCount === 0 && (
            <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600">
              All clear — auto-reminders running. Next check in 24h.
            </div>
          )}

          {percentAtRisk >= thresholdHighRiskPct && (
            <div
              className="rounded-md border px-3 py-2 text-sm"
              style={{
                background: TOKENS.warningBg,
                borderColor: TOKENS.warningBorder,
                color: TOKENS.warningFg,
              }}
            >
              At-risk over {thresholdHighRiskPct}% — consider bulk outreach.
            </div>
          )}

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Couldn’t refresh health data. Showing last known snapshot.{" "}
              {onRefresh && (
                <button className="underline" onClick={onRefresh}>
                  Retry
                </button>
              )}
            </div>
          )}
        </div>
        {/* Breakdown */}
        <div className="text-xs text-neutral-500">
          <details>
            <summary className="cursor-pointer hover:text-neutral-700 transition">
              View full breakdown
            </summary>
            <div className="mt-2 overflow-hidden rounded-md border border-neutral-200">
              <div className="divide-y divide-neutral-200">
                {stats.enriched.map((r) => (
                  <div
                    key={r.category}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="block size-2 rounded-full flex-none"
                        style={{
                          background:
                            r.category === "On-Time"
                              ? "var(--color-onTime, #87CEEB)"
                              : r.category === "Grace Period"
                              ? "var(--color-grace, #4A90E2)"
                              : r.category === "Delinquent"
                              ? `var(--color-delinquent, ${TOKENS.danger})`
                              : "var(--color-defaultRisk, #1E40AF)",
                        }}
                      />
                      <span className="truncate text-neutral-700">
                        {r.category}
                      </span>
                    </div>
                    <span className="tabular-nums text-neutral-700">
                      {r.count.toLocaleString()}
                    </span>
                    <span className="tabular-nums text-neutral-500">
                      {r.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
}
