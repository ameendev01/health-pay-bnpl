'use client'

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  User, 
  Building2, 
  Calendar, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Send
} from 'lucide-react';
import { Claim } from '@/features/claims/types';

interface ClaimDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim | null;
}

export default function ClaimDetailModal({ isOpen, onClose, claim }: ClaimDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !claim) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'details', name: 'Claim Details', icon: Building2 },
    { id: 'history', name: 'Status History', icon: Clock },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Claim Status */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Claim Status</h4>
          {getStatusIcon(claim.status)}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
          </span>
          {claim.responseDate && (
            <span className="text-sm text-gray-600">
              Updated: {new Date(claim.responseDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Total Amount</h4>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${claim.totalAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Billed amount</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Paid Amount</h4>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${claim.paidAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Received</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Patient Responsibility</h4>
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${claim.patientResponsibility.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Patient owes</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Claim Information</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Claim Number</p>
            <p className="font-semibold text-gray-900">{claim.claimNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Patient ID</p>
            <p className="font-semibold text-gray-900">{claim.patientId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Service Date</p>
            <p className="font-semibold text-gray-900">{new Date(claim.serviceDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Submission Date</p>
            <p className="font-semibold text-gray-900">
              {claim.submissionDate ? new Date(claim.submissionDate).toLocaleDateString() : 'Not submitted'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Procedure Codes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Procedure Codes</h4>
        <div className="flex flex-wrap gap-2">
          {claim.procedureCodes.map((code, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {code}
            </span>
          ))}
        </div>
      </div>

      {/* Diagnosis Codes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Diagnosis Codes</h4>
        <div className="flex flex-wrap gap-2">
          {claim.diagnosisCodes.map((code, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              {code}
            </span>
          ))}
        </div>
      </div>

      {/* Payer Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Payer Information</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Payer Name</p>
            <p className="font-semibold text-gray-900">{claim.payerName}</p>
          </div>
          {claim.payerId && (
            <div>
              <p className="text-sm text-gray-600">Payer ID</p>
              <p className="font-semibold text-gray-900">{claim.payerId}</p>
            </div>
          )}
          {claim.clearinghouseId && (
            <div>
              <p className="text-sm text-gray-600">Clearinghouse</p>
              <p className="font-semibold text-gray-900">{claim.clearinghouseId}</p>
            </div>
          )}
          {claim.clearinghouseClaimId && (
            <div>
              <p className="text-sm text-gray-600">Clearinghouse Claim ID</p>
              <p className="font-semibold text-gray-900">{claim.clearinghouseClaimId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900">Status History</h4>
      
      <div className="space-y-4">
        {/* Mock status history */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Claim Submitted</p>
              <p className="text-sm text-gray-600">
                Claim successfully submitted to {claim.payerName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">
                {claim.submissionDate ? new Date(claim.submissionDate).toLocaleDateString() : 'Today'}
              </p>
              <p className="text-xs text-gray-500">2:30 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Claim Created</p>
              <p className="text-sm text-gray-600">
                Initial claim created in the system
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">{new Date(claim.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500">10:15 AM</p>
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{claim.claimNumber}</h2>
                <p className="text-sm text-gray-600">{claim.payerName} • Service Date: {new Date(claim.serviceDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Send className="w-4 h-4 mr-2" />
                Send Update
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
            {activeTab === 'details' && renderDetailsTab()}
            {activeTab === 'history' && renderHistoryTab()}
          </div>
        </div>
      </div>
    </div>
  );
}