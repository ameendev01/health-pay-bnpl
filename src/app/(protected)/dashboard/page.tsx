"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  MoreHorizontal,
  Calendar,
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
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <div className="text-lg text-gray-700">Loading dashboard data…</div>
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

  // Mock data for additional dashboard components
  const quickStats = [
    { label: 'Today\'s Revenue', value: '$12,450', change: '+8.2%', trend: 'up' },
    { label: 'New Patients', value: '23', change: '+12%', trend: 'up' },
    { label: 'Pending Approvals', value: '7', change: '-15%', trend: 'down' },
    { label: 'Success Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Review payment plan applications', priority: 'high', dueTime: '2:00 PM' },
    { id: 2, title: 'Monthly clinic performance review', priority: 'medium', dueTime: '4:30 PM' },
    { id: 3, title: 'Update system configurations', priority: 'low', dueTime: 'Tomorrow' },
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Payment overdue: Emma Wilson - $320', time: '5 min ago' },
    { id: 2, type: 'success', message: 'New clinic approved: Downtown Medical', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'System maintenance scheduled for tonight', time: '2 hours ago' },
  ];

  return (
    <main className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, Admin 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Here's what's happening with your healthcare platform today
              </p>
            </div>

            <div className="flex items-center space-x-3">
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
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 card-hover"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Icon className="w-6 h-6 text-blue-600" />
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
                    <p className="text-3xl font-bold text-gray-900">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Transactions
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Latest payment activities across all clinics
                    </p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
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
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsAddClinicModalOpen(true)}
                    className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Add New Clinic
                    </span>
                    <Building2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => setIsPOSWizardOpen(true)}
                    className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      Create Payment Plan
                    </span>
                    <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      View Reports
                    </span>
                    <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Today's Tasks
                  </h3>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{task.dueTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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

          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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
  );
}