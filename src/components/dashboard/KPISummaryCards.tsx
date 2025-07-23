'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
  context: string;
}

const kpiMetrics: KPIMetric[] = [
  {
    title: "Total BNPL Financed",
    value: "$2.4M",
    change: "+15.2%",
    changeType: "positive",
    icon: DollarSign,
    context: "vs last month"
  },
  {
    title: "Active Payment Plans",
    value: "1,247",
    change: "+23.1%",
    changeType: "positive",
    icon: CreditCard,
    context: "vs last month"
  },
  {
    title: "Approval Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive",
    icon: CheckCircle,
    context: "vs last month"
  },
  {
    title: "Insurance Collections",
    value: "$1.8M",
    change: "+8.7%",
    changeType: "positive",
    icon: TrendingUp,
    context: "vs last month"
  },
  {
    title: "A/R Days Outstanding",
    value: "28.5",
    change: "-3.2",
    changeType: "positive",
    icon: Clock,
    context: "vs last month"
  },
  {
    title: "Revenue Conversion",
    value: "87.3%",
    change: "+5.4%",
    changeType: "positive",
    icon: TrendingUp,
    context: "vs last month"
  }
];

export default function KPISummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              {/* Header with title and icon */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 leading-tight max-w-[calc(100%-32px)]">
                  {metric.title}
                </h3>
                <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
              
              {/* Primary value - hero number */}
              <div className="mb-3">
                <div className="text-3xl font-bold text-gray-900 leading-none">
                  {metric.value}
                </div>
              </div>
              
              {/* Delta line - change indicator */}
              <div className="flex items-center text-sm">
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-gray-500 mr-1" />
                )}
                <span className={`font-medium mr-1 ${
                  metric.changeType === 'positive' ? 'text-gray-700' : 'text-gray-700'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-500">{metric.context}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}