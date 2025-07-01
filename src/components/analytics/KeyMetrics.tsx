import React from 'react';
import { DollarSign, CreditCard, CheckCircle, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$1.4M</p>
          </div>
          <div className="p-3 bg-teal-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-teal-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-green-600 text-sm font-medium">+12.5%</span>
          <span className="text-gray-500 text-sm">vs last period</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Plans</p>
            <p className="text-2xl font-bold text-gray-900">3,247</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-green-600 text-sm font-medium">+23.1%</span>
          <span className="text-gray-500 text-sm">vs last period</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-2xl font-bold text-gray-900">94.2%</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-green-600 text-sm font-medium">+2.1%</span>
          <span className="text-gray-500 text-sm">vs last period</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Avg Plan Value</p>
            <p className="text-2xl font-bold text-gray-900">$2,156</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-green-600 text-sm font-medium">+8.2%</span>
          <span className="text-gray-500 text-sm">vs last period</span>
        </div>
      </div>
    </div>
  );
}
