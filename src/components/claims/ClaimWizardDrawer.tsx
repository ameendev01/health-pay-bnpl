'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronRight, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClaimDraft, deriveTotals, validateForSubmit } from './schemas/claims';
import { StepsRail, StepPatient, StepCoverage, StepServices, StepAttachments, StepReview } from './ClaimWizardSteps';

type Mode = 'create' | 'edit';

export default function ClaimWizardDrawer({
  open, onClose, initial, onSubmitted, mode='create'
}: {
  open: boolean;
  onClose: () => void;
  initial?: Partial<ClaimDraft>;             // prefill for edit
  onSubmitted?: (createdOrUpdated: ClaimDraft) => void;
  mode?: Mode;
}) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [draft, setDraft] = useState<ClaimDraft>(() => ({
    patientId: initial?.patientId ?? '',
    encounterId: initial?.encounterId,
    clinicId: initial?.clinicId,
    dateOfServiceFrom: initial?.dateOfServiceFrom ?? '',
    dateOfServiceTo: initial?.dateOfServiceTo,
    payerName: initial?.payerName ?? '',
    payerId: initial?.payerId,
    memberId: initial?.memberId ?? '',
    planId: initial?.planId,
    diagnosisCodes: initial?.diagnosisCodes ?? [],
    lines: initial?.lines ?? [],
    attachments: initial?.attachments ?? [],
    notes: initial?.notes,
    bnplPlanId: initial?.bnplPlanId,
    expectedPayerResponsibility: initial?.expectedPayerResponsibility,
    expectedPatientResponsibility: initial?.expectedPatientResponsibility,
    financedPortion: initial?.financedPortion,
    assigneeId: initial?.assigneeId,
    priority: initial?.priority ?? 'normal',
    id: initial?.id,
  }));

  const dirtyRef = useRef(false);
  useEffect(() => { const onBeforeUnload = (e: BeforeUnloadEvent) => { if (dirtyRef.current) { e.preventDefault(); e.returnValue = ''; } }; window.addEventListener('beforeunload', onBeforeUnload); return () => window.removeEventListener('beforeunload', onBeforeUnload); }, []);

  // Autosave draft (mock) every 10s
  useEffect(() => {
    if (!open) return;
    const t = setInterval(async () => {
      if (!dirtyRef.current) return;
      setSaving(true);
      await new Promise(r => setTimeout(r, 300)); // mock
      setSaving(false);
      dirtyRef.current = false;
    }, 10000);
    return () => clearInterval(t);
  }, [open]);

  const set = <K extends keyof ClaimDraft>(key: K, value: ClaimDraft[K]) => {
    setDraft(d => { dirtyRef.current = true; return { ...d, [key]: value }; });
  };

  const { gross, payer, patient, financed } = useMemo(() => deriveTotals(draft, {}), [draft]);
  useEffect(() => {
    // keep derived fields in-sync
    setDraft(d => ({ ...d, expectedPayerResponsibility: payer, expectedPatientResponsibility: patient, financedPortion: financed }));
  }, [payer, patient, financed]);

  const STEPS = [
    { title: 'Patient & encounter', valid: !!draft.patientId && !!draft.dateOfServiceFrom },
    { title: 'Coverage & payer',    valid: !!draft.payerName && !!draft.memberId },
    { title: 'Services & charges',  valid: draft.lines.length > 0 && draft.diagnosisCodes.length > 0 },
    { title: 'Attachments & notes', valid: true },
    { title: 'Review & submit',     valid: true },
  ];

  async function handleSubmit() {
    const issues = validateForSubmit(draft);
    if (issues.length) {
      const first = issues[0];
      alert(`Fix before submit:\n• ${first.message} (${first.field})`);
      // jump to relevant step
      if (first.field?.startsWith('patientId') || first.field?.includes('dateOfService')) setStep(0);
      else if (first.field?.includes('payer') || first.field?.includes('member')) setStep(1);
      else if (first.field?.startsWith('lines') || first.field?.startsWith('diagnosis')) setStep(2);
      else if (first.field?.startsWith('attachments')) setStep(3);
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 600)); // mock API
    setSubmitting(false);
    onSubmitted?.(draft);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* drawer */}
      <div className="absolute right-0 top-0 h-full w-[960px] max-w-[92vw] bg-white shadow-2xl border-l border-black/10 flex">
        {/* left rail */}
        <StepsRail steps={STEPS} active={step} onSelect={setStep} saving={saving} mode={mode} />

        {/* content */}
        <div className="flex-1 flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <div className="text-[14px] font-semibold text-gray-900">
                  {mode === 'create' ? 'New claim' : `Edit claim ${draft.id ?? ''}`}
                </div>
                <div className="text-[12px] text-gray-500">BNPL-aware claim submission</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-8" onClick={() => { dirtyRef.current = false; }} >
                <Save className="h-4 w-4 mr-1" /> Save draft
              </Button>
              <Button className="h-8" onClick={handleSubmit} disabled={submitting}>
                <Send className="h-4 w-4 mr-1" /> {submitting ? 'Submitting…' : 'Submit claim'}
              </Button>
            </div>
          </div>

          {/* body */}
          <div className="min-h-0 flex-1 overflow-auto px-6 py-6">
            {step === 0 && <StepPatient draft={draft} set={set} />}
            {step === 1 && <StepCoverage draft={draft} set={set} />}
            {step === 2 && <StepServices draft={draft} set={set} derived={{ gross, payer, patient, financed }} />}
            {step === 3 && <StepAttachments draft={draft} set={set} />}
            {step === 4 && <StepReview draft={draft} derived={{ gross, payer, patient, financed }} onSubmit={handleSubmit} />}
          </div>

          {/* footer pager */}
          <div className="border-t px-6 py-3 flex items-center justify-between">
            <div className="text-[12px] text-gray-500">Step {step+1} of {STEPS.length}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-8" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}>Back</Button>
              <Button className="h-8" onClick={() => setStep(s => Math.min(STEPS.length-1, s+1))} disabled={step===STEPS.length-1}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
