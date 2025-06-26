'use client'

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  MapPin,
  Target,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Building2,
  CreditCard,
  Zap,
  Eye,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Percent,
  Timer,
  CheckCircle,
  XCircle
} from 'lucide-react';

const chartData = {
  revenue: [
    { month: 'Jan', amount: 185000, plans: 234, clinics: 45 },
    { month: 'Feb', amount: 220000, plans: 287, clinics: 48 },
    { month: 'Mar', amount: 195000, plans: 256, clinics: 52 },
    { month: 'Apr', amount: 260000, plans: 345, clinics: 55 },
    { month: 'May', amount: 245000, plans: 312, clinics: 58 },
    { month: 'Jun', amount: 290000, plans: 398, clinics: 62 },
  ],
  clinicPerformance: [
    { name: 'Sunrise Medical', revenue: 125000, plans: 45, growth: 12.5, defaultRate: 2.1, avgPayment: 2780 },
    { name: 'Valley Health', revenue: 89500, plans: 32, growth: 8.2, defaultRate: 1.8, avgPayment: 2797 },
    { name: 'Metro Dental', revenue: 67800, plans: 28, growth: -2.1, defaultRate: 3.2, avgPayment: 2421 },
    { name: 'Westside Cardiology', revenue: 198400, plans: 67, growth: 15.7, defaultRate: 1.2, avgPayment: 2963 },
    { name: 'Family Health', revenue: 45200, plans: 18, growth: 22.3, defaultRate: 2.8, avgPayment: 2511 },
  ],
  procedures: [
    { name: 'Dental Implants', count: 145, revenue: 348000, avgAmount: 2400, growth: 18.5 },
    { name: 'Orthodontic Treatment', count: 89, revenue: 160200, avgAmount: 1800, growth: 12.3 },
    { name: 'Cardiac Surgery', count: 23, revenue: 126500, avgAmount: 5500, growth: 8.7 },
    { name: 'Cosmetic Surgery', count: 67, revenue: 201000, avgAmount: 3000, growth: 25.1 },
    { name: 'Root Canal', count: 78, revenue: 66300, avgAmount: 850, growth: -5.2 },
  ],
  geographic: [
    { state: 'California', revenue: 785000, clinics: 28, plans: 324, growth: 15.2 },
    { state: 'Texas', revenue: 456000, clinics: 18, plans: 198, growth: 22.1 },
    { state: 'Florida', revenue: 324000, clinics: 12, plans: 145, growth: 8.9 },
    { state: 'New York', revenue: 298000, clinics: 14, plans: 134, growth: 11.4 },
    { state: 'Arizona', revenue: 187000, clinics: 8, plans: 89, growth: 18.7 },
  ],
  paymentPerformance: [
    { metric: 'On-Time Payments', value: 94.2, trend: 2.1, status: 'excellent' },
    { metric: 'Default Rate', value: 2.8, trend: -0.5, status: 'good' },
    { metric: 'Early Payments', value: 18.3, trend: 3.2, status: 'excellent' },
    { metric: 'Late Payments', value: 5.8, trend: -1.2, status: 'good' },
    { metric: 'Collection Rate', value: 97.2, trend: 1.8, status: 'excellent' },
    { metric: 'Average Days Late', value: 3.2, trend: -0.8, status: 'good' },
  ],
  riskMetrics: [
    { clinic: 'Sunrise Medical', riskScore: 15, trend: -2, status: 'low' },
    { clinic: 'Valley Health', riskScore: 28, trend: 3, status: 'medium' },
    { clinic: 'Metro Dental', riskScore: 45, trend: 8, status: 'high' },
    { clinic: 'Family Health', riskScore: 22, trend: -1, status: 'medium' },
    { clinic: 'Westside Cardiology', riskScore: 12, trend: -5, status: 'low' },
  ]
};

