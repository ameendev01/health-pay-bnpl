import React from 'react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { WeeklyPerformanceData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ModernWeeklyPerformanceProps {
  data: WeeklyPerformanceData[];
}

export default function ModernWeeklyPerformance({ data }: ModernWeeklyPerformanceProps) {
  const weeklyAverage = data.reduce((sum, item) => sum + item.completion, 0) / data.length;
  
  const enhancedData = data.map(item => ({
    ...item,
    deltaVsAverage: item.completion - weeklyAverage,
    isAboveAverage: item.completion > weeklyAverage
  })).sort((a, b) => b.completion - a.completion);

  const bestDay = enhancedData[0];
  const worstDay = enhancedData[enhancedData.length - 1];

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Completion by Weekday
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Payment completion rates with variance analysis</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enhancedData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-700">{item.day}</div>
              <div className="flex-1 flex items-center space-x-3">
                <Progress 
                  value={item.completion} 
                  className="flex-1"
                  indicatorClassName={`transition-all duration-500 ${
                    item.completion >= 95 ? 'bg-green-500' :
                    item.completion >= 90 ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                />
                <div className="text-sm text-gray-600 w-12 text-right tabular-nums">
                  {item.completion}%
                </div>
              </div>
              <div className="flex items-center space-x-2 w-20">
                {item.isAboveAverage ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium tabular-nums ${
                  item.isAboveAverage ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.deltaVsAverage > 0 ? '+' : ''}{item.deltaVsAverage.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 w-16 text-right tabular-nums">
                {item.payments}
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Best Day</span>
            </div>
            <p className="font-semibold text-gray-900">{bestDay.day}</p>
            <p className="text-xs text-gray-600">{bestDay.completion}% completion</p>
          </div>
          
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Needs Focus</span>
            </div>
            <p className="font-semibold text-gray-900">{worstDay.day}</p>
            <p className="text-xs text-gray-600">{worstDay.completion}% completion</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}