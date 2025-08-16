
import React from 'react';
import { HourlyPaymentData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HourlyPaymentActivityProps {
  data: HourlyPaymentData[];
}

export default function HourlyPaymentActivity({ data }: HourlyPaymentActivityProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Hourly Payment Activity</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Peak payment processing hours</p>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-end justify-between space-x-1">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ 
                  height: `${(item.payments / Math.max(...data.map(d => d.payments))) * 140}px`,
                  minHeight: '8px'
                }}
                title={`${item.hour}: ${item.payments} payments, ${item.amount.toLocaleString()}`}
              ></div>
              <p className="text-xs text-gray-600 mt-2 transform -rotate-45">{item.hour}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

