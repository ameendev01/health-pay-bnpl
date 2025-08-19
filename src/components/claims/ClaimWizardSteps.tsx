'use client';

import React from 'react';
import { ClaimDraft, ClaimLine } from './schemas/claims';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function StepsRail({
  steps, active, onSelect, saving, mode
}: { steps: { title: string; valid: boolean }[]; active: number; onSelect: (n:number)=>void; saving:boolean; mode:'create'|'edit' }) {
  return (
    <div className="w-64 border-r bg-[#faf9f6]">
      <div className="px-4 py-4">
        <div className="text-[12px] text-gray-500 mb-2">{mode==='create'?'Create':'Update'} flow</div>
        <ol className="space-y-1">
          {steps.map((s, i) => (
            <li key={i}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-[13px] ${i===active ? 'bg-white shadow-sm border' : 'hover:bg-white/60'} ${s.valid ? 'text-gray-900' : 'text-gray-500'}`}
                onClick={()=>onSelect(i)}
              >
                {i+1}. {s.title}
              </button>
            </li>
          ))}
        </ol>
        {saving && <div className="mt-3 text-[12px] text-gray-500">Saving draft…</div>}
      </div>
    </div>
  );
}

/* ---------- Step 1: Patient & encounter ---------- */
export function StepPatient({ draft, set }: { draft: ClaimDraft; set: <K extends keyof ClaimDraft>(k:K,v:ClaimDraft[K])=>void; }) {
  return (
    <div className="space-y-6">
      <Section title="Patient & encounter">
        <div className="grid grid-cols-2 gap-3">
          <L label="Patient ID">
            <Input value={draft.patientId} onChange={(e)=>set('patientId', e.target.value)} placeholder="PAT-00123" />
          </L>
          <L label="Encounter ID">
            <Input value={draft.encounterId ?? ''} onChange={(e)=>set('encounterId', e.target.value)} placeholder="ENC-..." />
          </L>
          <L label="Clinic ID">
            <Input value={draft.clinicId ?? ''} onChange={(e)=>set('clinicId', e.target.value)} placeholder="CLN-..." />
          </L>
          <div className="grid grid-cols-2 gap-3">
            <L label="DOS From"><Input type="date" value={draft.dateOfServiceFrom} onChange={(e)=>set('dateOfServiceFrom', e.target.value)} /></L>
            <L label="DOS To"><Input type="date" value={draft.dateOfServiceTo ?? ''} onChange={(e)=>set('dateOfServiceTo', e.target.value)} /></L>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ---------- Step 2: Coverage & payer ---------- */
export function StepCoverage({ draft, set }: { draft: ClaimDraft; set: <K extends keyof ClaimDraft>(k:K,v:ClaimDraft[K])=>void; }) {
  return (
    <div className="space-y-6">
      <Section title="Coverage & payer">
        <div className="grid grid-cols-2 gap-3">
          <L label="Payer name"><Input value={draft.payerName} onChange={(e)=>set('payerName', e.target.value)} placeholder="United Healthcare" /></L>
          <L label="Payer ID"><Input value={draft.payerId ?? ''} onChange={(e)=>set('payerId', e.target.value)} placeholder="UHC-001" /></L>
          <L label="Member ID"><Input value={draft.memberId} onChange={(e)=>set('memberId', e.target.value)} placeholder="MBR-..." /></L>
          <L label="Plan ID"><Input value={draft.planId ?? ''} onChange={(e)=>set('planId', e.target.value)} placeholder="PLAN-..." /></L>
        </div>
      </Section>
    </div>
  );
}

/* ---------- Step 3: Services & charges (BNPL math lives here) ---------- */
export function StepServices({
  draft, set, derived
}: { draft: ClaimDraft; set: <K extends keyof ClaimDraft>(k:K,v:ClaimDraft[K])=>void; derived: { gross:number; payer:number; patient:number; financed:number } }) {
  function updateLine(idx: number, patch: Partial<ClaimLine>) {
    const next = draft.lines.slice();
    next[idx] = { ...next[idx], ...patch };
    set('lines', next);
  }
  function addLine() {
    set('lines', [...draft.lines, { cpt:'', units:1, charge:0 } as ClaimLine]);
  }
  function removeLine(i:number) {
    const next = draft.lines.slice(); next.splice(i,1); set('lines', next);
  }

  return (
    <div className="space-y-6">
      <Section title="Diagnosis (ICD-10)">
        <TagEditor
          values={draft.diagnosisCodes}
          onAdd={(v)=>set('diagnosisCodes', [...draft.diagnosisCodes, v])}
          onRemove={(i)=>set('diagnosisCodes', draft.diagnosisCodes.filter((_,idx)=>idx!==i))}
          placeholder="E11.9"
        />
      </Section>

      <Section title="Line items (CPT/HCPCS)">
        <div className="space-y-3">
          {draft.lines.map((ln, i) => (
            <div key={i} className="grid grid-cols-[130px_1fr_120px_120px_40px] gap-2 items-center">
              <Input placeholder="CPT" value={ln.cpt} onChange={(e)=>updateLine(i,{ cpt:e.target.value })} />
              <Input placeholder="Description" value={ln.description ?? ''} onChange={(e)=>updateLine(i,{ description:e.target.value })} />
              <Input type="number" placeholder="Units" value={ln.units} onChange={(e)=>updateLine(i,{ units: Number(e.target.value) })} />
              <Input type="number" placeholder="Charge" value={ln.charge} onChange={(e)=>updateLine(i,{ charge: Number(e.target.value) })} />
              <button className="p-2 rounded-md hover:bg-gray-100" onClick={()=>removeLine(i)}><Trash2 className="h-4 w-4 text-gray-600" /></button>
            </div>
          ))}
          <Button variant="outline" onClick={addLine} className="h-8"><Plus className="h-4 w-4 mr-1" /> Add line</Button>
        </div>
      </Section>

      <Section title="BNPL summary (auto-computed)">
        <div className="grid grid-cols-4 gap-3 text-[13px]">
          <Stat label="Gross charges" value={currency(derived.gross)} />
          <Stat label="Payer responsibility" value={currency(derived.payer)} />
          <Stat label="Patient responsibility" value={currency(derived.patient)} />
          <Stat label="Financed portion" value={currency(derived.financed)} />
        </div>
      </Section>
    </div>
  );
}

/* ---------- Step 4: Attachments & notes ---------- */
export function StepAttachments({ draft, set }: { draft: ClaimDraft; set: <K extends keyof ClaimDraft>(k:K,v:ClaimDraft[K])=>void; }) {
  function add(kind: 'clinical'|'authorization'|'other', f: File) {
    const id = `${Date.now()}-${f.name}`;
    const next = [...(draft.attachments ?? []), { id, name: f.name, kind }];
    set('attachments', next);
  }
  return (
    <div className="space-y-6">
      <Section title="Upload documents">
        <Uploader label="Clinical notes" onFile={(f)=>add('clinical', f)} />
        <Uploader label="Authorization" onFile={(f)=>add('authorization', f)} />
        <Uploader label="Other" onFile={(f)=>add('other', f)} />
        <div className="mt-3 flex gap-2 flex-wrap">
          {(draft.attachments ?? []).map(a => <Badge key={a.id} className="rounded-md">{a.kind}: {a.name}</Badge>)}
        </div>
      </Section>

      <Section title="Internal notes">
        <Textarea value={draft.notes ?? ''} onChange={(e)=>set('notes', e.target.value)} placeholder="Anything reviewers should know…" />
      </Section>
    </div>
  );
}

/* ---------- Step 5: Review & submit ---------- */
export function StepReview({
  draft, derived, onSubmit
}: { draft: ClaimDraft; derived:{gross:number;payer:number;patient:number;financed:number}; onSubmit: ()=>void }) {
  return (
    <div className="space-y-6">
      <Section title="Overview">
        <ul className="text-[13px] text-gray-700 space-y-1">
          <li><b>Patient:</b> {draft.patientId}  • <b>DOS:</b> {draft.dateOfServiceFrom}{draft.dateOfServiceTo ? `–${draft.dateOfServiceTo}`:''}</li>
          <li><b>Payer:</b> {draft.payerName}  • <b>Member:</b> {draft.memberId}</li>
          <li><b>Clinic:</b> {draft.clinicId ?? 'N/A'}</li>
        </ul>
      </Section>
      <Section title="Totals">
        <div className="grid grid-cols-4 gap-3 text-[13px]">
          <Stat label="Gross charges" value={currency(derived.gross)} />
          <Stat label="Payer responsibility" value={currency(derived.payer)} />
          <Stat label="Patient responsibility" value={currency(derived.patient)} />
          <Stat label="Financed portion" value={currency(derived.financed)} />
        </div>
      </Section>
      <div className="pt-2">
        <Button onClick={onSubmit}>Submit claim</Button>
      </div>
    </div>
  );
}

/* ---------- small atoms ---------- */
function Section({ title, children }:{ title:string; children:React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#e7e4db] bg-white p-4">
      <div className="text-[13px] font-semibold text-gray-900 mb-3">{title}</div>
      {children}
    </div>
  );
}
function L({ label, children }:{ label:string; children:React.ReactNode }) {
  return <label className="flex flex-col gap-1 text-[12px] text-gray-700">{label}{children}</label>;
}
function Uploader({ label, onFile }:{ label:string; onFile:(f:File)=>void }) {
  return (
    <label className="inline-flex items-center gap-2 text-[13px] px-3 py-2 rounded-md border cursor-pointer hover:bg-gray-50">
      <input type="file" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if (f) onFile(f); }} />
      <Plus className="h-4 w-4" /> {label}
    </label>
  );
}
function TagEditor({ values, onAdd, onRemove, placeholder }:{
  values:string[]; onAdd:(v:string)=>void; onRemove:(i:number)=>void; placeholder:string;
}) {
  const [t, setT] = React.useState('');
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-2">
        {values.map((v,i)=>(
          <Badge key={i} className="rounded-md">
            {v}
            <button className="ml-1" onClick={()=>onRemove(i)}>×</button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={t} onChange={(e)=>setT(e.target.value)} placeholder={placeholder} className="max-w-[240px]" />
        <Button variant="outline" className="h-8" onClick={()=>{ if (t.trim()) { onAdd(t.trim()); setT(''); } }}>Add</Button>
      </div>
    </div>
  );
}
function Stat({ label, value }:{ label:string; value:string }) {
  return (
    <div className="rounded-lg border bg-[#faf9f6] px-3 py-2">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="text-[14px] font-semibold text-gray-900">{value}</div>
    </div>
  );
}
const currency = (n:number)=> new Intl.NumberFormat(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
