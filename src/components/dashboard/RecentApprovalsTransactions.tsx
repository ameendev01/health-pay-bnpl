'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  CreditCard, 
  Clock, 
  DollarSign, 
  User,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface RecentApproval {
  id: string;
  patientName: string;
  amount: number;
  procedure: string;
  clinic: string;
  approvedAt: string;
  status: 'approved' | 'pending_signature' | 'active';
}

interface RecentTransaction {
  id: string;
  type: 'payment' | 'refund' | 'adjustment';
  patientName: string;
  amount: number;
  clinic: string;
  completedAt: string;
  paymentMethod: string;
}

const recentApprovals: RecentApproval[] = [
  {
    id: 'APP-001',
    patientName: 'Sarah Johnson',
    amount: 3200,
    procedure: 'Dental Implants',
    clinic: 'Sunrise Dental',
    approvedAt: '2 min ago',
    status: 'pending_signature'
  },
  {
    id: 'APP-002',
    patientName: 'Michael Chen',
    amount: 1800,
    procedure: 'Orthodontic Treatment',
    clinic: 'Valley Orthodontics',
    approvedAt: '8 min ago',
    status: 'approved'
  },
  {
    id: 'APP-003',
    patientName: 'Emma Rodriguez',
    amount: 2400,
    procedure: 'Root Canal + Crown',
    clinic: 'Metro Dental Care',
    approvedAt: '15 min ago',
    status: 'active'
  },
  {
    id: 'APP-004',
    patientName: 'David Kim',
    amount: 5500,
    procedure: 'Cardiac Procedure',
    clinic: 'Heart Health Center',
    approvedAt: '23 min ago',
    status: 'approved'
  },
  {
    id: 'APP-005',
    patientName: 'Lisa Thompson',
    amount: 950,
    procedure: 'Dental Cleaning',
    clinic: 'Family Dental',
    approvedAt: '31 min ago',
    status: 'active'
  }
];

const recentTransactions: RecentTransaction[] = [
  {
    id: 'TXN-001',
    type: 'payment',
    patientName: 'John Smith',
    amount: 250,
    clinic: 'Sunrise Dental',
    completedAt: '5 min ago',
    paymentMethod: 'Auto-Pay'
  },
  {
    id: 'TXN-002',
    type: 'payment',
    patientName: 'Maria Garcia',
    amount: 180,
    clinic: 'Valley Orthodontics',
    completedAt: '12 min ago',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'TXN-003',
    type: 'refund',
    patientName: 'Robert Wilson',
    amount: 320,
    clinic: 'Metro Dental Care',
    completedAt: '18 min ago',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'TXN-004',
    type: 'payment',
    patientName: 'Jennifer Lee',
    amount: 425,
    clinic: 'Heart Health Center',
    completedAt: '25 min ago',
    paymentMethod: 'Auto-Pay'
  },
  {
    id: 'TXN-005',
    type: 'adjustment',
    patientName: 'Thomas Brown',
    amount: 75,
    clinic: 'Family Dental',
    completedAt: '33 min ago',
    paymentMethod: 'Manual'
  }
];

export default function RecentApprovalsTransactions() {
  const [activeTab, setActiveTab] = useState<'approvals' | 'transactions'>('approvals');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-[#84cc16] text-white';
      case 'pending_signature':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-[#1557f6] text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-[#84cc16] text-white';
      case 'refund':
        return 'bg-red-100 text-red-800';
      case 'adjustment':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'refund':
        return <ArrowRight className="w-4 h-4 rotate-180" />;
      case 'adjustment':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-[#1557f6]" />
              Recent Activity
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Latest approvals and completed transactions
            </p>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'approvals'
                  ? 'bg-white text-[#1557f6] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Approvals
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-white text-[#1557f6] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeTab === 'approvals' ? (
            <>
              {recentApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 bg-[#fefcf5] border border-[#e7e4db] rounded-lg hover:bg-[#e9f9fb] transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#84cc16] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{approval.patientName}</p>
                        <Badge className={getStatusColor(approval.status)}>
                          {approval.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {approval.procedure} • {approval.clinic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${approval.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{approval.approvedAt}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#fefcf5] border border-[#e7e4db] rounded-lg hover:bg-[#e9f9fb] transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'payment' ? 'bg-[#84cc16]' :
                      transaction.type === 'refund' ? 'bg-red-500' : 'bg-[#1557f6]'
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{transaction.patientName}</p>
                        <Badge className={getTransactionTypeColor(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {transaction.paymentMethod} • {transaction.clinic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'refund' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {transaction.type === 'refund' ? '-' : '+'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.completedAt}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {activeTab === 'approvals' ? 'Need patient signatures' : 'Pending transactions'}: 
              <span className="font-medium text-[#1557f6] ml-1">
                {activeTab === 'approvals' ? '3 plans' : '2 payments'}
              </span>
            </p>
            <button className="text-sm font-medium text-[#1557f6] hover:text-[#1557f6]/80 transition-colors">
              View All →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}