const timeAnalytics = {
  hourly: [
    { hour: '9AM', payments: 45, amount: 12500 },
    { hour: '10AM', payments: 67, amount: 18900 },
    { hour: '11AM', payments: 89, amount: 24500 },
    { hour: '12PM', payments: 78, amount: 21200 },
    { hour: '1PM', payments: 56, amount: 15800 },
    { hour: '2PM', payments: 92, amount: 28900 },
    { hour: '3PM', payments: 85, amount: 25600 },
    { hour: '4PM', payments: 73, amount: 19800 },
  ],
  weekly: [
    { day: 'Mon', payments: 234, amount: 67800, completion: 96.2 },
    { day: 'Tue', payments: 287, amount: 78500, completion: 94.8 },
    { day: 'Wed', payments: 298, amount: 82100, completion: 95.6 },
    { day: 'Thu', payments: 267, amount: 74300, completion: 93.2 },
    { day: 'Fri', payments: 189, amount: 52900, completion: 91.8 },
    { day: 'Sat', payments: 145, amount: 41200, completion: 88.5 },
    { day: 'Sun', payments: 98, amount: 28100, completion: 85.2 },
  ]
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('6months');
  const [activeView, setActiveView] = useState('overview');

  const views = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'performance', name: 'Performance', icon: Target },
    { id: 'geographic', name: 'Geographic', icon: MapPin },
    { id: 'procedures', name: 'Procedures', icon: Activity },
    { id: 'risk', name: 'Risk Analysis', icon: AlertTriangle },
    { id: 'predictions', name: 'Predictions', icon: TrendingUp },
  ];

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

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

  const renderOverviewView = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
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

      {/* Revenue Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Revenue & Growth Trends</h2>
              <p className="text-sm text-gray-600 mt-1">Monthly revenue, plans, and clinic growth</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80 flex items-end justify-between space-x-2">
            {chartData.revenue.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full space-y-1">
                  <div 
                    className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-teal-500"
                    style={{ 
                      height: `${(item.amount / Math.max(...chartData.revenue.map(d => d.amount))) * 180}px`,
                      minHeight: '20px'
                    }}
                    title={`Revenue: $${item.amount.toLocaleString()}`}
                  ></div>
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                    style={{ 
                      height: `${(item.plans / Math.max(...chartData.revenue.map(d => d.plans))) * 80}px`,
                      minHeight: '10px'
                    }}
                    title={`Plans: ${item.plans}`}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">{item.month}</p>
                  <p className="text-xs text-gray-600">${(item.amount / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-blue-600">{item.plans} plans</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Payment Plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time-based Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Payment Activity</h3>
            <p className="text-sm text-gray-600 mt-1">Peak payment processing hours</p>
          </div>
          <div className="p-6">
            <div className="h-48 flex items-end justify-between space-x-1">
              {timeAnalytics.hourly.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-300 hover:from-purple-600 hover:to-purple-500"
                    style={{ 
                      height: `${(item.payments / Math.max(...timeAnalytics.hourly.map(d => d.payments))) * 140}px`,
                      minHeight: '8px'
                    }}
                    title={`${item.hour}: ${item.payments} payments, $${item.amount.toLocaleString()}`}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2 transform -rotate-45">{item.hour}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
            <p className="text-sm text-gray-600 mt-1">Payment completion by day of week</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {timeAnalytics.weekly.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-700">{item.day}</div>
                  <div className="flex-1 flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${item.completion}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 w-20 text-right">
                      {item.completion}%
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 w-16 text-right">
                    {item.payments}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceView = () => (
    <div className="space-y-6">
      {/* Payment Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartData.paymentPerformance.map((metric, index) => (
          <div key={index} className={`rounded-xl p-6 border ${getPerformanceColor(metric.status)}`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
              {metric.status === 'excellent' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {metric.status === 'good' && <Target className="w-5 h-5 text-blue-600" />}
              {metric.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
              {metric.status === 'poor' && <XCircle className="w-5 h-5 text-red-600" />}
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                {metric.value}
                {metric.metric.includes('Rate') || metric.metric.includes('Payments') ? '%' : ''}
                {metric.metric.includes('Days') ? ' days' : ''}
              </span>
              <div className="flex items-center space-x-1 pb-1">
                {metric.trend > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(metric.trend)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clinic Performance Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Clinic Performance Comparison</h2>
          <p className="text-sm text-gray-600 mt-1">Detailed metrics across all partner clinics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.clinicPerformance.map((clinic, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {clinic.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{clinic.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">${clinic.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{clinic.plans}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">${clinic.avgPayment.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      clinic.defaultRate < 2 ? 'text-green-600' : 
                      clinic.defaultRate < 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {clinic.defaultRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGeographicView = () => (
    <div className="space-y-6">
      {/* Geographic Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Geographic Performance</h2>
          <p className="text-sm text-gray-600 mt-1">Revenue and growth by state</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {chartData.geographic.map((location, index) => (
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

      {/* Market Share Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="space-y-3">
            {chartData.geographic.map((location, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-20 text-sm text-gray-600">{location.state}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(location.revenue / Math.max(...chartData.geographic.map(l => l.revenue))) * 100}%` 
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
            {chartData.geographic.map((location, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-20 text-sm text-gray-600">{location.state}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(location.clinics / Math.max(...chartData.geographic.map(l => l.clinics))) * 100}%` 
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

  const renderProceduresView = () => (
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
              {chartData.procedures.map((procedure, index) => {
                const totalRevenue = chartData.procedures.reduce((sum, p) => sum + p.revenue, 0);
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
            {chartData.procedures.map((procedure, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-purple-600"
                  style={{ 
                    height: `${(procedure.revenue / Math.max(...chartData.procedures.map(p => p.revenue))) * 200}px`,
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

  const renderRiskView = () => (
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
              {chartData.riskMetrics.map((risk, index) => (
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
                    <span className="text-sm text-gray-600">High Risk</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">5%</span>
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

  const renderPredictionsView = () => (
    <div className="space-y-6">
      {/* Revenue Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Forecasting</h2>
          <p className="text-sm text-gray-600 mt-1">AI-powered revenue predictions for next 6 months</p>
        </div>
        <div className="p-6">
          <div className="h-80 flex items-end justify-between space-x-2">
            {[
              { month: 'Jul', actual: 290000, predicted: null },
              { month: 'Aug', actual: null, predicted: 325000 },
              { month: 'Sep', actual: null, predicted: 340000 },
              { month: 'Oct', actual: null, predicted: 365000 },
              { month: 'Nov', actual: null, predicted: 380000 },
              { month: 'Dec', actual: null, predicted: 395000 },
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full">
                  {item.actual ? (
                    <div 
                      className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg"
                      style={{ 
                        height: `${(item.actual / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Actual: $${item.actual.toLocaleString()}`}
                    ></div>
                  ) : (
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                      style={{ 
                        height: `${(item.predicted! / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Predicted: $${item.predicted!.toLocaleString()}`}
                    ></div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">{item.month}</p>
                  <p className="text-xs text-gray-600">
                    ${((item.actual || item.predicted!) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-600">Actual Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Predicted Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Growth Opportunities</h3>
            <p className="text-sm text-gray-600 mt-1">AI-identified expansion opportunities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">High Growth Potential</span>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Dental implant procedures show 32% growth potential in California market
                </p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended Action</span>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Market Expansion</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Untapped market in Florida with 45% higher average payment values
                </p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Consider</span>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Process Optimization</span>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Automated payment reminders could reduce late payments by 23%
                </p>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Quick Win</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Predictive Metrics</h3>
            <p className="text-sm text-gray-600 mt-1">Key performance indicators forecast</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Expected Growth Rate</span>
                  <span className="text-sm font-bold text-green-600">+18.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Market Penetration</span>
                  <span className="text-sm font-bold text-blue-600">34.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Customer Retention</span>
                  <span className="text-sm font-bold text-teal-600">92.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Risk Score</span>
                  <span className="text-sm font-bold text-orange-600">Low (12.3)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="mt-2 text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <nav className="flex space-x-1 overflow-x-auto">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeView === view.id
                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{view.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Analytics Content */}
      {activeView === 'overview' && renderOverviewView()}
      {activeView === 'performance' && renderPerformanceView()}
      {activeView === 'geographic' && renderGeographicView()}
      {activeView === 'procedures' && renderProceduresView()}
      {activeView === 'risk' && renderRiskView()}
      {activeView === 'predictions' && renderPredictionsView()}
    </div>
  );
}