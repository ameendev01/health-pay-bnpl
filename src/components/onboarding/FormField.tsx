'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isCompleted?: boolean;
  className?: string;
  maxLength?: number;
  isPassword?: boolean;
  options?: string[];
}

export default function FormField({
  type = 'text',
  placeholder,
  value,
  onChange,
  isCompleted = false,
  className = '',
  maxLength,
  isPassword = false,
  options
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  if (options) {
    return (
      <motion.div
        whileFocus={{ scale: 1.02 }}
        className={`relative ${className}`}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-6 py-4 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none ${
            isFocused
              ? 'border-blue-500 shadow-lg shadow-blue-500/20'
              : isCompleted
              ? 'border-green-500'
              : 'border-gray-200'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <CheckCircle className="w-6 h-6 text-green-500" />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className={`relative ${className}`}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        className={`w-full px-6 py-4 text-lg border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          isPassword ? 'pr-12' : ''
        } ${
          isFocused
            ? 'border-blue-500 shadow-lg shadow-blue-500/20'
            : isCompleted
            ? 'border-green-500'
            : 'border-gray-200'
        }`}
      />
      
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
      
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`absolute ${isPassword ? 'right-20' : 'right-4'} top-1/2 transform -translate-y-1/2`}
        >
          <CheckCircle className="w-6 h-6 text-green-500" />
        </motion.div>
      )}
      
      {/* Focus Ring Animation */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-blue-400 pointer-events-none"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          exit={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}