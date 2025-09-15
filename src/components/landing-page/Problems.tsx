// components/ProblemsSection.tsx
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
          When patients can't afford care,
          <br />
          <span className="inline-flex items-center gap-2">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>everyone loses</span>
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
            "lg:[--row:96px] lg:[grid-template-rows:repeat(6,var(--row))]"
          )}
        >
          {/* 1 — left tall */}
          <Surface
            className={cn("col-span-1", "lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1", "lg:pb-24")}
            ariaLabel="Cost stops care"
            mobileImg="/assets/plus.png"
            mobileAlt="Credit card, medical cross, and coins"
          >
            <Title>Cost stops care</Title>
            <Body>
              ~1 in 3 adults delay or skip care due to cost. Up-front-only policies turn “maybe” into “not today.”
            </Body>
            <TileAsset
              showFrom="lg"
              src="/assets/plus.png"
              alt="Credit card, medical cross, and coins"
              className="lg:w-[260%] lg:translate-x-[14%] lg:translate-y-[20%]"
            />
          </Surface>

          {/* 2 — left short */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5"
            ariaLabel="Interest is not an option"
            mobileImg="/assets/plus.png"
            mobileAlt="Clay finance blocks"
          >
            <Title>Interest is not an option</Title>
            <Body>
              Interest-based financing inflates costs and clashes with core values. Patients and clinics want care, not interest or
              penalties. If financing includes interest, the plan is unacceptable, period.
            </Body>
          </Surface>

          {/* 3 — middle short */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1"
            ariaLabel="Credit screens out patients"
            mobileImg="/assets/hourglasss.png"
            mobileAlt="Clay hourglass"
          >
            <Title>Credit screens out patients</Title>
            <Body>
              Bank-sponsored plans favor higher credit scores. Patients who don’t fit the model are declined—even when care is necessary.
            </Body>
          </Surface>

          {/* 4 — middle tall */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-4 lg:col-start-3 lg:row-start-3 lg:pb-24"
            ariaLabel="Slow pay blocks cash flow"
            mobileImg="/assets/hourglasss.png"
            mobileAlt="Clay hourglass with tiles"
          >
            <Title>Slow pay blocks cash flow</Title>
            <Body>Revenue trickles in for months while payroll, rent, and supplies are due now.</Body>
            <TileAsset
              showFrom="lg"
              src="/assets/hourglasss.png"
              alt="Hourglass with payment tiles"
              className="lg:w-[280%] lg:translate-x-[22%] lg:translate-y-[20%]"
            />
          </Surface>

          {/* 6 — right tall */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-4 lg:col-start-5 lg:row-start-1 lg:pb-24"
            ariaLabel="Collections drain the team"
            mobileImg="/assets/cost-cut.png"
            mobileAlt="Collections admin stack"
          >
            <Title>Collections drain the team</Title>
            <Body>
              Running plans in-house makes you a lender—calls, statements, chasing late payers—all outside your core work.
            </Body>
            <TileAsset
              showFrom="lg"
              src="/assets/cost-cut.png"
              alt="Collections admin stack"
              className="lg:w-[280%] lg:translate-x-[15%] lg:translate-y-[20%]"
            />
          </Surface>

          {/* 7 — right short */}
          <Surface
            className="col-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-5"
            ariaLabel="Default risk hits margins"
            mobileImg="/assets/cost-cut.png"
            mobileAlt="Clay ledger blocks"
          >
            <Title>Default risk hits margins</Title>
            <Body>Without risk-sharing, a few large defaults can wipe out profit. Bad for business every single day.</Body>
          </Surface>
        </div>
      </div>
    </section>
  );
}

/** --- TYPOGRAPHY (consistent on mobile) --- */
function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative z-[2] font-semibold tracking-tight text-slate-900 text-[17px] md:text-[clamp(18px,1.7vw,22px)]">
      {children}
    </h3>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative z-[2] text-slate-600 text-[13.5px] md:text-sm leading-[1.55] md:leading-relaxed">
      {children}
    </p>
  );
}

/** --- SURFACE / TILE --- */
function Surface({
  className,
  children,
  ariaLabel,
  mobileImg,
  mobileAlt,
}: {
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  mobileImg?: string;   // mobile thumbnail (required for consistency)
  mobileAlt?: string;
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
        // unified vertical rhythm
        "p-5 md:p-7 flex flex-col gap-2",
        className
      )}
    >
      {/* Mobile thumbnail — same aspect & spacing everywhere */}
      {mobileImg && (
        <MobileThumb src={mobileImg} alt={mobileAlt ?? ""} />
      )}
      {children}
    </Card>
  );
}

/** Top-mounted mobile image with fixed aspect ratio */
function MobileThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="lg:hidden -mx-1 -mt-1 mb-3">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:1023px) 100vw"
          className="object-contain p-2"
          priority={false}
        />
      </div>
    </div>
  );
}

/** Desktop decorative overlay */
function TileAsset({
  src,
  alt,
  className,
  sizes,
  showFrom = "lg",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  showFrom?: "sm" | "md" | "lg";
}) {
  const visibility = showFrom === "sm" ? "flex" : showFrom === "md" ? "hidden md:flex" : "hidden lg:flex";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none absolute inset-0 z-[1] items-end justify-end overflow-hidden",
        visibility
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1600}
        sizes={sizes ?? "(min-width:1024px) 24vw, (min-width:640px) 42vw, 70vw"}
        className={cn("block h-auto max-w-none will-change-transform drop-shadow-[0_12px_28px_rgba(0,0,0,0.10)]", className)}
        priority={false}
      />
    </div>
  );
}
