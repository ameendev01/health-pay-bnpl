import React from 'react';
import { RefreshCw, Eye, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueData } from '@/features/analytics/types';

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);
  const avgGrowth = data.length > 1 ? 
    ((data[data.length - 1].amount - data[0].amount) / data[0].amount * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-50">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">Revenue & Growth Trends</h2>
            <p className="text-sm text-gray-500">Monthly revenue, plans, and clinic growth</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Revenue</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${(totalRevenue / 1000000).toFixed(1)}M
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Growth Rate</span>
            </div>
            <div className="text-xl font-bold text-emerald-600">
              +{avgGrowth}%
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Avg Monthly</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${Math.round(totalRevenue / data.length / 1000)}K
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="#3b82f6" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#10b981" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }} 
              name="Revenue ($)"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="plans" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Plans"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}