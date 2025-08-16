
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ClinicPerformanceData } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClinicPerformanceTableProps {
  data: ClinicPerformanceData[];
}

export default function ClinicPerformanceTable({ data }: ClinicPerformanceTableProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Clinic Performance Comparison</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Detailed metrics across all partner clinics</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-neutral-200">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plans</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Payment</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Rate</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((clinic, index) => (
                <TableRow key={index} className="border-b last:border-0 border-neutral-100 hover:bg-neutral-50/60">
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {clinic.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{clinic.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">${clinic.revenue.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{clinic.plans}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">${clinic.avgPayment.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      clinic.defaultRate < 2 ? 'text-green-600' : 
                      clinic.defaultRate < 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {clinic.defaultRate}%
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {clinic.growth > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        clinic.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {clinic.growth > 0 ? '+' : ''}{clinic.growth}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

