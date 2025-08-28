'use client'

import { BadgeCheck } from "lucide-react";
import HealthcareBNPLProcess from "./landing-page/Process";
import Features from "./landing-page/Features";
import Testimonials from "./landing-page/Testimonials";
import Stats from "./landing-page/Stats";
import FAQSection from "./landing-page/Faq";
import { FinalCta } from "./landing-page/FinalCta";
import { Hero } from "./landing-page/Hero";
import { ProblemsSection } from "./landing-page/Problems";
import { NavBar } from "./landing-page/Navbar";
import React from "react";
import Footer from "./landing-page/Footer";
// import dynamic from "next/dynamic";
import HealthcareBNPLBento from "./landing-page/Benefits";

// const HealthcareBNPLBento = dynamic(
//   () => import("./landing-page/Benefits"), // your file with "use client"
//   {
//     ssr: false, // do not render this component on the server
//     loading: () => <BentoSkeleton />, // avoid layout shift while it loads
//   }
// );

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="bg-[#fefcf5] text-slate-900 antialiased">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <Hero />

      {/* Problem Section */}
      <ProblemsSection />

      {/* Solution Section */}
      <section id="solution" className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight  text-balance">
              With 0%–low-interest plans at checkout,{" "}
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
                everyone wins,
              </span>{" "}
              patients get affordable care and your clinic gets paid in full
              immediately. Here's how it works.
            </h2>
          </div>

          {/* How It Works Steps */}
          <div className="mb-20">
            <HealthcareBNPLProcess />
          </div>

          {/* Key Benefits Bento Grid */}
          <HealthcareBNPLBento />
        </div>
      </section>

      {/* Features Section */}
      <section className="">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
              Purpose-built features that{" "}
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
                address the unique challenges,
              </span>{" "}
              healthcare providers face with patient financing.
            </h2>
          </div>

          {/* Key Stats Highlight */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6 text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">67%</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Increase in treatment acceptance
              </h3>
              <p className="text-sm text-slate-600">
                More approved procedures = higher revenue
              </p>
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6 text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                &lt;60s
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Average approval time
              </h3>
              <p className="text-sm text-slate-600">
                Keep patients engaged and schedules moving
              </p>
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6 text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">T+1</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Guaranteed funding timeline
              </h3>
              <p className="text-sm text-slate-600">
                Predictable cash flow for your practice
              </p>
            </div>
          </div>
        </div>
      </section>

      <Features />

      <Testimonials />

      <Stats />

      {/* Proof Section */}
      <section id="proof" className="">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by healthcare providers nationwide
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join thousands of clinics already using Breeze to transform their
              patient financing.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your data is secure with us — we never share personal information
            </p>
          </div>

          {/* Trusted By Companies */}

          {/* Compliance & Security */}
          <div className="mt-16">
            <h3 className="text-center text-xl font-semibold text-slate-900 mb-8">
              Enterprise-grade security & compliance
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "HIPAA Compliant",
                  description: "Patient data protection",
                },
                {
                  name: "PCI DSS Certified",
                  description: "Payment security standards",
                },
                {
                  name: "SOC 2 Type II",
                  description: "Security & availability controls",
                },
                {
                  name: "Bank-Level Security",
                  description: "256-bit encryption & fraud protection",
                },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 bg-white p-4 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-3">
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-slate-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <FinalCta />

      {/* Footer */}
      <Footer />
    </div>
  );
}
