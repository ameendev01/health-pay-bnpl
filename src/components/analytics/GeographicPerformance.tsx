import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { GeographicData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeographicPerformanceProps {
  data: GeographicData[];
}

export default function GeographicPerformance({ data }: GeographicPerformanceProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Geographic Performance</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Revenue and growth by state</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((location, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{location.state}</p>
                    <p className="text-sm text-gray-600">{location.clinics} clinics • {location.plans} plans</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${location.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      +{location.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.map((location, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-20 text-sm text-gray-600">{location.state}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${(location.revenue / Math.max(...data.map(l => l.revenue))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    ${(location.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Clinic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.map((location, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="w-20 text-sm text-gray-600">{location.state}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ 
                        width: `${(location.clinics / Math.max(...data.map(l => l.clinics))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {location.clinics}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
