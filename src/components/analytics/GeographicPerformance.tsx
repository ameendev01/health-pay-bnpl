import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { GeographicData } from '@/features/analytics/types';

interface GeographicPerformanceProps {
  data: GeographicData[];
}

export default function GeographicPerformance({ data }: GeographicPerformanceProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Geographic Performance</h2>
          <p className="text-sm text-gray-600 mt-1">Revenue and growth by state</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.map((location, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="space-y-3">
            {data.map((location, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-20 text-sm text-gray-600">{location.state}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500" 
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Distribution</h3>
          <div className="space-y-3">
            {data.map((location, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-20 text-sm text-gray-600">{location.state}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
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
        </div>
      </div>
    </div>
  );
}
