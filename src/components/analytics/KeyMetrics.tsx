import React from 'react';
import { DollarSign, CreditCard, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KeyMetrics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$1.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
    },
    {
      title: "Active Plans",
      value: "3,247",
      change: "+23.1%",
      changeType: "positive",
      icon: CreditCard,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: CheckCircle,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Avg Plan Value",
      value: "$2,156",
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`w-4 h-4 ${metric.textColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"} mt-1`}>
              {metric.change} vs last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
