'use client'

import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  User, 
  Building2, 
  Calendar, 
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit3,
  Send,
  Download,
  TrendingUp,
  FileText,
  Activity,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react';

interface PaymentPlan {
  id: string;
  patientName: string;
  clinicName: string;
  amount: number;
  installments: { current: number; total: number };
  status: 'active' | 'completed' | 'overdue' | 'paused';
  nextPayment: string | null;
  createdAt: string;
  procedure: string;
  patientEmail?: string;
  patientPhone?: string;
  patientAddress?: string;
  monthlyAmount?: number;
  interestRate?: number;
  downPayment?: number;
}

interface PaymentPlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentPlan: PaymentPlan | null;
}

// Mock payment schedule data
const generatePaymentSchedule = (plan: PaymentPlan) => {
  if (!plan) return [];
  
  const schedule = [];
  const monthlyAmount = plan.monthlyAmount || plan.amount / plan.installments.total;
  const startDate = new Date(plan.createdAt);
  
  for (let i = 0; i < plan.installments.total; i++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);
    
    const status = i < plan.installments.current 
      ? 'paid' 
      : i === plan.installments.current 
        ? 'upcoming' 
        : 'pending';
    
    schedule.push({
      installment: i + 1,
      dueDate: paymentDate.toISOString().split('T')[0],
      amount: monthlyAmount,
      status,
      paidDate: status === 'paid' ? paymentDate.toISOString().split('T')[0] : null
    });
  }
  
  return schedule;
};

// Mock transaction history
const mockTransactions = [
  { id: 'TXN-001', date: '2024-01-15', type: 'Payment', amount: 200, status: 'completed', method: 'Credit Card' },
  { id: 'TXN-002', date: '2024-01-10', type: 'Plan Created', amount: 2400, status: 'completed', method: 'Initial Setup' },
  { id: 'TXN-003', date: '2023-12-15', type: 'Payment', amount: 200, status: 'completed', method: 'Bank Transfer' },
  { id: 'TXN-004', date: '2023-11-15', type: 'Payment', amount: 200, status: 'completed', method: 'Credit Card' },
];

export default function PaymentPlanDetailModal({ isOpen, onClose, paymentPlan }: PaymentPlanDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !paymentPlan) return null;

  const paymentSchedule = generatePaymentSchedule(paymentPlan);
  const completionPercentage = (paymentPlan.installments.current / paymentPlan.installments.total) * 100;
  const remainingAmount = paymentPlan.amount - (paymentPlan.installments.current * (paymentPlan.monthlyAmount || paymentPlan.amount / paymentPlan.installments.total));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: CreditCard },
    { id: 'schedule', name: 'Payment Schedule', icon: Calendar },
    { id: 'transactions', name: 'Transaction History', icon: Activity },
    { id: 'patient', name: 'Patient Details', icon: User },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Total Amount</h4>
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${paymentPlan.amount.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">{paymentPlan.procedure}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Progress</h4>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{completionPercentage.toFixed(0)}%</p>
          <p className="text-sm text-gray-600 mt-1">{paymentPlan.installments.current} of {paymentPlan.installments.total} payments</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Remaining</h4>
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${remainingAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">{paymentPlan.installments.total - paymentPlan.installments.current} payments left</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Payment Progress</h4>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(paymentPlan.status)}`}>
            {getStatusIcon(paymentPlan.status)}
            <span className="ml-1">{paymentPlan.status.charAt(0).toUpperCase() + paymentPlan.status.slice(1)}</span>
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Started: {new Date(paymentPlan.createdAt).toLocaleDateString()}</span>
          <span>Next: {paymentPlan.nextPayment ? new Date(paymentPlan.nextPayment).toLocaleDateString() : 'Completed'}</span>
        </div>
      </div>

      {/* Plan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-teal-600" />
            Clinic Information
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Clinic Name</p>
              <p className="font-semibold text-gray-900">{paymentPlan.clinicName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Procedure</p>
              <p className="font-semibold text-gray-900">{paymentPlan.procedure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plan ID</p>
              <p className="font-semibold text-gray-900">{paymentPlan.id}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-teal-600" />
            Payment Terms
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Monthly Payment</p>
              <p className="font-semibold text-gray-900">${(paymentPlan.monthlyAmount || paymentPlan.amount / paymentPlan.installments.total).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-semibold text-gray-900">{paymentPlan.interestRate || 0}% APR</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Down Payment</p>
              <p className="font-semibold text-gray-900">${paymentPlan.downPayment || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduleTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Payment Schedule</h4>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of all installments</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentSchedule.map((payment, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${payment.status === 'upcoming' ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">#{payment.installment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{new Date(payment.dueDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {payment.status === 'upcoming' && <Clock className="w-3 h-3 mr-1" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Transaction History</h4>
          <p className="text-sm text-gray-600 mt-1">All payment activities for this plan</p>
        </div>
        <div className="divide-y divide-gray-200">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'Payment' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'Payment' ? (
                      <DollarSign className={`w-5 h-5 ${
                        transaction.type === 'Payment' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
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
    </div>
  );

  const renderPatientTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-teal-600" />
          Patient Information
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">{paymentPlan.patientName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">{paymentPlan.patientEmail || 'john.smith@email.com'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-semibold text-gray-900">{paymentPlan.patientPhone || '(555) 123-4567'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-semibold text-gray-900">{paymentPlan.patientAddress || '123 Main St, Anytown, CA 12345'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Patient Communication</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Automatic payment reminders and receipts</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Reminders</p>
              <p className="text-sm text-gray-600">Text message payment notifications</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
          </div>
        </div>
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
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{paymentPlan.id}</h2>
                <p className="text-sm text-gray-600">{paymentPlan.patientName} • {paymentPlan.clinicName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200">
                <Send className="w-4 h-4 mr-2" />
                Send Reminder
              </button>
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
                        ? 'border-teal-500 text-teal-600'
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
            {activeTab === 'schedule' && renderScheduleTab()}
            {activeTab === 'transactions' && renderTransactionsTab()}
            {activeTab === 'patient' && renderPatientTab()}
          </div>
        </div>
      </div>
    </div>
  );
}