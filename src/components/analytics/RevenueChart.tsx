import React from 'react';
import { RefreshCw, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="month" className="text-sm text-gray-600" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" className="text-sm text-gray-600" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" className="text-sm text-gray-600" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="plans" stroke="#82ca9d" name="Plans" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

