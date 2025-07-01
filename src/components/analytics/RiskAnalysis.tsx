import React from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, XCircle, Clock, TrendingDown } from 'lucide-react';
import { RiskMetric } from '@/features/analytics/types';

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
      {/* Risk Assessment Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment by Clinic</h3>
            <p className="text-sm text-gray-600 mt-1">Default risk scoring and monitoring</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
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
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Risk Distribution</h3>
            <p className="text-sm text-gray-600 mt-1">Portfolio risk breakdown</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-green-200"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ 
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 50% 50%)'
                  }}></div>
                  <div className="absolute inset-2 rounded-full border-6 border-yellow-500" style={{ 
                    clipPath: 'polygon(50% 50%, 100% 30%, 100% 70%, 50% 50%)'
                  }}></div>
                  <div className="absolute inset-4 rounded-full border-4 border-red-500" style={{ 
                    clipPath: 'polygon(50% 50%, 100% 70%, 100% 100%, 50% 100%, 50% 50%)'
                  }}></div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">Portfolio</p>
                    <p className="text-sm text-gray-600">Risk Score</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Low Risk</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Medium Risk</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">27%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Early Warning Indicators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Early Warning Indicators</h3>
          <p className="text-sm text-gray-600 mt-1">Potential issues requiring attention</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Late Payments</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">23</p>
              <p className="text-sm text-yellow-700">Payments overdue 5 days</p>
            </div>
            
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Failed Payments</span>
              </div>
              <p className="text-2xl font-bold text-red-900">7</p>
              <p className="text-sm text-red-700">Payment failures this week</p>
            </div>
            
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">At Risk Plans</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">41</p>
              <p className="text-sm text-orange-700">Plans with missed payments</p>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Declining Clinics</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">3</p>
              <p className="text-sm text-blue-700">Clinics with negative growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
