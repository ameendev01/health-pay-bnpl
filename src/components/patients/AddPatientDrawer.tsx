"use client";

import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

type Risk = "Urgent" | "Normal" | "Low";
type Status = "In Treatment" | "Repaying" | "Delinquent";

export type NewPatientDraft = {
  name: string;
  clinic: string;
  procedure: string;
  phone?: string;
  email?: string;
  address?: string;
  risk: Risk;
  status: Status;

  planAmount?: number;
  monthlyAmount?: number;
  firstPaymentDate?: string; // ISO
  deposit?: number;
};

export function AddPatientDrawer({
  open,
  onClose,
  clinics,
  onCreate,
  defaultClinic,
}: {
  open: boolean;
  onClose: () => void;
  clinics: string[];
  onCreate?: (draft: NewPatientDraft) => Promise<void> | void;
  defaultClinic?: string;
}) {
  const [tab, setTab] = useState<"identity" | "contact" | "plan" | "review">(
    "identity"
  );
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<NewPatientDraft>({
    name: "",
    clinic: defaultClinic ?? "",
    procedure: "",
    phone: "",
    email: "",
    address: "",
    risk: "Normal",
    status: "In Treatment",
    planAmount: undefined,
    monthlyAmount: undefined,
    firstPaymentDate: undefined,
    deposit: undefined,
  });

  const set = <K extends keyof NewPatientDraft>(k: K, v: NewPatientDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const issues = useMemo(() => {
    const errs: string[] = [];
    if (!draft.name.trim()) errs.push("Name is required");
    if (!draft.clinic.trim()) errs.push("Clinic is required");
    if (!draft.procedure.trim()) errs.push("Procedure is required");
    if (draft.planAmount !== undefined && draft.planAmount < 0)
      errs.push("Plan amount must be >= 0");
    if (draft.monthlyAmount !== undefined && draft.monthlyAmount < 0)
      errs.push("Monthly amount must be >= 0");
    return errs;
  }, [draft]);

  async function handleCreate() {
    if (issues.length) {
      setTab("review");
      return;
    }
    setSaving(true);
    try {
      await onCreate?.(draft);
      onClose(); // Radix animates out
    } finally {
      setSaving(false);
    }
  }

  const planSummary = useMemo(() => {
    const total = draft.planAmount ?? 0;
    const deposit = draft.deposit ?? 0;
    const monthly = draft.monthlyAmount ?? 0;
    const remaining = Math.max(0, total - deposit);
    const months = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
    return { total, deposit, monthly, remaining, months };
  }, [draft.planAmount, draft.deposit, draft.monthlyAmount]);

  const money = (n: number) =>
    Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <SheetContent
        forceMount
        side="right"
        className="
          top-4 bottom-4 right-4
          h-auto max-h-[calc(100vh-2rem)]
          w-[min(calc(100vw-2rem),40rem)]
          max-w-none sm:!max-w-none
          overflow-y-auto rounded-xl
          data-[state=open]:duration-300 data-[state=closed]:duration-300
        "
      >
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold text-gray-900">
                Add patient
              </SheetTitle>
              <SheetDescription className="text-gray-600 mt-1">
                Create a patient and set up a BNPL plan.
              </SheetDescription>
            </div>
            {/* <SheetClose asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose> */}
          </div>
        </SheetHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="w-full"
        >
          <TabsList className="mx-4 grid w-[calc(100%-2rem)] grid-cols-4 bg-gray-100 border-2 border-gray-200 pb-8">
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <div className="mt-6 px-4">
            <TabsContent value="identity">
              <Card>
                <Field label="Name" required>
                  <Input
                    value={draft.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Patient full name"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Clinic" required>
                    <Select
                      value={draft.clinic}
                      onValueChange={(v) => set("clinic", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select clinic" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinics.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Procedure" required>
                    <Input
                      value={draft.procedure}
                      onChange={(e) => set("procedure", e.target.value)}
                      placeholder="e.g., LASIK"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Status">
                    <Select
                      value={draft.status}
                      onValueChange={(v) => set("status", v as Status)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Treatment">
                          In Treatment
                        </SelectItem>
                        <SelectItem value="Repaying">Repaying</SelectItem>
                        <SelectItem value="Delinquent">Delinquent</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Risk">
                    <Select
                      value={draft.risk}
                      onValueChange={(v) => set("risk", v as Risk)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phone">
                    <Input
                      value={draft.phone ?? ""}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+1 555 0100"
                    />
                  </Field>
                  <Field label="Email">
                    <Input
                      value={draft.email ?? ""}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="name@example.com"
                    />
                  </Field>
                </div>
                <Field label="Address">
                  <Input
                    value={draft.address ?? ""}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Street, City, State"
                  />
                </Field>
              </Card>
            </TabsContent>

            <TabsContent value="plan">
              <Card>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Plan amount">
                    <Input
                      type="number"
                      value={draft.planAmount ?? ""}
                      onChange={(e) =>
                        set(
                          "planAmount",
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </Field>
                  <Field label="Deposit (optional)">
                    <Input
                      type="number"
                      value={draft.deposit ?? ""}
                      onChange={(e) =>
                        set(
                          "deposit",
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Monthly amount">
                    <Input
                      type="number"
                      value={draft.monthlyAmount ?? ""}
                      onChange={(e) =>
                        set(
                          "monthlyAmount",
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </Field>
                  <Field label="First payment date">
                    <Input
                      type="date"
                      value={draft.firstPaymentDate ?? ""}
                      onChange={(e) =>
                        set("firstPaymentDate", e.target.value || undefined)
                      }
                    />
                  </Field>
                </div>

                {/* Derived summary */}
                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-[13px]">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-medium">
                      {money(planSummary.total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposit</span>
                    <span className="font-medium">
                      {money(planSummary.deposit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining</span>
                    <span className="font-medium">
                      {money(planSummary.remaining)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated months</span>
                    <span className="font-medium">{planSummary.months}</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="review">
              <Card>
                {issues.length ? (
                  <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-[13px] text-orange-800">
                    <div className="font-medium">
                      Please fix before creating:
                    </div>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      {issues.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mb-4 text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    Looks good — ready to create.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <ReviewRow k="Name" v={draft.name || "—"} />
                  <ReviewRow k="Clinic" v={draft.clinic || "—"} />
                  <ReviewRow k="Procedure" v={draft.procedure || "—"} />
                  <ReviewRow k="Status" v={draft.status} />
                  <ReviewRow k="Risk" v={draft.risk} />
                  <ReviewRow k="Phone" v={draft.phone || "—"} />
                  <ReviewRow k="Email" v={draft.email || "—"} />
                  <ReviewRow
                    k="Plan amount"
                    v={
                      draft.planAmount !== undefined
                        ? money(draft.planAmount)
                        : "—"
                    }
                  />
                  <ReviewRow
                    k="Deposit"
                    v={draft.deposit !== undefined ? money(draft.deposit) : "—"}
                  />
                  <ReviewRow
                    k="Monthly"
                    v={
                      draft.monthlyAmount !== undefined
                        ? money(draft.monthlyAmount)
                        : "—"
                    }
                  />
                  <ReviewRow
                    k="First payment"
                    v={
                      draft.firstPaymentDate
                        ? new Date(draft.firstPaymentDate).toLocaleDateString()
                        : "—"
                    }
                  />
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <SheetFooter className="mt-6 px-4">
          <SheetClose asChild>
            <Button variant="outline" className="mr-auto">
              Cancel
            </Button>
          </SheetClose>
          <Button onClick={handleCreate} disabled={saving || !!issues.length}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating…
              </>
            ) : (
              "Create patient"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      {children}
    </div>
  );
}
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[13px]">
      <div className="mb-1 text-gray-700">
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </div>
      {children}
    </label>
  );
}
function ReviewRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b last:border-0 py-1.5">
      <span className="text-gray-500">{k}</span>
      <span className="text-gray-800">{v}</span>
    </div>
  );
}
