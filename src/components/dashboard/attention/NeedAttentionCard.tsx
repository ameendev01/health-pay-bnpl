"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AlertCircle, CreditCard, BarChart3, ChevronRight } from "lucide-react";
import clsx from "clsx";

type Tone = "danger" | "warning" | "info";

const items = [
  {
    href: "/payments?status=overdue",
    n: 23,
    text: "Claims need resubmission",
    icon: AlertCircle,
    tone: "danger" as Tone,
  },
  {
    href: "/clinics?status=pending",
    n: 19,
    text: "Delinquent payment plans",
    icon: CreditCard,
    tone: "warning" as Tone,
  },
  {
    href: "/analytics?view=performance",
    n: 1,
    text: "Clinic needs performance review",
    icon: BarChart3,
    tone: "info" as Tone,
  },
] as const;

const RAIL_BG: Record<Tone, string> = {
  danger: "bg-red-600",
  warning: "bg-amber-500",
  info: "bg-blue-600",
};
const PILL: Record<Tone, string> = {
  danger: "bg-red-50 text-red-700 ring-red-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  info: "bg-blue-50 text-blue-700 ring-blue-100",
};

export default function NeedsAttentionCard() {
  return (
    <Card className="h-full rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col">
      {/* header unchanged */}
      <div className="px-5 pt-0 pb-2 flex items-center justify-between">
        <h3 className="leading-tight text-lg sm:text-[1.1rem] font-semibold text-neutral-900">
          Needs attention
        </h3>
        <span className="hidden sm:inline-flex items-center rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-700 px-2 py-1">
          {items.length} items need attention
        </span>
      </div>

      {/* rows are auto-height now → no fake top padding */}
      <ul className="flex-1 min-h-0 flex flex-col gap-6 px-5 pb-0">
        {items.map(({ href, n, text, icon: Icon, tone }) => (
          <li key={text} className="min-h-0">
            <Link
              href={href}
              aria-label={`Review ${n} ${labelFor(text)}, ${toneLabel(
                tone
              )} priority`}
              className={clsx(
                "group grid grid-cols-[8px_124px_1fr_auto] grid-rows-[auto_auto] gap-y-6 items-center",
                "rounded-lg border border-neutral-200 bg-white px-0 py-4",
                "hover:bg-neutral-50 hover:shadow-sm active:shadow",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              )}
            >
              {/* rail spans full item height */}
              <span
                aria-hidden
                className={clsx(
                  "col-start-1 row-span-2 self-stretch rounded-l-md",
                  RAIL_BG[tone]
                )}
              />

              {/* row 1: metric */}
              <div className="col-start-2 row-start-1 px-4 flex items-baseline gap-2 min-w-0">
                <span className="shrink-0 text-[26px] sm:text-[28px] leading-none font-semibold tabular-nums text-slate-900">
                  {n}
                </span>
                <span className="truncate whitespace-nowrap text-[11px] uppercase tracking-wide text-neutral-500">
                  {labelFor(text)}
                </span>
              </div>

              {/* row 1: severity pill (right) */}
              <span
                className={clsx(
                  "col-start-4 row-start-1 justify-self-end inline-flex items-center gap-1 rounded-md px-2 py-0.5",
                  "text-[11px] font-semibold ring-1 ring-inset min-w-[64px] justify-center",
                  PILL[tone]
                )}
              >
                {tone === "danger"
                  ? "High"
                  : tone === "warning"
                  ? "Medium"
                  : "Info"}
              </span>

              {/* row 2: title under metric, spanning wide */}
              <div className="col-start-2 row-start-2 col-span-2 min-w-0 pr-3 px-4">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
                  <span
                    title={text}
                    className="text-[14px] leading-5 font-medium text-slate-900 line-clamp-1 sm:line-clamp-2 min-w-0"
                  >
                    {text}
                  </span>
                </div>
              </div>

              {/* row 2: Review (right) */}
              <span className="col-start-4 row-start-2 justify-self-end inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 group-hover:underline">
                Review <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function labelFor(title: string) {
  const t = title.toLowerCase();
  if (t.includes("claim")) return "claims";
  if (t.includes("payment")) return "payment plans";
  if (t.includes("clinic")) return "clinics";
  return "items";
}
function toneLabel(t: Tone) {
  return t === "danger" ? "high" : t === "warning" ? "medium" : "informational";
}
