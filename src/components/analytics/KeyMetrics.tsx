
import React from 'react';
import { DollarSign, CreditCard, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    title: "Total Revenue",
    value: "$1.4M",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    iconBgColor: "bg-teal-100",
    description: "vs. last month",
  },
  {
    title: "Active Plans",
    value: "3,247",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: CreditCard,
    iconBgColor: "bg-blue-100",
    description: "vs. last month",
  },
  {
    title: "Success Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: CheckCircle,
    iconBgColor: "bg-green-100",
    description: "vs. last month",
  },
  {
    title: "Avg Plan Value",
    value: "$2,156",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconBgColor: "bg-purple-100",
    description: "vs. last month",
  },
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

export default function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={index} 
            className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <CardContent className="p-6">
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

