
import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { ProcedureData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ProcedureAnalyticsProps {
  data: ProcedureData[];
}

export default function ProcedureAnalytics({ data }: ProcedureAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Procedure Analytics Table */}
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Procedure Analytics</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Performance metrics by medical procedure</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-neutral-200">
                <TableHead>Procedure</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Avg Amount</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Market Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((procedure, index) => {
                const totalRevenue = data.reduce((sum, p) => sum + p.revenue, 0);
                const marketShare = (procedure.revenue / totalRevenue) * 100;
                
                return (
                  <TableRow key={index} className="border-b last:border-0 border-neutral-100 hover:bg-neutral-50/60">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{procedure.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{procedure.count}</TableCell>
                    <TableCell className="font-semibold">${procedure.revenue.toLocaleString()}</TableCell>
                    <TableCell>${procedure.avgAmount.toLocaleString()}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={marketShare} className="w-24" indicatorClassName="bg-blue-500" />
                        <span className="text-sm text-gray-600">{marketShare.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Procedure Revenue Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Procedure Type</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Comparative revenue analysis</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-3">
            {data.map((procedure, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                  style={{ 
                    height: `${(procedure.revenue / Math.max(...data.map(p => p.revenue))) * 200}px`,
                    minHeight: '20px'
                  }}
                  title={`${procedure.name}: ${procedure.revenue.toLocaleString()}`}
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
        </CardContent>
      </Card>
    </div>
  );
}

