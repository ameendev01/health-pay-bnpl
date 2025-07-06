'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, DivideIcon as LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function ProgressIndicator({ steps, currentStep, completedSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <motion.div
            className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
              currentStep >= step.id
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300 bg-white text-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {completedSteps.includes(step.id) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>
            ) : (
              <step.icon className="w-6 h-6" />
            )}
            
            {/* Pulsing Ring for Current Step */}
            {currentStep === step.id && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.3, opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>
          
          {/* Step Label */}
          <div className="ml-3 hidden sm:block">
            <p className={`text-sm font-medium ${
              currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.title}
            </p>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-16 sm:w-24 h-0.5 mx-4 bg-gray-200 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}