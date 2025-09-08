// app/components/BreezeBentoSection.tsx
// Server component — pure markup + Tailwind.
// Uses your Surface/Title/Body utilities.

import { cn } from "@/lib/utils";
import { Body, Surface, TileAsset, Title } from "../SoftCard";

export default function BreezeBentoSection() {
  return (
    <section className="relative antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
            Purpose-built features for{" "}
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-8 h-8 text-emerald-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              clinic managers, removing
            </span>{" "}
            friction from checkout to close
          </h2>
        </div>

        {/* Bento grid */}
        <div
          className={cn(
            "mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6",
            "[grid-auto-rows:auto] md:[--row:100px] md:[grid-auto-rows:var(--row)] md:[grid-template-rows:repeat(6,var(--row))]"
          )}
        >
          {/* 1 — tall left */}
          <Surface
            className="md:col-span-4 md:row-span-4"
            ariaLabel="Flexible payment plans"
          >
            <Title tall>Flexible payment plans</Title>
            <Body tall>
              Offer 4, 8, or 12-month installments with transparent pricing to
              increase acceptance while keeping care affordable.
            </Body>
            <TileAsset
              src="/assets/flexible.png"
              alt="Treatment acceptance"
              className="
                    w-[180%] sm:w-[210%] lg:w-[280%]
                    translate-x-[6%] translate-y-[6%]
                    lg:translate-x-[12%] lg:translate-y-[16%]
                  "
            />
          </Surface>

          {/* 2 — top middle */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="Instant approvals"
          >
            <Title>Instant approvals in &lt;60s</Title>
            <Body>
              Most patients receive a decision in under a minute, keeping
              scheduling on track.
            </Body>
          </Surface>

          {/* 3 — tall right */}
          <Surface
            className="md:col-span-4 md:row-span-4"
            ariaLabel="Patient-friendly mobile process"
          >
            <Title tall>Patient-friendly mobile process</Title>
            <Body tall>
              Patients complete financing on their phone—in-office or at home.
              No paperwork, no friction.
            </Body>
            <TileAsset
              src="/assets/patient-mobile.png"
              alt="Treatment acceptance"
              className="
                w-[180%] sm:w-[210%] lg:w-[280%]
                translate-x-[6%] translate-y-[6%]
                lg:translate-x-[15%] lg:translate-y-[18%]
              "
            />
          </Surface>

          {/* 4 — middle-left single */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="Bank-level security and compliance"
          >
            <Title>Bank-level security &amp; compliance</Title>
            <Body>
              PCI DSS compliant with full encryption and robust fraud
              protection—safeguarding PHI while staying audit-ready.
            </Body>
          </Surface>

          {/* 5 — wide bottom-left (now exactly 2 row units, no saggy space) */}
          <Surface
            className="md:col-span-8 md:row-span-2"
            ariaLabel="+67% treatment acceptance"
          >
            <Title>Up to +67% treatment acceptance</Title>
            <Body>
              Clear terms and instant decisions boost plan approvals and
              completed treatments.
            </Body>
          </Surface>

          {/* 6 — bottom-right single (matches +67% height) */}
          <Surface
            className="md:col-span-4 md:row-span-2"
            ariaLabel="EHR integration"
          >
            <Title>Seamless EHR integration</Title>
            <Body>
              Works with your practice systems for minimal disruption and faster
              staff adoption.
            </Body>
          </Surface>
        </div>
      </div>
    </section>
  );
}
