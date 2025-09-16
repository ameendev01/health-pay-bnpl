"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Ink = "light" | "dark";

/** Contrast detection for desktop ink (frozen to dark while mobile sheet is open). */
function detectInkFromBg(start: HTMLElement): Ink {
  const getBg = (el: HTMLElement): string | null => {
    const s = getComputedStyle(el);
    const bg = s.backgroundColor;
    if (!bg || bg === "transparent" || bg.includes("rgba(0, 0, 0, 0)"))
      return null;
    return bg;
  };
  let el: HTMLElement | null = start,
    bg: string | null = null;
  while (el && el !== document.body && !bg) {
    bg = getBg(el);
    el = el.parentElement;
  }
  const m = (bg ?? "rgb(255,255,255)").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return "dark";
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const toLin = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  return L < 0.5 ? "light" : "dark";
}

/* ---------------- Mobile Sheet (PORTALED) ---------------- */
function MobileSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false); // for slide-in
  const portalEl = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.id = "mobile-nav-portal";
    return el;
  }, []);

  useEffect(() => {
    if (!portalEl) return;
    document.body.appendChild(portalEl);
    setMounted(true);
    return () => {
      try {
        document.body.removeChild(portalEl);
      } catch {}
    };
  }, [portalEl]);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPR = style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    style.overflow = "hidden";
    if (scrollbar > 0) style.paddingRight = `${scrollbar}px`;
    return () => {
      style.overflow = prevOverflow;
      style.paddingRight = prevPR;
    };
  }, [open]);

  if (!mounted || !open || !portalEl) return null;

  const sheetClasses = [
    "fixed right-2 top-2 bottom-2",
    "w-[min(88vw,360px)]",
    "rounded-[28px] overflow-hidden",
    "bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100",
    "shadow-2xl ring-1 ring-white/10",
    "flex flex-col",
    "transition-transform duration-200 ease-out will-change-transform",
    entered ? "translate-x-0" : "translate-x-4",
  ].join(" ");

  return createPortal(
    <>
      {/* Rounded blue backdrop (scrim) */}
      {/* Rounded BLURRED scrim (click to close) */}
      {/* Full-screen BLURRED scrim (covers every pixel) */}
<button
  aria-label="Close menu"
  onClick={onClose}
  className="fixed inset-0 z-[9998]"  // ❗ no padding here
>
  {/* Layer 1: the actual blur veil (full bleed) */}
  <span
    aria-hidden
    className={[
      "absolute inset-0",
      "bg-black/50",                        // fallback tint so blur reads on all browsers
      "backdrop-blur-[2px]",                 // heavy blur
      "supports-[backdrop-filter]:bg-white/5", // lighter tint when blur supported
    ].join(" ")}
  />

  {/* Layer 2 (optional): rounded frame for the “rounded viewport” look */}
  {/* <span
    aria-hidden
    className={[
      "pointer-events-none absolute inset-0",
      "m-2 sm:m-3 rounded-[24px]",
      "ring-1 ring-black/10 supports-[backdrop-filter]:ring-white/15",
    ].join(" ")}
  /> */}
</button>


      {/* Right sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`z-[9999] ${sheetClasses}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          paddingTop: "max(env(safe-area-inset-top), 12px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
        }}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-white/10 text-white">
              <span className="text-xs font-semibold">BZ</span>
            </div>
            <span className="text-lg font-semibold">Breeze</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/15"
          >
            Close <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-1 overflow-y-auto">{children}</div>

        {/* Sticky bottom actions */}
        <div className="mt-auto px-4">
          <div className="my-3 h-px bg-white/10" />
          <Link
            href="/login"
            onClick={onClose}
            className="block rounded-full bg-white/10 px-4 py-2 text-center text-sm font-medium hover:bg-white/15"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            className="mt-2 block rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Get Breeze free
          </Link>
        </div>
        <div className="px-4 pb-2 pt-3 text-xs text-white/60">
          © {new Date().getFullYear()} Breeze. All rights reserved.
        </div>
      </aside>
    </>,
    portalEl
  );
}

/* ---------------- Main NavBar ---------------- */
export const NavBar = () => {
  const [ink, setInk] = useState<Ink>("dark");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  // Desktop ink recalculation (frozen when open)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let raf = 0;
    const recalc = () => {
      raf = 0;
      if (open) {
        setInk("dark");
        return;
      }
      const h = header.offsetHeight || 72;
      const el = document.elementFromPoint(
        window.innerWidth / 2,
        h + 1
      ) as HTMLElement | null;
      if (!el) return;
      // climb for data-nav-ink
      let node: HTMLElement | null = el,
        declared: Ink | null = null;
      while (node && node !== document.body) {
        const v = node.dataset?.navInk as Ink | undefined;
        if (v === "light" || v === "dark") {
          declared = v;
          break;
        }
        node = node.parentElement;
      }
      setInk(declared ?? detectInkFromBg(el));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(recalc);
    };
    const onResize = onScroll;
    recalc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  const link =
    "text-inherit text-sm font-medium opacity-80 hover:opacity-100 transition";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 pt-3 z-50 backdrop-blur-md transition-colors ${
          ink === "light" ? "text-white" : "text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex h-14 items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-white">
                <span className="text-xs font-semibold tracking-tight">BZ</span>
              </div>
              <span className="text-inherit text-xl font-semibold tracking-tight">
                Breeze
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 md:flex">
              <button className={`flex items-center gap-1 ${link}`}>
                Use cases <ChevronDown className="h-3 w-3" />
              </button>
              <button className={`flex items-center gap-1 ${link}`}>
                Resources <ChevronDown className="h-3 w-3" />
              </button>
              <a href="#pricing" className={link}>
                Pricing
              </a>
              <a href="#careers" className={link}>
                Careers
              </a>
              <a href="#contact" className={link}>
                Contact sales
              </a>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-2xl bg-slate-100 px-3 py-1.5 text-sm font-medium
                 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              >
                Log in
              </Link>
              <button
                className="rounded-2xl bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(true)}
              className={`md:hidden rounded-md p-1.5 text-inherit ring-1 transition opacity-80 hover:opacity-100 ${
                ink === "light"
                  ? "ring-white/30 hover:ring-white/50"
                  : "ring-slate-300 hover:ring-slate-400"
              }`}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* PORTALED mobile menu */}
      <MobileSheet open={open} onClose={() => setOpen(false)}>
        <nav className="space-y-1 text-[17px] leading-6">
          <button className="flex w-full items-center justify-between rounded-xl px-2 py-3 hover:bg-white/5">
            <span>Use cases</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
          <button className="flex w-full items-center justify-between rounded-xl px-2 py-3 hover:bg-white/5">
            <span>Resources</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
          <a
            className="block rounded-xl px-2 py-3 hover:bg-white/5"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="block rounded-xl px-2 py-3 hover:bg-white/5"
            href="#careers"
          >
            Careers
          </a>
          <a
            className="block rounded-xl px-2 py-3 hover:bg-white/5"
            href="#contact"
          >
            Contact sales
          </a>
        </nav>
      </MobileSheet>
    </>
  );
};
