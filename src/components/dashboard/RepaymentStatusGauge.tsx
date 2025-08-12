"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type RepaymentStatus = {
  category: "On-Time" | "Grace Period" | "Delinquent" | "Default Risk";
  count: number;
  percentage: number;
};

const repaymentData: RepaymentStatus[] = [
  { category: "On-Time", count: 1174, percentage: 94.2 },
  { category: "Grace Period", count: 48, percentage: 3.9 },
  { category: "Delinquent", count: 19, percentage: 1.5 },
  { category: "Default Risk", count: 6, percentage: 0.4 },
];

// Minimal palette: 1 brand accent + neutral tones
const chartConfig = {
  onTime: { label: "On-Time", color: "#16a34a" }, // brand green
  grace: { label: "Grace (1–5d)", color: "#d4d4d8" }, // neutral-300
  delinquent: { label: "Delinquent", color: "#a1a1aa" }, // neutral-400
  defaultRisk: { label: "Default Risk", color: "#71717a" }, // neutral-500
} satisfies ChartConfig;

export default function RepaymentHealthCard() {
  const totals = useMemo(() => {
    const totalPlans = repaymentData.reduce((s, r) => s + r.count, 0);
    const map = Object.fromEntries(repaymentData.map((r) => [r.category, r]));
    const urgentCount = map["Delinquent"].count + map["Default Risk"].count;
    const atRiskCount = urgentCount + map["Grace Period"].count;
    return { totalPlans, map, urgentCount, atRiskCount };
  }, []);

  // Donut data: one slice per status. `id` must match keys in chartConfig.
  const donutData = [
    {
      id: "onTime",
      value: totals.map["On-Time"].count,
      pct: totals.map["On-Time"].percentage,
    },
    {
      id: "grace",
      value: totals.map["Grace Period"].count,
      pct: totals.map["Grace Period"].percentage,
    },
    {
      id: "delinquent",
      value: totals.map["Delinquent"].count,
      pct: totals.map["Delinquent"].percentage,
    },
    {
      id: "defaultRisk",
      value: totals.map["Default Risk"].count,
      pct: totals.map["Default Risk"].percentage,
    },
  ];

  const onTimePct = totals.map["On-Time"].percentage;
  const BRAND_GREEN = "#16a34a";
  const AMBER_FG = "#b45309";
  const AMBER_BG = "#fef3c7";

  return (
    <Card className="bg-white border border-neutral-200 overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" style={{ color: BRAND_GREEN }} />
          Payment Plan Health
        </CardTitle>
        <p className="text-sm text-neutral-500">
          Live repayment health for active plans
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Centered donut + KPI */}
        <div className="min-w-0">
          {/* Centered donut with size clamp */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto grid place-items-center"
          >
            <div className="relative w-[clamp(9rem,18vw,12rem)] h-[clamp(9rem,18vw,12rem)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value" // counts
                    nameKey="id" // must match chartConfig keys
                    innerRadius="68%"
                    outerRadius="90%" // thinner ring so center text breathes
                    strokeWidth={0}
                    isAnimationActive={false}
                  >
                    {donutData.map((d) => (
                      <Cell key={d.id} fill={`var(--color-${d.id})`} />
                    ))}
                  </Pie>

                  <ChartTooltip
                    cursor={false}
                    content={(props) => {
                      const p = props?.payload?.[0];
                      if (!p) return null;
                      const slice = p.payload as (typeof donutData)[number];
                      return (
                        <ChartTooltipContent>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ background: `var(--color-${slice.id})` }}
                            />
                            <span className="text-sm font-medium">
                              {(chartConfig as any)[slice.id].label}
                            </span>
                            <span className="ml-auto tabular-nums text-sm">
                              {slice.value.toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-neutral-500 tabular-nums">
                            {slice.pct}% of plans
                          </div>
                        </ChartTooltipContent>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* KPI in the middle (scales with size) */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-bold text-neutral-900 text-[clamp(1.25rem,2.4vw,1.5rem)]">
                  {onTimePct}%
                </div>
                <div className="text-neutral-500 text-[clamp(0.65rem,1.4vw,0.75rem)]">
                  On-time payments
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="text-2xl font-semibold text-neutral-900">
              {totals.totalPlans.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-500">Active plans</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-neutral-900">$2.4M</div>
            <div className="text-sm text-neutral-500">Outstanding balance</div>
          </div>
        </div>

        {/* Action rows (unchanged behavior, safe layout) */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-neutral-500">
              At-risk (1–30+ days)
            </span>
            <span className="text-sm font-medium text-neutral-900 shrink-0">
              {totals.atRiskCount} / {totals.totalPlans}
            </span>
          </div>

          <ul className="space-y-2">
            <li className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-neutral-200 px-3 py-2">
              <div className="min-w-0 flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: AMBER_FG }}
                />
                <div className="min-w-0 text-sm">
                  <div className="font-medium text-neutral-900 truncate">
                    Urgent (6+ days)
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {totals.map["Delinquent"].count} delinquent ·{" "}
                    {totals.map["Default Risk"].count} default risk
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="whitespace-nowrap gap-1 hover:bg-neutral-50"
              >
                Review {totals.urgentCount}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </li>

            <li className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md bg-neutral-50 border border-neutral-200 px-3 py-2">
              <div className="min-w-0 flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-neutral-400" />
                <div className="min-w-0 text-sm">
                  <div className="font-medium text-neutral-900 truncate">
                    Grace (1–5 days)
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    Auto-reminder scheduled
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="whitespace-nowrap gap-1 hover:bg-neutral-100"
              >
                Queue {totals.map["Grace Period"].count}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </li>
          </ul>

          {totals.urgentCount > 0 && (
            <div
              className="mt-1 rounded-md border px-3 py-2 text-sm flex items-center gap-2"
              style={{
                backgroundColor: AMBER_BG,
                borderColor: "#fde68a",
                color: AMBER_FG,
              }}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">
                {totals.urgentCount} plans need follow-up today
              </span>
            </div>
          )}
        </div>

        {/* Quiet context */}
        {/* <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
          <div>
            <div className="text-2xl font-semibold text-neutral-900">
              {totals.totalPlans.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-500">Active plans</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-neutral-900">$2.4M</div>
            <div className="text-sm text-neutral-500">Outstanding balance</div>
          </div>
        </div> */}

        {/* View full breakdown — fixed spacing & alignment */}
        <div className="text-xs text-neutral-500">
          <details>
            <summary className="cursor-pointer hover:text-neutral-700 transition">
              View full breakdown
            </summary>

            <div className="mt-2 overflow-hidden rounded-md border border-neutral-200">
              <div className="divide-y divide-neutral-200">
                {repaymentData.map((r) => (
                  <div
                    key={r.category}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* small color dot mirrors donut slice */}
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          background:
                            r.category === "On-Time"
                              ? "var(--color-onTime, #16a34a)"
                              : r.category === "Grace Period"
                              ? "var(--color-grace, #d4d4d8)"
                              : r.category === "Delinquent"
                              ? "var(--color-delinquent, #a1a1aa)"
                              : "var(--color-defaultRisk, #71717a)",
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
