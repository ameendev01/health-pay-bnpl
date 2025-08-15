'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Filter,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Building2,
  Activity,
  Eye,
  RefreshCw,
  Download,
  Bell,
  Gauge,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { RiskMetric } from '@/features/analytics/types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface RiskAnalysisProps {
  data: RiskMetric[];
}

// Enhanced risk data with more comprehensive metrics
const enhancedRiskData = [
  {
    clinic: 'Sunrise Medical Center',
    riskScore: 15,
    trend: -2,
    status: 'low' as const,
    defaultRate: 2.1,
    avgDaysLate: 3.2,
    totalExposure: 125000,
    activePlans: 45,
    riskFactors: ['Payment History', 'Credit Score'],
    lastAssessment: '2024-01-15',
    riskCategory: 'Operational',
    mitigationActions: 2,
    monthlyTrend: [18, 17, 16, 15, 14, 15]
  },
  {
    clinic: 'Valley Health Clinic',
    riskScore: 28,
    trend: 3,
    status: 'medium' as const,
    defaultRate: 3.8,
    avgDaysLate: 5.7,
    totalExposure: 89500,
    activePlans: 32,
    riskFactors: ['Late Payments', 'Economic Factors'],
    lastAssessment: '2024-01-14',
    riskCategory: 'Financial',
    mitigationActions: 1,
    monthlyTrend: [25, 26, 27, 28, 29, 28]
  },
  {
    clinic: 'Metro Dental Care',
    riskScore: 45,
    trend: 8,
    status: 'high' as const,
    defaultRate: 6.2,
    avgDaysLate: 8.9,
    totalExposure: 67800,
    activePlans: 28,
    riskFactors: ['High Default Rate', 'Geographic Risk', 'Market Conditions'],
    lastAssessment: '2024-01-13',
    riskCategory: 'Credit',
    mitigationActions: 4,
    monthlyTrend: [37, 39, 41, 43, 44, 45]
  },
  {
    clinic: 'Family Health Partners',
    riskScore: 22,
    trend: -1,
    status: 'medium' as const,
    defaultRate: 2.9,
    avgDaysLate: 4.1,
    totalExposure: 45200,
    activePlans: 18,
    riskFactors: ['New Clinic', 'Limited History'],
    lastAssessment: '2024-01-16',
    riskCategory: 'Operational',
    mitigationActions: 1,
    monthlyTrend: [23, 22, 23, 22, 21, 22]
  },
  {
    clinic: 'Westside Cardiology',
    riskScore: 12,
    trend: -5,
    status: 'low' as const,
    defaultRate: 1.2,
    avgDaysLate: 2.1,
    totalExposure: 198400,
    activePlans: 67,
    riskFactors: ['Excellent History'],
    lastAssessment: '2024-01-16',
    riskCategory: 'Operational',
    mitigationActions: 0,
    monthlyTrend: [17, 15, 14, 13, 12, 12]
  }
];

const portfolioRiskData = [
  { category: 'Low Risk', value: 68, count: 3, color: '#10B981' },
  { category: 'Medium Risk', value: 27, count: 2, color: '#F59E0B' },
  { category: 'High Risk', value: 5, count: 1, color: '#EF4444' }
];

const riskTrendData = [
  { month: 'Aug', portfolioRisk: 24, newRisks: 3, resolved: 5 },
  { month: 'Sep', portfolioRisk: 22, newRisks: 2, resolved: 4 },
  { month: 'Oct', portfolioRisk: 25, newRisks: 4, resolved: 3 },
  { month: 'Nov', portfolioRisk: 21, newRisks: 2, resolved: 6 },
  { month: 'Dec', portfolioRisk: 19, newRisks: 1, resolved: 4 },
  { month: 'Jan', portfolioRisk: 18, newRisks: 2, resolved: 3 }
];

const riskFactorData = [
  { factor: 'Payment History', impact: 35, frequency: 78, severity: 'Medium' },
  { factor: 'Credit Score', impact: 28, frequency: 45, severity: 'High' },
  { factor: 'Geographic Risk', impact: 22, frequency: 23, severity: 'Low' },
  { factor: 'Economic Factors', impact: 15, frequency: 67, severity: 'Medium' }
];

