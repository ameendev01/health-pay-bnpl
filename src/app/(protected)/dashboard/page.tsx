"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CreditCard,
  MoreHorizontal,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Users,
  TrendingUp
} from "lucide-react";
import AddClinicModal from "@/components/AddClinicModal";
import CreatePaymentPlanDialog from "@/components/CreatePaymentPlanDialog";
import PageHeader from "@/components/shared/PageHeader";
import KPISummaryCards from "@/components/dashboard/KPISummaryCards";
import FinancingTrendChart from "@/components/dashboard/FinancingTrendChart";
import RepaymentStatusGauge from "@/components/dashboard/RepaymentStatusGauge";
import RecentApprovalsTransactions from "@/components/dashboard/RecentApprovalsTransactions";
import MultiClinicComparison from "@/components/dashboard/MultiClinicComparison";
import RCMClaimsSnapshot from "@/components/dashboard/RCMClaimsSnapshot";
import { useRecentTransactions } from "@/features/dashboard/hooks/useRecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const [isAddClinicModalOpen, setIsAddClinicModalOpen] = useState(false);
  const {
    transactions,
    isLoading: isLoadingTransactions,
    error: errorTransactions,
  } = useRecentTransactions();
  const { user } = useUser();
  console.log('user', user)

  if (isLoadingTransactions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <div className="text-lg text-gray-700">Loading dashboard data…</div>
      </div>
    );
  }

  if (errorTransactions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="text-lg text-red-600">
          Error loading dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  const handleAddClinic = (clinicData: { name: string }) => {
    console.log("New clinic added:", clinicData);
    alert(`Clinic "${clinicData.name}" has been added successfully!`);
  };

  const handlePaymentPlanSuccess = (data: any) => {
    console.log("New payment plan created:", data);
    alert(`Payment plan has been created successfully for ${data.patientName}!`);
  };

  return (
    <main className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PageHeader
            title={`Welcome back, ${
              user?.firstName
                ? user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)
                : ""
            }👋`}
            description="Here's a summary of your clinics' performance and activities."
          >
            <button
              onClick={() => setIsAddClinicModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Add Clinic
            </button>
            <CreatePaymentPlanDialog 
              onSuccess={handlePaymentPlanSuccess}
              trigger={
                <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Create Payment Plan
                </button>
              }
            />
          </PageHeader>

          {/* KPI Summary Cards */}
          <KPISummaryCards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Primary Column */}
            <div className="xl:col-span-2 space-y-8">
              {/* Financing Trend Chart */}
              <FinancingTrendChart />

              {/* Multi-Clinic Comparison */}
              <MultiClinicComparison />

              {/* RCM Claims Snapshot */}
              <RCMClaimsSnapshot />
            </div>

            {/* Secondary Column */}
            <div className="xl:col-span-1 space-y-8">
              {/* Repayment Status Gauge */}
              <RepaymentStatusGauge />

              {/* Recent Approvals & Transactions */}
              <RecentApprovalsTransactions />

              {/* Needs Attention */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-4">
                    Needs Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link
                      href="/payments?status=overdue"
                      className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-[#fefcf5] hover:border-[#84cc16] transition-all duration-200 group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-[#84cc16]">
                        23 Claims Need Resubmission
                      </span>
                      <AlertCircle className="w-5 h-5 text-red-400 group-hover:text-[#84cc16]" />
                    </Link>
                    <Link
                      href="/clinics?status=pending"
                      className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-[#fefcf5] hover:border-[#1557f6] transition-all duration-200 group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-[#1557f6]">
                        19 Delinquent Payment Plans
                      </span>
                      <CreditCard className="w-5 h-5 text-yellow-400 group-hover:text-[#1557f6]" />
                    </Link>
                    <Link
                      href="/analytics?view=performance"
                      className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-[#fefcf5] hover:border-[#84cc16] transition-all duration-200 group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-[#84cc16]">
                        1 Clinic Needs Performance Review
                      </span>
                      <BarChart3 className="w-5 h-5 text-yellow-400 group-hover:text-[#84cc16]" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Add Clinic Modal */}
      <AddClinicModal
        isOpen={isAddClinicModalOpen}
        onClose={() => setIsAddClinicModalOpen(false)}
        onSubmit={handleAddClinic}
      />
    </main>
  );
}
