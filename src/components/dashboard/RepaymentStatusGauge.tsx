'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

interface RepaymentStatus {
  category: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
  description: string;
}

const repaymentData: RepaymentStatus[] = [
  {
    category: "On-Time",
    count: 1174,
    percentage: 94.2,
    color: "#84cc16",
    icon: CheckCircle,
    description: "Payments made on or before due date"
  },
  {
    category: "Grace Period",
    count: 48,
    percentage: 3.9,
    color: "#f59e0b",
    icon: Clock,
    description: "1-5 days past due"
  },
  {
    category: "Delinquent",
    count: 19,
    percentage: 1.5,
    color: "#ef4444",
    icon: AlertTriangle,
    description: "6-30 days past due"
  },
  {
    category: "Default Risk",
    count: 6,
    percentage: 0.4,
    color: "#dc2626",
    icon: XCircle,
    description: "30+ days past due"
  }
];

const totalPlans = repaymentData.reduce((sum, item) => sum + item.count, 0);

export default function RepaymentStatusGauge() {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-[#84cc16]" />
          Payment Plan Health Monitor
        </CardTitle>
        <p className="text-sm text-gray-600">
          Real-time repayment status across all active plans
        </p>
      </CardHeader>
      <CardContent>
        {/* Circular Progress Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            {/* Background Circle */}
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="none"
              />
              {/* On-time payments arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#84cc16"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${repaymentData[0].percentage * 2.51} 251`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              {/* Grace period arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#f59e0b"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${repaymentData[1].percentage * 2.51} 251`}
                strokeDashoffset={`-${repaymentData[0].percentage * 2.51}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-gray-900">
                {repaymentData[0].percentage}%
              </div>
              <div className="text-sm text-gray-600 text-center">
                On-Time<br />Payments
              </div>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="space-y-4">
          {repaymentData.map((status, index) => {
            const Icon = status.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${status.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: status.color }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{status.category}</p>
                    <p className="text-xs text-gray-600">{status.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{status.count}</p>
                  <p className="text-sm text-gray-600">{status.percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalPlans.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Active Plans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#84cc16]">$2.4M</p>
              <p className="text-sm text-gray-600">Outstanding Balance</p>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {repaymentData[2].count > 15 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Action Required: {repaymentData[2].count} plans need attention
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}