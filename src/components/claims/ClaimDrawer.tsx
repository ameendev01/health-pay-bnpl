"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  CheckSquare,
  Upload,
  DollarSign,
  Shield,
  MessageSquare,
  Download,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { Claim } from "@/features/claims/types";
import StatusChip from "./StatusChip";
import AgingPill from "./AgingPill";
import ClaimTimeline from "./ClaimTimeline";
import ClaimTasks from "./ClaimTasks";
import ClaimDocuments from "./ClaimDocuments";
import ClaimPayout from "./ClaimPayout";
import ClaimAudit from "./ClaimAudit";
import ClaimNotes from "./ClaimNotes";

interface ClaimDrawerProps {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void; // parent toggles isOpen -> false
  onResubmit?: (claim: Claim) => void;
  onAssign?: (claim: Claim) => void;
}

export default function ClaimDrawer({
  claim,
  isOpen,
  onClose,
  onResubmit,
  onAssign,
}: ClaimDrawerProps) {
  const [activeTab, setActiveTab] = useState("timeline");

  // IMPORTANT: keep the Sheet mounted; let Radix drive open/closed states.
  // Only call onClose when Radix asks to close (overlay click, SheetClose button, etc.)
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const getAgingDays = () => {
    if (!claim) return 0;
    const submissionDate = claim.submissionDate
      ? new Date(claim.submissionDate)
      : new Date(claim.createdAt);
    const now = new Date();
    return Math.floor(
      (now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      {/* forceMount keeps node in the DOM for exit animation even if parent flips props fast */}
      <SheetContent
        forceMount
        side="right"
        className="
          top-4 bottom-4 right-4
          h-auto max-h-[calc(100vh-2rem)]
          w-[min(calc(100vw-2rem),40rem)]
          max-w-none sm:!max-w-none
          overflow-y-auto rounded-xl
        "
      >
        {/* Header with a close button wired via Radix */}
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold text-gray-900">
                {claim?.claimNumber ?? "Claim"}
              </SheetTitle>
              {claim && (
                <SheetDescription className="text-gray-600 mt-1">
                  {claim.payerName} • Service Date:{" "}
                  {new Date(claim.serviceDate).toLocaleDateString()}
                </SheetDescription>
              )}
            </div>
          </div>

          {/* Quick Info Bar */}
          {claim && (
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

              <div className="ml-auto flex items-center space-x-2">
                {onAssign && claim && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAssign(claim)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign
                  </Button>
                )}

                {claim &&
                  (claim.status === "denied" || claim.status === "rejected") &&
                  onResubmit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResubmit(claim)}
                    >
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
          )}
        </SheetHeader>

        {/* Tabs/content (render only when we have a claim) */}
        {claim && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6 bg-gray-100 border-2 border-gray-200 pb-8">
              <TabsTrigger
                value="timeline"
                className="flex items-center space-x-1"
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="flex items-center space-x-1"
              >
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center space-x-1"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Docs</span>
              </TabsTrigger>
              <TabsTrigger
                value="payout"
                className="flex items-center space-x-1"
              >
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Payout</span>
              </TabsTrigger>
              <TabsTrigger
                value="audit"
                className="flex items-center space-x-1"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Audit</span>
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex items-center space-x-1"
              >
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
        )}
      </SheetContent>
    </Sheet>
  );
}
