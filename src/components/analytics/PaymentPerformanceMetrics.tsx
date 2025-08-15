
import React from 'react';
import { CheckCircle, Target, AlertTriangle, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PaymentPerformanceMetric } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentPerformanceMetricsProps {
  data: PaymentPerformanceMetric[];
}

const getPerformanceColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'good':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'poor':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default function PaymentPerformanceMetrics({ data }: PaymentPerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((metric, index) => (
        <Card key={index} className={`rounded-2xl shadow-sm border ${getPerformanceColor(metric.status)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-semibold text-gray-900">{metric.metric}</CardTitle>
              {metric.status === 'excellent' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {metric.status === 'good' && <Target className="w-5 h-5 text-blue-600" />}
              {metric.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
              {metric.status === 'poor' && <XCircle className="w-5 h-5 text-red-600" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                {metric.value}
                {metric.metric.includes('Rate') || metric.metric.includes('Payments') ? '%' : ''}
                {metric.metric.includes('Days') ? ' days' : ''}
              </span>
              <div className="flex items-center space-x-1 pb-1">
                {metric.trend > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(metric.trend)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

