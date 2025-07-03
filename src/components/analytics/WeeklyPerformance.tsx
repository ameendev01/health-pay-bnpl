import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { WeeklyPerformanceData } from '@/features/analytics/types';

interface WeeklyPerformanceProps {
  data: WeeklyPerformanceData[];
}

export default function WeeklyPerformance({ data }: WeeklyPerformanceProps) {
  const avgCompletion = data.reduce((sum, item) => sum + item.completion, 0) / data.length;
  const bestDay = data.reduce((prev, current) => 
    prev.completion > current.completion ? prev : current
  );

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-50">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
            <p className="text-sm text-gray-500">Payment completion by day of week</p>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600 mb-1">Avg Completion</div>
            <div className="text-xl font-bold text-gray-900">{avgCompletion.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600 mb-1">Best Day</div>
            <div className="text-xl font-bold text-emerald-600">{bestDay.day}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-12">{item.day}</span>
                  <div className="text-sm text-gray-500">{item.payments} payments</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.completion}%</span>
                  {item.completion > avgCompletion && (
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500 group-hover:from-emerald-600 group-hover:to-teal-600" 
                    style={{ width: `${item.completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}