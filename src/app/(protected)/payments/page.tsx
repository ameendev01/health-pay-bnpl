'use client'

import React, { useState } from 'react';
import { CreditCard, Download, ArrowUpDown, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import FilterBar from '@/components/shared/FilterBar';
import DataTable from '@/components/shared/DataTable';
import EmptyState from '@/components/shared/EmptyState';
import PaymentPlanDetailModal from '@/components/PaymentPlanDetailModal';
import { usePayments } from '@/features/payments/hooks/usePayments';
import { PaymentPlan } from '@/features/payments/types';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<PaymentPlan | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: payments, isLoading, error } = usePayments();

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

  const handleViewPaymentPlan = (paymentPlan: PaymentPlan) => {
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

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const tableHeaders = [
    { key: 'id', label: 'Payment ID' },
    { key: 'patientName', label: 'Patient' },
    { key: 'clinicName', label: 'Clinic' },
    { key: 'amount', label: 'Amount' },
    { key: 'progress', label: 'Progress' },
    { key: 'status', label: 'Status' },
    { key: 'nextPayment', label: 'Next Payment' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderPaymentRow = (payment: PaymentPlan) => (
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
  );

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner
  }

  if (error) {
    return <div>Error loading payments.</div>; // Replace with a proper error component
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Payment Plans" description="Monitor and manage all payment plans">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </PageHeader>

      {/* Stats Cards - These will be refactored into StatCard components later */}
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

      <FilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filterOptions={statusFilterOptions}
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
      >
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </FilterBar>

      {filteredPayments.length > 0 ? (
        <DataTable headers={tableHeaders} data={filteredPayments} renderRow={renderPaymentRow} />
      ) : (
        <EmptyState 
          icon={CreditCard} 
          title="No payment plans found" 
          description="Try adjusting your search or filter criteria" 
        />
      )}

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
