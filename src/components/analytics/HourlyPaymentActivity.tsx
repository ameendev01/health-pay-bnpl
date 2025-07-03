import React from 'react';
import { Clock } from 'lucide-react';
import { HourlyPaymentData } from '@/features/analytics/types';

interface HourlyPaymentActivityProps {
  data: HourlyPaymentData[];
}

export default function HourlyPaymentActivity({ data }: HourlyPaymentActivityProps) {
  const maxPayments = Math.max(...data.map(d => d.payments));
  const totalPayments = data.reduce((sum, item) => sum + item.payments, 0);
  const peakHour = data.reduce((prev, current) => 
    prev.payments > current.payments ? prev : current
  );

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-50">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Payment Activity</h3>
            <p className="text-sm text-gray-500">Peak payment processing hours</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Payments</div>
            <div className="text-xl font-bold text-gray-900">{totalPayments}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600 mb-1">Peak Hour</div>
            <div className="text-xl font-bold text-purple-600">{peakHour.hour}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-48 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-300 hover:from-purple-600 hover:to-purple-500 relative overflow-hidden"
                style={{ 
                  height: `${(item.payments / maxPayments) * 140}px`,
                  minHeight: '8px'
                }}
              >
                {/* Hover tooltip */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
                    {item.payments}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-medium text-gray-700">{item.hour}</p>
                <p className="text-xs text-gray-500 mt-1">${(item.amount / 1000).toFixed(0)}k</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}