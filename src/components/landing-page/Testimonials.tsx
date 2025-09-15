// TestimonialsSection.tsx
import { Activity, Quote, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
/* ---------------- MOBILE: ACCORDION ---------------- */

type MobileItem = {
  stat: string | null;
  label: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  dark?: boolean;
  withIcon?: boolean;
};

function MobileAccordion() {
  const items: MobileItem[] = [
    {
      stat: "8X",
      label: "Increase in treatment approvals",
      quote:
        "We needed a seamless way to offer pay-over-time for dental and cosmetic procedures. The team went above and beyond—implementation took days, not weeks—and our approval rate increased by 800% in just two weeks. Highly recommended for any clinic.",
      name: "David Callahan",
      role: "COO, BrightSmile Clinics",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
      withIcon: true,
    },
    {
      stat: "2X",
      label: "More lead conversion",
      quote:
        "From landing page to in-clinic signage, every detail was handled meticulously. Patients now discover flexible payment options earlier, and our inbound requests have doubled.",
      name: "Sarah Mitchel",
      role: "Marketing Director, NovaDerm",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    },
    {
      stat: null,
      label: "“Our orthopedics videos convert far better.”",
      quote:
        "Our orthopedics videos and pre-op explanations now convert far better. Financing is presented clearly at the right moment, and patients feel in control.",
      name: "Tom Becker",
      role: "Founder, PulseCare",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=120&auto=format&fit=crop",
    },
    {
      stat: null,
      label: "“Polished, on-brand, under a minute.”",
      quote:
        "The team shipped our MVP checkout in days with an elegant on-brand flow. Patients complete applications in under a minute. The product feels polished and professional.",
      name: "Sara Minchel",
      role: "Director, MedGrowth",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=120&auto=format&fit=crop",
      dark: true,
    },
  ];

  const [open, setOpen] = useState<number | null>(0); // first open by default

  return (
    <ul className="md:hidden flex flex-col gap-3">
      {items.map((it, i) => (
        <li key={i}>
          <AccordionCard
            item={it}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        </li>
      ))}
    </ul>
  );
}

function AccordionCard({
  item,
  open,
  onToggle,
}: {
  item: MobileItem;
  open: boolean;
  onToggle: () => void;
}) {
  const { stat, label, quote, name, role, avatar, dark, withIcon } = item;

  const shell =
    "rounded-3xl p-4 ring-1 transition-shadow";
  const light =
    "bg-[#fefcf5] text-neutral-900 ring-black/5 shadow-[0_14px_36px_-18px_rgba(2,6,23,0.35)]";
  const darkCls =
    "bg-neutral-900 text-neutral-100 ring-white/10 border border-neutral-800/60 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]";

  const headerId = `t-head-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const panelId = `t-panel-${label.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <article className={`${shell} ${dark ? darkCls : light}`}>
      {/* Header */}
      <button
        id={headerId}
        aria-controls={panelId}
        aria-expanded={open}
        type="button"
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-3"
      >
        <div className="min-w-0">
          {stat ? (
            <div className="flex items-baseline gap-2">
              <span className="text-[24px] font-semibold tracking-tight">
                {stat}
              </span>
              <span className="text-[14px] font-medium opacity-80">
                {label}
              </span>
            </div>
          ) : (
            <div className="text-[15px] font-semibold">{label}</div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {withIcon && (
            <div className="h-8 w-8 rounded-full bg-neutral-50/80 border border-neutral-200/60 grid place-items-center">
              <Activity className="h-4 w-4 text-neutral-600" aria-hidden />
            </div>
          )}
          <ChevronRight
            className={`h-5 w-5 opacity-70 transition-transform ${
              open ? "rotate-90" : ""
            }`}
            aria-hidden
          />
        </div>
      </button>

      {/* Collapsible content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 flex items-center gap-2 text-rose-600">
            <Quote className="h-4 w-4" aria-hidden />
          </div>

          <p
            className={`mt-2 text-[14.5px] leading-[1.6] ${
              dark ? "text-neutral-100/90" : "text-neutral-700"
            }`}
          >
            {quote}
          </p>

          <div className="mt-4 pt-1 flex items-center gap-3">
            <Image
              height={36}
              width={36}
              src={avatar}
              alt={`${name} avatar`}
              className={`h-9 w-9 rounded-full object-cover ${
                dark ? "ring-2 ring-neutral-800" : "ring-2 ring-white"
              }`}
            />
            <div className="leading-tight">
              <p className="text-sm font-medium">{name}</p>
              <p className={`text-[12.5px] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- SECTION ---------------- */

export default function Testimonials() {
  return (
    <section className="px-4 py-14 sm:py-16 md:py-20 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <div
          data-nav-ink="light"
          className="relative rounded-[32px] bg-gray-900 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_40px_-20px_rgba(15,23,42,0.15)]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px]" />

          <div className="flex flex-col gap-10 sm:gap-12 md:gap-14 p-5 sm:p-8 md:p-12 lg:p-12">
            {/* Header — unchanged */}
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

            {/* MOBILE: accordion list */}
            <MobileAccordion />

            {/* DESKTOP/TABLET GRID — unchanged */}
            <div className="hidden md:grid grid-cols-1 gap-6 md:gap-7 lg:gap-4 md:grid-cols-2 xl:grid-cols-8 xl:grid-rows-6">
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
                    <Activity className="h-4 w-4 text-neutral-600" aria-hidden />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Quote className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-neutral-700">
                    “We needed a seamless way to offer pay-over-time for dental and cosmetic procedures.
                    The team went above and beyond—implementation took days, not weeks—and our approval
                    rate increased by 800% in just two weeks. Highly recommended for any clinic.”
                  </p>
                </div>

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
                      <p className="text-sm font-medium text-neutral-900">David Callahan</p>
                      <p className="text-[13px] text-neutral-500">COO, BrightSmile Clinics</p>
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
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">2X</span>
                  <p className="text-neutral-700 font-medium">Increase in lead generation</p>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Quote className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                    “From landing page to in-clinic signage, every detail was handled meticulously.
                    Patients now discover flexible payment options earlier, and our inbound requests have doubled.”
                  </p>
                </div>

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
                      <p className="text-sm font-medium text-neutral-900">Sarah Mitchel</p>
                      <p className="text-[13px] text-neutral-500">Marketing Director, NovaDerm</p>
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
                  “Our orthopedics videos and pre-op explanations now convert far better. Financing is
                  presented clearly at the right moment, and patients feel in control.”
                </p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <Image
                    height={9}
                    width={9}
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar"
                    className="h-9 w-9 rounded-full ring-2 ring-[#fefcf5] object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-neutral-900">Tom Becker</p>
                    <p className="text-[13px] text-neutral-500">Founder, PulseCare</p>
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
                  “The team shipped our MVP checkout in days with an elegant on-brand flow. Patients
                  complete applications in under a minute. The product feels polished and professional.”
                </p>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <Image
                    height={9}
                    width={9}
                    src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar"
                    className="h-9 w-9 rounded-full ring-2 ring-neutral-800 object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-white">Sara Minchel</p>
                    <p className="text-[13px] text-neutral-400">Director, MedGrowth</p>
                  </div>
                </div>
              </article>
            </div>

            {/* Footer Row */}
          </div>
        </div>
      </div>
    </section>
  );
}
