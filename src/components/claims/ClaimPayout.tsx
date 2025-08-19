import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  Upload,
  FileText
} from 'lucide-react';
import { Claim } from '@/features/claims/types';
import ReconcilePill from './ReconcilePill';

interface ClaimPayoutProps {
  claim: Claim;
}

interface PayoutInfo {
  remittanceId: string;
  bankLast4: string;
  initiatedAt: string;
  settledAt?: string;
  status: 'pending' | 'processing' | 'settled' | 'failed';
  reconciled: boolean;
}

export default function ClaimPayout({ claim }: ClaimPayoutProps) {
  // Mock payout data - in real app this would come from API
  const payoutInfo: PayoutInfo | null = claim.status === 'paid' ? {
    remittanceId: 'REM-2024-001234',
    bankLast4: '4532',
    initiatedAt: '2024-01-25T09:00:00Z',
    settledAt: '2024-01-25T15:30:00Z',
    status: 'settled',
    reconciled: true
  } : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getPayoutStatusBadge = (status: PayoutInfo['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'settled':
        return <Badge className="bg-green-100 text-green-800">Settled</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Payment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(claim.totalAmount)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Billed</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(claim.allowedAmount || claim.totalAmount)}
              </div>
              <div className="text-sm text-blue-700 mt-1">Allowed Amount</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">
                {formatCurrency(claim.paidAmount)}
              </div>
              <div className="text-sm text-green-700 mt-1">Paid Amount</div>
            </div>
          </div>

          {claim.patientResponsibility > 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-orange-800">Patient Responsibility</div>
                  <div className="text-sm text-orange-700">
                    Patient owes: {formatCurrency(claim.patientResponsibility)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout Details */}
      {payoutInfo ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Payout Details</span>
              </CardTitle>
              <ReconcilePill isReconciled={payoutInfo.reconciled} size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600">Remittance ID</label>
                  <div className="font-mono font-medium text-gray-900">{payoutInfo.remittanceId}</div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Bank Account</label>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">****{payoutInfo.bankLast4}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Initiated</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {new Date(payoutInfo.initiatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {payoutInfo.settledAt && (
                  <div>
                    <label className="text-sm text-gray-600">Settled</label>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900">
                        {new Date(payoutInfo.settledAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getPayoutStatusBadge(payoutInfo.status)}
                </div>
                
                {!payoutInfo.reconciled && (
                  <Button variant="outline" size="sm">
                    Mark as Reconciled
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payout Information</h3>
              <p className="text-gray-600">
                Payout details will appear here once the claim is paid
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reconciliation Actions */}
      {claim.status === 'paid' && payoutInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Reconciliation Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Bank Statement
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Enter Remittance ID
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Create Adjustment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}