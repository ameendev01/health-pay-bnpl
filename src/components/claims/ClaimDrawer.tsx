import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Clock,
  CheckSquare,
  Upload,
  DollarSign,
  Shield,
  MessageSquare,
  X,
  Download,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { Claim } from '@/features/claims/types';
import StatusChip from './StatusChip';
import AgingPill from './AgingPill';
import ClaimTimeline from './ClaimTimeline';
import ClaimTasks from './ClaimTasks';
import ClaimDocuments from './ClaimDocuments';
import ClaimPayout from './ClaimPayout';
import ClaimAudit from './ClaimAudit';
import ClaimNotes from './ClaimNotes';

interface ClaimDrawerProps {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
  onResubmit?: (claim: Claim) => void;
  onAssign?: (claim: Claim) => void;
}

export default function ClaimDrawer({
  claim,
  isOpen,
  onClose,
  onResubmit,
  onAssign
}: ClaimDrawerProps) {
  const [activeTab, setActiveTab] = useState('timeline');

  if (!claim) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getAgingDays = () => {
    const submissionDate = claim.submissionDate ? new Date(claim.submissionDate) : new Date(claim.createdAt);
    const now = new Date();
    return Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto rounded-xl">
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold text-gray-900">
                {claim.claimNumber}
              </SheetTitle>
              <SheetDescription className="text-gray-600 mt-1">
                {claim.payerName} • Service Date: {new Date(claim.serviceDate).toLocaleDateString()}
              </SheetDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(claim.totalAmount)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <StatusChip status={claim.status} size="sm" />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Aging:</span>
              <AgingPill days={getAgingDays()} size="sm" />
            </div>

            {/* Quick Actions */}
            <div className="ml-auto flex items-center space-x-2">
              {onAssign && (
                <Button variant="outline" size="sm" onClick={() => onAssign(claim)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign
                </Button>
              )}
              
              {(claim.status === 'denied' || claim.status === 'rejected') && onResubmit && (
                <Button variant="outline" size="sm" onClick={() => onResubmit(claim)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resubmit
                </Button>
              )}
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-100 border-2 border-gray-200 pb-8">
            <TabsTrigger value="timeline" className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-1">
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-1">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="payout" className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Payout</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="timeline">
              <ClaimTimeline claim={claim} />
            </TabsContent>
            
            <TabsContent value="tasks">
              <ClaimTasks claim={claim} />
            </TabsContent>
            
            <TabsContent value="documents">
              <ClaimDocuments claim={claim} />
            </TabsContent>
            
            <TabsContent value="payout">
              <ClaimPayout claim={claim} />
            </TabsContent>
            
            <TabsContent value="audit">
              <ClaimAudit claim={claim} />
            </TabsContent>
            
            <TabsContent value="notes">
              <ClaimNotes claim={claim} />
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}