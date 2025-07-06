'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Building2, 
  Stethoscope, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/(auth)/onboarding/_actions';
import { useUser } from '@clerk/nextjs';

interface FormData {
  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  
  // Banking Details
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  
  // Clinic Profile
  clinicName: string;
  clinicType: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber: string;
}

const steps = [
  {
    id: 1,
    title: 'Payment Information',
    subtitle: 'Secure payment processing for your practice',
    icon: CreditCard,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'Banking Details',
    subtitle: 'Connect your bank account for seamless transactions',
    icon: Building2,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 3,
    title: 'Clinic Profile',
    subtitle: 'Tell us about your healthcare practice',
    icon: Stethoscope,
    color: 'from-orange-500 to-pink-600'
  }
];

const clinicTypes = [
  'General Practice',
  'Dental Clinic',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Mental Health',
  'Urgent Care',
  'Specialty Clinic'
];

export default function ModernOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    clinicName: '',
    clinicType: '',
    address: '',
    phone: '',
    email: '',
    licenseNumber: ''
  });
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { user } = useUser();
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (value.trim()) {
      setCompletedFields(prev => new Set([...prev, field]));
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getStepProgress = () => {
    const stepFields = {
      1: ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'],
      2: ['bankName', 'accountNumber', 'routingNumber'],
      3: ['clinicName', 'clinicType', 'address', 'phone', 'email', 'licenseNumber']
    };
    
    const currentFields = stepFields[currentStep as keyof typeof stepFields];
    const completed = currentFields.filter(field => completedFields.has(field));
    return (completed.length / currentFields.length) * 100;
  };

  const canProceed = () => {
    const stepFields = {
      1: ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'],
      2: ['bankName', 'accountNumber', 'routingNumber'],
      3: ['clinicName', 'clinicType', 'address', 'phone', 'email', 'licenseNumber']
    };
    
    const currentFields = stepFields[currentStep as keyof typeof stepFields];
    return currentFields.every(field => completedFields.has(field));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete onboarding
      const result = await completeOnboarding(true);
      
      if (result.message) {
        setShowSuccess(true);
        await user?.reload();
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome to HealthPay! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            Your account is ready. Redirecting to dashboard...
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthPay</h1>
                <p className="text-sm text-gray-600">Setup your account</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Step {currentStep} of 3</p>
              <p className="text-xs text-gray-600">{Math.round(getStepProgress())}% complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between py-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                    currentStep >= step.id
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step.id ? (
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
                  
                  {currentStep === step.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    />
                  )}
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className="w-24 h-0.5 mx-4 bg-gray-200 relative overflow-hidden">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step Header */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`w-16 h-16 bg-gradient-to-r ${steps[currentStep - 1].color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
              >
                {React.createElement(steps[currentStep - 1].icon, { className: "w-8 h-8 text-white" })}
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
                <p className="text-lg text-gray-600 mt-2">{steps[currentStep - 1].subtitle}</p>
              </motion.div>
            </div>

            {/* Step Progress */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Form Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => updateField('cardNumber', formatCardNumber(e.target.value))}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        maxLength={19}
                      />
                      {completedFields.has('cardNumber') && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => updateField('expiryDate', formatExpiryDate(e.target.value))}
                          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                          maxLength={5}
                        />
                        {completedFields.has('expiryDate') && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => updateField('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                          maxLength={4}
                        />
                        {completedFields.has('cvv') && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={formData.cardholderName}
                        onChange={(e) => updateField('cardholderName', e.target.value)}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                      {completedFields.has('cardholderName') && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => updateField('bankName', e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    {completedFields.has('bankName') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => updateField('accountNumber', e.target.value.replace(/\D/g, ''))}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    {completedFields.has('accountNumber') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Routing Number"
                      value={formData.routingNumber}
                      onChange={(e) => updateField('routingNumber', e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      maxLength={9}
                    />
                    {completedFields.has('routingNumber') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('accountType', 'checking')}
                      className={`px-6 py-4 text-lg border-2 rounded-2xl transition-all duration-300 ${
                        formData.accountType === 'checking'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white/80 text-gray-700'
                      }`}
                    >
                      Checking
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('accountType', 'savings')}
                      className={`px-6 py-4 text-lg border-2 rounded-2xl transition-all duration-300 ${
                        formData.accountType === 'savings'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white/80 text-gray-700'
                      }`}
                    >
                      Savings
                    </motion.button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Clinic Name"
                      value={formData.clinicName}
                      onChange={(e) => updateField('clinicName', e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    {completedFields.has('clinicName') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <select
                      value={formData.clinicType}
                      onChange={(e) => updateField('clinicType', e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none"
                    >
                      <option value="">Select Clinic Type</option>
                      {clinicTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {completedFields.has('clinicType') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Clinic Address"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    {completedFields.has('address') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                      {completedFields.has('phone') && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                      {completedFields.has('email') && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Medical License Number"
                      value={formData.licenseNumber}
                      onChange={(e) => updateField('licenseNumber', e.target.value)}
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    {completedFields.has('licenseNumber') && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8"
            >
              <motion.button
                whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className={`w-full px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Setting up your account...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 3 ? 'Complete Setup' : 'Continue'}</span>
                    {currentStep < 3 && <ArrowRight className="w-6 h-6" />}
                    {currentStep === 3 && <Sparkles className="w-6 h-6" />}
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}