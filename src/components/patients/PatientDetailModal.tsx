'use client'

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CreditCard,
  FileText,
  Edit3,
  Save,
  Plus,
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';
import { Patient } from '@/features/patients/types';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export default function PatientDetailModal({ isOpen, onClose, patient }: PatientDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !patient) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'payment-plans', name: 'Payment Plans', icon: CreditCard },
    { id: 'transactions', name: 'Transactions', icon: Activity },
    { id: 'notes', name: 'Notes', icon: FileText },
  ];

  const mockPaymentPlans = [
    {
      id: 'PMT-001',
      procedure: 'Dental Implants',
      totalAmount: 3200,
      monthlyAmount: 267,
      installments: { current: 4, total: 12 },
      status: 'active',
      nextPayment: '2024-02-15'
    },
    {
      id: 'PMT-002',
      procedure: 'Root Canal',
      totalAmount: 850,
      monthlyAmount: 212,
      installments: { current: 4, total: 4 },
      status: 'completed',
      nextPayment: null
    }
  ];

  const mockTransactions = [
    {
      id: 'TXN-001',
      date: '2024-01-15',
      type: 'Payment',
      amount: 267,
      status: 'completed',
      method: 'Auto-Pay'
    },
    {
      id: 'TXN-002',
      date: '2024-01-10',
      type: 'Plan Created',
      amount: 3200,
      status: 'completed',
      method: 'Initial Setup'
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Personal Information</h4>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">{patient.firstName} {patient.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date of Birth</p>
            <p className="font-semibold text-gray-900">
              {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not provided'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">{patient.email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-semibold text-gray-900">{patient.phone || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Address</h4>
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="font-semibold text-gray-900">{patient.address || 'No address on file'}</p>
            {patient.city && patient.state && (
              <p className="text-gray-600">{patient.city}, {patient.state} {patient.zipCode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Insurance Information</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Insurance Provider</p>
            <p className="font-semibold text-gray-900">{patient.insuranceProvider || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Policy Number</p>
            <p className="font-semibold text-gray-900">{patient.insurancePolicyNumber || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentPlansTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Payment Plans</h4>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4 mr-2" />
          New Plan
        </button>
      </div>

      <div className="space-y-4">
        {mockPaymentPlans.map((plan) => (
          <div key={plan.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="font-semibold text-gray-900">{plan.procedure}</h5>
                <p className="text-sm text-gray-600">Plan ID: {plan.id}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                plan.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-gray-900">${plan.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="font-semibold text-gray-900">${plan.monthlyAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(plan.installments.current / plan.installments.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {plan.installments.current}/{plan.installments.total}
                  </span>
                </div>
              </div>
            </div>
            
            {plan.nextPayment && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Next payment due: {new Date(plan.nextPayment).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900">Transaction History</h4>
      
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'Payment' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <DollarSign className={`w-5 h-5 ${
                    transaction.type === 'Payment' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.method} • {transaction.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${transaction.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Patient Notes</h4>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-gray-600 text-center py-8">No notes available for this patient.</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  Patient ID: {patient.id} • Status: {patient.status}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'payment-plans' && renderPaymentPlansTab()}
            {activeTab === 'transactions' && renderTransactionsTab()}
            {activeTab === 'notes' && renderNotesTab()}
          </div>
        </div>
      </div>
    </div>
  );
}