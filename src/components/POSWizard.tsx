'use client'

import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Building2, 
  User, 
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  PenTool,
  FileText,
  Clock,
  Zap,
  Shield
} from 'lucide-react';

interface POSWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (planData: any) => void;
}

interface WizardData {
  // Step 1: Service & Amount
  service: string;
  serviceCategory: string;
  totalAmount: number;
  description: string;
  
  // Step 2: Patient Information
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAddress: string;
  dateOfBirth: string;
  
  // Step 3: Payment Method
  paymentType: 'credit' | 'bank' | '';
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  cardName: string;
  bankRouting: string;
  bankAccount: string;
  bankName: string;
  
  // Step 4: Payment Plan
  numberOfPayments: number;
  monthlyAmount: number;
  interestRate: number;
  downPayment: number;
  
  // Step 5: Agreement
  agreedToTerms: boolean;
  signature: string;
}

const serviceCategories = [
  { id: 'dental', name: 'Dental', services: ['Dental Implants', 'Root Canal', 'Orthodontic Treatment', 'Cosmetic Dentistry', 'Oral Surgery'] },
  { id: 'medical', name: 'Medical', services: ['Surgical Procedure', 'Diagnostic Testing', 'Physical Therapy', 'Specialist Consultation'] },
  { id: 'cosmetic', name: 'Cosmetic', services: ['Cosmetic Surgery', 'Laser Treatment', 'Aesthetic Procedures', 'Skin Treatment'] },
  { id: 'cardiac', name: 'Cardiac', services: ['Cardiac Surgery', 'Catheterization', 'Pacemaker', 'Heart Monitoring'] },
  { id: 'orthopedic', name: 'Orthopedic', services: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Fracture Treatment'] }
];

export default function POSWizard({ isOpen, onClose, onComplete }: POSWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [wizardData, setWizardData] = useState<WizardData>({
    service: '',
    serviceCategory: '',
    totalAmount: 0,
    description: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAddress: '',
    dateOfBirth: '',
    paymentType: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardName: '',
    bankRouting: '',
    bankAccount: '',
    bankName: '',
    numberOfPayments: 6,
    monthlyAmount: 0,
    interestRate: 0,
    downPayment: 0,
    agreedToTerms: false,
    signature: ''
  });

  const steps = [
    { id: 1, name: 'Service & Amount', icon: Building2 },
    { id: 2, name: 'Patient Info', icon: User },
    { id: 3, name: 'Payment Method', icon: CreditCard },
    { id: 4, name: 'Payment Plan', icon: Calendar },
    { id: 5, name: 'Review & Sign', icon: PenTool },
    { id: 6, name: 'Complete', icon: CheckCircle }
  ];

  const updateWizardData = (field: string, value: any) => {
    setWizardData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const calculateMonthlyAmount = () => {
    const principal = wizardData.totalAmount - wizardData.downPayment;
    const monthlyInterestRate = wizardData.interestRate / 100 / 12;
    
    if (monthlyInterestRate === 0) {
      return principal / wizardData.numberOfPayments;
    }
    
    const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, wizardData.numberOfPayments)) / 
                          (Math.pow(1 + monthlyInterestRate, wizardData.numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!wizardData.service) newErrors.service = 'Service is required';
        if (!wizardData.totalAmount || wizardData.totalAmount <= 0) newErrors.totalAmount = 'Valid amount is required';
        break;
        
      case 2:
        if (!wizardData.patientName.trim()) newErrors.patientName = 'Patient name is required';
        if (!wizardData.patientEmail.trim()) newErrors.patientEmail = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(wizardData.patientEmail)) newErrors.patientEmail = 'Invalid email format';
        if (!wizardData.patientPhone.trim()) newErrors.patientPhone = 'Phone number is required';
        break;
        
      case 3:
        if (!wizardData.paymentType) newErrors.paymentType = 'Payment method is required';
        if (wizardData.paymentType === 'credit') {
          if (!wizardData.cardNumber) newErrors.cardNumber = 'Card number is required';
          if (!wizardData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
          if (!wizardData.cardCVV) newErrors.cardCVV = 'CVV is required';
          if (!wizardData.cardName) newErrors.cardName = 'Cardholder name is required';
        } else if (wizardData.paymentType === 'bank') {
          if (!wizardData.bankRouting) newErrors.bankRouting = 'Routing number is required';
          if (!wizardData.bankAccount) newErrors.bankAccount = 'Account number is required';
          if (!wizardData.bankName) newErrors.bankName = 'Bank name is required';
        }
        break;
        
      case 5:
        if (!wizardData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms';
        if (!wizardData.signature.trim()) newErrors.signature = 'Signature is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Calculate monthly amount when moving to review step
        const monthlyAmount = calculateMonthlyAmount();
        updateWizardData('monthlyAmount', monthlyAmount);
      }
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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

  const handleComplete = async () => {
    if (!validateStep(5)) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const planData = {
      id: `PMT-${Date.now()}`,
      ...wizardData,
      status: 'active',
      createdAt: new Date().toISOString(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };
    
    setCurrentStep(6);
    setIsProcessing(false);
    
    // Wait a moment then call completion handler
    setTimeout(() => {
      onComplete(planData);
    }, 3000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Service & Amount</h3>
        <p className="text-gray-600 mt-2">Enter the service provided and total amount</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
          <select
            value={wizardData.serviceCategory}
            onChange={(e) => {
              updateWizardData('serviceCategory', e.target.value);
              updateWizardData('service', ''); // Reset service when category changes
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Select category</option>
            {serviceCategories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
          <select
            value={wizardData.service}
            onChange={(e) => updateWizardData('service', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              errors.service ? 'border-red-300' : 'border-gray-300'
            }`}
            disabled={!wizardData.serviceCategory}
          >
            <option value="">Select service</option>
            {wizardData.serviceCategory && serviceCategories.find(cat => cat.id === wizardData.serviceCategory)?.services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={wizardData.totalAmount || ''}
              onChange={(e) => updateWizardData('totalAmount', parseFloat(e.target.value) || 0)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.totalAmount ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.totalAmount && <p className="mt-1 text-sm text-red-600">{errors.totalAmount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
          <textarea
            value={wizardData.description}
            onChange={(e) => updateWizardData('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Additional details about the service..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <User className="w-12 h-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Patient Information</h3>
        <p className="text-gray-600 mt-2">Enter the patient&apos;s contact details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={wizardData.patientName}
            onChange={(e) => updateWizardData('patientName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              errors.patientName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="John Smith"
          />
          {errors.patientName && <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={wizardData.patientEmail}
              onChange={(e) => updateWizardData('patientEmail', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.patientEmail ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.patientEmail && <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={wizardData.patientPhone}
              onChange={(e) => updateWizardData('patientPhone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.patientPhone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="(555) 123-4567"
            />
          </div>
          {errors.patientPhone && <p className="mt-1 text-sm text-red-600">{errors.patientPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={wizardData.dateOfBirth}
            onChange={(e) => updateWizardData('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={wizardData.patientAddress}
              onChange={(e) => updateWizardData('patientAddress', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="123 Main St, Anytown, CA 12345"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="w-12 h-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">Payment Method</h3>
        <p className="text-gray-600 mt-2">Choose how you&#39;d like to make payments</p>
      </div>

      {/* Payment Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => updateWizardData('paymentType', 'credit')}
          className={`p-6 border-2 rounded-xl transition-all duration-200 ${
            wizardData.paymentType === 'credit'
              ? 'border-teal-500 bg-teal-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CreditCard className={`w-8 h-8 mx-auto mb-3 ${
            wizardData.paymentType === 'credit' ? 'text-teal-600' : 'text-gray-400'
          }`} />
          <h4 className="font-semibold text-gray-900">Credit/Debit Card</h4>
          <p className="text-sm text-gray-600 mt-1">Visa, Mastercard, American Express</p>
        </button>

        <button
          onClick={() => updateWizardData('paymentType', 'bank')}
          className={`p-6 border-2 rounded-xl transition-all duration-200 ${
            wizardData.paymentType === 'bank'
              ? 'border-teal-500 bg-teal-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Building2 className={`w-8 h-8 mx-auto mb-3 ${
            wizardData.paymentType === 'bank' ? 'text-teal-600' : 'text-gray-400'
          }`} />
          <h4 className="font-semibold text-gray-900">Bank Account</h4>
          <p className="text-sm text-gray-600 mt-1">Direct bank transfer (ACH)</p>
        </button>
      </div>

      {errors.paymentType && <p className="text-sm text-red-600 text-center">{errors.paymentType}</p>}

      {/* Credit Card Form */}
      {wizardData.paymentType === 'credit' && (
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600" />
            Credit Card Information
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input
                type="text"
                value={wizardData.cardName}
                onChange={(e) => updateWizardData('cardName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.cardName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="John Smith"
              />
              {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                value={wizardData.cardNumber}
                onChange={(e) => updateWizardData('cardNumber', formatCardNumber(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
              <input
                type="text"
                value={wizardData.cardExpiry}
                onChange={(e) => updateWizardData('cardExpiry', formatExpiryDate(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.cardExpiry ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
              <input
                type="text"
                value={wizardData.cardCVV}
                onChange={(e) => updateWizardData('cardCVV', e.target.value.replace(/\D/g, ''))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.cardCVV ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cardCVV && <p className="mt-1 text-sm text-red-600">{errors.cardCVV}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Bank Account Form */}
      {wizardData.paymentType === 'bank' && (
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600" />
            Bank Account Information
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
              <input
                type="text"
                value={wizardData.bankName}
                onChange={(e) => updateWizardData('bankName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.bankName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Chase Bank"
              />
              {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number *</label>
              <input
                type="text"
                value={wizardData.bankRouting}
                onChange={(e) => updateWizardData('bankRouting', e.target.value.replace(/\D/g, ''))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.bankRouting ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123456789"
                maxLength={9}
              />
              {errors.bankRouting && <p className="mt-1 text-sm text-red-600">{errors.bankRouting}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
              <input
                type="text"
                value={wizardData.bankAccount}
                onChange={(e) => updateWizardData('bankAccount', e.target.value.replace(/\D/g, ''))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.bankAccount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234567890"
                maxLength={17}
              />
              {errors.bankAccount && <p className="mt-1 text-sm text-red-600">{errors.bankAccount}</p>}
            </div>
          </div>
        </div>
      )}

      {wizardData.paymentType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Your payment information is secure</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            All payment data is encrypted and processed through secure, PCI-compliant systems.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => {
    const monthlyAmount = calculateMonthlyAmount();
    const totalInterest = (monthlyAmount * wizardData.numberOfPayments) - (wizardData.totalAmount - wizardData.downPayment);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">Payment Plan</h3>
          <p className="text-gray-600 mt-2">Configure your payment schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Payments</label>
              <div className="grid grid-cols-3 gap-2">
                {[4, 6, 8, 10, 12].map(num => (
                  <button
                    key={num}
                    onClick={() => updateWizardData('numberOfPayments', num)}
                    className={`p-3 text-center rounded-lg border-2 transition-all duration-200 ${
                      wizardData.numberOfPayments === num
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-semibold">{num}</span>
                    <p className="text-xs text-gray-600 mt-1">payments</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
              <select
                value={wizardData.interestRate}
                onChange={(e) => updateWizardData('interestRate', parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value={0}>0% - No Interest</option>
                <option value={2.9}>2.9% - Low Rate</option>
                <option value={5.9}>5.9% - Standard Rate</option>
                <option value={9.9}>9.9% - Extended Terms</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={wizardData.downPayment || ''}
                  onChange={(e) => updateWizardData('downPayment', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="0.00"
                  max={wizardData.totalAmount}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
            <h4 className="font-semibold text-gray-900 mb-4">Payment Summary</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${wizardData.totalAmount.toLocaleString()}</span>
              </div>
              
              {wizardData.downPayment > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-semibold text-green-600">-${wizardData.downPayment.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Financed Amount:</span>
                <span className="font-semibold">${(wizardData.totalAmount - wizardData.downPayment).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-semibold">{wizardData.interestRate}% APR</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Payments:</span>
                <span className="font-semibold">{wizardData.numberOfPayments}</span>
              </div>
              
              <hr className="border-gray-300" />
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Monthly Payment:</span>
                <span className="font-bold text-teal-600">${monthlyAmount.toFixed(2)}</span>
              </div>
              
              {totalInterest > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="text-gray-900">${totalInterest.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-teal-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="font-medium text-gray-900">First Payment Due</span>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const monthlyAmount = calculateMonthlyAmount();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <PenTool className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">Review & Sign</h3>
          <p className="text-gray-600 mt-2">Review your payment plan and provide electronic signature</p>
        </div>

        {/* Plan Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Payment Plan Summary</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Patient</p>
                <p className="font-semibold text-gray-900">{wizardData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-semibold text-gray-900">{wizardData.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-gray-900">${wizardData.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="font-semibold text-teal-600">${monthlyAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Payments</p>
                <p className="font-semibold text-gray-900">{wizardData.numberOfPayments}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900">
                  {wizardData.paymentType === 'credit' ? 'Credit Card' : 'Bank Account'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Terms & Conditions</h4>
          <div className="max-h-32 overflow-y-auto bg-white p-4 rounded border text-sm text-gray-700">
            <p className="mb-3">
              By signing below, I agree to the following terms and conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I authorize the clinic to charge my selected payment method for the agreed monthly amount.</li>
              <li>Payments will be automatically processed on the same date each month.</li>
              <li>I understand that missed payments may result in late fees and affect my credit score.</li>
              <li>I can contact the clinic to modify or cancel this payment plan with 30 days notice.</li>
              <li>All information provided is accurate to the best of my knowledge.</li>
            </ul>
          </div>
          
          <div className="flex items-start space-x-3 mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={wizardData.agreedToTerms}
              onChange={(e) => updateWizardData('agreedToTerms', e.target.checked)}
              className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and agree to the terms and conditions above *
            </label>
          </div>
          {errors.agreedToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms}</p>}
        </div>

        {/* Electronic Signature */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Electronic Signature</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type your full name to serve as your electronic signature *
            </label>
            <input
              type="text"
              value={wizardData.signature}
              onChange={(e) => updateWizardData('signature', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.signature ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Type your full name here"
            />
            {errors.signature && <p className="mt-1 text-sm text-red-600">{errors.signature}</p>}
            
            <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>This signature is legally binding and secure</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep6 = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-gray-900">Payment Plan Created!</h3>
        <p className="text-gray-600 mt-2 text-lg">
          {wizardData.patientName}&#39;s payment plan has been successfully set up
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 max-w-md mx-auto">
        <h4 className="font-semibold text-gray-900 mb-3">Plan Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan ID:</span>
            <span className="font-semibold">PMT-{Date.now()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Payment:</span>
            <span className="font-semibold">${calculateMonthlyAmount().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">First Payment:</span>
            <span className="font-semibold">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <Zap className="w-5 h-5" />
          <span className="font-medium">Automated payments activated</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Mail className="w-5 h-5" />
          <span className="font-medium">Confirmation email sent to patient</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-purple-600">
          <Smartphone className="w-5 h-5" />
          <span className="font-medium">SMS reminders enabled</span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>
        
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Plan Setup</h2>
                <p className="text-sm text-gray-600">Create a new payment plan for your patient</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      isCompleted 
                        ? 'bg-teal-600 border-teal-600 text-white' 
                        : isCurrent
                        ? 'border-teal-600 text-teal-600 bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isCurrent ? 'text-teal-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden sm:block w-12 h-px mx-4 ${
                        isCompleted ? 'bg-teal-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(95vh-240px)]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
          </div>

          {/* Footer */}
          {currentStep < 6 && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
              <div className="text-sm text-gray-600">
                Step {currentStep} of {steps.length - 1}
              </div>
              
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>
                )}
                
                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={isProcessing}
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Plan
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}