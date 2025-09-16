"use client";

import Features from "./landing-page/Features";
import Testimonials from "./landing-page/Testimonials";
import Stats from "./landing-page/Stats";
import FAQSection from "./landing-page/Faq";
import { FinalCta } from "./landing-page/FinalCta";
import { Hero } from "./landing-page/Hero";
import React from "react";
import Footer from "./landing-page/Footer";
// import dynamic from "next/dynamic";
import ProofSection from "./landing-page/Proof";
import ProblemsSection from "./landing-page/Problems";
import Solution from "./landing-page/Solution";
import FeaturesSectionMini from "./landing-page/FeaturesSectionMini";
import { NavBar } from "./landing-page/Navbar";
import ConsoleShowcase from "./landing-page/ConsoleShowcase";
// import { ProofSection } from "./landing-page/Proof";

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

      <Stats />

      {/* Problem Section */}
      <ProblemsSection />

      {/* Solution Section */}
      <Solution />

      <Testimonials />

      <ConsoleShowcase />

      <Features />

      {/* Features Section */}
      <FeaturesSectionMini />

      {/* Proof Section */}
      <ProofSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <FinalCta />

      {/* Footer */}
      <Footer />
    </div>
  );
}
