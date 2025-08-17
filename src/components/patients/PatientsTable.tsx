"use client";

import React, { useMemo, useState, useEffect } from "react";
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
  Search as SearchIcon,
  Download,
  ArrowUpDown,
  Filter as FilterIcon,
  X,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

/* ---------------- Types ---------------- */
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

type TeamMember = { name: string; avatar?: string; initials: string };

type PatientRow = {
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
};

/* ---------------- Mock data (replace with API) ---------------- */
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

/* ---------------- Helpers ---------------- */
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

type SortKey = "name" | "nextPayment" | "balance" | "progress" | "clinic";
type SortState = { key: SortKey; dir: "asc" | "desc" };

/* ---------------- Component ---------------- */
const groups: { label: Status; icon: React.ElementType; key: Status }[] = [
  { label: "In Treatment", icon: Shield, key: "In Treatment" },
  { label: "Repaying", icon: FileText, key: "Repaying" },
  { label: "Delinquent", icon: AlertTriangle, key: "Delinquent" },
];

export default function PatientsTable() {
  /* ---- table view state ---- */
  const [collapsed, setCollapsed] = useState<Record<Status, boolean>>({
    "In Treatment": false,
    Repaying: false,
    Delinquent: false,
  });

  // Facets (all live in one popover)
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [riskFilter, setRiskFilter] = useState<Risk | "all">("all");
  const [clinicFilter, setClinicFilter] = useState<string | "all">("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const [filterOpen, setFilterOpen] = useState(false);

  // Sort + pagination
  const [sort, setSort] = useState<SortState>({
    key: "nextPayment",
    dir: "asc",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Bulk selection (per-page)
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // derived clinics for the filter
  const clinics = useMemo(
    () => Array.from(new Set(rows.map((r) => r.clinic))).sort(),
    []
  );

  // active filters count for badge
  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (statusFilter !== "all") n++;
    if (riskFilter !== "all") n++;
    if (clinicFilter !== "all") n++;
    if (dateFrom || dateTo) n++;
    return n;
  }, [statusFilter, riskFilter, clinicFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setStatusFilter("all");
    setRiskFilter("all");
    setClinicFilter("all");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  // filtering
  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesText =
        !lower ||
        r.name.toLowerCase().includes(lower) ||
        r.id.toLowerCase().includes(lower) ||
        r.clinic.toLowerCase().includes(lower) ||
        r.procedure.toLowerCase().includes(lower) ||
        r.team.some(
          (t) =>
            t.name.toLowerCase().includes(lower) ||
            t.initials.toLowerCase().includes(lower)
        );

      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      const matchesRisk = riskFilter === "all" || r.risk === riskFilter;
      const matchesClinic = clinicFilter === "all" || r.clinic === clinicFilter;

      const time = new Date(r.nextPayment).getTime();
      const after = dateFrom ? time >= new Date(dateFrom).getTime() : true;
      const before = dateTo ? time <= new Date(dateTo).getTime() : true;

      return (
        matchesText &&
        matchesStatus &&
        matchesRisk &&
        matchesClinic &&
        after &&
        before
      );
    });
  }, [q, statusFilter, riskFilter, clinicFilter, dateFrom, dateTo]);

  // sorting
  const sorted = useMemo(() => {
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";

      switch (sort.key) {
        case "name":
          va = a.name;
          vb = b.name;
          break;
        case "clinic":
          va = a.clinic;
          vb = b.clinic;
          break;
        case "balance":
          va = a.balance;
          vb = b.balance;
          break;
        case "progress":
          va = a.progress;
          vb = b.progress;
          break;
        case "nextPayment":
        default:
          va = new Date(a.nextPayment).getTime();
          vb = new Date(b.nextPayment).getTime();
          break;
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
  }, [filtered, sort]);

  // pagination
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // group current page
  const grouped = useMemo(() => {
    const by: Record<Status, PatientRow[]> = {
      "In Treatment": [],
      Repaying: [],
      Delinquent: [],
    };
    paged.forEach((r) => by[r.status].push(r));
    return by;
  }, [paged]);

  const toggleSort = (key: SortKey) => {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const pageRowsIds = useMemo(() => paged.map((r) => r.id), [paged]);
  const allPageSelected = pageRowsIds.every((id) => selected[id]);
  const toggleAllOnPage = (checked: boolean) => {
    const next = { ...selected };
    pageRowsIds.forEach((id) => (next[id] = checked));
    setSelected(next);
  };

  const exportCSV = () => {
    const header = [
      "ID",
      "Name",
      "Clinic",
      "Procedure",
      "Plan Amount",
      "Balance",
      "Next Payment",
      "Risk",
      "Progress",
      "Status",
      "Team",
    ];
    const lines = [header.join(",")];
    sorted.forEach((r) => {
      const row = [
        r.id,
        r.name,
        r.clinic,
        r.procedure,
        r.planAmount.toString(),
        r.balance.toString(),
        r.nextPayment,
        r.risk,
        r.progress.toString(),
        r.status,
        r.team.map((t) => t.initials).join("|"),
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`);
      lines.push(row.join(","));
    });
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patients_view.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-[#e7e4db] bg-white shadow-sm overflow-hidden">
      {/* View Tabs + Controls */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        {/* Notion-like view tabs */}
        {/* <div className="inline-flex items-center gap-1 text-[13px]">
          <span className="px-2 py-1 rounded-md border bg-[#f8fafc] text-gray-800">Spreadsheet</span>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">Timeline</button>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">Calendar</button>
          <button className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-700">Board</button>
        </div> */}

        <div className="inline-flex items-center gap-1 text-lg font-semibold">
          Patients
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, ID, clinic, team…"
              className="pl-8 h-8 w-[220px]"
            />
          </div>

          {/* Single Filter Button + Popover */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 relative">
                <FilterIcon className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-gray-900 text-white text-[10px] leading-4 px-1 text-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[640px] p-0 overflow-hidden rounded-lg border shadow-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b bg-[#fafafa]">
                <div className="font-medium text-[13px] text-gray-900">
                  Filters
                </div>
                <button
                  className="text-[12px] text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
                  onClick={clearFilters}
                >
                  Reset
                </button>
              </div>

              {/* Body */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <section>
                  <div className="text-[12px] font-semibold text-gray-600 mb-2">
                    Status
                  </div>
                  <PillRow<Status | "all">
                    value={statusFilter}
                    onChange={(v) => {
                      setStatusFilter(v);
                      setPage(1);
                    }}
                    options={[
                      { label: "All", value: "all" },
                      { label: "In Treatment", value: "In Treatment" },
                      { label: "Repaying", value: "Repaying" },
                      { label: "Delinquent", value: "Delinquent" },
                    ]}
                  />
                </section>

                {/* Risk */}
                <section>
                  <div className="text-[12px] font-semibold text-gray-600 mb-2">
                    Risk
                  </div>
                  <PillRow<Risk | "all">
                    value={riskFilter}
                    onChange={(v) => {
                      setRiskFilter(v);
                      setPage(1);
                    }}
                    options={[
                      { label: "All", value: "all" },
                      { label: "Urgent", value: "Urgent" },
                      { label: "Normal", value: "Normal" },
                      { label: "Low", value: "Low" },
                    ]}
                  />
                </section>

                {/* Clinic */}
                <section>
                  <div className="text-[12px] font-semibold text-gray-600 mb-2">
                    Clinic
                  </div>
                  <Select
                    value={clinicFilter}
                    onValueChange={(v: any) => {
                      setClinicFilter(v);
                      setPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="All clinics" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      <SelectItem value="all">All clinics</SelectItem>
                      {clinics.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </section>

                {/* Date Range */}
                <section>
                  <div className="text-[12px] font-semibold text-gray-600 mb-2">
                    Next payment (date range)
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => {
                        setDateFrom(e.target.value);
                        setPage(1);
                      }}
                      className="h-8 w-full rounded-md border px-2 text-[13px]"
                      aria-label="From date"
                    />
                    <span className="text-gray-400">–</span>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => {
                        setDateTo(e.target.value);
                        setPage(1);
                      }}
                      className="h-8 w-full rounded-md border px-2 text-[13px]"
                      aria-label="To date"
                    />
                  </div>
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {/* quick chips (optional presets) */}
                    <QuickRange
                      label="Today"
                      onClick={() =>
                        setFromToForPreset("today", setDateFrom, setDateTo)
                      }
                    />
                    <QuickRange
                      label="This week"
                      onClick={() =>
                        setFromToForPreset("week", setDateFrom, setDateTo)
                      }
                    />
                    <QuickRange
                      label="This month"
                      onClick={() =>
                        setFromToForPreset("month", setDateFrom, setDateTo)
                      }
                    />
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t bg-white flex items-center justify-end gap-2">
                {activeFilterCount > 0 && (
                  <AppliedChips
                    status={statusFilter}
                    risk={riskFilter}
                    clinic={clinicFilter}
                    from={dateFrom}
                    to={dateTo}
                    onClearKey={(key) => {
                      if (key === "status") setStatusFilter("all");
                      if (key === "risk") setRiskFilter("all");
                      if (key === "clinic") setClinicFilter("all");
                      if (key === "from") setDateFrom("");
                      if (key === "to") setDateTo("");
                      setPage(1);
                    }}
                  />
                )}
                <Button
                  size="sm"
                  className="h-8"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="default" size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" /> Add patient
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={exportCSV}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Active filter chips inline (outside popover) */}
      {activeFilterCount > 0 && (
        <div className="px-4 pt-2 flex flex-wrap items-center gap-2">
          <AppliedChips
            status={statusFilter}
            risk={riskFilter}
            clinic={clinicFilter}
            from={dateFrom}
            to={dateTo}
            onClearKey={(key) => {
              if (key === "status") setStatusFilter("all");
              if (key === "risk") setRiskFilter("all");
              if (key === "clinic") setClinicFilter("all");
              if (key === "from") setDateFrom("");
              if (key === "to") setDateTo("");
              setPage(1);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[12px]"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Column header */}
      <div className="sticky top-0 z-10 bg-white notion-header grid grid-cols-[24px_minmax(220px,1.3fr)_1fr_.9fr_.9fr_.9fr_.7fr_.9fr_48px] gap-3 px-4 pt-3 pb-2 text-[12px] font-semibold text-gray-500 border-t border-[#ece9dd]">
        <div className="flex items-center">
          <Checkbox
            checked={allPageSelected}
            onCheckedChange={(v: boolean) => toggleAllOnPage(!!v)}
            aria-label="Select all on page"
          />
        </div>
        <HeaderButton
          label="Patient"
          onClick={() => toggleSort("name")}
          active={sort.key === "name"}
          dir={sort.dir}
        />
        <div>Description</div>
        <HeaderButton
          label="Clinic"
          onClick={() => toggleSort("clinic")}
          active={sort.key === "clinic"}
          dir={sort.dir}
        />
        <HeaderButton
          label="Next Payment"
          onClick={() => toggleSort("nextPayment")}
          active={sort.key === "nextPayment"}
          dir={sort.dir}
        />
        <div>Priority</div>
        <HeaderButton
          label="Progress"
          onClick={() => toggleSort("progress")}
          active={sort.key === "progress"}
          dir={sort.dir}
        />
        <HeaderButton
          label="Balance"
          onClick={() => toggleSort("balance")}
          active={sort.key === "balance"}
          dir={sort.dir}
        />
        <div className="text-right pr-1">⋯</div>
      </div>

      {/* Bulk actions bar */}
      {Object.values(selected).some(Boolean) && (
        <div className="px-4 py-2 border-t bg-[#fafafa] text-[13px] flex items-center justify-between">
          <div>{Object.values(selected).filter(Boolean).length} selected</div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Bell className="h-4 w-4" /> Remind
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <PauseCircle className="h-4 w-4" /> Pause
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <PlayCircle className="h-4 w-4" /> Resume
            </Button>
          </div>
        </div>
      )}

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
                  "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1",
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
                  className="notion-row grid grid-cols-[24px_minmax(220px,1.3fr)_1fr_.9fr_.9fr_.9fr_.7fr_.9fr_48px] gap-3 items-center px-4 py-3"
                >
                  {/* Select */}
                  <div className="flex items-center">
                    <Checkbox
                      checked={!!selected[r.id]}
                      onCheckedChange={(v: boolean) =>
                        setSelected((s) => ({ ...s, [r.id]: !!v }))
                      }
                      aria-label={`Select ${r.name}`}
                    />
                  </div>

                  {/* Patient */}
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

                  {/* Description */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {r.team.map((t, i) => (
                      <span
                        key={i}
                        className="text-[12px] px-2 py-0.5 rounded-md border border-[#e7e4db] bg-[#faf9f6] text-gray-700"
                      >
                        {t.initials}
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
                        <button
                          className="p-1.5 rounded-md hover:bg-gray-100"
                          aria-label="Row actions"
                        >
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

                  {/* Mobile details */}
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

      {/* Footer: pagination */}
      <div className="border-t border-[#e6e6e6] px-4 py-2 text-[12px] text-gray-600 flex items-center justify-between">
        <div>{total} results</div>
        <div className="flex items-center gap-2">
          <Select
            value={String(pageSize)}
            onValueChange={(v: any) => {
              setPageSize(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="25">25 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <span className="px-2">
              Page {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Notion-y helpers -------- */
function HeaderButton({
  label,
  onClick,
  active,
  dir,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  dir?: "asc" | "desc";
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-left hover:text-gray-700"
      aria-label={`Sort by ${label}`}
    >
      <span>{label}</span>
      <ArrowUpDown
        className={`h-3.5 w-3.5 ${active ? "opacity-100" : "opacity-40"}`}
        data-dir={dir}
      />
    </button>
  );
}

function PillRow<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={String(o.value)}
            onClick={() => onChange(o.value)}
            className={[
              "px-2.5 h-7 rounded-full border text-[12px]",
              active
                ? "bg-[#111827] text-white border-[#111827]"
                : "bg-[#fafafa] border-[#e6e6e6] text-gray-700 hover:bg-white",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function QuickRange({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2 h-7 rounded-full border text-[12px] bg-[#fafafa] border-[#e6e6e6] text-gray-700 hover:bg-white"
    >
      {label}
    </button>
  );
}

function AppliedChips({
  status,
  risk,
  clinic,
  from,
  to,
  onClearKey,
}: {
  status: Status | "all";
  risk: Risk | "all";
  clinic: string | "all";
  from: string;
  to: string;
  onClearKey: (k: "status" | "risk" | "clinic" | "from" | "to") => void;
}) {
  const chips: { key: any; label: string }[] = [];
  if (status !== "all")
    chips.push({ key: "status", label: `Status: ${status}` });
  if (risk !== "all") chips.push({ key: "risk", label: `Risk: ${risk}` });
  if (clinic !== "all")
    chips.push({ key: "clinic", label: `Clinic: ${clinic}` });
  if (from) chips.push({ key: "from", label: `From: ${from}` });
  if (to) chips.push({ key: "to", label: `To: ${to}` });

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mr-auto">
      {chips.map((c) => (
        <span
          key={c.key}
          className="inline-flex items-center gap-1 px-2 h-7 rounded-full border text-[12px] bg-[#fafafa] border-[#e6e6e6] text-gray-700"
        >
          {c.label}
          <button
            onClick={() => onClearKey(c.key)}
            aria-label={`Clear ${c.label}`}
            className="hover:text-gray-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ))}
    </div>
  );
}

/* Quick date presets */
function setFromToForPreset(
  preset: "today" | "week" | "month",
  setFrom: (v: string) => void,
  setTo: (v: string) => void
) {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const toISODate = (x: Date) =>
    `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`;

  if (preset === "today") {
    const t = new Date();
    setFrom(toISODate(t));
    setTo(toISODate(t));
    return;
  }
  if (preset === "week") {
    const day = d.getDay(); // 0-6, Sun=0
    const diffToMonday = (day + 6) % 7;
    const start = new Date(d);
    start.setDate(d.getDate() - diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    setFrom(toISODate(start));
    setTo(toISODate(end));
    return;
  }
  if (preset === "month") {
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    setFrom(toISODate(start));
    setTo(toISODate(end));
    return;
  }
}
