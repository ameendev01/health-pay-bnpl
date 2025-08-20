"use client";

import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bell, PauseCircle, PlayCircle, Download, Pencil, UserPlus,
  FileText, Upload, MessageSquare, Activity, CreditCard
} from "lucide-react";

type Risk = "Urgent" | "Normal" | "Low";
type Status = "In Treatment" | "Repaying" | "Delinquent";
type TeamMember = { name: string; initials: string; avatar?: string };

export type Patient = {
  id: string;
  name: string;
  avatar?: string;
  clinic: string;
  procedure: string;
  planAmount: number;
  balance: number;
  nextPayment: string; // ISO
  risk: Risk;
  progress: number; // 0-100
  status: Status;
  team: TeamMember[];

  // Optional extended details for tabs
  phone?: string;
  email?: string;
  dob?: string;
  gender?: string;
  address?: string;
  notes?: string;
  documents?: { id: string; name: string; uploadedAt: string }[];
  payments?: { id: string; date: string; amount: number; method?: string }[];
  activity?: { id: string; at: string; text: string }[];
};

const STATUS_STYLES: Record<Status, { pill: string }> = {
  "In Treatment": { pill: "bg-blue-500/10 border-blue-500/30 border text-blue-700" },
  "Repaying":     { pill: "bg-emerald-500/10 border-emerald-500/30 border text-emerald-700" },
  "Delinquent":   { pill: "bg-rose-500/10 border-rose-500/30 border text-rose-700" },
};

const riskBadge = (r: Risk) => {
  if (r === "Urgent")  return <Badge className="rounded-md bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]">Urgent</Badge>;
  if (r === "Normal")  return <Badge className="rounded-md bg-[#e0f2fe] text-[#075985] border border-[#bae6fd]">Normal</Badge>;
  return                 <Badge className="rounded-md bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">Low</Badge>;
};

