'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface ClaimsMetric {
  title: string;
  value: string;
  count?: number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
  color: string;
}

const claimsMetrics: ClaimsMetric[] = [
  {
    title: "Pending Claims",
    value: "247",
    count: 247,
    change: "-12",
    changeType: "positive",
    icon: Clock,
    color: "#f59e0b"
  },
  {
    title: "Denied Claims",
    value: "$45.2k",
    count: 23,
    change: "+$8.1k",
    changeType: "negative",
    icon: XCircle,
    color: "#ef4444"
  },
  {
    title: "Avg Days to Pay",
    value: "18.5",
    change: "-2.3",
    changeType: "positive",
    icon: Calendar,
    color: "#1557f6"
  },
  {
    title: "Clean Claim Rate",
    value: "94.7%",
    change: "+1.2%",
    changeType: "positive",
    icon: CheckCircle,
    color: "#84cc16"
  }
];

const claimsBreakdown = [
  { status: 'Submitted', count: 156, percentage: 63.2, color: '#1557f6' },
  { status: 'In Review', count: 67, percentage: 27.1, color: '#f59e0b' },
  { status: 'Pending Info', count: 24, percentage: 9.7, color: '#ef4444' }
];

const recentDenials = [
  { id: 'CLM-001', patient: 'John D.', amount: 1250, reason: 'Prior Authorization Required', insurer: 'Blue Cross' },
  { id: 'CLM-002', patient: 'Sarah M.', amount: 890, reason: 'Duplicate Claim', insurer: 'Aetna' },
  { id: 'CLM-003', patient: 'Mike R.', amount: 2100, reason: 'Medical Necessity', insurer: 'Cigna' }
];

export default function RCMClaimsSnapshot() {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#1557f6]" />
          Revenue Cycle Management
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Insurance claims processing and collection metrics
        </p>
      </CardHeader>
      <CardContent>
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {claimsMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-[#fefcf5] border border-[#e7e4db] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  <span className={`text-xs font-medium ${
                    metric.changeType === 'positive' ? 'text-[#84cc16]' : 'text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.title}</p>
              </div>
            );
          })}
        </div>

        {/* Claims Status Breakdown */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Claims Status Breakdown</h4>
          <div className="space-y-3">
            {claimsBreakdown.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-gray-600">{item.status}</div>
                <div className="flex-1">
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                    style={{ 
                      '--progress-background': item.color 
                    } as React.CSSProperties}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Denials */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Recent Claim Denials</h4>
            <span className="text-xs text-gray-500">Requires attention</span>
          </div>
          <div className="space-y-2">
            {recentDenials.map((denial, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{denial.patient}</p>
                    <p className="text-xs text-gray-600">{denial.reason} • {denial.insurer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">${denial.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{denial.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <DollarSign className="w-4 h-4 text-[#84cc16]" />
                <span className="text-lg font-bold text-gray-900">$1.8M</span>
              </div>
              <p className="text-xs text-gray-600">Monthly Collections</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <TrendingUp className="w-4 h-4 text-[#1557f6]" />
                <span className="text-lg font-bold text-gray-900">96.2%</span>
              </div>
              <p className="text-xs text-gray-600">Collection Rate</p>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              Action Required: 23 denied claims need resubmission
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}