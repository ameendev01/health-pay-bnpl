
import React from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, XCircle, Clock, TrendingDown } from 'lucide-react';
import { RiskMetric } from '@/features/analytics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskAnalysisProps {
  data: RiskMetric[];
}

const getRiskColor = (status: string) => {
  switch (status) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export default function RiskAnalysis({ data }: RiskAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Risk Assessment by Clinic</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Default risk scoring and monitoring</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{risk.clinic}</p>
                      <p className="text-sm text-gray-600">Risk Assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.status)}`}>
                        {risk.riskScore}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{risk.status} risk</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {risk.trend < 0 ? (
                        <ArrowDownRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        risk.trend < 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(risk.trend)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Risk Distribution</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Portfolio risk breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Low Risk</span>
                        <span className="text-sm font-medium text-gray-900">68%</span>
                    </div>
                    <Progress value={68} indicatorClassName="bg-green-500" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Medium Risk</span>
                        <span className="text-sm font-medium text-gray-900">27%</span>
                    </div>
                    <Progress value={27} indicatorClassName="bg-yellow-500" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">High Risk</span>
                        <span className="text-sm font-medium text-gray-900">5%</span>
                    </div>
                    <Progress value={5} indicatorClassName="bg-red-500" />
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Early Warning Indicators</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Potential issues requiring attention</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Late Payments</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">23</p>
              <p className="text-sm text-yellow-700">Payments overdue 5 days</p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Failed Payments</span>
              </div>
              <p className="text-2xl font-bold text-red-900">7</p>
              <p className="text-sm text-red-700">Payment failures this week</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">At Risk Plans</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">41</p>
              <p className="text-sm text-orange-700">Plans with missed payments</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Declining Clinics</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">3</p>
              <p className="text-sm text-blue-700">Clinics with negative growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

