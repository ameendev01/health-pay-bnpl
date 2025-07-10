
'use client'

import React, { useState } from 'react';
import { 
  X,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Loader2,
  FileText,
  Mail,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NewPaymentPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewPaymentPlanWizard({ isOpen, onClose }: NewPaymentPlanWizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 1500); // Simulate API call for decision
    } else {
      setStep(s => s + 1);
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Step 1 of 4: Create or select an invoice.";
      case 2: return "Step 2 of 4: Review plan options.";
      case 3: return "Step 3 of 4: Send for signature.";
      case 4: return "Complete: Plan is active!";
      default: return "";
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                {step === 4 ? <CheckCircle className="w-6 h-6 text-white" /> : <FileText className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Payment Plan</h2>
                <p className="text-sm text-gray-600">{getStepTitle()}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <>
                <Button variant="outline" className="w-full mb-6">Select Existing Invoice</Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or Create New</span></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <Input placeholder="Search or enter patient name..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service(s)</label>
                    <Input placeholder="e.g., Dental Cleaning, Consultation" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                    <Input type="number" placeholder="$0.00" />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Based on a total of $1,200.00</h3>
                <p className="text-sm text-gray-500 mb-6">The following payment plans are available.</p>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg text-left">
                    <h4 className="font-bold">12 Months Plan</h4>
                    <p className="text-2xl font-light">$100.00 <span className="text-base font-normal text-gray-500">/ month</span></p>
                  </div>
                  <div className="p-4 border rounded-lg text-left">
                    <h4 className="font-bold">6 Months Plan</h4>
                    <p className="text-2xl font-light">$200.00 <span className="text-base font-normal text-gray-500">/ month</span></p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">How would you like to send the agreement?</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start"><Mail className="w-4 h-4 mr-2"/>Send via Email</Button>
                  <Button variant="outline" className="w-full justify-start"><Smartphone className="w-4 h-4 mr-2"/>Send via SMS</Button>
                  <Button variant="outline" className="w-full justify-start"><CreditCard className="w-4 h-4 mr-2"/>Sign on this device</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Plan Active!</h3>
                <p className="text-gray-600">The plan for John Doe is now active. Funds will be deposited on July 8, 2025.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end p-6 border-t border-gray-200 mt-6">
            {step < 4 ? (
              <Button onClick={handleNextStep} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {step === 2 ? 'Confirm and Proceed' : 'Next'}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            ) : (
              <Button onClick={onClose}>Close</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
