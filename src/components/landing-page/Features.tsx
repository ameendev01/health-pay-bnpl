// app/components/BreezeBentoSection.tsx
import { cn } from "@/lib/utils";
import { Body, Surface, TileAsset, Title } from "../SoftCard";
import Image from "next/image";

/** Mobile thumbnail — same treatment as Problems section */
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

export default function BreezeBentoSection() {
  return (
    <section className="relative antialiased">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
    {/* Header */}
<div className="mx-auto max-w-4xl px-4 text-center">
  <h2
    className="
      font-semibold tracking-tight text-slate-800 text-pretty text-balance
      leading-[1.06]
      text-[clamp(28px,8vw,40px)] sm:text-5xl lg:text-6xl
      max-w-[24ch] sm:max-w-none mx-auto
    "
  >
    <span className="block">Purpose-built features for</span>

    {/* star stays glued to “clinic managers,” and centers as a unit */}
    <span className="mt-1 inline-flex items-center gap-2 w-fit mx-auto">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 flex-none"
        viewBox="0 0 24 24" fill="currentColor" aria-hidden
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span>clinic managers,</span>
    </span>

    {/* break “removing …” onto its own lines for mobile sanity */}
    <span className="block">removing friction from</span>
    <span className="block">checkout to close</span>
  </h2>
</div>



        {/* Bento grid */}
        <div
          className={cn(
            "mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4",
            // fixed rows only from md+ so mobile flows naturally
            "md:[--row:100px] md:[grid-template-rows:repeat(6,var(--row))]"
          )}
        >
          {/* 1 — tall left */}
          <Surface
            className={cn("md:col-span-4 md:row-span-4", "lg:pb-24")}
            ariaLabel="Flexible payment plans"
          >
            {/* Mobile image */}
            <MobileThumb
              src="/assets/flexible.png"
              alt="Treatment acceptance"
            />
            <Title tall>Flexible payment plans</Title>
            <Body tall>
              Offer 4, 8, or 12-month installments with transparent pricing to
              increase acceptance while keeping care affordable.
            </Body>
            {/* Desktop decorative asset */}
            <div className="hidden lg:block">
              <TileAsset
                src="/assets/flexible.png"
                alt="Treatment acceptance"
                className="lg:w-[260%] lg:translate-x-[12%] lg:translate-y-[16%]"
              />
            </div>
          </Surface>

          {/* 2 — top middle */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="Instant approvals"
          >
            <MobileThumb
              src="/assets/patient-mobile.png"
              alt="Patient mobile flow"
            />
            <Title tall>Instant approvals in &lt;60s</Title>
            <Body tall>
              Most patients receive a decision in under a minute, keeping
              scheduling on track.
            </Body>
          </Surface>

          {/* 3 — tall right */}
          <Surface
            className={cn("md:col-span-4 md:row-span-4", "lg:pb-24")}
            ariaLabel="Patient-friendly mobile process"
          >
            <MobileThumb
              src="/assets/patient-mobile.png"
              alt="Patient mobile flow"
            />
            <Title tall>Patient-friendly mobile process</Title>
            <Body tall>
              Patients complete financing on their phone—in-office or at home.
              No paperwork, no friction.
            </Body>
            <div className="hidden lg:block">
              <TileAsset
                src="/assets/patient-mobile.png"
                alt="Patient mobile flow"
                className="lg:w-[260%] lg:translate-x-[15%] lg:translate-y-[18%]"
              />
            </div>
          </Surface>

          {/* 4 — middle-left single */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="Bank-level security and compliance"
          >
            <MobileThumb
              src="/assets/patient-mobile.png"
              alt="Patient mobile flow"
            />
            <Title tall>Bank-level security &amp; compliance</Title>
            <Body tall>
              PCI DSS compliant with full encryption and robust fraud
              protection—safeguarding PHI while staying audit-ready.
            </Body>
          </Surface>

          {/* 5 — wide bottom-left */}
          <Surface
            className="md:col-span-8 md:row-span-2"
            ariaLabel="+67% treatment acceptance"
          >
            <Title tall>Up to +67% treatment acceptance</Title>
            <Body tall>
              Clear terms and instant decisions boost plan approvals and
              completed treatments.
            </Body>
          </Surface>

          {/* 6 — bottom-right single */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="EHR integration"
          >
            <MobileThumb
              src="/assets/patient-mobile.png"
              alt="Patient mobile flow"
            />
            <Title tall>Seamless EHR integration</Title>
            <Body tall>
              Works with your practice systems for minimal disruption and faster
              staff adoption.
            </Body>
          </Surface>
        </div>
      </div>
    </section>
  );
}
