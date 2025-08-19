"use client";

import React, { useState } from "react";
import ClaimDrawer from "@/components/claims/ClaimDrawer";
import ClaimResubmissionModal from "@/components/claims/ClaimResubmissionModal";
import KeyboardShortcutsHelp from "@/components/claims/KeyboardShortcutsHelp";
import ClaimsTable from "@/components/claims/ClaimsTable";
import { mockClaims } from "@/features/claims/constants";
import { Claim } from "@/features/claims/types";
import ClaimWizardDrawer from "@/components/claims/ClaimWizardDrawer";

export default function ClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResubmissionModalOpen, setIsResubmissionModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  const handleView = (c: Claim) => {
    setSelectedClaim(c);
    setIsDrawerOpen(true);
  };
  const handleResubmit = (c: Claim) => {
    setSelectedClaim(c);
    setIsResubmissionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ClaimsTable
        claims={mockClaims}
        onViewClaim={handleView}
        onResubmitClaim={handleResubmit}
        // onOpenShortcuts={() => setIsHelpOpen(true)}
        onCreateNew={() => setWizardOpen(true)}
      />

      <ClaimWizardDrawer
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        mode="create"
        onSubmitted={(d) => console.log("submitted", d)}
      />

      <ClaimDrawer
        claim={selectedClaim}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedClaim(null);
        }}
        onResubmit={handleResubmit}
        onAssign={(claim) => console.log("Assign claim:", claim.id)}
      />

      <ClaimResubmissionModal
        isOpen={isResubmissionModalOpen}
        onClose={() => {
          setIsResubmissionModalOpen(false);
          setSelectedClaim(null);
        }}
        claim={selectedClaim}
        onResubmit={(data) => console.log("Resubmitting claim:", data)}
      />

      <KeyboardShortcutsHelp
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
