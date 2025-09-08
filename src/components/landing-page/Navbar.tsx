"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Ink = "light" | "dark";

/** Compute contrast if no data-nav-ink found (walks up until non-transparent bg). */
function detectInkFromBg(start: HTMLElement): Ink {
  const getBg = (el: HTMLElement): string | null => {
    const s = getComputedStyle(el);
    const bg = s.backgroundColor;
    if (!bg || bg === "transparent" || bg.includes("rgba(0, 0, 0, 0)"))
      return null;
    return bg;
  };
  let el: HTMLElement | null = start;
  let bg: string | null = null;
  while (el && el !== document.body && !bg) {
    bg = getBg(el);
    el = el.parentElement;
  }
  // default to white background if none found
  const m = (bg ?? "rgb(255,255,255)").match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/
  );
  if (!m) return "dark";
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const toLin = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  return L < 0.5 ? "light" : "dark"; // dark bg → light ink
}

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ink, setInk] = useState<Ink>("dark"); // header text color
  const headerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let raf = 0;
    const recalc = () => {
      raf = 0;
      const h = header.offsetHeight || 72;
      const el = document.elementFromPoint(
        window.innerWidth / 2,
        h + 1
      ) as HTMLElement | null;
      if (!el) return;

      // climb to nearest ancestor that declares data-nav-ink
      let node: HTMLElement | null = el;
      let declared: Ink | null = null;
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

    recalc(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const link =
    "text-inherit text-sm font-medium opacity-80 hover:opacity-100 transition";
  const mobileLink =
    "text-inherit text-xs font-medium opacity-80 hover:opacity-100 transition";

  return (
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

          <nav className="hidden items-center gap-6 md:flex">
            <div className="relative group">
              <button className={`flex items-center gap-1 ${link}`}>
                Use cases <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="relative group">
              <button className={`flex items-center gap-1 ${link}`}>
                Resources <ChevronDown className="h-3 w-3" />
              </button>
            </div>
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

          {/* Desktop actions (fixed colors) */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className="rounded-2xl bg-slate-100 px-3 py-1.5 text-sm font-medium
               text-slate-700 hover:bg-slate-200 hover:text-slate-900"
            >
              Log in
            </Link>

            <InteractiveHoverButton
              className="text-sm font-medium py-1.5 text-slate-900" // stays dark, never inherits
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </InteractiveHoverButton>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden rounded-md p-1.5 text-inherit ring-1 transition opacity-80 hover:opacity-100 ${
              ink === "light"
                ? "ring-white/30 hover:ring-white/50"
                : "ring-slate-300 hover:ring-slate-400"
            }`}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white py-4 text-slate-800">
            <nav className="flex flex-col gap-4">
              <button
                className={`flex items-center justify-between ${mobileLink}`}
              >
                Use cases <ChevronDown className="h-3 w-3" />
              </button>
              <button
                className={`flex items-center justify-between ${mobileLink}`}
              >
                Resources <ChevronDown className="h-3 w-3" />
              </button>
              <a href="#pricing" className={mobileLink}>
                Pricing
              </a>
              <a href="#careers" className={mobileLink}>
                Careers
              </a>
              <a href="#contact" className={mobileLink}>
                Contact sales
              </a>
              <hr className="border-slate-200" />
              <Link
                href="/login"
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Get Breeze free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
