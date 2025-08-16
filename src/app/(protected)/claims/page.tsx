'use client'

import React, { useState } from 'react';
import { FileText, Plus, Filter, Download, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import FilterBar from '@/components/shared/FilterBar';
import EmptyState from '@/components/shared/EmptyState';
import ClaimsTable from '@/components/claims/ClaimsTable';
import ClaimDetailModal from '@/components/claims/ClaimDetailModal';
import ClaimResubmissionModal from '@/components/claims/ClaimResubmissionModal';
import { useClaims } from '@/features/claims/hooks/useClaims';
import { Claim, ClaimSearchFilters } from '@/features/claims/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isResubmissionModalOpen, setIsResubmissionModalOpen] = useState(false);
  const [filters, setFilters] = useState<ClaimSearchFilters>({
    searchTerm: '',
    status: 'all',
    payer: null,
    dateRange: {}
  });

  const { data: claims, isLoading, error, refetch } = useClaims(filters);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.payerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDetailModalOpen(true);
  };

  const handleResubmitClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsResubmissionModalOpen(true);
  };

  const statusFilterOptions = [
    { value: 'all', label: 'All Claims' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'denied', label: 'Denied' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
  ];

  const getStatusStats = () => {
    const stats = {
      total: claims.length,
      submitted: claims.filter(c => c.status === 'submitted').length,
      denied: claims.filter(c => c.status === 'denied').length,
      paid: claims.filter(c => c.status === 'paid').length,
      pending: claims.filter(c => c.status === 'pending').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (isLoading) {
    return <div>Loading claims...</div>;
  }

  if (error) {
    return <div>Error loading claims.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Claims Management" description="Track and manage insurance claims workflow">
        <div className="flex space-x-2">
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </button>
        </div>
      </PageHeader>

      {/* Claims Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Claims</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
            <p className="text-xs text-gray-500">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Denied</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.denied}</div>
            <p className="text-xs text-gray-500">Need attention</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.paid}</div>
            <p className="text-xs text-gray-500">Completed</p>
          </CardContent>
        </Card>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filterOptions={statusFilterOptions}
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
      >
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </button>
      </FilterBar>

      {/* Denied Claims Alert */}
      {stats.denied > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">
                {stats.denied} Denied Claims Need Attention
              </h4>
              <p className="text-sm text-red-700">
                Review and resubmit denied claims to recover revenue. Click on any denied claim to start the resubmission process.
              </p>
            </div>
          </div>
        </div>
      )}

      {filteredClaims.length > 0 ? (
        <ClaimsTable 
          claims={filteredClaims} 
          onViewClaim={handleViewClaim}
          onResubmitClaim={handleResubmitClaim}
        />
      ) : (
        <EmptyState 
          icon={FileText} 
          title="No claims found" 
          description="Try adjusting your search or filter criteria" 
        />
      )}

      <ClaimDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedClaim(null);
        }}
        claim={selectedClaim}
      />

      <ClaimResubmissionModal
        isOpen={isResubmissionModalOpen}
        onClose={() => {
          setIsResubmissionModalOpen(false);
          setSelectedClaim(null);
        }}
        claim={selectedClaim}
        onResubmit={(claimData) => {
          console.log('Resubmitting claim:', claimData);
          // Implementation will be added with the hook
        }}
      />
    </div>
  );
}