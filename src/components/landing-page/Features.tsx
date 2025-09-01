// BreezeBentoSection.tsx
// Requires Tailwind and `npm i recharts`
// Uses Recharts with a shadcn-styled tooltip (pure Tailwind classes).
import React, { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Zap,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Cable,
  CheckCircle2,
  CalendarCheck2,
  Headphones,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  TooltipProps as RechartsTooltipProps,
} from "recharts";
import Image from "next/image";

type Datum = { month: string; acceptance: number };

// A tiny tooltip content component styled like shadcn/ui cards
function ChartTooltipContent({
  active,
  payload,
  label,
}: RechartsTooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number | undefined;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-sm">
      <div className="font-medium text-slate-900">{label}</div>
      <div className="mt-0.5 text-slate-600">
        Acceptance: <span className="font-semibold text-emerald-700">{v}%</span>
      </div>
    </div>
  );
}

export default function BreezeBentoSection() {
  // ----- State: plan selector & pricing
  const priceBase = 899; // example treatment cost
  const aprByMonths = useMemo(() => ({ 4: 0.029, 8: 0.039, 12: 0.059 }), []);
  const [months, setMonths] = useState<4 | 8 | 12>(8);

  const apr = aprByMonths[months];
  const total = priceBase * (1 + apr);
  const monthly = total / months;

  // ----- State: decision timer animation
  const [timer, setTimer] = useState<number>(48);
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((t) => (t <= 12 ? 58 : t - 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  // ----- Chart data (same shape as before)
  const chartData: Datum[] = useMemo(
    () => [
      { month: "Jan", acceptance: 38 },
      { month: "Feb", acceptance: 42 },
      { month: "Mar", acceptance: 47 },
      { month: "Apr", acceptance: 55 },
      { month: "May", acceptance: 59 },
      { month: "Jun", acceptance: 63 },
      { month: "Jul", acceptance: 66 },
      { month: "Aug", acceptance: 68 },
      { month: "Sep", acceptance: 71 },
    ],
    []
  );

  // ----- Utilities
  const fmtMoneyPerMo = useMemo(() => {
    const amt = Math.round(monthly);
    return `$${amt.toLocaleString()}/mo`;
  }, [monthly]);

  const planButtonBase =
    "plan-btn px-3.5 py-1.5 rounded-lg text-sm font-medium transition";
  const planButtonActive =
    "text-slate-700 bg-white shadow-sm ring-1 ring-black/5";
  const planButtonInactive = "text-slate-600 hover:text-slate-900";

  return (
    <section className="relative antialiased">
      {/* Subtle backdrop accents */}
      {/* <div className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center">
        <div className="h-40 w-[60rem] rounded-full bg-gradient-to-r from-cyan-300/10 via-emerald-300/10 to-indigo-300/10 blur-3xl" />
      </div> */}

      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
            Purpose-built features that{" "}
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-8 h-8 text-emerald-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              address the unique challenges,
            </span>{" "}
            healthcare providers face with patient financing.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(190px,auto)] md:auto-rows-[minmax(210px,auto)] gap-4 md:gap-6 mt-12">
          {/* A. Flexible payment plans */}
          <div className="col-span-1 md:col-span-4 row-span-2 relative rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
            <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-cyan-300/10 blur-2xl" />
            <div className="h-full p-5 md:p-6 flex flex-col">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-cyan-600" aria-hidden />
                </div>
                <h3 className="text-xl md:text-2xl tracking-tight font-semibold text-slate-900">
                  Flexible payment plans
                </h3>
              </div>
              <p className="mt-3 text-sm md:text-[15px] leading-6 text-slate-600">
                Offer 4, 8, or 12-month installments with transparent pricing —
                increase acceptance while keeping care affordable.
              </p>

              {/* Segmented plan selector */}
              <div className="mt-5 rounded-xl bg-slate-50 ring-1 ring-slate-200/70 p-1.5 inline-flex gap-1.5 w-fit">
                {[4, 8, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m as 4 | 8 | 12)}
                    className={[
                      planButtonBase,
                      months === m ? planButtonActive : planButtonInactive,
                    ].join(" ")}
                  >
                    {m} mo
                  </button>
                ))}
              </div>

              {/* Mini pricing card */}
              <div className="mt-4 rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center">
                      <TrendingUp
                        className="h-4 w-4 text-emerald-600"
                        aria-hidden
                      />
                    </div>
                    <span className="text-[13px] font-medium text-slate-600">
                      Selected plan
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md ring-1 ring-emerald-200">
                    APR {(apr * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="mt-3 flex items-end gap-2">
                  <div className="text-slate-900">
                    <div className="text-2xl md:text-3xl tracking-tight font-semibold">
                      {fmtMoneyPerMo}
                    </div>
                  </div>
                  <div className="text-[12px] text-slate-500">
                    for <span>{months}</span> months • no hidden fees
                  </div>
                </div>

                {/* Progress visual */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                    <span>Principal</span>
                    <span>Paid off</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${Math.round((100 / months) * 3)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[12px] text-slate-500">
                Example $899 treatment. Actual terms shown at checkout. No
                prepayment penalties.
              </div>
            </div>
          </div>

          {/* B. Instant approvals <60s */}
          <div className="col-span-1 md:col-span-4 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-indigo-600" aria-hidden />
                </div>
                <h3 className="text-xl tracking-tight font-semibold text-slate-900">
                  Instant approvals in &lt;60s
                </h3>
              </div>
              <span className="text-[12px] font-medium text-slate-600">
                live
              </span>
            </div>

            {/* Approval notification */}
            <div className="mt-4 rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Zap className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-slate-900 tracking-tight">
                    Approved
                  </div>
                  <div className="text-[12px] text-slate-500">
                    AI underwriting • soft pull
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500">decision time</div>
                <div className="text-lg font-semibold tracking-tight text-slate-900">
                  {timer}s
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Most patients receive a decision in under a minute, keeping
              scheduling on track.
            </p>
          </div>

          {/* C. Patient-friendly mobile process */}
          <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden p-5 md:p-6">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-fuchsia-500/10 ring-1 ring-fuchsia-500/20 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-fuchsia-600" aria-hidden />
              </div>
              <h3 className="text-xl md:text-2xl tracking-tight font-semibold text-slate-900">
                Patient-friendly mobile process
              </h3>
            </div>
            <p className="mt-3 text-sm md:text-[15px] leading-6 text-slate-600">
              Patients complete financing on their phone — in-office or at home
              — no paperwork required.
            </p>

            {/* Phone mock */}
            <div className="mt-5 relative">
              <div className="mx-auto w-[84%] rounded-[28px] bg-slate-900/95 text-white shadow-2xl ring-1 ring-black/20 overflow-hidden">
                <div className="h-8 bg-slate-800/80" />
                <div className="p-4">
                  <div className="text-[13px] text-slate-300">
                    Breeze Checkout
                  </div>
                  <div className="mt-1 text-lg font-medium tracking-tight">
                    Confirm your plan
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white text-slate-900 p-2.5">
                      <div className="text-xs text-slate-600">4 mo</div>
                      <div className="text-sm font-semibold tracking-tight">
                        $212/mo
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-400/10 ring-1 ring-emerald-300/40 p-2.5">
                      <div className="text-xs text-emerald-200">8 mo</div>
                      <div className="text-sm font-semibold tracking-tight text-white">
                        $112/mo
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-800 p-2.5 ring-1 ring-white/10">
                      <div className="text-xs text-slate-300">12 mo</div>
                      <div className="text-sm font-semibold tracking-tight">
                        $78/mo
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-[12px] text-slate-300">
                      No hidden fees
                    </div>
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-white text-slate-900 px-3 py-1.5 text-sm font-medium shadow-sm">
                      Continue
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>

              {/* floating SMS pill */}
              <div className="absolute -bottom-3 -right-2 rounded-full bg-white shadow-lg ring-1 ring-black/5 px-3 py-1.5 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-fuchsia-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10z" />
                </svg>
                <span className="text-[12px] font-medium text-slate-700">
                  Texted link to patient
                </span>
              </div>
            </div>
          </div>

          {/* E. Bank-level security */}
          <div className="col-span-1 md:col-span-4 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-amber-600" aria-hidden />
              </div>
              <h3 className="text-xl tracking-tight font-semibold text-slate-900">
                Bank-level security &amp; compliance
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              PCI DSS compliant with full encryption and robust fraud protection
              — safeguard PHI while staying audit-ready.
            </p>
            <div className="absolute -right-6 -bottom-10 h-40 w-40 rounded-full bg-amber-300/10 blur-2xl" />
            <div className="absolute right-4 bottom-4 opacity-70">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="28"
                  stroke="#f59e0b"
                  strokeOpacity=".35"
                  strokeWidth="2"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="20"
                  stroke="#f59e0b"
                  strokeOpacity=".25"
                  strokeWidth="2"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="12"
                  stroke="#f59e0b"
                  strokeOpacity=".2"
                  strokeWidth="2"
                />
                <path
                  d="M22 28c4-6 12-6 16 0M25 32c3-4 7-4 10 0M28 36c1-2 3-2 4 0"
                  stroke="#f59e0b"
                  strokeOpacity=".5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* D. +67% treatment acceptance (Recharts here) */}
          <div className="col-span-1 md:col-span-8 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center">
                    <TrendingUp
                      className="h-5 w-5 text-emerald-600"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl tracking-tight font-semibold text-slate-900">
                    Up to +67% treatment acceptance
                  </h3>
                </div>
                <p className="mt-3 text-sm md:text-[15px] text-slate-600">
                  Clear terms and instant decisions drive more approved plans
                  and completed treatments.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 text-[12px] font-medium">
                <ArrowUpRight className="h-4 w-4" aria-hidden /> +67%
              </span>
            </div>

            {/* Recharts line/area with shadcn-styled tooltip */}
            <div className="mt-4">
              <div className="relative h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="fill-accept"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgb(16 185 129)"
                          stopOpacity={0.18}
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(16 185 129)"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(148,163,184,.25)"
                      vertical={false}
                      strokeDasharray="0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(203,213,225,1)" }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[30, 80]}
                      tickFormatter={(v) => `${v}%`}
                      width={28}
                    />
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="acceptance"
                      stroke="rgb(16 185 129)"
                      strokeWidth={2}
                      fill="url(#fill-accept)"
                      dot={false}
                      isAnimationActive={true}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* F. EHR integration */}
          <div className="col-span-1 md:col-span-4 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-sky-500/10 ring-1 ring-sky-500/20 flex items-center justify-center">
                <Cable className="h-5 w-5 text-sky-600" aria-hidden />
              </div>
              <h3 className="text-xl tracking-tight font-semibold text-slate-900">
                Seamless EHR integration
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Works with your practice systems for minimal disruption and faster
              staff adoption.
            </p>

            {/* small capability/status chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium">
                <CheckCircle2
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
                Connected
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-[11px] font-medium">
                FHIR
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-[11px] font-medium">
                HL7 v2
              </span>
            </div>

            {/* Node style logos */}
            <div className="mt-4 relative h-24">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-sky-500/70" />
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200" />

              <div className="absolute -top-1 right-10 flex flex-col items-center gap-1">
                <Image
                  height={7}
                  width={7}
                  src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                  alt=""
                  className="h-9 w-9 rounded-full ring-2 ring-white shadow"
                />
                <span className="text-[11px] text-slate-600">Epic</span>
              </div>
              <div className="absolute top-7 right-1 flex flex-col items-center gap-1">
                <Image
                  height={9}
                  width={9}
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=160&auto=format&fit=crop"
                  alt=""
                  className="h-9 w-9 rounded-full ring-2 ring-white shadow"
                />
                <span className="text-[11px] text-slate-600">Dentrix</span>
              </div>
              <div className="absolute bottom-1 right-16 flex flex-col items-center gap-1">
                <Image
                  height={9}
                  width={9}
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=160&auto=format&fit=crop"
                  alt=""
                  className="h-9 w-9 rounded-full ring-2 ring-white shadow"
                />
                <span className="text-[11px] text-slate-600">Athena</span>
              </div>

              <div className="absolute bottom-0 left-4 text-[11px] text-slate-500">
                Last sync 12m ago
              </div>
            </div>
          </div>

          {/* H. Support & training */}
          <div className="col-span-1 md:col-span-8 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-lime-500/10 ring-1 ring-lime-500/20 flex items-center justify-center">
                <Headphones className="h-5 w-5 text-lime-600" aria-hidden />
              </div>
              <h3 className="text-xl md:text-2xl tracking-tight font-semibold text-slate-900">
                Dedicated support &amp; training
              </h3>
            </div>

            {/* lightweight KPIs */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium">
                CSAT 98%
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-50 text-sky-700 ring-1 ring-sky-200 px-2 py-0.5 text-[11px] font-medium">
                SLA &lt; 2 min
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-[11px] font-medium">
                NPS +62
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200/70 p-4 bg-slate-50/40">
                <div className="flex items-center gap-2">
                  <Image
                    height={7}
                    width={7}
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop"
                    className="h-7 w-7 rounded-full"
                    alt=""
                  />
                  <div className="text-[13px] font-medium text-slate-800">
                    Account manager
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-slate-600">
                  Personalized onboarding and staff enablement.
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium">
                  <CalendarCheck2
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  7-day go-live
                </span>
              </div>
              <div className="rounded-xl border border-slate-200/70 p-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-lime-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 20h9" />
                    <path d="M16 20a6 6 0 1 0-8 0" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                  <div className="text-[13px] font-medium text-slate-800">
                    24/7 chat &amp; phone
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-slate-600">
                  Avg first response 1m 42s. 24/7 coverage.
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-sky-50 text-sky-700 ring-1 ring-sky-200 px-2 py-0.5 text-[11px] font-medium">
                  Median 1m 42s
                </span>
              </div>
              <div className="rounded-xl border border-slate-200/70 p-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-lime-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M4 19h16" />
                    <path d="M7 11h10" />
                    <path d="M12 4v16" />
                  </svg>
                  <div className="text-[13px] font-medium text-slate-800">
                    Templates &amp; SOPs
                  </div>
                </div>
                <p className="mt-2 text-[12px] text-slate-600">
                  Playbooks and scripts for front desk and coordinators.
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-[11px] font-medium">
                  40+ templates
                </span>
              </div>
            </div>
          </div>

          {/* G. Next-day funding */}
          <div className="col-span-1 md:col-span-4 row-span-1 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-6">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-rose-500/10 ring-1 ring-rose-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-rose-600" aria-hidden />
              </div>
              <h3 className="text-xl tracking-tight font-semibold text-slate-900">
                Next-day funding guaranteed
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Get paid in full the next business day.
            </p>

            <div className="mt-4 rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-[13px] text-slate-600">Payout to</div>
                <div className="text-[12px] font-medium text-slate-700">
                  ACH • Clinic Operating
                </div>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 mb-0.5">
                    Amount
                  </div>
                  <div className="text-xl font-semibold tracking-tight text-slate-900">
                    $7,420.00
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 mb-0.5">ETA</div>
                  <div className="text-sm font-medium text-slate-900">
                    Tomorrow 9:00 AM
                  </div>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-rose-500 to-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
