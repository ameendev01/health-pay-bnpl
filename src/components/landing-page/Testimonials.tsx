// TestimonialsSection.tsx
import { Activity, Quote, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";

function StarSolid({
  className = "",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={ariaHidden}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M12 2.5l2.78 5.63 6.22.9-4.5 4.38 1.06 6.19L12 16.9l-5.56 2.7 1.06-6.19-4.5-4.38 6.22-.9L12 2.5z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="px-4 py-14 sm:py-16 md:py-20 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        {/* Framed surface — now owns all interior spacing */}
        <div
          data-nav-ink="light"
          className="relative rounded-[32px] bg-gray-900  shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_40px_-20px_rgba(15,23,42,0.15)]"
        >
          {/* subtle inset frame */}
          <div className="pointer-events-none absolute inset-0 rounded-[32px]" />

          {/* Content stack uses a single rhythm */}
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-14 p-5 sm:p-8 md:p-12 lg:p-12">
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#fefcf5] leading-tight">
                Clinics on Breeze{" "}
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
                  more approvals,
                </span>{" "}
                faster starts, upfront pay
              </h2>
            </div>

            {/* Cards Grid — responsive; xl snaps to 8×6 layout */}
            <div className="grid grid-cols-1 gap-6 md:gap-7 lg:gap-4 md:grid-cols-2 xl:grid-cols-8 xl:grid-rows-6">
              {/* 1 — Big Left */}
              <article
                className="
                  rounded-[28px] bg-[#fefcf5]
                  ring-1 ring-black/5
                  shadow-[0_28px_80px_-32px_rgba(2,6,23,0.65),0_12px_32px_-16px_rgba(2,6,23,0.45),0_2px_8px_rgba(0,0,0,0.06)]
                  p-6 sm:p-8 md:p-10
                  xl:col-span-4 xl:row-span-6
                  h-full flex flex-col
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-neutral-900">
                        8X
                      </span>
                    </div>
                    <p className="mt-1 text-neutral-700 font-medium">
                      Increase in treatment approvals
                    </p>
                  </div>
                  <div className="shrink-0 hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-neutral-50 border border-neutral-200/60">
                    <Activity
                      className="h-4 w-4 text-neutral-600"
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Quote className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-neutral-700">
                    “We needed a seamless way to offer pay-over-time for dental
                    and cosmetic procedures. The team went above and
                    beyond—implementation took days, not weeks—and our approval
                    rate increased by 800% in just two weeks. Highly recommended
                    for any clinic.”
                  </p>
                </div>

                {/* Reviewer pinned to bottom */}
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      height={10}
                      width={10}
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
                      alt="Client avatar"
                      className="h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-neutral-900">
                        David Callahan
                      </p>
                      <p className="text-[13px] text-neutral-500">
                        COO, BrightSmile Clinics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                  </div>
                </div>
              </article>

              {/* 2 — Top Right */}
              <article
                className="
                  rounded-[24px] bg-[#fefcf5]
                  ring-1 ring-black/5
                  shadow-[0_24px_64px_-28px_rgba(2,6,23,0.6),0_10px_28px_-14px_rgba(2,6,23,0.42),0_2px_6px_rgba(0,0,0,0.06)]
                  p-6 sm:p-7
                  xl:col-span-4 xl:row-span-3 xl:col-start-5
                  h-full flex flex-col
                "
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
                    2X
                  </span>
                  <p className="text-neutral-700 font-medium">
                    Increase in lead generation
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Quote className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                    “From landing page to in-clinic signage, every detail was
                    handled meticulously. Patients now discover flexible payment
                    options earlier, and our inbound requests have doubled.”
                  </p>
                </div>

                {/* Reviewer pinned to bottom */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      height={9}
                      width={9}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                      alt="Client avatar"
                      className="h-9 w-9 rounded-full ring-2 ring-[#fefcf5] object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-neutral-900">
                        Sarah Mitchel
                      </p>
                      <p className="text-[13px] text-neutral-500">
                        Marketing Director, NovaDerm
                      </p>
                    </div>
                  </div>
                  <div className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-200/60 text-neutral-400">
                    <span className="text-xs font-medium">G</span>
                  </div>
                </div>
              </article>

              {/* 3 — Bottom Left Small */}
              <article
                className="
                  rounded-[24px] bg-[#fefcf5]
                  ring-1 ring-black/5
                  shadow-[0_20px_56px_-26px_rgba(2,6,23,0.58),0_8px_24px_-12px_rgba(2,6,23,0.4),0_2px_6px_rgba(0,0,0,0.06)]
                  p-6 sm:p-7
                  xl:col-span-2 xl:row-span-3 xl:col-start-5 xl:row-start-4
                  h-full flex flex-col
                "
              >
                <div className="flex items-center gap-2 text-rose-600">
                  <Quote className="h-4 w-4" aria-hidden />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                  “Our orthopedics videos and pre-op explanations now convert
                  far better. Financing is presented clearly at the right
                  moment, and patients feel in control.”
                </p>

                {/* Reviewer pinned to bottom */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <Image
                    height={9}
                    width={9}
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar"
                    className="h-9 w-9 rounded-full ring-2 ring-[#fefcf5] object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-neutral-900">
                      Tom Becker
                    </p>
                    <p className="text-[13px] text-neutral-500">
                      Founder, PulseCare
                    </p>
                  </div>
                </div>
              </article>

              {/* 4 — Bottom Right Dark */}
              <article
                className="
                  rounded-[24px] bg-neutral-900 text-neutral-100
                  ring-1 ring-white/10
                  shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9),0_10px_30px_-14px_rgba(0,0,0,0.75)]
                  border border-neutral-800/60
                  p-6 sm:p-7
                  xl:col-span-2 xl:row-span-3 xl:col-start-7 xl:row-start-4
                  h-full flex flex-col
                "
              >
                <div className="flex items-center gap-2 text-rose-400">
                  <Quote className="h-4 w-4" aria-hidden />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-100/90">
                  “The team shipped our MVP checkout in days with an elegant
                  on-brand flow. Patients complete applications in under a
                  minute. The product feels polished and professional.”
                </p>

                {/* Reviewer pinned to bottom */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <Image
                    height={9}
                    width={9}
                    src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar"
                    className="h-9 w-9 rounded-full ring-2 ring-neutral-800 object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-white">
                      Sara Minchel
                    </p>
                    <p className="text-[13px] text-neutral-400">
                      Director, MedGrowth
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    width={9}
                    height={9}
                    src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                    alt="Decor"
                    className="h-full w-full"
                  />
                </div>
                <p className="text-[15px] text-neutral-300">
                  In a nutshell - Higher acceptance. Faster treatment starts.
                  Happier patients. Zero AR drag.
                </p>
                <div className="hidden sm:block h-5 w-px bg-neutral-700/40" />
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarSolid
                      key={i}
                      className="h-4 w-4 text-amber-400"
                      aria-hidden
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-[#fefcf5]">
                    4.9
                  </span>
                  <span className="text-sm text-neutral-400">
                    Based on 1.5k reviews
                  </span>
                </div>
              </div>

              <div className="flex justify-start sm:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 shadow-[0_8px_20px_-10px_rgba(2,6,23,0.25)] hover:shadow-[0_14px_30px_-12px_rgba(2,6,23,0.35)] hover:border-neutral-300 transition"
                >
                  <span>View all reviews</span>
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
