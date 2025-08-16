'use client'

import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Mail, 
  Phone, 
  MessageSquare,
  Clock,
  CheckCircle,
  Send,
  Pause,
  Play
} from 'lucide-react';
import { PaymentPlan } from '@/features/payments/types';

interface DunningWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentPlan: PaymentPlan | null;
}

export default function DunningWorkflowModal({ isOpen, onClose, paymentPlan }: DunningWorkflowModalProps) {
  const [selectedAction, setSelectedAction] = useState<string>('');

  if (!isOpen || !paymentPlan) return null;

  const mockDunningSequence = {
    id: 'DUN-001',
    currentStep: 2,
    totalSteps: 5,
    daysOverdue: 7,
    amountOverdue: paymentPlan.monthlyAmount,
    lastContactDate: '2024-01-20',
    lastContactMethod: 'email',
    nextContactDate: '2024-01-25',
    status: 'active'
  };

  const dunningSteps = [
    { step: 1, day: 1, method: 'email', title: 'Friendly Reminder', status: 'completed' },
    { step: 2, day: 5, method: 'email', title: 'Payment Overdue Notice', status: 'completed' },
    { step: 3, day: 10, method: 'phone', title: 'Phone Call Attempt', status: 'pending' },
    { step: 4, day: 15, method: 'sms', title: 'SMS Reminder', status: 'pending' },
    { step: 5, day: 30, method: 'letter', title: 'Final Notice', status: 'pending' },
  ];

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'letter':
        return <Send className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getStepStatus = (step: number, currentStep: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Collections Workflow</h2>
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
            {/* Overdue Alert */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Payment Overdue</h3>
                  <p className="text-red-700">
                    ${mockDunningSequence.amountOverdue} payment is {mockDunningSequence.daysOverdue} days overdue
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Last contact: {new Date(mockDunningSequence.lastContactDate).toLocaleDateString()} via {mockDunningSequence.lastContactMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Dunning Sequence Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Collections Sequence Progress</h3>
              
              <div className="space-y-4">
                {dunningSteps.map((step) => {
                  const stepStatus = getStepStatus(step.step, mockDunningSequence.currentStep);
                  
                  return (
                    <div key={step.step} className={`flex items-center space-x-4 p-4 rounded-lg ${
                      stepStatus === 'completed' ? 'bg-green-50 border border-green-200' :
                      stepStatus === 'current' ? 'bg-blue-50 border border-blue-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stepStatus === 'completed' ? 'bg-green-600 text-white' :
                        stepStatus === 'current' ? 'bg-blue-600 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {stepStatus === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : stepStatus === 'current' ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          step.step
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(step.method)}
                          <h4 className="font-medium text-gray-900">{step.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">Day {step.day} • {step.method}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          stepStatus === 'completed' ? 'bg-green-100 text-green-800' :
                          stepStatus === 'current' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {stepStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setSelectedAction('send_reminder')}
                  className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Send Email Reminder</p>
                    <p className="text-sm text-gray-600">Send immediate payment reminder</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setSelectedAction('schedule_call')}
                  className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Schedule Call</p>
                    <p className="text-sm text-gray-600">Schedule follow-up phone call</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setSelectedAction('pause_sequence')}
                  className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Pause className="w-5 h-5 text-yellow-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Pause Sequence</p>
                    <p className="text-sm text-gray-600">Temporarily halt collections</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setSelectedAction('mark_resolved')}
                  className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mark as Resolved</p>
                    <p className="text-sm text-gray-600">Payment received outside system</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Confirmation */}
            {selectedAction && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">
                      {selectedAction === 'send_reminder' && 'Send Email Reminder'}
                      {selectedAction === 'schedule_call' && 'Schedule Follow-up Call'}
                      {selectedAction === 'pause_sequence' && 'Pause Collections Sequence'}
                      {selectedAction === 'mark_resolved' && 'Mark Payment as Resolved'}
                    </p>
                    <p className="text-sm text-blue-700">
                      Are you sure you want to proceed with this action?
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedAction('')}
                      className="px-3 py-1 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        console.log('Executing action:', selectedAction);
                        setSelectedAction('');
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Confirm
                    </button>
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