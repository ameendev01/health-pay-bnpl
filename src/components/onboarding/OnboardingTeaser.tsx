
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingTeaserProps {
  isCollapsed: boolean;
}

export default function OnboardingTeaser({ isCollapsed }: OnboardingTeaserProps) {
  if (isCollapsed) {
    return (
      <Link href="/onboarding">
        <div className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white transition-all duration-300 ease-in-out hover:bg-neutral-700">
          <Sparkles className="h-6 w-6" />
          <span className="absolute left-full ml-4 hidden w-auto min-w-max origin-left scale-0 rounded-md bg-black px-3 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 group-hover:scale-100 lg:block">
            Complete your profile
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-800 p-4 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-neutral-700"
    >
      <Link href="/onboarding" className="block">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 rounded-full bg-white/10 p-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Unlock all features</h4>
              <p className="text-xs text-white/70">Complete your onboarding</p>
            </div>
          </div>
          <motion.div
            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>
      </Link>
    </div>
  );
}
