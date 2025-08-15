'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Activity,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for the redesigned overview
const kpiData = [
  {
    title: "Total BNPL Volume",
    value: "$2.4M",
    change: "+15.2%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs. last month",
    trend: [1.8, 2.1, 1.9, 2.2, 2.0, 2.4],
    target: 2.5,
    status: "on-track"
  },
  {
    title: "Active Payment Plans",
    value: "1,247",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: CreditCard,
    description: "vs. last month",
    trend: [980, 1050, 1120, 1180, 1200, 1247],
    target: 1300,
    status: "on-track"
  },
  {
    title: "Approval Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "vs. last month",
    trend: [91, 92, 93, 93.5, 94, 94.2],
    target: 95,
    status: "near-target"
  },
  {
    title: "Avg. Processing Time",
    value: "2.3 min",
    change: "-18.5%",
    changeType: "positive" as const,
    icon: Clock,
    description: "vs. last month",
    trend: [3.2, 3.0, 2.8, 2.6, 2.4, 2.3],
    target: 2.0,
    status: "needs-attention"
  }
];

const revenueData = [
  { month: 'Jan', bnpl: 185000, insurance: 320000, total: 505000 },
  { month: 'Feb', bnpl: 220000, insurance: 340000, total: 560000 },
  { month: 'Mar', bnpl: 195000, insurance: 315000, total: 510000 },
  { month: 'Apr', bnpl: 260000, insurance: 380000, total: 640000 },
  { month: 'May', bnpl: 245000, insurance: 365000, total: 610000 },
  { month: 'Jun', bnpl: 290000, insurance: 420000, total: 710000 },
];

const procedureData = [
  { name: 'Dental Implants', value: 35, color: '#3B82F6' },
  { name: 'Orthodontics', value: 28, color: '#10B981' },
  { name: 'Cardiac', value: 18, color: '#8B5CF6' },
  { name: 'Cosmetic', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 7, color: '#6B7280' },
];

const clinicPerformance = [
  { name: 'Sunrise Medical', volume: 125000, plans: 45, growth: 12.5, status: 'excellent' },
  { name: 'Valley Health', volume: 89500, plans: 32, growth: 8.2, status: 'good' },
  { name: 'Metro Dental', volume: 67800, plans: 28, growth: -2.1, status: 'needs-attention' },
  { name: 'Heart Specialists', volume: 198400, plans: 67, growth: 15.7, status: 'excellent' },
];

const insights = [
  {
    type: 'opportunity',
    title: 'Peak Performance Window',
    description: 'Tuesdays 2-4 PM show 32% higher approval rates',
    action: 'Schedule high-value procedures',
    priority: 'high'
  },
  {
    type: 'alert',
    title: 'Payment Trend Alert',
    description: '3 clinics showing increased late payments',
    action: 'Review payment terms',
    priority: 'medium'
  },
  {
    type: 'success',
    title: 'Milestone Achieved',
    description: 'Exceeded monthly BNPL target by 15%',
    action: 'Celebrate success',
    priority: 'low'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'good':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'needs-attention':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'on-track':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'near-target':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'opportunity':
      return <Target className="w-5 h-5 text-blue-600" />;
    case 'alert':
      return <AlertCircle className="w-5 h-5 text-amber-600" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    default:
      return <Activity className="w-5 h-5 text-gray-600" />;
  }
};

const MiniSparkline = ({ data, color = "#3B82F6" }: { data: number[]; color?: string }) => (
  <div className="w-16 h-8">
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

export default function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Hero KPI Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-gray-600 mt-1">Key metrics and insights for clinical decision-making</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
          </div>
        </div>

        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const isPositive = kpi.changeType === 'positive';
            
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  {/* Status Indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <Badge className={getStatusColor(kpi.status)} variant="outline">
                      {kpi.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Value */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                    <div className="flex items-end space-x-3">
                      <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                      <div className="flex items-center space-x-1 pb-1">
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>

                  {/* Mini Trend */}
                  <div className="mt-4 flex items-center justify-between">
                    <MiniSparkline data={kpi.trend} color={isPositive ? "#10B981" : "#EF4444"} />
                    <span className="text-xs text-gray-400">
                      Target: {typeof kpi.target === 'string' ? kpi.target : `${kpi.target}${kpi.title.includes('Rate') ? '%' : kpi.title.includes('Time') ? ' min' : ''}`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Primary Column - Revenue & Trends */}
        <div className="xl:col-span-2 space-y-8">
          {/* Revenue Trends Chart */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Revenue Composition</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">BNPL vs. Insurance revenue trends</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">BNPL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-600">Insurance</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Bar dataKey="insurance" stackId="a" fill="#E5E7EB" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="bnpl" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Revenue Insights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">BNPL Growth</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">+32%</p>
                  <p className="text-xs text-blue-700">vs. last quarter</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Conversion Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">87.3%</p>
                  <p className="text-xs text-green-700">with financing option</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Avg Plan Value</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">$2,156</p>
                  <p className="text-xs text-purple-700">per financing plan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Clinics */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Top Performing Clinics</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Ranked by BNPL volume and growth</p>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clinicPerformance.map((clinic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{clinic.name}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">{clinic.plans} active plans</span>
                          <Badge className={getStatusColor(clinic.status)} variant="outline">
                            {clinic.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(clinic.volume / 1000).toFixed(0)}k</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {clinic.growth > 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${clinic.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {clinic.growth > 0 ? '+' : ''}{clinic.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Column - Insights & Quick Actions */}
        <div className="xl:col-span-1 space-y-8">
          {/* Procedure Distribution */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Procedure Mix</CardTitle>
              <p className="text-sm text-gray-600 mt-1">BNPL usage by procedure type</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={procedureData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {procedureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {procedureData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI-Powered Insights */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Smart Insights</CardTitle>
                  <p className="text-sm text-gray-600">AI-powered recommendations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/50">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 bg-white rounded-lg shadow-sm">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
                        <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs text-blue-600 hover:text-blue-700">
                          {insight.action}
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-gray-50">
                  <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Create Payment Plan</p>
                    <p className="text-xs text-gray-500">Set up new patient financing</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-gray-50">
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Review Approvals</p>
                    <p className="text-xs text-gray-500">23 pending approvals</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12 bg-white hover:bg-gray-50">
                  <AlertCircle className="w-5 h-5 mr-3 text-amber-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Overdue Payments</p>
                    <p className="text-xs text-gray-500">9 require attention</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Section - Recent Activity */}
      <section>
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Latest approvals and transactions across all clinics</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All Activity
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'approval', patient: 'Sarah Johnson', amount: '$3,200', clinic: 'Sunrise Dental', time: '2 min ago', status: 'approved' },
                { type: 'payment', patient: 'Michael Chen', amount: '$250', clinic: 'Valley Health', time: '8 min ago', status: 'completed' },
                { type: 'plan', patient: 'Emma Rodriguez', amount: '$1,800', clinic: 'Metro Dental', time: '15 min ago', status: 'active' },
              ].map((activity, index) => (
                <div key={index} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={
                      activity.type === 'approval' ? 'bg-green-50 text-green-700 border-green-200' :
                      activity.type === 'payment' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-purple-50 text-purple-700 border-purple-200'
                    }>
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{activity.patient}</h4>
                  <p className="text-sm text-gray-600">{activity.clinic}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">{activity.amount}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">{activity.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}