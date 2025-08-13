"use client";

import React, { useState } from "react";
import { Building2, CreditCard } from "lucide-react";
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
import { useUser } from "@clerk/nextjs";
import NeedsAttentionCard from "@/components/dashboard/attention/NeedAttentionCard";
// import { KPISummaryCards } from "@/components/dashboard/KPISummaryCards";

export default function DashboardPage() {
  const [isAddClinicModalOpen, setIsAddClinicModalOpen] = useState(false);
  const { isLoading: isLoadingTransactions, error: errorTransactions } =
    useRecentTransactions();
  const { user } = useUser();
  console.log("user", user);

  if (isLoadingTransactions) {
    return (
      <div>Loading...</div> // Replace with a proper loading spinner
    );
  }

  if (errorTransactions) {
    return <div>Error loading dashboard data.</div>; // Replace with a proper error component
  }

  const handleAddClinic = (clinicData: { name: string }) => {
    console.log("New clinic added:", clinicData);
    alert(`Clinic "${clinicData.name}" has been added successfully!`);
  };

  const handlePaymentPlanSuccess = (data: any) => {
    console.log("New payment plan created:", data);
    alert(
      `Payment plan has been created successfully for ${data.patientName}!`
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${
          user?.firstName
            ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Primary Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Financing Trend Chart */}
          <FinancingTrendChart />

          {/* Multi-Clinic Comparison */}
          <MultiClinicComparison />
        </div>

        {/* Secondary Column */}
        <div className="xl:col-span-1 space-y-6 xl:space-y-0 xl:flex xl:flex-col xl:gap-6 xl:min-h-0">
          {/* Repayment Status Gauge */}
          <RepaymentStatusGauge />

          {/* Recent Approvals & Transactions */}
          <RecentApprovalsTransactions />

          {/* Needs Attention */}
          <div className="xl:flex-1 xl:min-h-0">
            <NeedsAttentionCard />
          </div>
        </div>

        <div className="xl:col-span-3 space-y-6">
          {/* RCM Claims Snapshot */}
          <RCMClaimsSnapshot />
        </div>
      </div>

      {/* Add Clinic Modal */}
      <AddClinicModal
        isOpen={isAddClinicModalOpen}
        onClose={() => setIsAddClinicModalOpen(false)}
        onSubmit={handleAddClinic}
      />
    </div>
  );
}
