"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  FileText,
  AlertTriangle,
  Shield,
  Pencil,
  Eye,
  Bell,
  PauseCircle,
  PlayCircle,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// ---- Types ----
type Risk = "Urgent" | "Normal" | "Low";
type Status = "In Treatment" | "Repaying" | "Delinquent";
const STATUS_STYLES = {
  "In Treatment": {
    pill: "bg-blue-500/10 border-blue-500/30 border-[1.5px] text-blue-700",
    icon: "text-blue-600",
  },
  Repaying: {
    pill: "bg-emerald-500/10 border-emerald-500/30 border-[1.5px] text-emerald-700",
    icon: "text-emerald-600",
  },
  Delinquent: {
    pill: "bg-rose-500/10 border-rose-500/30 border-[1.5px] text-rose-700",
    icon: "text-rose-600",
  },
} satisfies Record<Status, { pill: string; icon: string }>;

type PatientRow = {
  id: string;
  name: string;
  avatar?: string;
  clinic: string;
  procedure: string;
  planAmount: number;
  balance: number;
  nextPayment: string; // ISO or friendly date
  risk: Risk;
  progress: number; // 0-100
  status: Status;
  team: { name: string; avatar?: string; initials: string }[];
};

// ---- Mock data (wire it to your data later) ----
const rows: PatientRow[] = [
  {
    id: "HP-0005",
    name: "Omar Hassan",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "City Vision",
    procedure: "LASIK",
    planAmount: 2600,
    balance: 1100,
    nextPayment: "2025-08-23",
    risk: "Normal",
    progress: 72,
    status: "Repaying",
    team: [
      { name: "Dr. Noor", initials: "DN" },
      { name: "Care: Sana", initials: "SN" },
    ],
  },
  {
    id: "HP-0006",
    name: "Priya Singh",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "OrthoPlus",
    procedure: "Knee Replacement (Pre-Op)",
    planAmount: 6800,
    balance: 6800,
    nextPayment: "2025-08-25",
    risk: "Low",
    progress: 8,
    status: "In Treatment",
    team: [
      { name: "Dr. Arora", initials: "DA" },
      { name: "CM: Bilal", initials: "BL" },
    ],
  },
  {
    id: "HP-0007",
    name: "Ahmed Bukhari",
    avatar:
      "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "SmileWorks East",
    procedure: "Root Canal",
    planAmount: 1800,
    balance: 400,
    nextPayment: "2025-08-21",
    risk: "Low",
    progress: 60,
    status: "Repaying",
    team: [{ name: "Dr. Saeed", initials: "DS" }],
  },
  {
    id: "HP-0008",
    name: "Noor Fatima",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Heart Health Specialists",
    procedure: "Hypertension Management",
    planAmount: 2400,
    balance: 1400,
    nextPayment: "2025-08-27",
    risk: "Normal",
    progress: 35,
    status: "In Treatment",
    team: [
      { name: "Care: Zara", initials: "ZA" },
      { name: "Dr. Patel", initials: "DP" },
    ],
  },
  {
    id: "HP-0009",
    name: "Daniel Kim",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Metro Ortho",
    procedure: "Shoulder Arthroscopy",
    planAmount: 5200,
    balance: 5200,
    nextPayment: "2025-09-01",
    risk: "Urgent",
    progress: 5,
    status: "Delinquent",
    team: [{ name: "Dr. Lee", initials: "DL" }],
  },
  {
    id: "HP-0010",
    name: "Aisha Khan",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Sunrise Dental Care",
    procedure: "Crowns & Bridges",
    planAmount: 3400,
    balance: 900,
    nextPayment: "2025-08-24",
    risk: "Low",
    progress: 78,
    status: "Repaying",
    team: [
      { name: "Dr. Chen", initials: "MC" },
      { name: "CM: Hira", initials: "HR" },
    ],
  },
  {
    id: "HP-0011",
    name: "Jacob Miller",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "City Vision",
    procedure: "Cataract Surgery",
    planAmount: 4300,
    balance: 2500,
    nextPayment: "2025-08-30",
    risk: "Normal",
    progress: 41,
    status: "In Treatment",
    team: [
      { name: "Dr. Noor", initials: "DN" },
      { name: "Nurse: Haleema", initials: "HA" },
    ],
  },
  {
    id: "HP-0012",
    name: "Sofia Alvarez",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "SmileWorks",
    procedure: "Veneers",
    planAmount: 6200,
    balance: 3100,
    nextPayment: "2025-08-26",
    risk: "Normal",
    progress: 54,
    status: "Repaying",
    team: [{ name: "Dr. Ray", initials: "DR" }],
  },
  {
    id: "HP-0013",
    name: "Hasan Raza",
    avatar:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "CardioCare Clinic",
    procedure: "Stent Follow-up",
    planAmount: 7500,
    balance: 6200,
    nextPayment: "2025-08-20",
    risk: "Urgent",
    progress: 18,
    status: "Delinquent",
    team: [
      { name: "Dr. Patel", initials: "DP" },
      { name: "Care: Omar", initials: "OM" },
    ],
  },
  {
    id: "HP-0014",
    name: "Emily Johnson",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Metro Ortho",
    procedure: "Ankle Rehab",
    planAmount: 2100,
    balance: 600,
    nextPayment: "2025-09-02",
    risk: "Low",
    progress: 66,
    status: "In Treatment",
    team: [{ name: "Physio: Zara", initials: "ZA" }],
  },
  {
    id: "HP-0015",
    name: "Zainab Ali",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "DermaCare",
    procedure: "Acne Treatment",
    planAmount: 1200,
    balance: 300,
    nextPayment: "2025-08-23",
    risk: "Low",
    progress: 78,
    status: "Repaying",
    team: [{ name: "Dr. Farah", initials: "DF" }],
  },
  {
    id: "HP-0016",
    name: "Michael Brown",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Metro Ortho",
    procedure: "Spinal Physiotherapy",
    planAmount: 3500,
    balance: 3500,
    nextPayment: "2025-08-21",
    risk: "Urgent",
    progress: 6,
    status: "Delinquent",
    team: [{ name: "Dr. Lee", initials: "DL" }],
  },
  {
    id: "HP-0017",
    name: "Hira Saeed",
    avatar:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",

    clinic: "Sunrise Dental Care",
    procedure: "Wisdom Tooth Extraction",
    planAmount: 900,
    balance: 450,
    nextPayment: "2025-08-31",
    risk: "Normal",
    progress: 40,
    status: "Repaying",
    team: [
      { name: "Dr. Chen", initials: "MC" },
      { name: "CM: Hira", initials: "HR" },
    ],
  },
  {
    id: "HP-0018",
    name: "Thomas Nguyen",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "City Vision",
    procedure: "PRK",
    planAmount: 2800,
    balance: 2100,
    nextPayment: "2025-09-05",
    risk: "Normal",
    progress: 25,
    status: "In Treatment",
    team: [
      { name: "Dr. Noor", initials: "DN" },
      { name: "Care: Sana", initials: "SN" },
    ],
  },
  {
    id: "HP-0019",
    name: "Fatima Zahra",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    clinic: "Heart Health Specialists",
    procedure: "Diabetes Management",
    planAmount: 3000,
    balance: 600,
    nextPayment: "2025-08-22",
    risk: "Urgent",
    progress: 80,
    status: "Repaying",
    team: [
      { name: "Care: Omar", initials: "OM" },
      { name: "Dr. Patel", initials: "DP" },
    ],
  },
];

