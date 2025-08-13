'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const monthlyData = [
  { month: 'Jan', financing: 185000, insurance: 320000, total: 505000, plans: 234 },
  { month: 'Feb', financing: 220000, insurance: 340000, total: 560000, plans: 287 },
  { month: 'Mar', financing: 195000, insurance: 315000, total: 510000, plans: 256 },
  { month: 'Apr', financing: 260000, insurance: 380000, total: 640000, plans: 345 },
  { month: 'May', financing: 245000, insurance: 365000, total: 610000, plans: 312 },
  { month: 'Jun', financing: 290000, insurance: 420000, total: 710000, plans: 398 },
  { month: 'Jul', financing: 315000, insurance: 445000, total: 760000, plans: 425 },
  { month: 'Aug', financing: 340000, insurance: 465000, total: 805000, plans: 456 },
]

// Light (base) at bottom, Bright (top)
const chartConfig = {
  financing: { label: 'BNPL Financing', color: '#87CEEB' },
  insurance: { label: 'Insurance Payments', color: '#2C7DF9' },
} satisfies ChartConfig

export default function FinancingTrendChart() {
  const [viewType, setViewType] = useState<'monthly' | 'yoy'>('monthly')
  const memoizedMonthlyData = useMemo(() => monthlyData, [])

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-lg font-semibold text-neutral-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Revenue Trends & BNPL Growth
            </CardTitle>
            <p className="text-sm text-neutral-500 mt-1">
              Monthly financing volume with year-over-year comparison
            </p>
          </div>

          {/* Segmented control (like your example) */}
          <div
            role="tablist"
            aria-label="Chart view"
            className="flex items-center bg-neutral-100 rounded-lg p-1 shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-pressed={viewType === 'monthly'}
              onClick={() => setViewType('monthly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewType === 'monthly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Monthly Mix
            </button>
            <button
              type="button"
              role="tab"
              aria-pressed={viewType === 'yoy'}
              onClick={() => setViewType('yoy')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewType === 'yoy'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Year over Year
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memoizedMonthlyData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${v / 1000}K`} />
              <Bar dataKey="financing" stackId="a" fill="var(--color-financing)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="insurance" stackId="a" fill="var(--color-insurance)" radius={[4, 4, 0, 0]} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} defaultIndex={1} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Key Insights (unchanged) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-neutral-700">BNPL Growth</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">+32%</p>
            <p className="text-xs text-neutral-500">vs last year</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium text-neutral-700">Conversion Rate</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">87.3%</p>
            <p className="text-xs text-neutral-500">with financing option</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-neutral-700">Avg Plan Value</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">$2,156</p>
            <p className="text-xs text-neutral-500">per financing plan</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
