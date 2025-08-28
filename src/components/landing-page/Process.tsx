"use client"
import {  Clock } from "lucide-react"

export default function HealthcareBNPLProcess() {
  return (
    <section className="max-w-7xl mx-auto mt-8 md:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {/* Card 1 */}
            <article className="group">
              <div className="rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-900/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
                <h3 className="text-[17px] md:text-[18px] font-semibold tracking-tight text-slate-900">
                  1. Seamless patient onboarding
                </h3>
                <div className="mt-4">
                  {/* Support SVG (Form UI) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#F2F4FF] to-[#F7F7FF] ring-1 ring-slate-900/5 shadow-inner p-4 md:p-5">
                    <svg
                      viewBox="0 0 460 260"
                      className="w-full h-[180px] md:h-[200px]"
                      role="img"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                          <stop offset="1" stopColor="#eef2ff" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                      <rect x="12" y="10" width="436" height="240" rx="18" fill="url(#g1)" stroke="#e8ebff" />
                      <rect x="36" y="42" width="180" height="12" rx="6" fill="#c7d2fe" />
                      <rect x="36" y="70" width="388" height="46" rx="10" fill="#ffffff" stroke="#e5e7eb" />
                      <rect x="36" y="128" width="388" height="44" rx="10" fill="#ffffff" stroke="#e5e7eb" />
                      <rect x="36" y="184" width="252" height="44" rx="10" fill="#ffffff" stroke="#e5e7eb" />
                      <rect x="300" y="184" width="124" height="44" rx="10" fill="#111827" />
                      <text x="322" y="212" fontSize="14" fill="#fff" fontWeight="600">
                        Apply
                      </text>
                      {/* faint lines */}
                      <rect x="52" y="86" width="140" height="10" rx="5" fill="#e5e7eb" />
                      <rect x="52" y="144" width="120" height="10" rx="5" fill="#e5e7eb" />
                      <rect x="52" y="201" width="120" height="10" rx="5" fill="#e5e7eb" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-[14.5px] leading-snug mt-3">
                Patients apply for payment plans in minutes at checkout or online. No paperwork, instant decisions.
              </p>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="text-[13px]">2 mins</span>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group">
              <div className="rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-900/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
                <h3 className="text-[17px] md:text-[18px] font-semibold tracking-tight text-slate-900">
                  2. Securely connect your platforms
                </h3>
                <div className="mt-4">
                  {/* Support SVG (Dark device with check tiles) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#EEF1FF] to-[#F7F7FF] ring-1 ring-slate-900/5 shadow-inner p-4 md:p-5">
                    <svg
                      viewBox="0 0 460 260"
                      className="w-full h-[180px] md:h-[200px]"
                      role="img"
                      aria-hidden="true"
                    >
                      <rect x="126" y="16" width="208" height="228" rx="16" fill="#0f172a" opacity="0.98" />
                      {/* rows */}
                      <g>
                        <rect x="146" y="42" width="130" height="12" rx="6" fill="#475569" />
                        <rect x="146" y="66" width="150" height="24" rx="8" fill="#111827" />
                        <rect x="330" y="66" width="30" height="24" rx="6" fill="#22c55e" />
                        <rect x="146" y="102" width="150" height="24" rx="8" fill="#111827" />
                        <rect x="330" y="102" width="30" height="24" rx="6" fill="#22c55e" />
                        <rect x="146" y="138" width="150" height="24" rx="8" fill="#111827" />
                        <rect x="330" y="138" width="30" height="24" rx="6" fill="#22c55e" />
                        <rect x="146" y="174" width="150" height="24" rx="8" fill="#111827" />
                        <rect x="330" y="174" width="30" height="24" rx="6" fill="#22c55e" />
                      </g>
                      {/* light accents */}
                      <rect x="24" y="204" width="88" height="14" rx="7" fill="#e5e7eb" />
                      <rect x="24" y="224" width="60" height="10" rx="5" fill="#e5e7eb" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-[14.5px] leading-snug mt-3">
                We analyze performance data to tailor financing offers. Read-only integrations keep data private and safe.
              </p>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="text-[13px]">10 mins</span>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group">
              <div className="rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-900/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
                <h3 className="text-[17px] md:text-[18px] font-semibold tracking-tight text-slate-900">
                  3. Flexible payment options
                </h3>
                <div className="mt-4">
                  {/* Support SVG (Offer cards) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#F1F2FF] to-[#F8F8FF] ring-1 ring-slate-900/5 shadow-inner p-4 md:p-5">
                    <svg
                      viewBox="0 0 460 260"
                      className="w-full h-[180px] md:h-[200px]"
                      role="img"
                      aria-hidden="true"
                    >
                      {/* three dark cards */}
                      <g transform="translate(64,70)">
                        <rect width="100" height="72" rx="12" fill="#0b1220" />
                        <rect x="120" width="100" height="72" rx="12" fill="#0b1220" />
                        <rect x="240" width="100" height="72" rx="12" fill="#0b1220" />
                        {/* amounts */}
                        <rect x="12" y="16" width="76" height="10" rx="5" fill="#94a3b8" />
                        <rect x="132" y="16" width="76" height="10" rx="5" fill="#94a3b8" />
                        <rect x="252" y="16" width="76" height="10" rx="5" fill="#94a3b8" />
                        {/* buttons */}
                        <rect x="12" y="44" width="36" height="12" rx="6" fill="#22d3ee" />
                        <rect x="132" y="44" width="36" height="12" rx="6" fill="#22d3ee" />
                        <rect x="252" y="44" width="36" height="12" rx="6" fill="#22d3ee" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-[14.5px] leading-snug mt-3">
                Offer 3–24 month plans that fit any budget—while your clinic receives guaranteed revenue up front.
              </p>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="text-[13px]">Instant offer</span>
              </div>
            </article>

            {/* Card 4 */}
            <article className="group">
              <div className="rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-900/5 shadow-sm p-5 md:p-6 relative overflow-hidden">
                <h3 className="text-[17px] md:text-[18px] font-semibold tracking-tight text-slate-900">
                  4. Automated revenue + analytics
                </h3>
                <div className="mt-4">
                  {/* Support SVG (Analytics chart) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#EEF2FF] to-[#FBFBFF] ring-1 ring-slate-900/5 shadow-inner p-4 md:p-5">
                    <svg
                      viewBox="0 0 460 260"
                      className="w-full h-[180px] md:h-[200px]"
                      role="img"
                      aria-hidden="true"
                    >
                      <rect x="20" y="24" width="420" height="190" rx="14" fill="#ffffff" stroke="#E5E7EB" />
                      {/* grid */}
                      <g opacity="0.65">
                        <line x1="52" y1="70" x2="420" y2="70" stroke="#EEF2F7" />
                        <line x1="52" y1="108" x2="420" y2="108" stroke="#EEF2F7" />
                        <line x1="52" y1="146" x2="420" y2="146" stroke="#EEF2F7" />
                        <line x1="52" y1="184" x2="420" y2="184" stroke="#EEF2F7" />
                      </g>
                      {/* bars */}
                      <rect x="80" y="134" width="22" height="50" rx="6" fill="#c7d2fe" />
                      <rect x="120" y="108" width="22" height="76" rx="6" fill="#a5b4fc" />
                      <rect x="160" y="90" width="22" height="94" rx="6" fill="#818cf8" />
                      <rect x="200" y="118" width="22" height="66" rx="6" fill="#a5b4fc" />
                      <rect x="240" y="80" width="22" height="104" rx="6" fill="#6366f1" />
                      <rect x="280" y="104" width="22" height="80" rx="6" fill="#818cf8" />
                      <rect x="320" y="66" width="22" height="118" rx="6" fill="#4f46e5" />
                      <rect x="360" y="92" width="22" height="92" rx="6" fill="#6366f1" />
                      {/* legend */}
                      <rect x="36" y="40" width="90" height="10" rx="5" fill="#CBD5E1" />
                      <rect x="130" y="40" width="60" height="10" rx="5" fill="#CBD5E1" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-[14.5px] leading-snug mt-3">
                Integrated billing, EHR sync, and growth insights keep cash flow predictable and reveal new revenue opportunities.
              </p>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="text-[13px]">Daily insights</span>
              </div>
            </article>
          </div>
        </section>
  )
}
