import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  Eye, 
  RefreshCw, 
  FileText,
  Building2,
  User
} from 'lucide-react';
import { Claim } from '@/features/claims/types';
import StatusChip from './StatusChip';
import AgingPill from './AgingPill';
import ReconcilePill from './ReconcilePill';

interface ClaimsDataTableProps {
  claims: Claim[];
  selectedClaims: string[];
  onSelectionChange: (claimIds: string[]) => void;
  onClaimClick: (claim: Claim) => void;
  onResubmitClaim: (claim: Claim) => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export default function ClaimsDataTable({
  claims,
  selectedClaims,
  onSelectionChange,
  onClaimClick,
  onResubmitClaim,
  sortBy,
  sortDirection,
  onSort
}: ClaimsDataTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getAgingDays = (claim: Claim) => {
    const submissionDate = claim.submissionDate ? new Date(claim.submissionDate) : new Date(claim.createdAt);
    const now = new Date();
    return Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const isAllSelected = claims.length > 0 && claims.every(claim => selectedClaims.includes(claim.id));
  const isPartiallySelected = selectedClaims.length > 0 && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(claims.map(claim => claim.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectClaim = (claimId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedClaims, claimId]);
    } else {
      onSelectionChange(selectedClaims.filter(id => id !== claimId));
    }
  };

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium text-gray-500 hover:text-gray-700"
      onClick={() => onSort?.(column)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isPartiallySelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all claims"
              />
            </TableHead>
            <TableHead>
              <SortableHeader column="claimNumber">Claim</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader column="patientId">Patient</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader column="clinicId">Clinic</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader column="payerName">Payer</SortableHeader>
            </TableHead>
            <TableHead className="text-right">
              <SortableHeader column="totalAmount">Amount</SortableHeader>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aging</TableHead>
            <TableHead>Reconciliation</TableHead>
            <TableHead>
              <SortableHeader column="updatedAt">Updated</SortableHeader>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => {
            const isSelected = selectedClaims.includes(claim.id);
            const agingDays = getAgingDays(claim);
            const isHovered = hoveredRow === claim.id;
            
            return (
              <TableRow
                key={claim.id}
                className={`
                  cursor-pointer transition-colors duration-150
                  ${isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                  ${isHovered ? 'shadow-sm' : ''}
                `}
                onMouseEnter={() => setHoveredRow(claim.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onClaimClick(claim)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => handleSelectClaim(claim.id, !!checked)}
                    aria-label={`Select claim ${claim.claimNumber}`}
                  />
                </TableCell>
                
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{claim.claimNumber}</div>
                    <div className="text-sm text-gray-500">
                      {claim.procedureCodes.slice(0, 2).join(', ')}
                      {claim.procedureCodes.length > 2 && ` +${claim.procedureCodes.length - 2}`}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Patient {claim.patientId.slice(-3)}</div>
                      <div className="text-sm text-gray-500">ID: {claim.patientId}</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Clinic {claim.clinicId?.slice(-3) || 'N/A'}</div>
                      <div className="text-sm text-gray-500">Primary Care</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{claim.payerName}</div>
                    {claim.payerId && (
                      <div className="text-sm text-gray-500">ID: {claim.payerId}</div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(claim.totalAmount)}
                  </div>
                  {claim.paidAmount > 0 && (
                    <div className="text-sm text-green-600">
                      Paid: {formatCurrency(claim.paidAmount)}
                    </div>
                  )}
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <StatusChip 
                    status={claim.status} 
                    onClick={() => onClaimClick(claim)}
                    size="sm"
                  />
                </TableCell>
                
                <TableCell>
                  <AgingPill days={agingDays} size="sm" />
                </TableCell>
                
                <TableCell>
                  <ReconcilePill 
                    isReconciled={claim.status === 'paid'} 
                    size="sm" 
                  />
                </TableCell>
                
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {formatRelativeTime(claim.updatedAt)}
                  </div>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onClaimClick(claim)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {(claim.status === 'denied' || claim.status === 'rejected') && (
                        <DropdownMenuItem onClick={() => onResubmitClaim(claim)}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resubmit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <FileText className="w-4 h-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {claims.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}