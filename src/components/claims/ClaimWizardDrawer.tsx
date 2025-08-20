"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Save,
  Send,
  UserPlus,
  Shield,
  DollarSign,
  Upload,
  CheckSquare,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClaimDraft, deriveTotals, validateForSubmit } from "./schemas/claims";
import {
  StepPatient,
  StepCoverage,
  StepServices,
  StepAttachments,
  StepReview,
} from "./ClaimWizardSteps";

type Mode = "create" | "edit";

export default function ClaimWizardDrawer({
  open,
  onClose,
  initial,
  onSubmitted,
  mode = "create",
}: {
  open: boolean;
  onClose: () => void;
  initial?: Partial<ClaimDraft>;
  onSubmitted?: (createdOrUpdated: ClaimDraft) => void;
  mode?: Mode;
}) {
  // tabs as wizard steps
  const [activeTab, setActiveTab] = useState<
    "patient" | "coverage" | "services" | "attachments" | "review"
  >("patient");

  // save states
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const savedTimerRef = useRef<number | null>(null);
  const dirtyRef = useRef(false); // used by autosave loop

  // draft
  const [draft, setDraft] = useState<ClaimDraft>(() => ({
    patientId: initial?.patientId ?? "",
    encounterId: initial?.encounterId,
    clinicId: initial?.clinicId,
    dateOfServiceFrom: initial?.dateOfServiceFrom ?? "",
    dateOfServiceTo: initial?.dateOfServiceTo,
    payerName: initial?.payerName ?? "",
    payerId: initial?.payerId,
    memberId: initial?.memberId ?? "",
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
    priority: initial?.priority ?? "normal",
    id: initial?.id,
  }));

  // guard against accidental close
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // mock autosave every 10s when dirty
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(async () => {
      if (!dirtyRef.current) return;
      setSaving(true);
      await new Promise((r) => setTimeout(r, 300)); // mock API
      setSaving(false);
      dirtyRef.current = false;
      setDirty(false);
      setJustSaved(true);
      if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
      savedTimerRef.current = window.setTimeout(() => setJustSaved(false), 1500);
    }, 10000);
    return () => {
      clearInterval(interval);
      if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
    };
  }, [open]);

  // field setter (marks dirty only on user edits)
  const set = <K extends keyof ClaimDraft>(key: K, value: ClaimDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setDirty(true);
    dirtyRef.current = true;
  };

  // totals
  const { gross, payer, patient, financed } = useMemo(
    () => deriveTotals(draft, {}),
    [draft]
  );

  // keep derived fields in sync without marking dirty
  useEffect(() => {
    setDraft((d) => ({
      ...d,
      expectedPayerResponsibility: payer,
      expectedPatientResponsibility: patient,
      financedPortion: financed,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payer, patient, financed]);

  // steps meta
  const STEPS = [
    { key: "patient", title: "Patient", valid: !!draft.patientId && !!draft.dateOfServiceFrom, icon: UserPlus },
    { key: "coverage", title: "Coverage", valid: !!draft.payerName && !!draft.memberId, icon: Shield },
    { key: "services", title: "Services", valid: draft.lines.length > 0 && draft.diagnosisCodes.length > 0, icon: DollarSign },
    { key: "attachments", title: "Docs", valid: true, icon: Upload },
    { key: "review", title: "Review", valid: true, icon: CheckSquare },
  ] as const;

  const issues = useMemo(() => validateForSubmit(draft), [draft]);

  const agingDays = useMemo(() => {
    if (!draft.dateOfServiceFrom) return undefined;
    const start = new Date(draft.dateOfServiceFrom).getTime();
    return Math.max(0, Math.floor((Date.now() - start) / 86400000));
  }, [draft.dateOfServiceFrom]);

  // manual save (header action)
  async function handleManualSave() {
    if (!dirtyRef.current) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300)); // mock API
    setSaving(false);
    dirtyRef.current = false;
    setDirty(false);
    setJustSaved(true);
    if (savedTimerRef.current) window.clearTimeout(savedTimerRef.current);
    savedTimerRef.current = window.setTimeout(() => setJustSaved(false), 1500);
  }

  // submit
  async function handleSubmit() {
    const errs = validateForSubmit(draft);
    if (errs.length) {
      const first = errs[0];
      if (first.field?.startsWith("patientId") || first.field?.includes("dateOfService"))
        setActiveTab("patient");
      else if (first.field?.includes("payer") || first.field?.includes("member"))
        setActiveTab("coverage");
      else if (first.field?.startsWith("lines") || first.field?.startsWith("diagnosis"))
        setActiveTab("services");
      else if (first.field?.startsWith("attachments"))
        setActiveTab("attachments");
      else setActiveTab("review");
      return;
    }
    if (dirtyRef.current) await handleManualSave(); // save before submit
    await new Promise((r) => setTimeout(r, 600)); // mock API
    onSubmitted?.(draft);
    onClose(); // Radix will animate out, then parent can clear state if needed
  }

  // helpers
  const formatCurrency = (amount: number | undefined) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount ?? 0);

  // ❗️Do NOT early-return null; keep the Sheet mounted for exit animations

  return (
    <Sheet open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
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
        {/* Header */}
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold text-gray-900">
                {mode === "create" ? "New Claim" : `Edit Claim ${draft.id ?? ""}`}
              </SheetTitle>
              <SheetDescription className="text-gray-600 mt-1">
                BNPL-aware claim submission
              </SheetDescription>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(gross)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="px-2 py-0.5 text-xs rounded-full border border-gray-200 bg-gray-50 text-gray-800">
                {mode === "create" ? "Draft" : "Editing"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Aging:</span>
              <span className="px-2 py-0.5 text-xs rounded-full border border-gray-200 bg-gray-50 text-gray-800">
                {agingDays === undefined ? "—" : `${agingDays}d`}
              </span>
            </div>

            {/* Save state chips */}
            {saving && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[12px] text-gray-700">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving…
              </span>
            )}
            {!saving && dirty && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-[12px] text-amber-800">
                Unsaved changes
              </span>
            )}
            {!saving && !dirty && justSaved && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-[12px] text-emerald-800">
                Saved
              </span>
            )}

            <div className="ml-auto flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleManualSave}>
                <Save className="w-4 h-4 mr-2" />
                Save draft
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={saving}>
                <Send className="w-4 h-4 mr-2" />
                Submit claim
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Tabs as segmented wizard */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 border-2 border-gray-200 pb-8">
            {STEPS.map(({ key, title, valid, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-1">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{title}</span>
                {!valid && (
                  <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="patient">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <StepPatient draft={draft} set={set} />
              </div>
            </TabsContent>

            <TabsContent value="coverage">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <StepCoverage draft={draft} set={set} />
              </div>
            </TabsContent>

            <TabsContent value="services">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <StepServices
                  draft={draft}
                  set={set}
                  derived={{ gross, payer, patient, financed }}
                />
              </div>
            </TabsContent>

            <TabsContent value="attachments">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <StepAttachments draft={draft} set={set} />
              </div>
            </TabsContent>

            <TabsContent value="review">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                {issues.length > 0 && (
                  <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4 text-[13px] text-orange-800">
                    <div className="font-medium">Action Required</div>
                    <div className="mt-1 opacity-90">
                      {issues.length} {issues.length === 1 ? "issue" : "issues"} must be fixed before submission.
                    </div>
                  </div>
                )}
                <StepReview
                  draft={draft}
                  derived={{ gross, payer, patient, financed }}
                  onSubmit={handleSubmit}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Sticky wizard footer */}
        <div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-[12px] text-gray-600">
              Step {STEPS.findIndex((s) => s.key === activeTab) + 1} of {STEPS.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8"
                onClick={() => {
                  const i = STEPS.findIndex((s) => s.key === activeTab);
                  const next = Math.max(0, i - 1);
                  setActiveTab(STEPS[next].key as any);
                }}
                disabled={STEPS.findIndex((s) => s.key === activeTab) === 0}
              >
                Back
              </Button>

              {/* Cancel closes via Radix → plays exit animation */}
              <SheetClose asChild>
                <Button variant="outline" className="h-8">Cancel</Button>
              </SheetClose>

              {STEPS.findIndex((s) => s.key === activeTab) < STEPS.length - 1 ? (
                <Button
                  className="h-8"
                  onClick={() => {
                    const i = STEPS.findIndex((s) => s.key === activeTab);
                    const next = Math.min(STEPS.length - 1, i + 1);
                    setActiveTab(STEPS[next].key as any);
                  }}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="h-8" onClick={handleSubmit} disabled={saving || issues.length > 0}>
                  {issues.length > 0 ? `${issues.length} issue(s) remaining` : "Submit claim"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
