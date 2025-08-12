// components/dashboard/NeedsAttentionCard.tsx
"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AlertCircle, CreditCard, BarChart3 } from "lucide-react";
import clsx from "clsx";

const items = [
  {
    href: "/payments?status=overdue",
    n: 23,
    text: "Claims need resubmission",
    icon: AlertCircle,
    tone: "danger",
  },
  {
    href: "/clinics?status=pending",
    n: 19,
    text: "Delinquent payment plans",
    icon: CreditCard,
    tone: "warning",
  },
  {
    href: "/analytics?view=performance",
    n: 1,
    text: "Clinic needs performance review",
    icon: BarChart3,
    tone: "info",
  },
] as const;

const tones: Record<string, string> = {
  danger: "ring-red-200/70 hover:bg-red-50/60 [--icon:theme(colors.red.500)]",
  warning:
    "ring-amber-200/70 hover:bg-amber-50/60 [--icon:theme(colors.amber.500)]",
  info: "ring-blue-200/70 hover:bg-blue-50/60 [--icon:theme(colors.blue.500)]",
};

export default function NeedsAttentionCard() {
  return (
    <Card className="h-full rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col">
      <div className="px-5 pt-5">
        <h3 className="text-[15px] font-semibold text-slate-900">
          Needs attention
        </h3>
      </div>

      <ul className="p-5 pt-4 flex-1 min-h-0 flex flex-col gap-3">
        {items.map(({ href, n, text, icon: Icon, tone }) => (
          <li key={text}>
            <Link
              href={href}
              className={clsx(
                "group grid grid-cols-[1fr_auto] items-center rounded-xl",
                "border border-neutral-200/80 bg-white px-3.5 py-3",
                "transition-colors focus:outline-none focus:ring-2",
                "text-slate-900",
                "ring-offset-0",
                tones[tone]
              )}
            >
              <span className="text-[15px] leading-6">
                <span className="font-semibold tabular-nums">{n}</span>{" "}
                <span className="font-medium">{text}</span>
              </span>
              <Icon
                className="h-5 w-5 shrink-0 opacity-90"
                style={{ color: "var(--icon)" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
