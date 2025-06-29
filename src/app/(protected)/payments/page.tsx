'use client'

import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Search,
  Download,
  ArrowUpDown,
  Eye
} from 'lucide-react';
import PaymentPlanDetailModal from '@/components/PaymentPlanDetailModal';

const payments = [
  {
    id: 'PMT-001',
    patientName: 'John Smith',
    clinicName: 'Sunrise Medical Center',
    amount: 2400,
    installments: { current: 3, total: 12 },
    status: 'active' as const,
    nextPayment: '2024-02-15',
    createdAt: '2024-01-10',
    procedure: 'Dental Implant',
    patientEmail: 'john.smith@email.com',
    patientPhone: '(555) 123-4567',
    patientAddress: '123 Main St, Los Angeles, CA 90210',
    monthlyAmount: 200,
    interestRate: 0,
    downPayment: 0
  },
  {
    id: 'PMT-002',
    patientName: 'Sarah Johnson',
    clinicName: 'Valley Health Clinic',
    amount: 1800,
    installments: { current: 6, total: 8 },
    status: 'active' as const,
    nextPayment: '2024-02-20',
    createdAt: '2023-12-05',
    procedure: 'Orthodontic Treatment',
    patientEmail: 'sarah.johnson@email.com',
    patientPhone: '(555) 234-5678',
    patientAddress: '456 Oak Ave, Phoenix, AZ 85001',
    monthlyAmount: 225,
    interestRate: 3.5,
    downPayment: 200
  },
  {
    id: 'PMT-003',
    patientName: 'Michael Davis',
    clinicName: 'Metro Dental Care',
    amount: 850,
    installments: { current: 4, total: 4 },
    status: 'completed' as const,
    nextPayment: null,
    createdAt: '2023-10-15',
    procedure: 'Root Canal',
    patientEmail: 'michael.davis@email.com',
    patientPhone: '(555) 345-6789',
    patientAddress: '789 Pine St, Denver, CO 80202',
    monthlyAmount: 212.50,
    interestRate: 0,
    downPayment: 0
  },
  {
    id: 'PMT-004',
    patientName: 'Emma Wilson',
    clinicName: 'Family Health Partners',
    amount: 3200,
    installments: { current: 1, total: 16 },
    status: 'overdue' as const,
    nextPayment: '2024-01-30',
    createdAt: '2024-01-01',
    procedure: 'Surgical Procedure',
    patientEmail: 'emma.wilson@email.com',
    patientPhone: '(555) 456-7890',
    patientAddress: '321 Elm Dr, Austin, TX 73301',
    monthlyAmount: 200,
    interestRate: 5.9,
    downPayment: 500
  },
  {
    id: 'PMT-005',
    patientName: 'David Brown',
    clinicName: 'Westside Cardiology',
    amount: 5500,
    installments: { current: 8, total: 20 },
    status: 'active' as const,
    nextPayment: '2024-02-25',
    createdAt: '2023-08-12',
    procedure: 'Cardiac Surgery',
    patientEmail: 'david.brown@email.com',
    patientPhone: '(555) 567-8901',
    patientAddress: '654 Cedar Ln, San Diego, CA 92101',
    monthlyAmount: 275,
    interestRate: 2.9,
    downPayment: 1000
  }
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPaymentPlan = (paymentPlan: any) => {
    setSelectedPaymentPlan(paymentPlan);
    setIsDetailModalOpen(true);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.procedure.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Plans</h1>
          <p className="mt-2 text-gray-600">Monitor and manage all payment plans</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Active Plans</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">356</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">43</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-black">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.procedure}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{payment.clinicName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-600 h-2 rounded-full" 
                          style={{ width: `${(payment.installments.current / payment.installments.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {payment.installments.current}/{payment.installments.total}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.nextPayment ? new Date(payment.nextPayment).toLocaleDateString() : 'Completed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleViewPaymentPlan(payment)}
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment plans found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Payment Plan Detail Modal */}
      <PaymentPlanDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPaymentPlan(null);
        }}
        paymentPlan={selectedPaymentPlan}
      />
    </div>
  );
}