import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { ProcedureData } from '@/features/analytics/types';

interface ProcedureAnalyticsProps {
  data: ProcedureData[];
}

export default function ProcedureAnalytics({ data }: ProcedureAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Procedure Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Procedure Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">Performance metrics by medical procedure</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procedure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((procedure, index) => {
                const totalRevenue = data.reduce((sum, p) => sum + p.revenue, 0);
                const marketShare = (procedure.revenue / totalRevenue) * 100;
                
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{procedure.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{procedure.count}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">${procedure.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">${procedure.avgAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {procedure.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          procedure.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {procedure.growth > 0 ? '+' : ''}{procedure.growth}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full" 
                            style={{ width: `${marketShare}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{marketShare.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Procedure Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Revenue by Procedure Type</h3>
          <p className="text-sm text-gray-600 mt-1">Comparative revenue analysis</p>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between space-x-3">
            {data.map((procedure, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-purple-600"
                  style={{ 
                    height: `${(procedure.revenue / Math.max(...data.map(p => p.revenue))) * 200}px`,
                    minHeight: '20px'
                  }}
                  title={`${procedure.name}: $${procedure.revenue.toLocaleString()}`}
                ></div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-medium text-gray-900 transform -rotate-12">
                    {procedure.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">${(procedure.revenue / 1000).toFixed(0)}k</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
