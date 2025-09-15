// components/StatsStripe.tsx
"use client";

import * as React from "react";
import { Building2, CreditCard, TrendingUp } from "lucide-react";
import { NumberTicker } from "../magicui/number-ticker";

type Stat = { value: string; label: string; description: string; Icon?: React.ElementType };

const trustMetrics: Stat[] = [
  {
    value: "2,500+",
    label: "Healthcare providers",
    description:
      "Clinics and practices using Breeze to approve more patients and get paid in full next-day—without extra admin.",
    Icon: Building2,
  },
  {
    value: "$850M+",
    label: "Payments processed",
    description:
      "Proven at scale: Instant payouts, zero collections effort, and bank-grade compliance.",
    Icon: CreditCard,
  },
  {
    value: "+67%",
    label: "Acceptance boost",
    description:
      "Average lift in approved treatment plans after offering flexible 0–low-interest monthly payments.",
    Icon: TrendingUp,
  },
];

// isolate digits for the ticker; keep prefix/suffix static
function decompose(raw: string) {
  const m = raw.trim().match(/^([^\d\-+]*)([+\-]?\d[\d,]*(?:\.\d+)?)(.*)$/);
  const prefix = m?.[1] ?? "";
  const numeric = (m?.[2] ?? "0").replace(/,/g, "");
  const suffix = m?.[3] ?? "";
  const num = Number(numeric) || 0;
  const announced = `${prefix}${new Intl.NumberFormat().format(num)}${suffix}`;
  return { prefix, num, suffix, announced };
}

export default function Stats({
  items = trustMetrics,
  className = "",
  surfaceClassName = "",
}: {
  items?: Stat[];
  className?: string;
  surfaceClassName?: string;
}) {
  return (
    <section aria-label="Outcome metrics" className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div
        className={`mx-auto max-w-7xl rounded-3xl bg-neutral-200/40 ring-1 ring-neutral-300/70 overflow-hidden ${surfaceClassName}`}
      >
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-300/80"
        >
          {items.map(({ value, label, description, Icon }, i) => {
            const { prefix, num, suffix, announced } = decompose(value);
            const Glyph = Icon ?? [Building2, CreditCard, TrendingUp][i % 3];

            return (
              <li key={i} className="p-6 sm:p-8 lg:p-10">
                {/* MOBILE: vertical stack; DESKTOP: split row */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-6 min-w-0 text-left">
                  {/* LEFT block: icon → value → label */}
                  <div className="flex items-start gap-3 md:flex-col md:justify-between md:gap-0 flex-shrink-0">
                    <Glyph aria-hidden className="h-16 w-16 sm:h-6 sm:w-6 text-neutral-900 max-sm:opacity-70" />

                    <div className="md:pt-4">
                      <div
                        className="inline-flex items-baseline font-semibold tracking-tight text-neutral-900 leading-[0.9]
                                   text-[40px] sm:text-[48px] lg:text-5xl tabular-nums"
                        aria-label={announced}
                      >
                        {prefix && <span aria-hidden>{prefix}</span>}
                        <NumberTicker value={num} className="leading-[0.9] tracking-tighter" />
                        {suffix && <span aria-hidden>{suffix}</span>}
                      </div>

                      <div className="mt-2 text-[15px] sm:text-sm text-neutral-800/95">
                        {label}
                      </div>
                    </div>
                  </div>

                  {/* Description: under headline on mobile; to the right on md+ */}
                  <p
                    className="mt-3 md:mt-0 md:pl-2 flex-1 min-w-0 text-[14px] sm:text-[15px] leading-6 md:leading-relaxed text-neutral-800/95"
                  >
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
