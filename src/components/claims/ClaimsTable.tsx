import React from 'react';
import { Claim } from '@/features/claims/types';
import { Eye, RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClaimsTableProps {
  claims: Claim[];
  onViewClaim: (claim: Claim) => void;
  onResubmitClaim: (claim: Claim) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'accepted':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'denied':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'paid':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'submitted':
      return <Clock className="w-4 h-4 text-blue-600" />;
    case 'accepted':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'denied':
      return <XCircle className="w-4 h-4 text-red-600" />;
    case 'paid':
      return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    case 'pending':
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const getRowClassName = (claim: Claim) => {
  switch (claim.status) {
    case 'denied':
      return 'border-l-4 border-red-500 bg-red-50/30';
    case 'paid':
      return 'border-l-4 border-green-500';
    case 'submitted':
      return 'border-l-4 border-blue-500';
    default:
      return '';
  }
};

export default function ClaimsTable({ claims, onViewClaim, onResubmitClaim }: ClaimsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim Number</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Payer</TableHead>
              <TableHead>Service Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow 
                key={claim.id} 
                className={`hover:bg-gray-50 transition-colors duration-200 ${getRowClassName(claim)}`}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{claim.claimNumber}</div>
                  <div className="text-sm text-gray-500">
                    {claim.procedureCodes.slice(0, 2).join(', ')}
                    {claim.procedureCodes.length > 2 && ` +${claim.procedureCodes.length - 2} more`}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">Patient ID: {claim.patientId}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{claim.payerName}</div>
                  {claim.payerId && (
                    <div className="text-sm text-gray-500">ID: {claim.payerId}</div>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(claim.serviceDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-gray-900">${claim.totalAmount.toLocaleString()}</div>
                  {claim.paidAmount > 0 && (
                    <div className="text-sm text-green-600">
                      Paid: ${claim.paidAmount.toLocaleString()}
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`${getStatusColor(claim.status)} border-0 flex items-center space-x-1`}>
                    {getStatusIcon(claim.status)}
                    <span>{claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}</span>
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onViewClaim(claim)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {claim.status === 'denied' && (
                      <Button
                        size="sm"
                        onClick={() => onResubmitClaim(claim)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Resubmit
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}