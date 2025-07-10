'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Heart } from 'lucide-react';

export default function SuccessAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'][i % 5],
            left: Math.random() * 100 + '%',
            top: -10,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 200,
            damping: 10
          }}
          className="relative mx-auto mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-emerald-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to HealthPay! 
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-block ml-2"
            >
              🎉
            </motion.span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Your account is ready and you're all set to start transforming healthcare payments.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: Heart, text: "Patient-Friendly Plans", color: "from-pink-500 to-red-500" },
            { icon: CheckCircle, text: "Instant Approvals", color: "from-green-500 to-emerald-500" },
            { icon: Sparkles, text: "Seamless Integration", color: "from-blue-500 to-purple-500" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
            />
            <span className="text-lg font-medium text-gray-700">
              Redirecting to your dashboard...
            </span>
          </div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2, duration: 1 }}
            className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 2, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}