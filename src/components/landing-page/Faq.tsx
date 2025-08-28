"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Is this financing program difficult to implement or manage?",
    answer:
      "Not at all. Breeze integrates with your existing systems, so setup is quick (often a few clicks). We provide full support and training for your staff. Once running, it's largely hands-off – the platform handles approvals, payments, and reminders automatically. Your team spends less time on payment issues, not more.",
  },
  {
    question:
      "What if a patient doesn't pay their installments? Are we on the hook?",
    answer:
      "No, your clinic is protected. Breeze assumes the credit risk. Once we pay you upfront for the procedure, we manage the patient's repayment. If a patient is late or defaults, it does not affect your payout. Our approval algorithm minimizes defaults, and we never charge patients punitive fees – keeping them more likely to repay on time.",
  },
  {
    question: "How much does it cost the clinic?",
    answer:
      "There are no up-front or subscription fees for standard plans. We simply charge a small transaction fee per financed purchase (around 2–3% of the transaction). That means you only pay when Breeze is helping you secure a treatment. For most clinics, this is easily offset by the increase in accepted treatments and not having to chase unpaid bills.",
  },
  {
    question:
      "Is this really okay to do in healthcare? Is it compliant and ethical?",
    answer:
      "Yes – offering payment plans is a common, patient-friendly practice. Breeze is fully HIPAA compliant in handling patient information and PCI compliant for payment processing security. We avoid predatory practices: patients are never charged compound interest or hidden fees, so you can feel confident you're offering a helping hand, not a hardship.",
  },
  {
    question: "Our patients are older or not tech-savvy – will they use this?",
    answer:
      "Absolutely. The application is designed to be simple for all ages. Patients can apply on a clinic iPad with staff guidance or from their own phone at home. No login required, no lengthy forms – just a few basic details and they're done. For those who prefer pen-and-paper, your staff can input their info into Breeze on their behalf in minutes.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight">
            Here’s{" "}
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
              everything you need to know
            </span>{" "}
            about our financing program
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden"
              initial={false}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-7 text-left flex items-center justify-between hover:bg-stone-50 transition-colors duration-200"
              >
                <h3 className="text-lg md:text-xl text-stone-700 font-medium pr-4 text-balance">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer">
                    <Plus
                      className="w-4 h-4 text-stone-800"
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="pt-2 border-t border-stone-100">
                        <p className="text-stone-600 leading-relaxed text-pretty mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
