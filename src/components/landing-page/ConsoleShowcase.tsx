"use client";

import Image, { type StaticImageData } from "next/image";
import { memo, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  cubicBezier,
  type Transition,
  type Variants,
} from "framer-motion";

type Shot = {
  id: string;
  title: string;
  desc: string;
  src: StaticImageData | string;
  alt: string;
};

const SHOTS: Shot[] = [
  {
    id: "rcm",
    title: "Revenue Cycle Management",
    desc: "All your RCM tools in one place—claims, denials, payments, and patient financing.",
    src: "/assets/screenshots/rcm.png",
    alt: "RCM dashboard with claims, denials, payments, and patient financing",
  },
  {
    id: "mini-performance",
    title: "Clinic performance",
    desc: "At-a-glance KPIs—financing volume, acceptance rate, and AR aging.",
    src: "/assets/screenshots/mini-performance.png",
    alt: "Clinic performance dashboard with KPIs for financing volume, acceptance rate, and AR aging",
  },
  {
    id: "patients",
    title: "Patients queue",
    desc: "Prioritize by status, next payment, and balance—bulk actions keep ops moving.",
    src: "/assets/screenshots/patients.png",
    alt: "Patients list with statuses, next payment, progress, and balance",
  },
  {
    id: "claims",
    title: "Claims ledger",
    desc: "RCM + BNPL in one ledger—payer, aging, and outcomes without tab-hopping.",
    src: "/assets/screenshots/claims.png",
    alt: "Claims table with payer, amount, status, aging, updated columns",
  },
  {
    id: "new-claim",
    title: "New claim wizard",
    desc: "5-step clean claim with BNPL flags; save draft or submit when ready.",
    src: "/assets/screenshots/new-claim.png",
    alt: "New claim modal with patient & encounter step",
  },
];

/** Overlay lift so text never gets clipped by sticky overflow */
const CARD_TOP_OFFSET_REM = 9; // your current top-60 ≈ 15rem; you've tuned to 9
const ADJUST_REM = 1.5; // positive lowers text slightly
const overlayBottom = `calc(${
  CARD_TOP_OFFSET_REM - ADJUST_REM
}rem + clamp(16px, 6vh, 80px) + env(safe-area-inset-bottom,0px))`;

/** Framer Motion transitions (typed) */
const EASE = cubicBezier(0.25, 0.46, 0.45, 0.94);
const CARD_TRANSITION: Transition = { duration: 0.8, ease: EASE };
const CONTENT_TRANSITION: Transition = { duration: 0.6, ease: EASE };

/** Variants (typed) */
const cardVariants: Variants = {
  active: { scale: 1, y: 0, opacity: 1, zIndex: 10 },
  prev: { scale: 0.95, y: -30, opacity: 0.3, zIndex: 5 },
  next: { scale: 0.9, y: 60, opacity: 0, zIndex: 1 },
};

type Phase = "active" | "prev" | "next";

/** Single slide (memoized) */
const CardSlide = memo(function CardSlide({
  shot,
  phase,
  index,
}: {
  shot: Shot;
  phase: Phase;
  index: number;
}) {
  const isActive = phase === "active";

  return (
    <motion.div
      className="absolute inset-0 w-full h-full top-60 will-change-transform will-change-opacity [transform:translateZ(0)]"
      initial="next"
      animate={phase}
      variants={cardVariants}
      transition={CARD_TRANSITION}
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <Image
          src={shot.src || "/placeholder.svg"}
          alt={shot.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={index === 0}
          quality={85} // lighter decode; visually fine here
        />

        {/* Global bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Content overlay */}
        <div
          className="absolute left-0 right-0 p-8 md:p-12"
          style={{ bottom: overlayBottom }}
        >
          <motion.div
            className="relative max-w-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isActive ? 0 : 40, opacity: isActive ? 1 : 0 }}
            transition={CONTENT_TRANSITION}
          >
            {/* Feathered vignette plate (no visible edges) */}
            {/* <div
              className="absolute pointer-events-none -inset-12 z-0"
              style={
                {
                  backgroundColor: "rgba(0,0,0,0.58)",
                  mixBlendMode: "multiply",
                  filter: "blur(8px)",
                  WebkitMaskImage:
                    "radial-gradient(120% 95% at 42% 72%, black 0% 52%, transparent 86%)",
                  maskImage:
                    "radial-gradient(120% 95% at 42% 72%, black 0% 52%, transparent 86%)",
                } as React.CSSProperties
              }
            /> */}

            {/* Text */}
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-4">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h4 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                {shot.title}
              </h4>

              <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.30)]">
                {shot.desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default function ConsoleShowcase() {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = SHOTS.length;

  // Cheap bucket index: update state only when segment changes
  useMotionValueEvent(scrollYProgress, "change", (t) => {
    const idx = Math.min(
      cardLength - 1,
      Math.max(0, Math.floor(t * cardLength - 1e-6))
    );
    setActiveCard((prev) => (prev === idx ? prev : idx));
  });

  // Only render active ±1
  const renderSet = useMemo(() => {
    const s = new Set<number>();
    for (let i = -1; i <= 1; i++) {
      const k = activeCard + i;
      if (k >= 0 && k < cardLength) s.add(k);
    }
    return s;
  }, [activeCard, cardLength]);

  return (
    <section
      id="console"
      data-nav-ink="light"
      className="relative w-full"
      ref={ref}
      style={{ height: `${cardLength * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center bg-black overflow-hidden">
        {/* Header */}
        <div className="absolute top-10 left-0 right-0 z-20 pt-16 pb-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <header className="text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                The Breeze Console
              </h3>
              <p className="mt-4 text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Approvals, payouts, and AR—visible at a glance. Built for clinic
                managers, not bankers.
              </p>
            </header>
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[90vh] max-w-8xl">
            {SHOTS.map((shot, index) => {
              if (!renderSet.has(index)) return null;
              const phase: Phase =
                index === activeCard
                  ? "active"
                  : index < activeCard
                  ? "prev"
                  : "next";
              return (
                <CardSlide
                  key={shot.id}
                  shot={shot}
                  phase={phase}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
