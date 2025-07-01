import React from 'react';
import { WeeklyPerformanceData } from '@/features/analytics/types';

interface WeeklyPerformanceProps {
  data: WeeklyPerformanceData[];
}

export default function WeeklyPerformance({ data }: WeeklyPerformanceProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
        <p className="text-sm text-gray-600 mt-1">Payment completion by day of week</p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-700">{item.day}</div>
              <div className="flex-1 flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${item.completion}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-20 text-right">
                  {item.completion}%
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 w-16 text-right">
                {item.payments}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