const money = (n: number) =>
  Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function PatientDetailsDrawer({
  open,
  onClose,
  patient,
  onAssign,
  onRemind,
  onPause,
  onResume,
  onExport,
  onAddNote,
  onUploadDocs,
}: {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
  onAssign?: (p: Patient) => void;
  onRemind?: (p: Patient) => void;
  onPause?: (p: Patient) => void;
  onResume?: (p: Patient) => void;
  onExport?: (p: Patient) => void;
  onAddNote?: (p: Patient) => void;
  onUploadDocs?: (p: Patient) => void;
}) {
  const [tab, setTab] = useState<"overview"|"plan"|"payments"|"activity"|"notes"|"docs">("overview");
  const statusStyle = useMemo(() => patient ? STATUS_STYLES[patient.status] : STATUS_STYLES["In Treatment"], [patient]);

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
          data-[state=open]:duration-300 data-[state=closed]:duration-300
        "
      >
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <Avatar className="h-9 w-9 rounded-md ring-1 ring-black/5">
                {patient?.avatar ? (
                  <AvatarImage src={patient.avatar} alt={patient?.name || "Patient"} />
                ) : (
                  <AvatarFallback>{patient?.name?.slice(0,2) ?? "PT"}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <SheetTitle className="text-xl font-semibold text-gray-900">
                  {patient ? patient.name : "Patient"}
                </SheetTitle>
                <SheetDescription className="text-gray-600 mt-1">
                  {patient ? `#${patient.id} • ${patient.clinic} • ${patient.procedure}` : "—"}
                </SheetDescription>
              </div>
            </div>

            {/* <SheetClose asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose> */}
          </div>

          {/* Quick info row */}
          {patient && (
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
              <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-[12px] ${statusStyle.pill}`}>
                <span>{patient.status}</span>
              </span>
              {riskBadge(patient.risk)}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-gray-600">Next payment:</span>
                <span className="font-medium text-gray-900">
                  {new Date(patient.nextPayment).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Balance:</span>
                <span className="font-semibold text-gray-900">{money(patient.balance)}</span>
              </div>

              {/* Quick actions (right aligned) */}
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => patient && onAssign?.(patient)}>
                  <UserPlus className="w-4 h-4 mr-2" /> Assign
                </Button>
                <Button variant="outline" size="sm" onClick={() => patient && onRemind?.(patient)}>
                  <Bell className="w-4 h-4 mr-2" /> Remind
                </Button>
                {patient?.status === "Delinquent" ? (
                  <Button variant="outline" size="sm" onClick={() => patient && onPause?.(patient)}>
                    <PauseCircle className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => patient && onResume?.(patient)}>
                    <PlayCircle className="w-4 h-4 mr-2" /> Resume
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => patient && onExport?.(patient)}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Body */}
        <div className="px-0">
          {/* Progress snapshot */}
          {patient && (
            <div className="px-4 -mt-2 mb-4">
              <div className="flex items-center gap-2">
                <Progress value={patient.progress} className="h-2 bg-[#ecf0f3]" indicatorClassName="bg-[#2563EB]" />
                <span className="w-10 text-right text-[12px] text-gray-600">{patient.progress}%</span>
              </div>
            </div>
          )}

          <Tabs value={tab} onValueChange={(v)=>setTab(v as any)} className="w-full">
            <TabsList className="mx-4 grid w-[calc(100%-2rem)] grid-cols-6 bg-gray-100 border-2 border-gray-200 pb-8">
              <TabsTrigger value="overview"  className="flex items-center gap-1"><FileText className="w-4 h-4"/>Overview</TabsTrigger>
              <TabsTrigger value="plan"      className="flex items-center gap-1"><Pencil className="w-4 h-4"/>Plan</TabsTrigger>
              <TabsTrigger value="payments"  className="flex items-center gap-1"><CreditCard className="w-4 h-4"/>Payments</TabsTrigger>
              <TabsTrigger value="activity"  className="flex items-center gap-1"><Activity className="w-4 h-4"/>Activity</TabsTrigger>
              <TabsTrigger value="notes"     className="flex items-center gap-1"><MessageSquare className="w-4 h-4"/>Notes</TabsTrigger>
              <TabsTrigger value="docs"      className="flex items-center gap-1"><Upload className="w-4 h-4"/>Docs</TabsTrigger>
            </TabsList>

            <div className="mt-6 px-4">
              <TabsContent value="overview">
                <div className="space-y-4">
                  <Section title="Patient">
                    <InfoRow label="Name" value={patient?.name ?? "—"} />
                    <InfoRow label="ID" value={patient ? `#${patient.id}` : "—"} />
                    <InfoRow label="Clinic" value={patient?.clinic ?? "—"} />
                    <InfoRow label="Procedure" value={patient?.procedure ?? "—"} />
                  </Section>

                  <Section title="Contact">
                    <InfoRow label="Phone" value={patient?.phone ?? "—"} />
                    <InfoRow label="Email" value={patient?.email ?? "—"} />
                    <InfoRow label="Address" value={patient?.address ?? "—"} />
                  </Section>

                  <Section title="Team">
                    <div className="flex flex-wrap gap-2">
                      {patient?.team?.map((t, i) => (
                        <span key={i} className="text-[12px] px-2 py-0.5 rounded-md border border-[#e7e4db] bg-[#faf9f6] text-gray-700">
                          {t.initials} — {t.name}
                        </span>
                      )) ?? "—"}
                    </div>
                  </Section>
                </div>
              </TabsContent>

              <TabsContent value="plan">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <InfoRow label="Plan amount" value={patient ? money(patient.planAmount) : "—"} />
                    <InfoRow label="Balance" value={patient ? money(patient.balance) : "—"} />
                    <InfoRow label="Next payment" value={patient ? new Date(patient.nextPayment).toLocaleDateString() : "—"} />
                    <InfoRow label="Status" value={patient?.status ?? "—"} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  {!patient?.payments?.length ? (
                    <div className="text-[13px] text-gray-600">No payments recorded.</div>
                  ) : (
                    <div className="space-y-2 text-[13px]">
                      {patient.payments.map(p => (
                        <div key={p.id} className="flex items-center justify-between border-b last:border-0 py-2">
                          <span>{new Date(p.date).toLocaleDateString()} • {p.method ?? "—"}</span>
                          <span className="font-medium">{money(p.amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  {!patient?.activity?.length ? (
                    <div className="text-[13px] text-gray-600">No activity yet.</div>
                  ) : (
                    <ol className="relative border-s ps-6 space-y-3">
                      {patient.activity.map(a => (
                        <li key={a.id}>
                          <div className="absolute -start-1.5 mt-1.5 h-2 w-2 rounded-full bg-gray-400" />
                          <div className="text-[12px] text-gray-500">{new Date(a.at).toLocaleString()}</div>
                          <div className="text-[13px] text-gray-800">{a.text}</div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 text-[13px] text-gray-600">
                    Internal notes visible to your team.
                  </div>
                  <textarea
                    defaultValue={patient?.notes ?? ""}
                    className="w-full h-32 rounded-md border px-3 py-2 text-[13px] ring-1 ring-inset ring-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Add a note…"
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={() => patient && onAddNote?.(patient)}>
                      Save note
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="docs">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-[13px] text-gray-600">Patient documents</div>
                    <Button variant="outline" size="sm" onClick={() => patient && onUploadDocs?.(patient)}>
                      <Upload className="w-4 h-4 mr-2" /> Upload
                    </Button>
                  </div>
                  {!patient?.documents?.length ? (
                    <div className="text-[13px] text-gray-600">No documents uploaded.</div>
                  ) : (
                    <ul className="space-y-2 text-[13px]">
                      {patient.documents.map(d => (
                        <li key={d.id} className="flex items-center justify-between border rounded-md px-3 py-2">
                          <span>{d.name}</span>
                          <span className="text-gray-500">{new Date(d.uploadedAt).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <SheetFooter className="mt-6 px-4">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 mb-4">
      <div className="text-[13px] font-semibold text-gray-900 mb-3">{title}</div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <div className="text-[12px] text-gray-500">{label}</div>
      <div className="text-[13px] text-gray-800">{value}</div>
    </div>
  );
}
