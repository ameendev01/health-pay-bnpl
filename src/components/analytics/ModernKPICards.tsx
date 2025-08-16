import React from 'react';
import { DollarSign, CreditCard, CheckCircle, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from '@/components/shared/Sparkline';

interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  sparklineData: number[];
  lastUpdated: string;
  onClick?: () => void;
}

const kpiMetrics: KPIMetric[] = [
  {
    title: "Total Revenue",
    value: "$1.4M",
    change: "+12.5%",
    changeType: "positive",
    sparklineData: [1200000, 1250000, 1180000, 1320000, 1380000, 1400000],
    lastUpdated: "2 min ago",
  },
  {
    title: "Active Plans",
    value: "3,247",
    change: "+23.1%",
    changeType: "positive",
    sparklineData: [2800, 2950, 3100, 3050, 3180, 3247],
    lastUpdated: "2 min ago",
  },
  {
    title: "Plan Success Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive",
    sparklineData: [92.1, 92.8, 93.2, 93.8, 94.0, 94.2],
    lastUpdated: "2 min ago",
  },
  {
    title: "Average Plan Value",
    value: "$2,156",
    change: "+8.2%",
    changeType: "positive",
    sparklineData: [1980, 2020, 2050, 2100, 2130, 2156],
    lastUpdated: "2 min ago",
  },
  {
    title: "New Plans Today",
    value: "47",
    change: "+15.0%",
    changeType: "positive",
    sparklineData: [35, 42, 38, 45, 41, 47],
    lastUpdated: "Live",
  },
];

export default function ModernKPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiMetrics.map((metric, index) => (
        <Card 
          key={index} 
          className="bg-white border border-gray-200 rounded-2xl shadow-sm card-hover-subtle cursor-pointer group"
          onClick={metric.onClick}
        >
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 tabular-nums">{metric.value}</p>
              </div>
              <div className="sparkline-container">
                <Sparkline 
                  points={metric.sparklineData}
                  width={60}
                  height={32}
                  strokeWidth={2}
                  paddingY={4}
                />
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-1 text-sm font-semibold pill-transition ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4 rotate-180" />
                )}
                <span>{metric.change}</span>
                <span className="text-xs text-gray-500 font-normal">MoM</span>
              </div>
              <div className="text-xs text-gray-400" title={`Last updated: ${metric.lastUpdated}`}>
                {metric.lastUpdated}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}