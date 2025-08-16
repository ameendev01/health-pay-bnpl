export interface Claim {
  id: string;
  claimNumber: string;
  patientId: string;
  clinicId?: string;
  payerName: string;
  payerId?: string;
  serviceDate: string;
  procedureCodes: string[];
  diagnosisCodes: string[];
  totalAmount: number;
  allowedAmount?: number;
  paidAmount: number;
  patientResponsibility: number;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected' | 'paid' | 'denied' | 'pending';
  submissionDate?: string;
  responseDate?: string;
  paymentDate?: string;
  clearinghouseId?: string;
  clearinghouseClaimId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimDenial {
  id: string;
  claimId: string;
  denialCode: string;
  denialReason: string;
  denialDescription?: string;
  isCorrectable: boolean;
  correctionInstructions?: string;
  denialDate: string;
  agingDays: number;
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  resolutionStatus: 'pending' | 'in_progress' | 'resolved' | 'escalated';
  createdAt: string;
  updatedAt: string;
}

export interface ClaimResubmission {
  id: string;
  originalClaimId: string;
  denialId: string;
  resubmissionAttempt: number;
  changesMade: string;
  correctedFields: Record<string, any>;
  resubmittedBy: string;
  resubmissionDate: string;
  newClaimId?: string;
  status: 'submitted' | 'accepted' | 'rejected' | 'paid';
  outcome?: string;
  createdAt: string;
}

export interface ClearinghouseResponse {
  id: string;
  claimId: string;
  responseType: 'acknowledgment' | 'rejection' | 'status_update' | 'payment';
  responseCode?: string;
  responseMessage?: string;
  rawResponse?: any;
  processedAt: string;
  createdAt: string;
}

export interface ClaimSearchFilters {
  searchTerm: string;
  status: 'all' | Claim['status'];
  payer: string | null;
  dateRange: {
    start?: string;
    end?: string;
  };
  agingDays?: number;
  priorityLevel?: ClaimDenial['priorityLevel'];
}