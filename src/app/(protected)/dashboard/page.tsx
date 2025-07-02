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
} from "lucide-react";
import AddClinicModal from "@/components/AddClinicModal";
import POSWizard from "@/components/POSWizard";
import PageHeader from "@/components/shared/PageHeader";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { useRecentTransactions } from "@/features/dashboard/hooks/useRecentTransactions";
import { kpis } from "@/features/dashboard/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [isAddClinicModalOpen, setIsAddClinicModalOpen] = useState(false);
  const [isPOSWizardOpen, setIsPOSWizardOpen] = useState(false);
  const { transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useRecentTransactions();
  
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
        <div className="text-lg text-red-600">Error loading dashboard data. Please try again later.</div>
      </div>
    );
  }

  const handleAddClinic = (clinicData: { name: string }) => {
    console.log("New clinic added:", clinicData);
    alert(`Clinic "${clinicData.name}" has been added successfully!`);
  };

  const handlePOSComplete = (planData: { id: string; patientName: string }) => {
    console.log("New payment plan created:", planData);
    setTimeout(() => {
      setIsPOSWizardOpen(false);
      alert(
        `Payment plan ${planData.id} has been created successfully for ${planData.patientName}!`
      );
    }, 1000);
  };

  return (
    <main className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PageHeader title="Welcome back, Maria 👋" description="Here's a summary of your clinics' performance and activities.">
            <button
              onClick={() => setIsAddClinicModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Add Clinic
            </button>
            <button
              onClick={() => setIsPOSWizardOpen(true)}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Create Payment Plan
            </button>
          </PageHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Revenue Chart */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-4">BNPL Revenue (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Recent Transactions
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Latest payment activities across all clinics
                      </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {transactions?.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-xs font-semibold text-white">
                                {transaction.clinic
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")
                                  .slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {transaction.clinic}
                              </p>
                              <p className="text-sm text-gray-600">
                                Patient: {transaction.patient}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {transaction.amount}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {transaction.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {transaction.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Key Performance Indicators */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kpis.map((kpi, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span>{kpi.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Needs Attention */}
              <Card className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-4">Needs Attention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/payments?status=overdue" className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-red-300 transition-all duration-200 group">
                      <span className="font-medium text-gray-900 group-hover:text-red-700">
                        3 Payments Overdue
                      </span>
                      <AlertCircle className="w-5 h-5 text-red-400 group-hover:text-red-600" />
                    </Link>
                    <Link href="/clinics?status=pending" className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-yellow-300 transition-all duration-200 group">
                      <span className="font-medium text-gray-900 group-hover:text-yellow-700">
                        2 Clinic Applications Pending
                      </span>
                      <Building2 className="w-5 h-5 text-yellow-400 group-hover:text-yellow-600" />
                    </Link>
                    {/* Add more actionable items as needed */}
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

      {/* POS Wizard */}
      <POSWizard
        isOpen={isPOSWizardOpen}
        onClose={() => setIsPOSWizardOpen(false)}
        onComplete={handlePOSComplete}
      />
    </main>
  );
}

