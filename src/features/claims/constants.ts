import { Claim, ClaimDenial } from './types';

// Status configuration with colors and next actions
export const CLAIM_STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    nextAction: 'Submit claim',
    description: 'Claim is being prepared for submission'
  },
  submitted: {
    label: 'Submitted',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    nextAction: 'Awaiting response',
    description: 'Claim has been submitted to payer'
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-green-100 text-green-800 border-green-200',
    nextAction: 'Awaiting payment',
    description: 'Claim has been accepted by payer'
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800 border-red-200',
    nextAction: 'Review and resubmit',
    description: 'Claim was rejected and needs attention'
  },
  paid: {
    label: 'Paid',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    nextAction: 'Reconcile payment',
    description: 'Payment has been received'
  },
  denied: {
    label: 'Denied',
    color: 'bg-red-100 text-red-800 border-red-200',
    nextAction: 'Resubmit with corrections',
    description: 'Claim was denied and requires resubmission'
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    nextAction: 'Provide additional info',
    description: 'Additional information required'
  }
} as const;

// Denial reason codes
export const DENIAL_REASON_CODES = {
  'PRIOR_AUTH': {
    code: 'PRIOR_AUTH',
    description: 'Prior authorization required',
    category: 'authorization',
    isCorrectable: true,
    guidance: 'Obtain prior authorization from payer before resubmitting'
  },
  'DUPLICATE': {
    code: 'DUPLICATE',
    description: 'Duplicate claim',
    category: 'administrative',
    isCorrectable: true,
    guidance: 'Verify this is not a duplicate submission'
  },
  'MEDICAL_NECESSITY': {
    code: 'MEDICAL_NECESSITY',
    description: 'Medical necessity not established',
    category: 'clinical',
    isCorrectable: true,
    guidance: 'Provide additional clinical documentation'
  },
  'INVALID_PATIENT': {
    code: 'INVALID_PATIENT',
    description: 'Invalid patient information',
    category: 'demographic',
    isCorrectable: true,
    guidance: 'Verify and correct patient demographic information'
  },
  'INVALID_PROVIDER': {
    code: 'INVALID_PROVIDER',
    description: 'Invalid provider information',
    category: 'provider',
    isCorrectable: true,
    guidance: 'Verify provider credentials and information'
  },
  'INVALID_PROCEDURE': {
    code: 'INVALID_PROCEDURE',
    description: 'Invalid procedure code',
    category: 'coding',
    isCorrectable: true,
    guidance: 'Review and correct procedure codes'
  },
  'INVALID_DIAGNOSIS': {
    code: 'INVALID_DIAGNOSIS',
    description: 'Invalid diagnosis code',
    category: 'coding',
    isCorrectable: true,
    guidance: 'Review and correct diagnosis codes'
  },
  'NOT_COVERED': {
    code: 'NOT_COVERED',
    description: 'Services not covered',
    category: 'coverage',
    isCorrectable: false,
    guidance: 'Service is not covered under patient policy'
  },
  'TIMELY_FILING': {
    code: 'TIMELY_FILING',
    description: 'Timely filing limit exceeded',
    category: 'administrative',
    isCorrectable: false,
    guidance: 'Claim submitted after payer filing deadline'
  }
} as const;

// Priority levels for denials
export const PRIORITY_LEVELS = {
  low: {
    label: 'Low',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Standard processing time'
  },
  medium: {
    label: 'Medium',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Moderate urgency'
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'High priority - needs attention'
  },
  urgent: {
    label: 'Urgent',
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Critical - immediate action required'
  }
} as const;

// Aging buckets for claims
export const AGING_BUCKETS = {
  '0-3': { label: '0-3 days', min: 0, max: 3, color: 'bg-green-100 text-green-800' },
  '4-7': { label: '4-7 days', min: 4, max: 7, color: 'bg-yellow-100 text-yellow-800' },
  '8-14': { label: '8-14 days', min: 8, max: 14, color: 'bg-orange-100 text-orange-800' },
  '15+': { label: '15+ days', min: 15, max: 999, color: 'bg-red-100 text-red-800' }
} as const;

