import React, { useState } from 'react';
import { Clock, Zap, Calendar } from 'lucide-react';
import { HourlyPaymentData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModernHourlyActivityProps {
  data: HourlyPaymentData[];
}

export default function ModernHourlyActivity({ data }: ModernHourlyActivityProps) {
  const [sortBy, setSortBy] = useState<'time' | 'volume'>('time');
  
  const totalDailyPayments = data.reduce((sum, item) => sum + item.payments, 0);
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'volume') return b.payments - a.payments;
    return a.hour.localeCompare(b.hour);
  });
  
  const peakHour = data.reduce((peak, current) => 
    current.payments > peak.payments ? current : peak
  );

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Payments by Hour
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Daily payment processing patterns</p>
          </div>
          <div className="segmented-control">
            <button
              onClick={() => setSortBy('time')}
              className={sortBy === 'time' ? 'active' : ''}
            >
              By Time
            </button>
            <button
              onClick={() => setSortBy('volume')}
              className={sortBy === 'volume' ? 'active' : ''}
            >
              By Volume
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const percentage = (item.payments / totalDailyPayments) * 100;
            const isPeak = item.hour === peakHour.hour;
            
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-700 tabular-nums">
                  {item.hour}
                </div>
                <div className="flex-1 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 relative overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isPeak ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(item.payments / Math.max(...data.map(d => d.payments))) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-12 text-right tabular-nums">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 w-16 text-right tabular-nums">
                  {item.payments}
                </div>
                <div className="text-xs text-gray-500 w-20 text-right tabular-nums">
                  ${(item.amount / 1000).toFixed(0)}k
                </div>
              </div>
            );
          })}
        </div>

        {/* Best Processing Window Callout */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Best Processing Window</p>
                <p className="text-sm text-gray-600">{peakHour.hour} with {peakHour.payments} payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Calendar className="w-4 h-4 mr-1" />
                Set Reminder
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Run Promo
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}