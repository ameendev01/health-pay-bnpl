'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
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
  description: string;
  iconBgColor: string;
}

const kpiMetrics: KPIMetric[] = [
  {
    title: "Total BNPL Financed",
    value: "$2.4M",
    change: "+15.2%",
    changeType: "positive",
    icon: DollarSign,
    description: "vs. last month",
    iconBgColor: "bg-blue-100"
  },
  {
    title: "Active Payment Plans",
    value: "1,247",
    change: "+23.1%",
    changeType: "positive",
    icon: CreditCard,
    description: "vs. last month",
    iconBgColor: "bg-green-100"
  },
  {
    title: "A/R Days Outstanding",
    value: "28.5",
    change: "-3.2",
    changeType: "positive",
    icon: Clock,
    description: "vs. last month",
    iconBgColor: "bg-yellow-100"
  },
  {
    title: "Revenue Conversion",
    value: "87.3%",
    change: "+5.4%",
    changeType: "positive",
    icon: TrendingUp,
    description: "vs. last month",
    iconBgColor: "bg-purple-100"
  }
];

const ChangeIndicator = ({ change, changeType }: { change: string; changeType: 'positive' | 'negative' }) => {
  const isPositive = changeType === 'positive';
  return (
    <div className={`flex items-center space-x-1 text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      <span>{change}</span>
    </div>
  );
};

export default function KPISummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {kpiMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={index} 
            className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <CardContent className="px-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm font-medium text-gray-500">{metric.title}</span>
                  <span className="text-3xl font-bold text-gray-800">{metric.value}</span>
                </div>
                <div className={`p-3 rounded-full ${metric.iconBgColor}`}>
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <ChangeIndicator change={metric.change} changeType={metric.changeType} />
                <span className="text-xs text-gray-400">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}