import React, { useState } from "react";
import { RefreshCw, Eye, BarChart3, TrendingUp, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { RevenueData } from "@/features/analytics/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModernRevenueChartProps {
  data: RevenueData[];
  compareMode: "off" | "mom" | "yoy";
  onCompareModeChange: (mode: "off" | "mom" | "yoy") => void;
}

// Enhanced data with previous period for comparison
const enhancedData = [
  {
    month: "Jan",
    amount: 185000,
    plans: 234,
    clinics: 45,
    prevAmount: 165000,
    prevPlans: 210,
  },
  {
    month: "Feb",
    amount: 220000,
    plans: 287,
    clinics: 48,
    prevAmount: 190000,
    prevPlans: 245,
  },
  {
    month: "Mar",
    amount: 195000,
    plans: 256,
    clinics: 52,
    prevAmount: 175000,
    prevPlans: 230,
  },
  {
    month: "Apr",
    amount: 260000,
    plans: 345,
    clinics: 55,
    prevAmount: 220000,
    prevPlans: 290,
  },
  {
    month: "May",
    amount: 245000,
    plans: 312,
    clinics: 58,
    prevAmount: 210000,
    prevPlans: 275,
  },
  {
    month: "Jun",
    amount: 290000,
    plans: 398,
    clinics: 62,
    prevAmount: 250000,
    prevPlans: 340,
  },
];

const annotations = [
  { month: "Mar", event: "Q1 Campaign Launch", type: "campaign" },
  { month: "May", event: "New Clinic Onboarding", type: "expansion" },
];

export default function ModernRevenueChart({
  compareMode,
  onCompareModeChange,
}: ModernRevenueChartProps) {
  const [showPlans, setShowPlans] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const annotation = annotations.find((a) => a.month === label);

      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label} 2024</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-gray-600">Revenue:</span>
              <span className="font-semibold text-gray-900">
                ${data.amount.toLocaleString()}
              </span>
            </div>
            {compareMode !== "off" && (
              <div className="flex items-center justify-between space-x-4">
                <span className="text-sm text-gray-600">Previous:</span>
                <span className="font-semibold text-gray-700">
                  ${data.prevAmount.toLocaleString()}
                </span>
              </div>
            )}
            {showPlans && (
              <div className="flex items-center justify-between space-x-4">
                <span className="text-sm text-gray-600">Plans:</span>
                <span className="font-semibold text-gray-900">
                  {data.plans}
                </span>
              </div>
            )}
          </div>
          {annotation && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    annotation.type === "campaign"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <span className="text-xs text-gray-600">
                  {annotation.event}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Revenue Trends
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Monthly revenue with growth patterns and key events
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPlans(!showPlans)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                showPlans
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {showPlans ? "Hide" : "Show"} Plans
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={enhancedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseMove={(e) => setHoveredPoint(e?.activePayload?.[0]?.payload)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              strokeWidth={0.5}
            />
            <XAxis
              dataKey="month"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tickMargin={12}
            />
            {showPlans && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />

            {/* Main Revenue Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: "#2563EB", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "#2563EB",
                strokeWidth: 2,
                fill: "#FFFFFF",
              }}
              name="Revenue"
            />

            {/* Comparison Line */}
            {compareMode !== "off" && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="prevAmount"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name={
                  compareMode === "mom" ? "Previous Month" : "Previous Year"
                }
              />
            )}

            {/* Plans Line (if enabled) */}
            {showPlans && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="plans"
                stroke="#16A34A"
                strokeWidth={2}
                dot={{ fill: "#16A34A", strokeWidth: 2, r: 3 }}
                name="Plans"
              />
            )}

            {/* Event Annotations */}
            {annotations.map((annotation, index) => (
              <ReferenceLine
                key={index}
                x={annotation.month}
                yAxisId="left" // ✅ tie the ref line to your existing Y axis
                // xAxisId={0}     // (optional) explicit; XAxis defaults to 0 anyway
                stroke={annotation.type === "campaign" ? "#2563EB" : "#16A34A"}
                strokeDasharray="2 2"
                label={{
                  value: annotation.event,
                  position: "top",
                  style: { fontSize: "11px", fill: "#6B7280" },
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Chart Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Growth Trend
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 tabular-nums">
              +18.5%
            </p>
            <p className="text-xs text-gray-500">6-month average</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Peak Month
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">June</p>
            <p className="text-xs text-gray-500">$290k revenue</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Plus className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Forecast
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 tabular-nums">
              $315k
            </p>
            <p className="text-xs text-gray-500">Next month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
