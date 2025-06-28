'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye,
  EyeOff,
  ArrowLeft,
  Calendar,
  TrendingUp,
  Target,
} from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    organization: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#d5f9fb]"
    >
      {/* Left Side - Benefits */}
      <div className="hidden lg:flex lg:w-[400px] xl:w-[480px] flex-col justify-between p-12 bg-[#d5f9fb]"
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-[22px] font-semibold text-[#1f2937]">Health Pay</span>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <div>
            <h1 className="text-[26px] font-semibold text-[#1f2937] leading-[40px] mb-8">
              Increase Your Clinical<br />
              Revenue with Health Pay
            </h1>
          </div>

          {/* Benefits List */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-1">
                <Calendar className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#1f2937] mb-2">Easy Appointment Booking</h3>
                <p className="text-[14px] text-[#6b7280] leading-[20px]">
                  Facilitate instant, secure messaging between patients and pharmacists, ensuring timely and effective communication.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-1">
                <TrendingUp className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#1f2937] mb-2">Increase Clinical Billing</h3>
                <p className="text-[14px] text-[#6b7280] leading-[20px]">
                  Our interface simplifies the booking process, making it easy for patients to schedule and manage their schedules efficiently.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-[#dbeafe] rounded-lg flex items-center justify-center mt-1">
                <Target className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#1f2937] mb-2">Improve Patient Outcomes</h3>
                <p className="text-[14px] text-[#6b7280] leading-[20px]">
                  Tailor care plans and follow-ups to meet the unique needs of each patient, enhancing their overall healthcare experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[14px] text-[#6b7280]">
          © 2024 Health Pay · Privacy & Terms
        </div>
      </div>

      {/* Right Side - Log In Form */}
      <div className="flex-1 flex items-center justify-center p-28 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-[22px] font-semibold text-[#1f2937]">Health Pay</span>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">Get started with Health Pay</h2>
            <p className="text-[14px] text-[#6b7280]">See how Health Pay can revolutionize your pharmacy operations</p>
          </div>

          {/* Log In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-[14px] font-medium text-[#374151] mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-3 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                    errors.firstName ? 'border-red-300' : 'border-[#d1d5db]'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-[12px] text-red-600">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-[14px] font-medium text-[#374151] mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-3 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                    errors.lastName ? 'border-red-300' : 'border-[#d1d5db]'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-[12px] text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div> */}

            {/* Work Email */}
            <div>
              <label htmlFor="workEmail" className="block text-[14px] font-medium text-[#374151] mb-2">
                Work Email
              </label>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={handleInputChange}
                className={`w-full h-[44px] px-3 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                  errors.workEmail ? 'border-red-300' : 'border-[#d1d5db]'
                }`}
                placeholder="email@example.com"
              />
              {errors.workEmail && (
                <p className="mt-1 text-[12px] text-red-600">{errors.workEmail}</p>
              )}
            </div>

            {/* Phone Number */}
            {/* <div>
              <label htmlFor="phoneNumber" className="block text-[14px] font-medium text-[#374151] mb-2">
                Phone Number
              </label>
              <div className="flex">
                <div className="relative">
                  <button
                    type="button"
                    className="h-[44px] px-3 border border-r-0 border-[#d1d5db] rounded-l-lg bg-white flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-5 h-3 bg-gradient-to-b from-red-500 via-white to-red-500 rounded-sm border border-gray-300"></div>
                    <ChevronDown className="w-4 h-4 text-[#6b7280]" />
                  </button>
                </div>
                <input
                  type="text"
                  value={countryCode}
                  readOnly
                  className="w-[60px] h-[44px] px-2 border-t border-b border-[#d1d5db] text-[14px] text-center bg-gray-50"
                />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`flex-1 h-[44px] px-3 border rounded-r-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-[#d1d5db]'
                  }`}
                  placeholder="(   )   -"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-[12px] text-red-600">{errors.phoneNumber}</p>
              )}
            </div> */}

            {/* Organization */}
            {/* <div>
              <label htmlFor="organization" className="block text-[14px] font-medium text-[#374151] mb-2">
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleInputChange}
                className={`w-full h-[44px] px-3 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                  errors.organization ? 'border-red-300' : 'border-[#d1d5db]'
                }`}
                placeholder="Acme Inc"
              />
              {errors.organization && (
                <p className="mt-1 text-[12px] text-red-600">{errors.organization}</p>
              )}
            </div> */}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[14px] font-medium text-[#374151] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full h-[44px] px-3 pr-12 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300' : 'border-[#d1d5db]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-[#6b7280] hover:text-[#374151]" />
                  ) : (
                    <Eye className="w-5 h-5 text-[#6b7280] hover:text-[#374151]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[12px] text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging you in...</span>
                </div>
              ) : (
                'Log in'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-[14px] text-[#6b7280]">Don't have an account yet? </span>
              <Link
                href="/signup"
                className="text-[14px] text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          </form>

          {/* Back to Landing */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center text-[14px] text-[#6b7280] hover:text-[#374151] font-medium transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}