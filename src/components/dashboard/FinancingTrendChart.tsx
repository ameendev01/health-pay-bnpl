'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', financing: 185000, insurance: 320000, total: 505000, plans: 234 },
  { month: 'Feb', financing: 220000, insurance: 340000, total: 560000, plans: 287 },
  { month: 'Mar', financing: 195000, insurance: 315000, total: 510000, plans: 256 },
  { month: 'Apr', financing: 260000, insurance: 380000, total: 640000, plans: 345 },
  { month: 'May', financing: 245000, insurance: 365000, total: 610000, plans: 312 },
  { month: 'Jun', financing: 290000, insurance: 420000, total: 710000, plans: 398 },
  { month: 'Jul', financing: 315000, insurance: 445000, total: 760000, plans: 425 },
  { month: 'Aug', financing: 340000, insurance: 465000, total: 805000, plans: 456 },
];

const yearOverYearData = [
  { month: 'Jan', current: 315000, previous: 245000 },
  { month: 'Feb', current: 340000, previous: 260000 },
  { month: 'Mar', current: 290000, previous: 220000 },
  { month: 'Apr', current: 380000, previous: 285000 },
  { month: 'May', current: 365000, previous: 275000 },
  { month: 'Jun', current: 420000, previous: 310000 },
  { month: 'Jul', current: 445000, previous: 325000 },
  { month: 'Aug', current: 465000, previous: 340000 },
];

const MemoizedBarChart = React.memo(BarChart);
const MemoizedLineChart = React.memo(LineChart);

export default function FinancingTrendChart() {
  const [viewType, setViewType] = useState<'monthly' | 'yoy'>('monthly');

  const memoizedMonthlyData = useMemo(() => monthlyData, []);
  const memoizedYearOverYearData = useMemo(() => yearOverYearData, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-neutral-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Revenue Trends & BNPL Growth
            </CardTitle>
            <p className="text-sm text-neutral-500 mt-1">
              Monthly financing volume with year-over-year comparison
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewType('monthly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewType === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Monthly Mix
            </button>
            <button
              onClick={() => setViewType('yoy')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewType === 'yoy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Year over Year
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'monthly' ? (
              <MemoizedBarChart data={memoizedMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis 
                  dataKey="month" 
                  className="text-sm text-neutral-500"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-sm text-neutral-500"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="financing" 
                  fill="#22c55e" 
                  name="BNPL Financing"
                  radius={[0, 0, 4, 4]}
                />
                <Bar 
                  dataKey="insurance" 
                  fill="#3b82f6" 
                  name="Insurance Collections"
                  radius={[4, 4, 0, 0]}
                />
              </MemoizedBarChart>
            ) : (
              <MemoizedLineChart data={memoizedYearOverYearData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis 
                  dataKey="month" 
                  className="text-sm text-neutral-500"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-sm text-neutral-500"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  name="2024 BNPL Volume"
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="2023 BNPL Volume"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </MemoizedLineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Key Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-neutral-700">BNPL Growth</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">+32%</p>
            <p className="text-xs text-neutral-500">vs last year</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-neutral-700">Conversion Rate</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">87.3%</p>
            <p className="text-xs text-neutral-500">with financing option</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-neutral-700">Avg Plan Value</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">$2,156</p>
            <p className="text-xs text-neutral-500">per financing plan</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}