// ---- Helpers ----
const riskBadge = (r: Risk) => {
  switch (r) {
    case "Urgent":
      return (
        <Badge className="rounded-md bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]">
          Urgent
        </Badge>
      );
    case "Normal":
      return (
        <Badge className="rounded-md bg-[#e0f2fe] text-[#075985] border border-[#bae6fd]">
          Normal
        </Badge>
      );
    case "Low":
      return (
        <Badge className="rounded-md bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
          Low
        </Badge>
      );
  }
};

const money = (n: number) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// ---- Grouping like Notion sections ----
const groups: { label: Status; icon: React.ElementType; key: Status }[] = [
  { label: "In Treatment", icon: Shield, key: "In Treatment" },
  { label: "Repaying", icon: FileText, key: "Repaying" },
  { label: "Delinquent", icon: AlertTriangle, key: "Delinquent" },
];

export default function PatientsTable() {
  const [collapsed, setCollapsed] = useState<Record<Status, boolean>>({
    "In Treatment": false,
    Repaying: false,
    Delinquent: false,
  });

  const grouped = useMemo(() => {
    const by: Record<Status, PatientRow[]> = {
      "In Treatment": [],
      Repaying: [],
      Delinquent: [],
    };
    rows.forEach((r) => by[r.status].push(r));
    return by;
  }, []);

  return (
    <div className="rounded-xl border border-[#e7e4db] bg-white shadow-sm overflow-hidden">
      {/* “View” tabs (Spreadsheet/Timeline/Calendar/Board) – visual parity only */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <div className="inline-flex items-center gap-1 text-[13px]">
          <span className="px-2 py-1 rounded-md border bg-[#f8fafc] text-gray-800">
            Spreadsheet
          </span>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">
            Timeline
          </button>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">
            Calendar
          </button>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">
            Board
          </button>
        </div>
        <div className="ml-auto">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" /> Add patient
          </Button>
        </div>
      </div>

      {/* Column header */}
      <div className="notion-header grid grid-cols-[minmax(220px,1.3fr)_1fr_.9fr_.9fr_.9fr_.7fr_.9fr_48px] gap-3 px-4 pt-4 pb-2 text-[12px] font-semibold text-gray-500">
        <div>Patient</div>
        <div>Description</div>
        <div>Clinic</div>
        <div>Next Payment</div>
        <div>Priority</div>
        <div>Progress</div>
        <div>Balance</div>
        <div className="text-right pr-1">⋯</div>
      </div>

      {/* Groups */}
      {groups.map(({ key, label, icon: Icon }) => {
        const list = grouped[key] || [];
        const isCollapsed = collapsed[key];
        const styles = STATUS_STYLES[key as Status];

        return (
          <div key={key} className="border-t border-[#ece9dd]">
            {/* Group header pill */}
            <button
              onClick={() => setCollapsed((s) => ({ ...s, [key]: !s[key] }))}
              className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50/70"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-2.5 py-1",
                  styles.pill,
                ].join(" ")}
              >
                <Icon className={["h-4 w-4", styles.icon].join(" ")} />
                <span>{label}</span>
                <span className="opacity-50">•</span>
                <span className="opacity-80">{list.length}</span>
              </span>
            </button>

            {/* Rows */}
            {!isCollapsed &&
              list.map((r) => (
                <div
                  key={r.id}
                  className="notion-row grid grid-cols-[minmax(220px,1.3fr)_1fr_.9fr_.9fr_.9fr_.7fr_.9fr_48px] gap-3 items-center px-4 py-3"
                >
                  {/* Patient (avatar, name, id + subline) */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 rounded-md ring-1 ring-black/5">
                      {r.avatar ? (
                        <AvatarImage src={r.avatar} alt={r.name} />
                      ) : (
                        <AvatarFallback>{r.name.slice(0, 2)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-[14px] text-gray-900 leading-5">
                        {r.name}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        #{r.id} • {r.procedure}
                      </div>
                    </div>
                  </div>

                  {/* Description (care team chips) */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {r.team.map((t, i) => (
                      <span
                        key={i}
                        className="text-[12px] px-2 py-0.5 rounded-md border border-[#e7e4db] bg-[#faf9f6] text-gray-700"
                      >
                        {t.initials} {t.name.includes(":") ? "" : ""}
                      </span>
                    ))}
                  </div>

                  {/* Clinic */}
                  <div className="text-[13px] text-gray-800">{r.clinic}</div>

                  {/* Next Payment */}
                  <div className="text-[13px] text-gray-800">
                    {new Date(r.nextPayment).toLocaleDateString()}
                  </div>

                  {/* Priority */}
                  <div>{riskBadge(r.risk)}</div>

                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    <div className="w-full">
                      <Progress
                        value={r.progress}
                        className="h-2 bg-[#ecf0f3]"
                        indicatorClassName="bg-[#2563EB]"
                      />
                    </div>
                    <span className="w-10 text-right text-[12px] text-gray-600">
                      {r.progress}%
                    </span>
                  </div>

                  {/* Balance */}
                  <div className="text-[13px] text-gray-900">
                    {money(r.balance)}
                  </div>

                  {/* Row actions */}
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-md hover:bg-gray-100">
                          <MoreHorizontal className="h-5 w-5 text-gray-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="min-w-[200px]"
                      >
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> View plan
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Bell className="h-4 w-4" /> Send reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" /> Add note
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <PauseCircle className="h-4 w-4" /> Pause plan
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <PlayCircle className="h-4 w-4" /> Resume plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* --- Mobile details (stacked) --- */}
                  <div className="col-span-full sm:hidden mt-2 grid grid-cols-2 gap-2 text-[12px] text-gray-600">
                    <div>
                      <span className="text-gray-500">Plan:</span>{" "}
                      {money(r.planAmount)}
                    </div>
                    <div>
                      <span className="text-gray-500">Clinic:</span> {r.clinic}
                    </div>
                    <div>
                      <span className="text-gray-500">Next Pay:</span>{" "}
                      {new Date(r.nextPayment).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> {r.status}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
