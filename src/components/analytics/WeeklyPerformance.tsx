
import React from 'react';
import { WeeklyPerformanceData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WeeklyPerformanceProps {
  data: WeeklyPerformanceData[];
}

export default function WeeklyPerformance({ data }: WeeklyPerformanceProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Weekly Performance</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Payment completion by day of week</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-700">{item.day}</div>
              <div className="flex-1 flex items-center space-x-3">
                <Progress value={item.completion} indicatorClassName="bg-green-500" />
                <div className="text-sm text-gray-600 w-12 text-right">
                  {item.completion}%
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 w-16 text-right">
                {item.payments}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

