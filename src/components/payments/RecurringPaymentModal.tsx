'use client'

import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Calendar, 
  Play,
  Pause,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { PaymentPlan } from '@/features/payments/types';

interface RecurringPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentPlan: PaymentPlan | null;
}

export default function RecurringPaymentModal({ isOpen, onClose, paymentPlan }: RecurringPaymentModalProps) {
  const [recurringStatus, setRecurringStatus] = useState<'active' | 'paused' | 'cancelled'>('active');

  if (!isOpen || !paymentPlan) return null;

  const mockRecurringPayment = {
    id: 'REC-001',
    frequency: 'monthly',
    nextPaymentDate: '2024-02-15',
    paymentMethod: 'Credit Card ending in 4532',
    status: recurringStatus,
    retryCount: 0,
    lastPaymentAttempt: '2024-01-15',
    lastPaymentStatus: 'completed'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recurring Payment Settings</h2>
                <p className="text-sm text-gray-600">{paymentPlan.id} • {paymentPlan.patientName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Current Status */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Recurring Payment Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {recurringStatus === 'active' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {recurringStatus === 'paused' && <Pause className="w-5 h-5 text-yellow-600" />}
                    {recurringStatus === 'cancelled' && <X className="w-5 h-5 text-red-600" />}
                    <span className={`font-semibold ${
                      recurringStatus === 'active' ? 'text-green-600' :
                      recurringStatus === 'paused' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {recurringStatus.charAt(0).toUpperCase() + recurringStatus.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Next Payment</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {mockRecurringPayment.nextPaymentDate ? 
                      new Date(mockRecurringPayment.nextPaymentDate).toLocaleDateString() : 
                      'Not scheduled'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-900 mt-1">{mockRecurringPayment.paymentMethod}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Frequency</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {mockRecurringPayment.frequency.charAt(0).toUpperCase() + mockRecurringPayment.frequency.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Payment Attempts</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Payment Successful</p>
                      <p className="text-sm text-gray-600">January 15, 2024 • ${paymentPlan.monthlyAmount}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Completed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Payment Successful</p>
                      <p className="text-sm text-gray-600">December 15, 2023 • ${paymentPlan.monthlyAmount}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Completed</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Controls</h3>
              
              <div className="flex flex-wrap gap-3">
                {recurringStatus === 'active' ? (
                  <button 
                    onClick={() => setRecurringStatus('paused')}
                    className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Payments
                  </button>
                ) : recurringStatus === 'paused' ? (
                  <button 
                    onClick={() => setRecurringStatus('active')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume Payments
                  </button>
                ) : null}
                
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Settings className="w-4 h-4 mr-2" />
                  Modify Schedule
                </button>
                
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Calendar className="w-4 h-4 mr-2" />
                  Change Date
                </button>
              </div>
            </div>

            {/* Retry Information */}
            {mockRecurringPayment.retryCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Payment Retry Information</h4>
                    <p className="text-sm text-yellow-700">
                      {mockRecurringPayment.retryCount} retry attempts made. Next retry scheduled for tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}