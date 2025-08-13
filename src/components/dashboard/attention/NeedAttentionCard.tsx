"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CreditCard,
  BarChart3,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
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
      {/* Header: shadcn layout + icon */}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-[18px] font-semibold text-neutral-900">
              <span
                className={`
              inline-grid h-5 w-5 place-items-center rounded-md
              bg-amber-50 text-amber-700 ring-1 ring-amber-200
            `}
              >
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Needs attention
            </CardTitle>
            <p className="mt-1 text-[14px] text-neutral-600">
              Items that require your review.
            </p>
          </div>

          <span
            className="hidden sm:inline-flex items-center rounded-full bg-neutral-100
                   text-[11px] font-medium text-neutral-700 px-2 py-1 shrink-0"
          >
            {items.length} items need attention
          </span>
        </div>
      </CardHeader>

      {/* rows are auto-height now → no fake top padding */}
      <ul className="flex-1 min-h-0 flex flex-col gap-4 px-5 pb-0">
        {items.map(({ href, n, text, icon: Icon, tone }) => (
          <li key={text} className="min-h-0">
            <Link
              href={href}
              aria-label={`Review ${n} ${labelFor(text)}, ${toneLabel(
                tone
              )} priority`}
              className={clsx(
                // make the row the positioning context and clip to rounded corners
                "relative overflow-hidden",
                // layout
                "group grid grid-cols-[12px_124px_1fr_auto] grid-rows-[auto_auto] gap-y-6 items-center",
                "rounded-lg border border-neutral-200 bg-white pr-4 py-2.5",
                "hover:bg-neutral-50 hover:shadow-sm active:shadow",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              )}
            >
              {/* RAIL — absolute so it spans the whole row height */}
              <span
                aria-hidden
                className={clsx(
                  "pointer-events-none absolute inset-y-0 left-0 w-2 rounded-l-md",
                  RAIL_BG[tone]
                )}
              />

              {/* row 1: metric (col 2) */}
              <div className="col-start-2 row-start-1 px-4 flex items-baseline gap-2 min-w-0">
                <span className="shrink-0 text-[26px] sm:text-[28px] leading-none font-semibold tabular-nums text-slate-900">
                  {n}
                </span>
                <span className=" whitespace-nowrap text-[11px] uppercase tracking-wide text-neutral-500">
                  {labelFor(text)}
                </span>
              </div>

              {/* row 1: pill (col 4) */}
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

              {/* row 2: title under metric */}
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
