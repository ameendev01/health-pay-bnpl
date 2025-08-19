// features/claims/draft.ts
import { z } from 'zod';

export type ClaimLine = {
  cpt: string;
  description?: string;
  units: number;
  charge: number;    // per unit or total, we’ll treat as total
  modifiers?: string[];
  diagnosisPointers?: string[]; // A,B,C,D
};

export type ClaimDraft = {
  id?: string;                 // present in edit mode
  patientId: string;
  encounterId?: string;
  clinicId?: string;
  dateOfServiceFrom: string;   // ISO date
  dateOfServiceTo?: string;    // ISO date
  payerName: string;
  payerId?: string;
  memberId: string;
  planId?: string;

  diagnosisCodes: string[];    // ICD-10
  lines: ClaimLine[];

  attachments: { id: string; name: string; url?: string; kind: 'clinical'|'authorization'|'other' }[];
  notes?: string;

  // BNPL extras
  bnplPlanId?: string;
  expectedPayerResponsibility?: number;
  expectedPatientResponsibility?: number;
  financedPortion?: number;

  assigneeId?: string;
  priority?: 'low'|'normal'|'urgent';
};

export const lineSchema = z.object({
  cpt: z.string().min(4),
  description: z.string().optional(),
  units: z.number().int().positive(),
  charge: z.number().nonnegative(),
  modifiers: z.array(z.string()).optional(),
  diagnosisPointers: z.array(z.string()).optional(),
});

export const draftSchema = z.object({
  patientId: z.string().min(1),
  encounterId: z.string().optional(),
  clinicId: z.string().optional(),
  dateOfServiceFrom: z.string().min(1),
  dateOfServiceTo: z.string().optional(),
  payerName: z.string().min(1),
  payerId: z.string().optional(),
  memberId: z.string().min(1),
  planId: z.string().optional(),

  diagnosisCodes: z.array(z.string()).min(1),
  lines: z.array(lineSchema).min(1),

  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().optional(),
    kind: z.enum(['clinical','authorization','other'])
  })).optional(),

  notes: z.string().optional(),
  bnplPlanId: z.string().optional(),
  expectedPayerResponsibility: z.number().optional(),
  expectedPatientResponsibility: z.number().optional(),
  financedPortion: z.number().optional(),
  assigneeId: z.string().optional(),
  priority: z.enum(['low','normal','urgent']).optional(),
});

export type DraftIssue = { field?: string; message: string };

// Simple derivation: totals & BNPL split (tune rules per payer/contract)
export function deriveTotals(draft: ClaimDraft, coverage: { coinsurance?: number; copay?: number; deductibleRemaining?: number } = {}) {
  const gross = draft.lines.reduce((s,l)=> s + (l.charge ?? 0), 0);

  let patient = 0;
  if (coverage.copay) patient += coverage.copay;
  if (coverage.coinsurance) patient += (gross - (coverage.deductibleRemaining ?? 0)) * coverage.coinsurance;
  if (coverage.deductibleRemaining) patient += Math.min(coverage.deductibleRemaining, gross);

  patient = Math.max(0, Math.min(gross, Math.round(patient)));
  const payer = Math.max(0, gross - patient);

  // financed portion (BNPL): everything the patient owes
  const financed = patient;

  return { gross, payer, patient, financed };
}

export function validateForSubmit(draft: ClaimDraft): DraftIssue[] {
  const issues: DraftIssue[] = [];
  const res = draftSchema.safeParse(draft);
  if (!res.success) {
    res.error.issues.forEach(i => issues.push({ field: i.path.join('.'), message: i.message }));
  }
  // Attachments heuristic: require 'clinical' when any surgical CPT present (starts with 1 or 2)
  if (draft.lines.some(l => /^1|^2/.test(l.cpt))) {
    const hasClinical = draft.attachments?.some(a => a.kind === 'clinical');
    if (!hasClinical) issues.push({ field: 'attachments', message: 'Clinical notes required for surgical services.' });
  }
  return issues;
}
