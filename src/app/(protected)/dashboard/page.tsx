"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
} from "lucide-react";
import AddClinicModal from "@/components/AddClinicModal";
import POSWizard from "@/components/POSWizard";
import { useAdminStats } from "@/features/dashboard/hooks/useAdminStats";
import { useRecentTransactions } from "@/features/dashboard/hooks/useRecentTransactions";


export default function Dashboard() {
  const [isAddClinicModalOpen, setIsAddClinicModalOpen] = useState(false);
  const [isPOSWizardOpen, setIsPOSWizardOpen] = useState(false);
  const stats = useAdminStats();
  const recentTransactions = useRecentTransactions();
  
  if (!stats || !recentTransactions) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <svg className="animate-spin h-8 w-8 text-teal-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <div className="text-lg text-gray-700">Loading dashboard data…</div>
    </div>
  );
}

  const handleAddClinic = (clinicData: { name: string }) => {
    console.log("New clinic added:", clinicData);
    // Here you would typically send the data to your API
    // For now, we'll just log it and show a success message
    alert(`Clinic "${clinicData.name}" has been added successfully!`);
  };

  const handlePOSComplete = (planData: { id: string; patientName: string }) => {
    console.log("New payment plan created:", planData);
    // Here you would typically send the data to your API
    // For now, we'll just log it and show a success message
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
            <div className="space-y-6">
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Overview of your healthcare payment platform
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPOSWizardOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Create Payment Plan
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.name}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-teal-50 rounded-lg">
                            <Icon className="w-6 h-6 text-teal-600" />
                          </div>
                        </div>
                        <div
                          className={`flex items-center space-x-1 text-sm font-medium ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.changeType === "positive" ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {stat.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Transactions
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Latest payment activities across all clinics
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                  </div>
                </div>

                {/* Quick Actions & Alerts */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setIsAddClinicModalOpen(true)}
                        className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-teal-300 transition-all duration-200 group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-teal-700">
                          Add New Clinic
                        </span>
                        <Building2 className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
                      </button>
                      <button
                        onClick={() => setIsPOSWizardOpen(true)}
                        className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-teal-300 transition-all duration-200 group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-teal-700">
                          Create Payment Plan
                        </span>
                        <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-teal-300 transition-all duration-200 group">
                        <span className="font-medium text-gray-900 group-hover:text-teal-700">
                          View Reports
                        </span>
                        <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
                      </button>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      System Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Payment Processing
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-600">
                            Operational
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          API Services
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-600">
                            Operational
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm font-medium text-yellow-600">
                            Maintenance
                          </span>
                        </div>
                      </div>
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
            </div>
          </div>
        </main>
  )
}
