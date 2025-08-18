'use client'

import React, { useState } from 'react';
import { Plus, Download, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ClaimsKPICards from '@/components/claims/ClaimsKPICards';
import ClaimsFilterBar from '@/components/claims/ClaimsFilterBar';
import ClaimsDataTable from '@/components/claims/ClaimsDataTable';
import BulkActionBar from '@/components/claims/BulkActionBar';
import ClaimDrawer from '@/components/claims/ClaimDrawer';
import ClaimResubmissionModal from '@/components/claims/ClaimResubmissionModal';
import KeyboardShortcutsHelp from '@/components/claims/KeyboardShortcutsHelp';
// import { useClaims } from '@/features/claims/hooks/useClaims';
import { Claim, ClaimSearchFilters } from '@/features/claims/types';
import { mockClaims } from '@/features/claims/constants';

export default function ClaimsPage() {
  const [filters, setFilters] = useState<ClaimSearchFilters>({
    searchTerm: '',
    status: 'all',
    payer: null,
    dateRange: {},
    agingDays: undefined,
    priorityLevel: undefined
  });
  
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResubmissionModalOpen, setIsResubmissionModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Use mock data for now - replace with real hook when API is ready
  const claims = mockClaims;
  const isLoading = false;
  const error = null;

  // Filter and sort claims
  const filteredClaims = React.useMemo(() => {
    const filtered = claims.filter(claim => {
      const matchesSearch = !filters.searchTerm || 
        claim.claimNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        claim.payerName.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || claim.status === filters.status;
      const matchesPayer = !filters.payer || claim.payerName === filters.payer;
      
      return matchesSearch && matchesStatus && matchesPayer;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'claimNumber':
          aValue = a.claimNumber;
          bValue = b.claimNumber;
          break;
        case 'totalAmount':
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [claims, filters, sortBy, sortDirection]);

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDrawerOpen(true);
  };

  const handleResubmitClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsResubmissionModalOpen(true);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Mock KPI data
  const kpiData = {
    awaitingAction: 23,
    avgTimeToFund: 12.5,
    infoNeededAmount: 45200,
    denialRate: 8.3,
    agingOver7Days: 15
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case '?':
          e.preventDefault();
          setIsHelpOpen(true);
          break;
        case 'escape':
          e.preventDefault();
          setSelectedClaims([]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading claims...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading claims. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Claims Management" 
        description="Track and manage insurance claims workflow"
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Shortcuts
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </button>
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <ClaimsKPICards data={kpiData} />

      {/* Filter Bar */}
      <ClaimsFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onSaveView={() => console.log('Save view')}
      />

      {/* Claims Table */}
      <ClaimsDataTable
        claims={filteredClaims}
        selectedClaims={selectedClaims}
        onSelectionChange={setSelectedClaims}
        onClaimClick={handleViewClaim}
        onResubmitClaim={handleResubmitClaim}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedClaims.length}
        onClearSelection={() => setSelectedClaims([])}
        onBulkAssign={() => console.log('Bulk assign')}
        onBulkUpload={() => console.log('Bulk upload')}
        onBulkResubmit={() => console.log('Bulk resubmit')}
        onBulkExport={() => console.log('Bulk export')}
      />

      {/* Claim Drawer */}
      <ClaimDrawer
        claim={selectedClaim}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedClaim(null);
        }}
        onResubmit={handleResubmitClaim}
        onAssign={(claim) => console.log('Assign claim:', claim.id)}
      />

      {/* Resubmission Modal */}
      <ClaimResubmissionModal
        isOpen={isResubmissionModalOpen}
        onClose={() => {
          setIsResubmissionModalOpen(false);
          setSelectedClaim(null);
        }}
        claim={selectedClaim}
        onResubmit={(claimData) => {
          console.log('Resubmitting claim:', claimData);
        }}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}