const alertsData = [
  {
    id: 1,
    type: 'critical',
    title: 'High Default Rate Alert',
    clinic: 'Metro Dental Care',
    description: 'Default rate increased to 6.2% (threshold: 5%)',
    timeAgo: '2 hours ago',
    action: 'Review payment terms',
    priority: 'High'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Late Payment Trend',
    clinic: 'Valley Health Clinic',
    description: 'Average days late increased to 5.7 days',
    timeAgo: '6 hours ago',
    action: 'Implement reminders',
    priority: 'Medium'
  },
  {
    id: 3,
    type: 'info',
    title: 'Risk Score Improvement',
    clinic: 'Westside Cardiology',
    description: 'Risk score decreased by 5 points this month',
    timeAgo: '1 day ago',
    action: 'Document best practices',
    priority: 'Low'
  }
];

export default function RiskAnalysis({ data }: RiskAnalysisProps) {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'trends'>('overview');
  const [sortBy, setSortBy] = useState<'risk' | 'exposure' | 'trend'>('risk');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const sortedRiskData = useMemo(() => {
    let filtered = [...enhancedRiskData];
    
    if (riskFilter !== 'all') {
      filtered = filtered.filter(item => item.status === riskFilter);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'risk':
          return b.riskScore - a.riskScore;
        case 'exposure':
          return b.totalExposure - a.totalExposure;
        case 'trend':
          return b.trend - a.trend;
        default:
          return 0;
      }
    });
  }, [sortBy, riskFilter]);

  const totalExposure = enhancedRiskData.reduce((sum, clinic) => sum + clinic.totalExposure, 0);
  const avgRiskScore = enhancedRiskData.reduce((sum, clinic) => sum + clinic.riskScore, 0) / enhancedRiskData.length;
  const highRiskClinics = enhancedRiskData.filter(clinic => clinic.status === 'high').length;
  const totalMitigationActions = enhancedRiskData.reduce((sum, clinic) => sum + clinic.mitigationActions, 0);

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'high':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const MiniTrendChart = ({ data, color = "#3B82F6" }: { data: number[]; color?: string }) => (
    <div className="w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((value, index) => ({ index, value }))}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderOverviewView = () => (
    <div className="space-y-8">
      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Gauge className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowDownRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">-2.1</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Portfolio Risk Score</h3>
            <p className="text-3xl font-bold text-gray-900">{avgRiskScore.toFixed(1)}</p>
            <p className="text-xs text-gray-500 mt-1">Average across all clinics</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-red-600">{highRiskClinics}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">High Risk Clinics</h3>
            <p className="text-3xl font-bold text-gray-900">{highRiskClinics}</p>
            <p className="text-xs text-gray-500 mt-1">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+5.2%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Exposure</h3>
            <p className="text-3xl font-bold text-gray-900">${(totalExposure / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500 mt-1">Across all payment plans</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-purple-600">{totalMitigationActions}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Mitigations</h3>
            <p className="text-3xl font-bold text-gray-900">{totalMitigationActions}</p>
            <p className="text-xs text-gray-500 mt-1">Risk reduction measures</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Risk Assessment by Clinic */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Clinic Risk Assessment</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive risk scoring and monitoring</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="risk">Sort by Risk Score</option>
                    <option value="exposure">Sort by Exposure</option>
                    <option value="trend">Sort by Trend</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedRiskData.map((clinic, index) => (
                  <div key={clinic.clinic} className="p-6 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-lg font-semibold text-gray-900">{clinic.clinic}</h4>
                            <Badge className={getRiskColor(clinic.status)} variant="outline">
                              {getRiskIcon(clinic.status)}
                              <span className="ml-1">{clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)} Risk</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{clinic.riskCategory} Risk • Last assessed {new Date(clinic.lastAssessment).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div className="text-right mr-4">
                            <p className="text-2xl font-bold text-gray-900">{clinic.riskScore}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {clinic.trend < 0 ? (
                                <ArrowDownRight className="w-3 h-3 text-green-500" />
                              ) : (
                                <ArrowUpRight className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-xs font-medium ${clinic.trend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(clinic.trend)}
                              </span>
                            </div>
                          </div>
                          <MiniTrendChart 
                            data={clinic.monthlyTrend} 
                            color={clinic.status === 'high' ? '#EF4444' : clinic.status === 'medium' ? '#F59E0B' : '#10B981'} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Detailed Risk Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500">Default Rate</p>
                        <p className={`font-semibold ${clinic.defaultRate > 5 ? 'text-red-600' : clinic.defaultRate > 3 ? 'text-amber-600' : 'text-green-600'}`}>
                          {clinic.defaultRate}%
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500">Avg Days Late</p>
                        <p className={`font-semibold ${clinic.avgDaysLate > 7 ? 'text-red-600' : clinic.avgDaysLate > 5 ? 'text-amber-600' : 'text-green-600'}`}>
                          {clinic.avgDaysLate}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500">Total Exposure</p>
                        <p className="font-semibold text-gray-900">${(clinic.totalExposure / 1000).toFixed(0)}k</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500">Active Plans</p>
                        <p className="font-semibold text-gray-900">{clinic.activePlans}</p>
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Primary Risk Factors</p>
                      <div className="flex flex-wrap gap-2">
                        {clinic.riskFactors.map((factor, factorIndex) => (
                          <Badge key={factorIndex} variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        {clinic.mitigationActions > 0 && (
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{clinic.mitigationActions} active mitigation{clinic.mitigationActions !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {clinic.status === 'high' && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Risk Distribution & Alerts */}
        <div className="xl:col-span-1 space-y-6">
          {/* Risk Distribution */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Risk Distribution</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Portfolio risk breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioRiskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolioRiskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Portfolio Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {portfolioRiskData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                      <p className="text-xs text-gray-500">({item.count} clinic{item.count !== 1 ? 's' : ''})</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Portfolio Health</span>
                </div>
                <p className="text-xs text-green-700">68% of portfolio is low risk - excellent diversification</p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Alerts */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Risk Alerts</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Recent risk notifications</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-xl border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {alert.type === 'critical' && <XCircle className="w-4 h-4 text-red-600" />}
                        {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        {alert.type === 'info' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        <span className="text-sm font-semibold">{alert.title}</span>
                      </div>
                      <Badge variant="outline" className={
                        alert.priority === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                        alert.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-blue-100 text-blue-700 border-blue-200'
                      }>
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-xs mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{alert.timeAgo}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        {alert.action}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                  View All Alerts
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Risk Factor Analysis */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Risk Factor Analysis</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Impact and frequency of risk factors across portfolio</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskFactorData.map((factor, index) => (
              <div key={index} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{factor.factor}</h4>
                  <Badge className={
                    factor.severity === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                    factor.severity === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-green-100 text-green-700 border-green-200'
                  } variant="outline">
                    {factor.severity}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Impact Score</span>
                      <span className="text-sm font-medium text-gray-900">{factor.impact}%</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Frequency</span>
                      <span className="text-sm font-medium text-gray-900">{factor.frequency}%</span>
                    </div>
                    <Progress value={factor.frequency} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-8">
      {/* Detailed Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: 'Default Rate', value: '2.8%', change: '-0.5%', icon: XCircle, color: 'red' },
          { title: 'Recovery Rate', value: '94.2%', change: '+2.1%', icon: CheckCircle, color: 'green' },
          { title: 'Avg Days to Default', value: '45.3', change: '+3.2', icon: Clock, color: 'amber' },
          { title: 'Risk-Adjusted Return', value: '12.4%', change: '+1.8%', icon: TrendingUp, color: 'blue' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith('+');
          
          return (
            <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 bg-${metric.color}-100 rounded-xl`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">vs. last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Heatmap */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Risk Exposure Heatmap</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Risk score vs. financial exposure analysis</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {enhancedRiskData.map((clinic) => (
              <div key={clinic.clinic} className="relative">
                <div 
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                    clinic.status === 'high' ? 'bg-red-100 border-red-300' :
                    clinic.status === 'medium' ? 'bg-amber-100 border-amber-300' :
                    'bg-green-100 border-green-300'
                  }`}
                  style={{
                    height: `${Math.max(80, (clinic.totalExposure / 200000) * 120)}px`
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900 mb-1">{clinic.clinic.split(' ')[0]}</p>
                    <p className="text-lg font-bold text-gray-900">{clinic.riskScore}</p>
                    <p className="text-xs text-gray-600">${(clinic.totalExposure / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded border border-green-400"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-300 rounded border border-amber-400"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-300 rounded border border-red-400"></div>
                <span>High Risk</span>
              </div>
            </div>
            <span className="text-xs text-gray-500">Height = Financial Exposure</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTrendsView = () => (
    <div className="space-y-8">
      {/* Risk Trend Chart */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Risk Trends Over Time</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Portfolio risk evolution and mitigation effectiveness</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="portfolioRisk" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  name="Portfolio Risk Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="newRisks" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="New Risks"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Resolved Risks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Risk Reduction</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">-24%</p>
              <p className="text-xs text-blue-700">Over 6 months</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Mitigation Success</span>
              </div>
              <p className="text-2xl font-bold text-green-900">87%</p>
              <p className="text-xs text-green-700">Actions effective</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Active Monitoring</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">24/7</p>
              <p className="text-xs text-purple-700">Real-time alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Prediction Model */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Predictive Risk Model</CardTitle>
                <p className="text-sm text-gray-600">AI-powered risk forecasting</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">30-Day Forecast</h4>
                  <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Stable
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">Portfolio risk expected to remain stable with slight improvement</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Predicted Risk Score</span>
                  <span className="text-lg font-bold text-green-600">16.2</span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Risk Drivers</h4>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200" variant="outline">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Monitor
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Economic Conditions</span>
                    <span className="text-sm font-medium text-amber-600">Medium Impact</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Seasonal Factors</span>
                    <span className="text-sm font-medium text-green-600">Low Impact</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Volatility</span>
                    <span className="text-sm font-medium text-green-600">Low Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Risk Mitigation Strategies</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Recommended actions and their effectiveness</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  strategy: 'Enhanced Credit Screening',
                  effectiveness: 92,
                  implementation: 'Active',
                  impact: 'High',
                  timeframe: '2-4 weeks'
                },
                {
                  strategy: 'Payment Reminder Automation',
                  effectiveness: 78,
                  implementation: 'Planned',
                  impact: 'Medium',
                  timeframe: '1-2 weeks'
                },
                {
                  strategy: 'Risk-Based Pricing',
                  effectiveness: 85,
                  implementation: 'Under Review',
                  impact: 'High',
                  timeframe: '4-6 weeks'
                },
                {
                  strategy: 'Geographic Diversification',
                  effectiveness: 67,
                  implementation: 'Long-term',
                  impact: 'Medium',
                  timeframe: '3-6 months'
                }
              ].map((strategy, index) => (
                <div key={index} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{strategy.strategy}</h4>
                    <Badge className={
                      strategy.implementation === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                      strategy.implementation === 'Planned' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      strategy.implementation === 'Under Review' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    } variant="outline">
                      {strategy.implementation}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Effectiveness</p>
                      <p className="font-semibold text-gray-900">{strategy.effectiveness}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Impact</p>
                      <p className="font-semibold text-gray-900">{strategy.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Timeframe</p>
                      <p className="font-semibold text-gray-900">{strategy.timeframe}</p>
                    </div>
                  </div>
                  
                  <Progress value={strategy.effectiveness} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk Analysis & Management</h2>
          <p className="text-gray-600 mt-1">Comprehensive risk assessment and mitigation strategies</p>
        </div>
        
        {/* View Mode Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'overview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Gauge className="w-4 h-4 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'detailed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Detailed
            </button>
            <button
              onClick={() => setViewMode('trends')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'trends'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <LineChartIcon className="w-4 h-4 mr-2" />
              Trends
            </button>
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Dynamic Content Based on View Mode */}
      {viewMode === 'overview' && renderOverviewView()}
      {viewMode === 'detailed' && renderDetailedView()}
      {viewMode === 'trends' && renderTrendsView()}
    </div>
  );
}