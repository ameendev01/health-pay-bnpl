"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Calendar,
  BookOpen,
  ArrowRight,
  Check,
  Handshake,
  Clock,
  Heart,
  Shield,
  CreditCard,
  Users,
  TrendingDown,
  DollarSign,
  Zap,
  ShieldCheck,
  Cable,
  FileLock2,
  Workflow,
  Wallet,
  AlarmClock,
  PieChart,
  TrendingUp,
  Smartphone,
  Headphones,
  Timer,
  BadgeCheck,
  Smile,
  Building2,
  Award,
  Plus,
  Minus,
  HelpCircle,
  CheckCircle,
  Mail,
  Linkedin,
  Twitter,
  Download,
  ListChecks,
  Puzzle,
} from "lucide-react";
import Image from "next/image";
import { RainbowButton } from "./magicui/rainbow-button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

// Types
interface HowItWorksStep {
  step: string;
  title: string;
  content: string;
  icon: React.ElementType;
  image: string;
}

// Utility function
function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(" ");
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
      outline:
        "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Main Landing Page Component
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  // How It Works Steps
  const steps: HowItWorksStep[] = [
    {
      step: "Step 1",
      title: "Offer flexible payments",
      content:
        "Present Breeze as a payment option for any procedure or treatment over $500. Your staff can offer it during checkout or treatment planning.",
      icon: Handshake,
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop",
    },
    {
      step: "Step 2",
      title: "Instant approval",
      content:
        "Patient applies in under 60 seconds with soft credit check and immediate decision. No lengthy paperwork or waiting periods.",
      icon: Clock,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      step: "Step 3",
      title: "Get paid, treat patient",
      content:
        "You receive full payment next day. Patient pays manageable monthly installments. No collections headaches for your practice.",
      icon: Heart,
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  // Auto-play effect for How It Works
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, steps.length]);

  // Features data
  const features = [
    {
      icon: Wallet,
      color: "cyan",
      title: "Flexible payment plans",
      description:
        "Offer patients 4, 8, or 12-month installments with competitive rates and no hidden fees—making treatments affordable and increasing acceptance rates.",
    },
    {
      icon: TrendingUp,
      color: "emerald",
      title: "Up to +67% treatment acceptance",
      description:
        "Clinics using Breeze see significant increases in approved treatment plans, translating directly to more revenue and healthier patients.",
    },
    {
      icon: Zap,
      color: "indigo",
      title: "Instant approvals in <60s",
      description:
        "AI-powered underwriting approves most patients in under a minute, keeping checkout smooth and your scheduling on track without delays.",
    },
    {
      icon: ShieldCheck,
      color: "amber",
      title: "Bank-level security & compliance",
      description:
        "PCI DSS compliant with full encryption and robust fraud protection—protecting patient data while meeting all regulatory requirements.",
    },
    {
      icon: Smartphone,
      color: "fuchsia",
      title: "Patient-friendly mobile process",
      description:
        "Mobile and web access lets patients of any age easily complete financing on their phone, in-office or at home—no cumbersome paperwork.",
    },
    {
      icon: Cable,
      color: "sky",
      title: "Seamless EHR integration",
      description:
        "Plugs into existing practice software and EHR/PM systems—your team uses familiar tools with minimal disruption to workflows.",
    },
    {
      icon: Clock,
      color: "rose",
      title: "Next-day funding guaranteed",
      description:
        "Your clinic gets paid upfront in full the next business day—no more waiting for patient payments or dealing with collections.",
    },
    {
      icon: Headphones,
      color: "lime",
      title: "Dedicated support & training",
      description:
        "24/7 support with dedicated account management ensures smooth onboarding, staff training, and ongoing success for your practice.",
    },
  ];

  // Trust metrics
  const trustMetrics = [
    {
      icon: Building2,
      color: "text-cyan-500",
      value: "2,500+",
      label: "Healthcare providers",
      description: "Clinics & practices using Breeze",
    },
    {
      icon: DollarSign,
      color: "text-emerald-500",
      value: "$850M+",
      label: "Patient payments processed",
      description: "Total financing facilitated",
    },
    {
      icon: Smile,
      color: "text-amber-500",
      value: "96.8%",
      label: "Patient satisfaction",
      description: "Patient approval rating",
    },
    {
      icon: TrendingUp,
      color: "text-indigo-500",
      value: "+67%",
      label: "Treatment acceptance boost",
      description: "Average increase in approved plans",
    },
  ];

  // FAQ data
  const faqs = [
    {
      icon: HelpCircle,
      question: "Is this financing program difficult to implement or manage?",
      answer:
        "Not at all. Breeze integrates with your existing systems, so setup is quick (often a few clicks). We provide full support and training for your staff. Once running, it's largely hands-off – the platform handles approvals, payments, and reminders automatically. Your team spends less time on payment issues, not more.",
    },
    {
      icon: Shield,
      question:
        "What if a patient doesn't pay their installments? Are we on the hook?",
      answer:
        "No, your clinic is protected. Breeze assumes the credit risk. Once we pay you upfront for the procedure, we manage the patient's repayment. If a patient is late or defaults, it does not affect your payout. Our approval algorithm minimizes defaults, and we never charge patients punitive fees – keeping them more likely to repay on time.",
    },
    {
      icon: DollarSign,
      question: "How much does it cost the clinic?",
      answer:
        "There are no up-front or subscription fees for standard plans. We simply charge a small transaction fee per financed purchase (around 2–3% of the transaction). That means you only pay when Breeze is helping you secure a treatment. For most clinics, this is easily offset by the increase in accepted treatments and not having to chase unpaid bills.",
    },
    {
      icon: CheckCircle,
      question:
        "Is this really okay to do in healthcare? Is it compliant and ethical?",
      answer:
        "Yes – offering payment plans is a common, patient-friendly practice. Breeze is fully HIPAA compliant in handling patient information and PCI compliant for payment processing security. We avoid predatory practices: patients are never charged compound interest or hidden fees, so you can feel confident you're offering a helping hand, not a hardship.",
    },
    {
      icon: Users,
      question:
        "Our patients are older or not tech-savvy – will they use this?",
      answer:
        "Absolutely. The application is designed to be simple for all ages. Patients can apply on a clinic iPad with staff guidance or from their own phone at home. No login required, no lengthy forms – just a few basic details and they're done. For those who prefer pen-and-paper, your staff can input their info into Breeze on their behalf in minutes.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#fefcf5] text-slate-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 pt-3 z-50  backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
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
              <a
                href="#pricing"
                className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
              >
                Pricing
              </a>
              <a
                href="#careers"
                className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
              >
                Careers
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
              >
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
            <InteractiveHoverButton className="text-sm font-medium py-1.5">Sign Up</InteractiveHoverButton>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-md p-1.5 text-slate-700 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-200 bg-white py-4">
              <nav className="flex flex-col gap-4">
                <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                  Use cases
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                  Resources
                  <ChevronDown className="h-3 w-3" />
                </button>
                <a
                  href="#pricing"
                  className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Pricing
                </a>
                <a
                  href="#careers"
                  className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Careers
                </a>
                <a
                  href="#contact"
                  className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Contact sales
                </a>
                <hr className="border-slate-200" />
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
      </header>

      {/* Hero Section */}
      <section className=" text-slate-900 py-12 sm:py-24 md:py-28 px-4 overflow-hidden pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 pt-0 sm:gap-24">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-12 px-12">
            {/* Badge */}
            <RainbowButton variant={"outline"} className="rounded-full">
              <span className="text-slate-600">
                BNPL for Healthcare Providers
              </span>
              <a
                href="#problem"
                className="flex items-center gap-1 text-slate-900"
              >
                Learn more
                <ArrowRight className="h-3 w-3" />
              </a>
            </RainbowButton>

            {/* Title */}
            <div className="space-y-4">
              <h1
                className="
    relative z-10 font-semibold tracking-tight leading-tight
    text-4xl sm:text-5xl md:text-6xl
    mx-auto text-center
    max-w-[16ch] sm:max-w-[20ch] md:max-w-[19ch]
    text-balance
  "
              >
                Offer flexible patient payments without adding risk
              </h1>

              {/* Description */}
              <p
                className="
    relative z-10 mx-auto text-center text-slate-600
    text-base md:text-lg font-normal
    max-w-[60ch] md:max-w-[55ch]
    text-pretty
  "
              >
                Breeze empowers clinics and hospitals to offer responsible
                installment plans at checkout—instant approvals, guaranteed
                funding, and seamless EHR integrations.
              </p>
            </div>

            {/* Actions */}
            <div className="relative z-10 flex justify-center gap-4">
              {/* <Button size="lg" asChild>
                <a href="#demo" className="flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5" />
                  Book a demo
                </a>
              </Button> */}
              <InteractiveHoverButton className="border-2">Book a Demo</InteractiveHoverButton>
            </div>

            {/* Image */}
            <div className="relative pt-12">
              <div className="relative z-10 bg-slate-50/50 flex overflow-hidden rounded-2xl p-2">
                <div className="flex relative z-10 overflow-hidden rounded-md">
                  <Image
                    src="/assets/image.png"
                    alt="Breeze healthcare payment platform interface"
                    width={1200}
                    height={1000}
                  />
                </div>
              </div>

              {/* Glow Effect */}
              {/* <div className="absolute top-0 w-full">
                <div className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-gradient-radial from-orange-200/50 to-transparent sm:h-[512px]" />
                <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-gradient-radial from-orange-300/30 to-transparent sm:h-[256px]" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
              When patients can't afford care,{' '}
              <span className="inline-flex items-center gap-2">
                <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                everyone loses,
              </span>{' '}
              delayed treatments, and a zillion small problems.
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Card 1: Patient Delays */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Every patient gets payment anxiety
              </h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-emerald-600 font-medium text-sm mb-1">+ Creating anxiety from sticker shock</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Patients see large bills and immediately worry about affording care. This creates stress that affects their decision-making and delays necessary treatments, leading to worse health outcomes and emergency situations.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Mobile App Preview */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
              <div className="w-48 h-80 bg-indigo-600 rounded-3xl p-4 relative overflow-hidden">
                <div className="bg-white rounded-2xl h-full p-4 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                  </div>
                  <div className="flex-1 bg-white shadow-sm rounded-lg"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mt-4 text-center">
                Payment plans and financing in private practice
              </h3>
            </div>

            {/* Card 3: Questions */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Stuck? Get solutions based on your current pain points.
              </h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-600 mb-2">What's your biggest challenge?</p>
                <p className="text-blue-600 text-sm underline cursor-pointer">Ask me something</p>
                <p className="text-slate-700 text-sm mt-2">
                  <strong>Patients declining expensive procedures during your consultation?</strong>
                </p>
              </div>
            </div>

            {/* Card 4: Language Support */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Revenue loss across 25+ specialties.
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-slate-700 font-medium">Dental (US)</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <span className="text-lg">🇪🇸</span>
                  <span className="text-slate-700 font-medium">Cosmetic Surgery</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <span className="text-lg">🇯🇵</span>
                  <span className="text-slate-700 font-medium">Orthopedics</span>
                </div>
              </div>
            </div>

            {/* Card 5: Remember Names */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Track patient financing to avoid revenue leaks
              </h3>
              <div className="bg-slate-900 rounded-lg p-3 text-white text-sm flex items-center justify-between">
                <span>Remember the patient "Sarah"?</span>
                <div className="flex gap-2">
                  <button className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
                    <span className="text-xs">×</span>
                  </button>
                  <button className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6: Analytics */}
            <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Revenue tracking for accountability (and growth opportunities)
              </h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-3">You rank #23 out of 2376 practices</p>
                <div className="grid grid-cols-12 gap-1 h-16">
                  {Array.from({ length: 84 }, (_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        i < 20 ? 'bg-emerald-500' : 
                        i < 40 ? 'bg-emerald-400' : 
                        i < 60 ? 'bg-emerald-300' : 
                        'bg-gray-200'
                      }`}
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex justify-between">
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                </div>
                <div className="mt-2 bg-slate-900 text-white text-xs px-2 py-1 rounded inline-block">
                  Jan 1 - Jan 31
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 mb-6">
              <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
              The Breeze Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Help patients get care,
              <br />
              boost your revenue
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Offer 0% to low-interest payment plans at checkout. Patients get
              affordable care, your clinic gets paid in full immediately.
            </p>
            <Button size="lg">
              <a href="#demo" className="flex items-center">
                Book a demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* How It Works Steps */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Steps List */}
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-6"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: index === currentStep ? 1 : 0.4 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                        index === currentStep
                          ? "bg-slate-900 border-slate-900 text-white scale-110"
                          : index < currentStep
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-slate-100 border-slate-300 text-slate-600"
                      )}
                      animate={{ scale: index === currentStep ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {index < currentStep ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-semibold text-slate-900">
                          {step.title}
                        </h4>
                        <span className="text-sm text-slate-500 font-medium">
                          {step.step}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Image Display */}
              <div className="relative h-[400px] rounded-lg overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  {steps.map(
                    (step, index) =>
                      index === currentStep && (
                        <motion.div
                          key={index}
                          className="absolute inset-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                              <h5 className="font-semibold text-slate-900 mb-1">
                                {step.title}
                              </h5>
                              <p className="text-sm text-slate-600">
                                {step.content}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Key Benefits Bento Grid */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-center mb-12">
              Key Benefits
            </h3>

            <div className="grid grid-cols-6 gap-4">
              {/* Clinic Gets Paid - Large Card */}
              <div className="col-span-full lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      Clinic gets paid upfront
                    </h4>
                    <p className="text-sm text-slate-600">
                      Next business day funding
                    </p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">
                  No more waiting for patient payments or dealing with
                  collections. Get paid in full the next business day.
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Guaranteed funding
                </div>
              </div>

              {/* Patient Pays Over Time */}
              <div className="col-span-full sm:col-span-3 lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Patient pays over time
                </h4>
                <p className="text-slate-700 mb-4">
                  Affordable monthly payments with competitive rates and no
                  hidden fees.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">4-month plan</span>
                    <span className="font-medium text-slate-900">0% APR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">8-12 month plans</span>
                    <span className="font-medium text-slate-900">Low APR</span>
                  </div>
                </div>
              </div>

              {/* Seamless Integration */}
              <div className="col-span-full sm:col-span-3 lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  No disruption
                </h4>
                <p className="text-slate-700">
                  Integrates with your current workflow and EHR systems.
                </p>
              </div>

              {/* Safe & Compliant */}
              <div className="col-span-full sm:col-span-3 lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Safe & compliant
                </h4>
                <p className="text-slate-700">
                  Bank-level security and HIPAA-compliant data handling.
                </p>
              </div>

              {/* Stats Card */}
              <div className="col-span-full lg:col-span-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">
                    +67%
                  </div>
                  <div className="text-sm font-medium text-cyan-800 mb-2">
                    Treatment acceptance
                  </div>
                  <p className="text-xs text-cyan-700">
                    Average increase in approved procedures
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <a href="#demo" className="flex items-center">
                  See it in action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Designed for clinics: Why Breeze stands out
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Purpose-built features that address the unique challenges
              healthcare providers face with patient financing.
            </p>
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

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:ring-1 hover:ring-slate-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 ring-1 ring-slate-200 mb-4">
                    <Icon className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ready to see these features in action?
            </h3>
            <p className="text-slate-600 mb-6">
              Book a personalized demo to see how Breeze can transform your
              patient financing process.
            </p>
            <Button>
              <a href="#demo" className="flex items-center">
                Schedule your demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="bg-white border-t border-slate-200">
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

          {/* Trust Metrics */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 mb-4">
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="font-mono text-3xl font-bold text-slate-900 mb-2">
                    {metric.value}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-slate-600">{metric.description}</p>
                </div>
              );
            })}
          </div>

          {/* Trusted By Companies */}
          <div className="mt-16">
            <p className="text-center text-sm font-medium text-slate-600 mb-6">
              Trusted by innovative providers and platforms
            </p>
            <div className="grid grid-cols-2 items-center gap-6 opacity-90 sm:grid-cols-3 md:grid-cols-6">
              {[
                "MediCore",
                "Nova Health",
                "Orchid Dental",
                "Axis Ortho",
                "Pulse Clinic",
                "CareOS",
              ].map((company) => (
                <div
                  key={company}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold tracking-tight text-slate-800 ring-1 ring-slate-200"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

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

          {/* Award/Quote Section */}
          <div className="mt-16 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              #1 Patient Financing Solution
            </h3>
            <p className="text-slate-600 mb-4">Healthcare Tech Awards 2024</p>
            <blockquote className="text-lg italic text-slate-700">
              "Breeze has completely transformed how we handle patient
              financing. Our treatment acceptance rates have never been higher,
              and our patients love the flexibility."
            </blockquote>
            <cite className="mt-3 block text-sm font-medium text-slate-600">
              — Dr. Sarah Chen, Apex Dental Group
            </cite>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Your questions, answered
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Common concerns clinic managers have about patient financing – and
              how Breeze addresses them.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openFAQ === index;

              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white transition hover:shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition hover:bg-slate-50"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-100">
                        <Icon className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-slate-600" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-6 pb-6">
                      <div className="ml-14 pt-4">
                        <p className="text-slate-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reassurance Footer */}
          <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-emerald-800 mb-4">
              Our team is here to help. Get personalized answers during your
              demo call.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <a href="#demo">Schedule your demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="py-16 md:py-20">
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Ready to offer flexible payments patients love?
                </h3>
                <p className="mt-3 text-base text-slate-600">
                  Book a 20‑minute walkthrough to see Breeze in action. We'll
                  tailor deployment options to your workflows.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button>
                    <a href="#" className="flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5" />
                      Schedule demo
                    </a>
                  </Button>
                  <Button variant="outline">
                    <a
                      href="mailto:sales@usebreeze.io"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4.5 w-4.5" />
                      Contact sales
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4.5 w-4.5 text-cyan-500" />
                    <span className="text-sm font-medium text-slate-800">
                      Pilot configuration
                    </span>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200">
                    ~2 weeks
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center gap-2 text-slate-700">
                      <ListChecks className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs">Requirements</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">
                      Sandbox, SSO, webhooks, EHR field mapping
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Puzzle className="h-4 w-4 text-indigo-600" />
                      <span className="text-xs">Go-live</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">
                      Hosted checkout + front desk link
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="mt-4 w-full">
                  <a href="#" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Implementation guide (PDF)
                  </a>
                </Button>
              </div>
            </div>

            {/* Implementation Guide Section */}
            <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
              <div className="grid items-center gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    What to expect in your demo
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                      Live walkthrough of the patient checkout experience
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                      EHR integration options for your practice
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                      Custom pricing and implementation timeline
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                      Q&A tailored to your specific workflows
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm font-medium text-slate-800">
                        Pilot setup timeline
                      </span>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200">
                      ~2 weeks
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex items-center gap-2 text-slate-700 mb-1">
                        <ListChecks className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-medium">Setup</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Sandbox, webhooks, EHR integration
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex items-center gap-2 text-slate-700 mb-1">
                        <Puzzle className="h-4 w-4 text-indigo-600" />
                        <span className="text-xs font-medium">Go-live</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Staff training & patient rollout
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-3 w-full">
                    <a href="#" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Implementation guide (PDF)
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="resources"
        className="bg-white mt-16 border-t border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-white ring-1 ring-slate-200">
                  <span className="text-sm font-semibold tracking-tight">
                    BZ
                  </span>
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  Breeze
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Responsible BNPL designed for healthcare. Improve access, reduce
                bad debt, and keep operations simple.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  aria-label="LinkedIn"
                  href="#"
                  className="rounded-md p-2 text-slate-600 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  aria-label="Twitter/X"
                  href="#"
                  className="rounded-md p-2 text-slate-600 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  aria-label="Email"
                  href="mailto:hello@usebreeze.io"
                  className="rounded-md p-2 text-slate-600 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { name: "Checkout", href: "#features" },
                  { name: "Risk & underwriting", href: "#features" },
                  { name: "Disbursements", href: "#features" },
                  { name: "Analytics", href: "#features" },
                ],
              },
              {
                title: "Developers",
                links: [
                  { name: "API docs", href: "#resources" },
                  { name: "Webhooks", href: "#resources" },
                  { name: "SDKs", href: "#resources" },
                  { name: "Status", href: "#resources" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Security", href: "#" },
                  { name: "Contact", href: "#" },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold tracking-tight">
                  {section.title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-600 transition hover:text-slate-900"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-600 md:flex-row">
            <p>
              © {currentYear} Breeze Payments, Inc. – Making healthcare
              accessible through flexible payments. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition hover:text-slate-900">
                Terms
              </a>
              <a href="#" className="transition hover:text-slate-900">
                Privacy
              </a>
              <a href="#" className="transition hover:text-slate-900">
                HIPAA
              </a>
              <a href="#" className="transition hover:text-slate-900">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
