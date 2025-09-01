"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

/* ----- Defaults from your original CSS ----- */
const DEFAULTS = {
  baseFreqX: 0.008,
  baseFreqY: 0.008,
  octaves: 2,
  seed: 92,
  scale: 77,
  noiseBlur: 0.02,
};

function GlassDefs({
  baseFreqX,
  baseFreqY,
  octaves,
  seed,
  scale,
  noiseBlur,
}: typeof DEFAULTS) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
      {/* Container filter = big wobble for bars/cards */}
      <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={`${baseFreqX} ${baseFreqY}`}
          numOctaves={octaves}
          seed={seed}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation={noiseBlur} result="blur" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blur"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Button filter = subtle wobble for round buttons (optional) */}
      <filter id="btn-glass" primitiveUnits="objectBoundingBox">
        <feImage
          href="data:image/png;base64,REPLACE_WITH_YOUR_BASE64_BUMP_MAP"
          x="0"
          y="0"
          width="1"
          height="1"
          result="map"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
        <feDisplacementMap
          in="blur"
          in2="map"
          scale="1"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [controls, setControls] = useState(DEFAULTS);

  const set = <K extends keyof typeof DEFAULTS,>(k: K, v: number) =>
  setControls((s) => ({ ...s, [k]: v }));


  return (
    <>
      {/* defs once on the page */}
      <GlassDefs {...controls} />

      {/* Optional: a busy background so the wobble is obvious */}
      <div className="fixed inset-0 -z-50 bg-[radial-gradient(1200px_circle_at_10%_-10%,#E5D9CB,transparent_60%),radial-gradient(900px_circle_at_90%_10%,#cde4ff,transparent_55%),linear-gradient(180deg,#fff, #f6f6f6)]" />

      {/* NAVBAR (liquid-glass shell uses the container filter) */}
      <header className="sticky top-0 z-50 pt-3">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div
            className="
              relative isolate overflow-hidden rounded-2xl
              before:content-[''] before:absolute before:inset-0 before:rounded-2xl
              before:bg-white/10
              before:shadow-[inset_2px_2px_0_-2px_rgba(255,255,255,0.7),inset_0_0_3px_1px_rgba(255,255,255,0.7)]
              before:pointer-events-none

              after:content-[''] after:absolute after:inset-0 after:rounded-2xl
              after:pointer-events-none after:overflow-hidden after:isolate
              after:[backdrop-filter:blur(0px)] after:[-webkit-backdrop-filter:blur(0px)]
              after:[filter:url(#container-glass)] after:[-webkit-filter:url(#container-glass)]
              after:-z-10

              px-4 md:px-6
            "
          >
            <div className="flex h-14 items-center justify-between">
              <a href="#" className="flex items-center gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-white">
                  <span className="text-xs font-semibold tracking-tight">BZ</span>
                </div>
                <span className="text-xl font-semibold tracking-tight text-slate-900">
                  Breeze
                </span>
              </a>

              <nav className="hidden items-center gap-6 md:flex">
                <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-slate-900">
                    Use cases
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-slate-900">
                    Resources
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <a href="#pricing" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                  Pricing
                </a>
                <a href="#careers" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                  Careers
                </a>
                <a href="#contact" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                  Contact sales
                </a>
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <a
                  href="#login"
                  className="rounded-2xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                >
                  Log in
                </a>
                <button className="rounded-2xl bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Sign Up
                </button>
              </div>

              <button
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen((o) => !o)}
                className="md:hidden rounded-md p-1.5 text-slate-700 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden border-t border-white/20 bg-transparent py-4">
                <nav className="flex flex-col gap-4">
                  <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                    Use cases <ChevronDown className="h-3 w-3" />
                  </button>
                  <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                    Resources <ChevronDown className="h-3 w-3" />
                  </button>
                  <a href="#pricing" className="text-xs font-medium text-slate-700 transition hover:text-slate-900">
                    Pricing
                  </a>
                  <a href="#careers" className="text-xs font-medium text-slate-700 transition hover:text-slate-900">
                    Careers
                  </a>
                  <a href="#contact" className="text-xs font-medium text-slate-700 transition hover:text-slate-900">
                    Contact sales
                  </a>
                  <hr className="border-white/20" />
                  <a
                    href="#login"
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                  >
                    Log in
                  </a>
                  <a
                    href="#demo"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Get Breeze free
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---- CONTROL PANEL ---- */}
      {/* <div className="fixed right-4 top-24 z-[60] w-80 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Liquid Glass Controls</h3>
          <button
            onClick={() => setControls(DEFAULTS)}
            className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>

        <Control
          label={`Wobble scale (${controls.scale})`}
          min={0}
          max={120}
          step={1}
          value={controls.scale}
          onChange={(v) => set("scale", v)}
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Control
            label={`Freq X (${controls.baseFreqX})`}
            min={0.001}
            max={0.03}
            step={0.001}
            value={controls.baseFreqX}
            onChange={(v) => set("baseFreqX", v)}
          />
          <Control
            label={`Freq Y (${controls.baseFreqY})`}
            min={0.001}
            max={0.03}
            step={0.001}
            value={controls.baseFreqY}
            onChange={(v) => set("baseFreqY", v)}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Control
            label={`Octaves (${controls.octaves})`}
            min={1}
            max={5}
            step={1}
            value={controls.octaves}
            onChange={(v) => set("octaves", v)}
          />
          <Control
            label={`Seed (${controls.seed})`}
            min={0}
            max={999}
            step={1}
            value={controls.seed}
            onChange={(v) => set("seed", v)}
          />
        </div>
        <Control
          className="mt-3"
          label={`Noise blur (${controls.noiseBlur})`}
          min={0}
          max={0.1}
          step={0.005}
          value={controls.noiseBlur}
          onChange={(v) => set("noiseBlur", v)}
        />
        <p className="mt-2 text-[11px] leading-tight text-slate-500">
          Tip: on plain white backgrounds, displacement is subtle. Keep a soft gradient or photo behind the bar to really see the jelly.
        </p>
      </div> */}
    </>
  );
}

/* Simple slider control */
function Control({
  label,
  value,
  onChange,
  min,
  max,
  step,
  className = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[11px] font-medium text-slate-600">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-slate-800"
      />
    </label>
  );
}
