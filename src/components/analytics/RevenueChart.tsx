import React from 'react';
import { RefreshCw, Eye } from 'lucide-react';
import { RevenueData } from '@/features/analytics/types';

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Revenue & Growth Trends</h2>
            <p className="text-sm text-gray-600 mt-1">Monthly revenue, plans, and clinic growth</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="h-80 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full space-y-1">
                <div 
                  className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-teal-500"
                  style={{ 
                    height: `${(item.amount / Math.max(...data.map(d => d.amount))) * 180}px`,
                    minHeight: '20px'
                  }}
                  title={`Revenue: $${item.amount.toLocaleString()}`}
                ></div>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  style={{ 
                    height: `${(item.plans / Math.max(...data.map(d => d.plans))) * 80}px`,
                    minHeight: '10px'
                  }}
                  title={`Plans: ${item.plans}`}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-900">{item.month}</p>
                <p className="text-xs text-gray-600">${(item.amount / 1000).toFixed(0)}k</p>
                <p className="text-xs text-blue-600">{item.plans} plans</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Payment Plans</span>
          </div>
        </div>
      </div>
    </div>
  );
}
