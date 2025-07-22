'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
  description: string;
}

const kpiMetrics: KPIMetric[] = [
  {
    title: "Total BNPL Financed",
    value: "$2.4M",
    change: "+15.2%",
    changeType: "positive",
    icon: DollarSign,
    description: "Total financing volume this month"
  },
  {
    title: "Active Payment Plans",
    value: "1,247",
    change: "+23.1%",
    changeType: "positive",
    icon: CreditCard,
    description: "Currently active financing plans"
  },
  {
    title: "Approval Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive",
    icon: CheckCircle,
    description: "Patient financing approval rate"
  },
  {
    title: "Insurance Collections",
    value: "$1.8M",
    change: "+8.7%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Total insurance collections this month"
  },
  {
    title: "A/R Days Outstanding",
    value: "28.5",
    change: "-3.2",
    changeType: "positive",
    icon: Clock,
    description: "Average days to collect payment"
  },
  {
    title: "Revenue Conversion",
    value: "87.3%",
    change: "+5.4%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Treatment acceptance rate with financing"
  }
];

export default function KPISummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 leading-tight">
                {metric.title}
              </CardTitle>
              <div className="p-2 bg-[#e9f9fb] rounded-lg">
                <Icon className="w-4 h-4 text-[#1557f6]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="flex items-center space-x-1">
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="w-3 h-3 text-[#84cc16]" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${
                  metric.changeType === 'positive' ? 'text-[#84cc16]' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-tight">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}