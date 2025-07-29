
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingTeaserProps {
  isCollapsed: boolean;
}

export default function OnboardingTeaser({ isCollapsed }: OnboardingTeaserProps) {
  if (isCollapsed) {
    return (
      <Link href="/onboarding">
        <div className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-all duration-300 ease-in-out hover:scale-105">
          <Gift className="h-6 w-6" />
          <span className="absolute left-full ml-4 hidden w-auto min-w-max origin-left scale-0 rounded-md bg-black px-3 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 group-hover:scale-100 lg:block">
            Complete your profile
          </span>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
    >
      <Link href="/onboarding" className="block">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 rounded-full bg-white/20 p-2">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Get Started</h4>
              <p className="text-xs text-white/80">Complete your profile</p>
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
    </motion.div>
  );
}
