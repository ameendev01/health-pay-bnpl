import React from 'react';
import { DollarSign, CreditCard, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KeyMetrics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$1.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "vs last period",
      trend: "up"
    },
    {
      title: "Active Plans",
      value: "3,247",
      change: "+23.1%",
      changeType: "positive",
      icon: CreditCard,
      description: "payment plans",
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: CheckCircle,
      description: "completion rate",
      trend: "up"
    },
    {
      title: "Avg Plan Value",
      value: "$2,156",
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      description: "per patient",
      trend: "up"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-50 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-200">
              <metric.icon className="w-5 h-5 text-gray-600" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric.changeType === "positive" ? "text-emerald-600" : "text-red-500"
            }`}>
              {metric.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600 leading-tight">
              {metric.title}
            </h3>
            <div className="text-2xl font-bold text-gray-900 leading-none">
              {metric.value}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}