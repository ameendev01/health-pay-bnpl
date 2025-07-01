import React from 'react';
import { HourlyPaymentData } from '@/features/analytics/types';

interface HourlyPaymentActivityProps {
  data: HourlyPaymentData[];
}

export default function HourlyPaymentActivity({ data }: HourlyPaymentActivityProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Hourly Payment Activity</h3>
        <p className="text-sm text-gray-600 mt-1">Peak payment processing hours</p>
      </div>
      <div className="p-6">
        <div className="h-48 flex items-end justify-between space-x-1">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-300 hover:from-purple-600 hover:to-purple-500"
                style={{ 
                  height: `${(item.payments / Math.max(...data.map(d => d.payments))) * 140}px`,
                  minHeight: '8px'
                }}
                title={`${item.hour}: ${item.payments} payments, $${item.amount.toLocaleString()}`}
              ></div>
              <p className="text-xs text-gray-600 mt-2 transform -rotate-45">{item.hour}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
