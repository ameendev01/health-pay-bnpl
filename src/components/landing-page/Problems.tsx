"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProblemsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 mt-20">
      {/* Headline */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <h2
          className="mx-auto max-w-6xl font-semibold tracking-tight text-slate-800 text-pretty leading-[1.05]
                     text-[clamp(32px,6vw,64px)]"
        >
          When patients can't afford care,{/* force break here */}
          <br />
          <span className="inline-flex items-center gap-2">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>everyone loses</span>
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            // Responsive grid: stack → 2 cols → 6 cols w/ fixed rows
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
            "lg:[--row:96px] lg:[grid-template-rows:repeat(6,var(--row))]"
          )}
        >
          {/* 1 — left tall (rows 1–4) */}
          <Surface
            className={cn(
              "col-span-1", // mobile default
              "lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1",
              // reserve space so asset never covers footnotes
              "pb-24 sm:pb-28"
            )}
            ariaLabel="Cost stops care"
          >
            <Title tall>Cost stops care</Title>
            <Body tall>
              ~1 in 3 adults delay or skip care due to cost. Up-front-only
              policies turn “maybe” into “not today.”
            </Body>

            {/* Decorative asset — fluid size, bottom-right anchored */}
            <TileAsset
              src="/assets/plus.png"
              alt="Credit card, medical cross, and coins"
              className="
    w-[170%] sm:w-[200%] lg:w-[260%]
    translate-x-[6%] translate-y-[6%]
    lg:translate-x-[14%] lg:translate-y-[20%]
  "
            />

            {/* <Footnote href="https://www.kff.org/">KFF</Footnote>
            <Footnote href="https://www.webpt.com/blog/">WebPT</Footnote> */}
          </Surface>

          {/* 2 — left short (rows 5–6): full-bleed text */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5"
            ariaLabel="Interest is not an option"
          >
            <FullText>
              Interest-based financing inflates costs and clashes with core
              values. Patients and clinics want care, not interest or penalties.
              If financing includes interest, the plan is unacceptable, period.
            </FullText>
            {/* <Footnote href="https://halaltimes.com/">
              Islamic finance (riba)
            </Footnote> */}
          </Surface>

          {/* 3 — middle short (rows 1–2): full-bleed text */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1"
            ariaLabel="Credit screens out patients"
          >
            <FullText>
              Bank-sponsored plans favor higher credit scores. Patients who
              don’t fit the model are declined—even when care is necessary.
            </FullText>
            {/* <Footnote href="https://www.webpt.com/blog/">
              Approval norms
            </Footnote> */}
          </Surface>

          {/* 4 — middle tall (rows 3–6) */}
          <Surface
            className="col-span-1 pb-24 sm:pb-28 lg:col-span-2 lg:row-span-4 lg:col-start-3 lg:row-start-3"
            ariaLabel="Slow pay blocks cash flow"
          >
            <Title tall>Slow pay blocks cash flow</Title>
            <Body tall>
              Revenue trickles in for months while payroll, rent, and supplies
              are due now.
            </Body>
            <TileAsset
              src="/assets/hourglasss.png"
              alt="Hourglass with payment tiles"
              className="
    w-[180%] sm:w-[210%] lg:w-[280%]
    translate-x-[6%] translate-y-[8%]
    lg:translate-x-[22%] lg:translate-y-[20%]
  "
            />
            {/* <Footnote href="https://www.finturf.com/for-providers/">
              Finturf
            </Footnote> */}
          </Surface>

          {/* 6 — right tall (rows 1–4) */}
          <Surface
            className="col-span-1 pb-24 sm:pb-28 lg:col-span-2 lg:row-span-4 lg:col-start-5 lg:row-start-1"
            ariaLabel="Collections drain the team"
          >
            <Title tall>Collections drain the team</Title>
            <Body tall>
              Running plans in-house makes you a lender—calls, statements,
              chasing late payers—all outside your core work.
            </Body>
            <TileAsset
              src="/assets/cost-cut.png"
              alt="Collections admin stack"
              className="
    w-[180%] sm:w-[210%] lg:w-[280%]
    translate-x-[6%] translate-y-[6%]
    lg:translate-x-[15%] lg:translate-y-[20%]
  "
            />
            {/* <Footnote href="https://withcherry.com/">WithCherry</Footnote> */}
          </Surface>

          {/* 7 — right short (rows 5–6): full-bleed text */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-5"
            ariaLabel="Default risk hits margins"
          >
            <FullText>
              Without risk-sharing, a few large defaults can wipe out profit.
              Bad for business every single day.
            </FullText>
            {/* <Footnote href="https://www.finturf.com/for-providers/">
              Financing risk
            </Footnote> */}
          </Surface>
        </div>
      </div>
    </section>
  );
}

/** --- TYPOGRAPHY --- */
function Title({
  children,
  tall = false,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <h3
      className={cn(
        "relative z-[2] font-semibold tracking-tight text-slate-900",
        tall ? "text-[clamp(18px,1.7vw,22px)]" : "text-[clamp(16px,1.5vw,20px)]"
      )}
    >
      {children}
    </h3>
  );
}

function Body({
  children,
  tall = false,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <p
      className={cn(
        "relative z-[2] text-slate-600",
        tall
          ? "text-[13.5px] md:text-sm leading-relaxed"
          : "text-[13px] md:text-sm leading-6"
      )}
    >
      {children}
    </p>
  );
}

/** Full-bleed text variant for short cards */
function FullText({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "relative z-[2] text-slate-800 font-medium",
        "text-[clamp(14px,1.6vw,18px)] leading-[1.35] select-text"
      )}
      style={{ hyphens: "auto" as any }}
    >
      {children}
    </p>
  );
}

/** --- SURFACE / TILE --- */
function Surface({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <Card
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "relative overflow-hidden",
        "h-full rounded-[28px] bg-white",
        "shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_40px_-20px_rgba(15,23,42,0.15)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        "transition-transform duration-200 will-change-transform",
        "motion-safe:hover:translate-y-[-1px] motion-safe:hover:shadow-[0_2px_0_0_rgba(15,23,42,0.03),0_26px_50px_-26px_rgba(15,23,42,0.18)]",
        "motion-reduce:transform-none motion-reduce:shadow-none",
        "p-6 md:p-7 flex flex-col gap-2",
        className
      )}
    >
      {children}
    </Card>
  );
}

/** --- FOOTNOTE LINKS --- */
function Footnote({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative z-[2] mt-auto inline-flex items-center gap-1 text-[11px] tracking-wide",
        "text-slate-400 hover:text-slate-600 transition-colors underline decoration-slate-200/60 hover:decoration-slate-400"
      )}
    >
      {children}
      <ExternalIcon />
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M11 3h6v6h-2V6.41l-6.3 6.3-1.4-1.42 6.3-6.3H11V3Z"
        fill="currentColor"
      />
      <path d="M5 5h4v2H7v6h6v-2h2v4H5V5Z" fill="currentColor" />
    </svg>
  );
}

/** --- DECORATIVE ASSET --- */
function TileAsset({
  src,
  alt,
  className, // use for width + translate only
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 z-[1] flex items-end justify-end overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1600}
        sizes={sizes ?? "(min-width:1024px) 24vw, (min-width:640px) 42vw, 70vw"}
        className={cn(
          // allow overscale + shifting to crop PNG’s empty edges
          "block h-auto max-w-none will-change-transform drop-shadow-[0_12px_28px_rgba(0,0,0,0.10)]",
          className
        )}
        priority={false}
      />
    </div>
  );
}
