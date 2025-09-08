// Server Component — no "use client"
import { ShieldCheck, CreditCard, FileCheck } from "lucide-react";

export default function ProofSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* HIPAA */}
          <div className="flex flex-col">
            <div className="rounded-2xl border-2 border-neutral-400/60 bg-transparent">
              <div className="flex flex-col items-center justify-between h-full min-h-[190px]">
                {/* Top row (icon + label) */}
                <div className="w-full flex items-center justify-center gap-2 pt-6">
                  <ShieldCheck className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
                  <p className="text-[13px] leading-none font-medium tracking-tight text-neutral-900">
                    HIPAA Compliance
                  </p>
                </div>

                {/* Mark */}
                <div className="flex items-end justify-center gap-3 py-6">
                  <span className="text-[72px] md:text-[68px] leading-none font-semibold tracking-tight">
                    BAA
                  </span>
                  <span
                    aria-hidden="true"
                    className="pb-2 text-[48px] md:text-[44px] leading-none font-semibold tracking-tight"
                  >
                    ✓
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2">
              <p className="mt-3 text-[17px] leading-6 font-medium tracking-tight text-neutral-900">
                We operate as a Business Associate and sign BAAs. PHI handling follows the HIPAA
                Privacy &amp; Security Rules.
              </p>
            </div>
          </div>

          {/* PCI DSS */}
          <div className="flex flex-col">
            <div className="rounded-2xl border-2 border-neutral-400/60 bg-transparent">
              <div className="flex flex-col items-center justify-between h-full min-h-[190px]">
                {/* Top row (icon + label) */}
                <div className="w-full flex items-center justify-center gap-2 pt-6">
                  <CreditCard className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
                  <p className="text-[13px] leading-none font-medium tracking-tight text-neutral-900">
                    PCI DSS Compliance
                  </p>
                </div>

                {/* Mark */}
                <div className="flex items-end justify-center gap-3 py-6">
                  <span className="text-[64px] md:text-[60px] leading-none font-semibold tracking-tight">
                    PCI&nbsp;DSS
                  </span>
                  <span
                    aria-hidden="true"
                    className="pb-2 text-[44px] md:text-[40px] leading-none font-semibold tracking-tight"
                  >
                    ✓
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2">
              <p className="mt-3 text-[17px] leading-6 font-medium tracking-tight text-neutral-900">
                Card data runs through PCI DSS–validated gateways; we follow the standard’s technical
                and operational controls.
              </p>
            </div>
          </div>

          {/* Reg Z (CFPB) */}
          <div className="flex flex-col">
            <div className="rounded-2xl border-2 border-neutral-400/60 bg-transparent">
              <div className="flex flex-col items-center justify-between h-full min-h-[190px]">
                {/* Top row (icon + label) */}
                <div className="w-full flex items-center justify-center gap-2 pt-6">
                  <FileCheck className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
                  <p className="text-[13px] leading-none font-medium tracking-tight text-neutral-900">
                    Reg Z (CFPB)
                  </p>
                </div>

                {/* Mark */}
                <div className="flex items-end justify-center gap-3 py-6">
                  <span className="text-[72px] md:text-[68px] leading-none font-semibold tracking-tight">
                    Rights
                  </span>
                  <span
                    aria-hidden="true"
                    className="pb-2 text-[48px] md:text-[44px] leading-none font-semibold tracking-tight"
                  >
                    ✓
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2">
              <p className="mt-3 text-[17px] leading-6 font-medium tracking-tight text-neutral-900">
                BNPL users receive credit-card-like protections: statements, dispute handling,
                refunds on returns, and payment pause during investigations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