// Mock claims data with enhanced fields
export const mockClaims: Claim[] = [
  {
    id: 'CLM-001',
    claimNumber: 'CLM-2024-001',
    patientId: 'PAT-001',
    clinicId: 'CLI-001',
    payerName: 'Blue Cross Blue Shield',
    payerId: 'BCBS-CA',
    serviceDate: '2024-01-15',
    procedureCodes: ['99213', '99214'],
    diagnosisCodes: ['Z00.00', 'M25.511'],
    totalAmount: 450,
    allowedAmount: 400,
    paidAmount: 360,
    patientResponsibility: 40,
    status: 'paid',
    submissionDate: '2024-01-16T00:00:00Z',
    responseDate: '2024-01-20T00:00:00Z',
    paymentDate: '2024-01-25T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-001',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
  {
    id: 'CLM-002',
    claimNumber: 'CLM-2024-002',
    patientId: 'PAT-002',
    clinicId: 'CLI-002',
    payerName: 'Aetna',
    payerId: 'AETNA-001',
    serviceDate: '2024-01-18',
    procedureCodes: ['D0150', 'D1110'],
    diagnosisCodes: ['K02.9'],
    totalAmount: 320,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'denied',
    submissionDate: '2024-01-19T00:00:00Z',
    responseDate: '2024-01-22T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-002',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: 'CLM-003',
    claimNumber: 'CLM-2024-003',
    patientId: 'PAT-003',
    clinicId: 'CLI-003',
    payerName: 'Cigna',
    payerId: 'CIGNA-001',
    serviceDate: '2024-01-20',
    procedureCodes: ['99395'],
    diagnosisCodes: ['Z00.00'],
    totalAmount: 280,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'submitted',
    submissionDate: '2024-01-21T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-003',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-21T00:00:00Z',
  },
  {
    id: 'CLM-004',
    claimNumber: 'CLM-2024-004',
    patientId: 'PAT-004',
    clinicId: 'CLI-004',
    payerName: 'Medicare',
    payerId: 'MEDICARE-001',
    serviceDate: '2024-01-22',
    procedureCodes: ['99213'],
    diagnosisCodes: ['E11.9'],
    totalAmount: 180,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'pending',
    submissionDate: '2024-01-23T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-004',
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-23T00:00:00Z',
  },
  {
    id: 'CLM-005',
    claimNumber: 'CLM-2024-005',
    patientId: 'PAT-005',
    clinicId: 'CLI-005',
    payerName: 'United Healthcare',
    payerId: 'UHC-001',
    serviceDate: '2024-01-25',
    procedureCodes: ['D2750'],
    diagnosisCodes: ['K02.1'],
    totalAmount: 850,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'rejected',
    submissionDate: '2024-01-26T00:00:00Z',
    responseDate: '2024-01-28T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-005',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-28T00:00:00Z',
  }
];

// Mock denials data
export const mockDenials: ClaimDenial[] = [
  {
    id: 'DEN-001',
    claimId: 'CLM-002',
    denialCode: 'PRIOR_AUTH',
    denialReason: 'Prior authorization required',
    denialDescription: 'This procedure requires prior authorization from the insurance provider',
    isCorrectable: true,
    correctionInstructions: 'Obtain prior authorization and resubmit with authorization number',
    denialDate: '2024-01-22T00:00:00Z',
    agingDays: 5,
    priorityLevel: 'high',
    resolutionStatus: 'pending',
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: 'DEN-002',
    claimId: 'CLM-005',
    denialCode: 'MEDICAL_NECESSITY',
    denialReason: 'Medical necessity not established',
    denialDescription: 'Additional documentation required to establish medical necessity',
    isCorrectable: true,
    correctionInstructions: 'Provide clinical notes and supporting documentation',
    denialDate: '2024-01-28T00:00:00Z',
    agingDays: 2,
    priorityLevel: 'medium',
    resolutionStatus: 'in_progress',
    createdAt: '2024-01-28T00:00:00Z',
    updatedAt: '2024-01-29T00:00:00Z',
  }
];

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  'Space': 'Select row',
  'A': 'Assign claim',
  'U': 'Upload documents',
  'R': 'Resubmit claim',
  'E': 'Export selected',
  'Enter': 'Open claim details',
  'Escape': 'Clear selection',
  '?': 'Show help'
} as const;