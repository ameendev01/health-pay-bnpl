"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, ArrowRight, RefreshCw } from "lucide-react";

interface RecentApproval {
  id: string;
  patientName: string;
  amount: number;
  procedure: string;
  clinic: string;
  approvedAt: string;
  status: "approved" | "pending_signature" | "active";
}

interface RecentTransaction {
  id: string;
  type: "payment" | "refund" | "adjustment";
  patientName: string;
  amount: number;
  clinic: string;
  completedAt: string;
  paymentMethod: string;
}

const recentApprovals: RecentApproval[] = [
  {
    id: "APP-001",
    patientName: "Sarah Johnson",
    amount: 3200,
    procedure: "Dental Implants",
    clinic: "Sunrise Dental",
    approvedAt: "2 min ago",
    status: "pending_signature",
  },
  {
    id: "APP-002",
    patientName: "Michael Chen",
    amount: 1800,
    procedure: "Orthodontic Treatment",
    clinic: "Valley Orthodontics",
    approvedAt: "8 min ago",
    status: "approved",
  },
  {
    id: "APP-003",
    patientName: "Emma Rodriguez",
    amount: 2400,
    procedure: "Root Canal + Crown",
    clinic: "Metro Dental Care",
    approvedAt: "15 min ago",
    status: "active",
  },
  {
    id: "APP-004",
    patientName: "David Kim",
    amount: 5500,
    procedure: "Cardiac Procedure",
    clinic: "Heart Health Center",
    approvedAt: "23 min ago",
    status: "approved",
  },
  {
    id: "APP-005",
    patientName: "Lisa Thompson",
    amount: 950,
    procedure: "Dental Cleaning",
    clinic: "Family Dental",
    approvedAt: "31 min ago",
    status: "active",
  },
];

const recentTransactions: RecentTransaction[] = [
  {
    id: "TXN-001",
    type: "payment",
    patientName: "John Smith",
    amount: 250,
    clinic: "Sunrise Dental",
    completedAt: "5 min ago",
    paymentMethod: "Auto-Pay",
  },
  {
    id: "TXN-002",
    type: "payment",
    patientName: "Maria Garcia",
    amount: 180,
    clinic: "Valley Orthodontics",
    completedAt: "12 min ago",
    paymentMethod: "Credit Card",
  },
  {
    id: "TXN-003",
    type: "refund",
    patientName: "Robert Wilson",
    amount: 320,
    clinic: "Metro Dental Care",
    completedAt: "18 min ago",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-004",
    type: "payment",
    patientName: "Jennifer Lee",
    amount: 425,
    clinic: "Heart Health Center",
    completedAt: "25 min ago",
    paymentMethod: "Auto-Pay",
  },
  {
    id: "TXN-005",
    type: "adjustment",
    patientName: "Thomas Brown",
    amount: 75,
    clinic: "Family Dental",
    completedAt: "33 min ago",
    paymentMethod: "Manual",
  },
];

export default function RecentApprovalsTransactions() {
  const [activeTab, setActiveTab] = useState<"approvals" | "transactions">(
    "approvals"
  );

  const getStatusDot = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mr-2"></div>
        );
      case "pending_signature":
        return (
          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mr-2"></div>
        );
      case "active":
        return (
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mr-2"></div>
        );
      default:
        return (
          <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mr-2"></div>
        );
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-800";
      case "refund":
        return "bg-red-100 text-red-800";
      case "adjustment":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case "refund":
        return <ArrowRight className="w-4 h-4 rotate-180 text-red-600" />;
      case "adjustment":
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="bg-white border border-neutral-200">
      <CardHeader className="pb-3">
        <div
          className="
      grid 
      grid-cols-1 grid-rows-[auto_auto] gap-y-1
      sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_auto] sm:gap-x-4
    "
        >
          {/* Title */}
          <CardTitle className="col-start-1 row-start-1 flex items-center gap-2 leading-none text-lg font-semibold text-neutral-800">
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-md shrink-0">
              <CreditCard
                className="w-5 h-5 text-blue-600"
                strokeWidth={2.4} // bolder line so it reads larger without changing size
              />
            </span>
            Recent Activity
          </CardTitle>

          {/* Tabs */}
          <div
            className="
        col-start-1 row-start-3 mt-2
        sm:col-start-2 sm:row-start-1 sm:mt-0 sm:self-center
      "
          >
            <div className="flex items-center bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("approvals")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "approvals"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
              >
                Approvals
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "transactions"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
              >
                Transactions
              </button>
            </div>
          </div>

          {/* Subtitle spans full width */}
          <p className="col-span-1 row-start-2 text-sm text-neutral-500 leading-snug sm:col-span-2">
            Latest approvals and completed transactions
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {activeTab === "approvals" ? (
            <>
              {recentApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {getStatusDot(approval.status)}
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-base text-neutral-800 truncate">
                          {approval.patientName}
                        </p>
                      </div>
                      <p className="text-sm text-neutral-600 truncate">
                        {approval.procedure} • {approval.clinic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                    <p className="font-semibold text-base text-neutral-800">
                      ${approval.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {approval.approvedAt}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100`}
                    >
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-base text-neutral-800 truncate">
                          {transaction.patientName}
                        </p>
                        <Badge
                          className={getTransactionTypeColor(transaction.type)}
                        >
                          {transaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 truncate">
                        {transaction.paymentMethod} • {transaction.clinic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                    <p
                      className={`font-semibold text-base ${
                        transaction.type === "refund"
                          ? "text-red-600"
                          : "text-neutral-800"
                      }`}
                    >
                      {transaction.type === "refund" ? "-" : "+"}$
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {transaction.completedAt}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              {activeTab === "approvals"
                ? "Need patient signatures"
                : "Pending transactions"}
              :
              <span className="font-medium text-blue-600 ml-1">
                {activeTab === "approvals" ? "3 plans" : "2 payments"}
              </span>
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
              View All →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
