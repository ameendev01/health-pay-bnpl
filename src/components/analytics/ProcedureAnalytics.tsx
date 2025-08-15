'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Filter,
  Target,
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
  Eye,
  BarChart3,
  Heart,
  Stethoscope,
  Brain,
  Bone,
  Smile,
  Search,
  Calendar,
  Clock,
  Star,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { ProcedureData } from '@/features/analytics/types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, Area, AreaChart } from 'recharts';

interface ProcedureAnalyticsProps {
  data: ProcedureData[];
}

// Enhanced procedure data with more detailed metrics
const enhancedProcedureData = [
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    category: 'Dental',
    count: 145,
    revenue: 348000,
    avgAmount: 2400,
    growth: 18.5,
    approvalRate: 96.2,
    avgDuration: 12,
    seasonality: 'High',
    riskScore: 'Low',
    patientSatisfaction: 4.8,
    completionRate: 94.3,
    defaultRate: 2.1,
    avgAge: 45,
    genderSplit: { male: 45, female: 55 },
    topClinics: ['Sunrise Dental', 'Metro Dental Care', 'Valley Orthodontics'],
    monthlyTrend: [28, 32, 35, 38, 42, 45],
    icon: Smile,
    color: '#3B82F6'
  },
  {
    id: 'orthodontic-treatment',
    name: 'Orthodontic Treatment',
    category: 'Dental',
    count: 89,
    revenue: 160200,
    avgAmount: 1800,
    growth: 12.3,
    approvalRate: 94.8,
    avgDuration: 18,
    seasonality: 'Medium',
    riskScore: 'Low',
    patientSatisfaction: 4.6,
    completionRate: 92.1,
    defaultRate: 2.8,
    avgAge: 28,
    genderSplit: { male: 35, female: 65 },
    topClinics: ['Valley Orthodontics', 'Family Dental', 'Smile Center'],
    monthlyTrend: [18, 20, 22, 24, 26, 28],
    icon: Smile,
    color: '#10B981'
  },
  {
    id: 'cardiac-surgery',
    name: 'Cardiac Surgery',
    category: 'Cardiac',
    count: 23,
    revenue: 126500,
    avgAmount: 5500,
    growth: 8.7,
    approvalRate: 89.3,
    avgDuration: 24,
    seasonality: 'Low',
    riskScore: 'Medium',
    patientSatisfaction: 4.9,
    completionRate: 96.8,
    defaultRate: 1.2,
    avgAge: 58,
    genderSplit: { male: 68, female: 32 },
    topClinics: ['Heart Health Center', 'Cardiac Specialists', 'Metro Cardiology'],
    monthlyTrend: [4, 5, 4, 6, 5, 7],
    icon: Heart,
    color: '#EF4444'
  },
  {
    id: 'cosmetic-surgery',
    name: 'Cosmetic Surgery',
    category: 'Cosmetic',
    count: 67,
    revenue: 201000,
    avgAmount: 3000,
    growth: 25.1,
    approvalRate: 91.7,
    avgDuration: 15,
    seasonality: 'High',
    riskScore: 'Medium',
    patientSatisfaction: 4.7,
    completionRate: 89.4,
    defaultRate: 3.5,
    avgAge: 35,
    genderSplit: { male: 25, female: 75 },
    topClinics: ['Aesthetic Center', 'Beauty Clinic', 'Cosmetic Institute'],
    monthlyTrend: [12, 14, 16, 18, 20, 22],
    icon: Star,
    color: '#8B5CF6'
  },
  {
    id: 'orthopedic-surgery',
    name: 'Orthopedic Surgery',
    category: 'Orthopedic',
    count: 54,
    revenue: 162000,
    avgAmount: 3000,
    growth: 15.8,
    approvalRate: 93.2,
    avgDuration: 20,
    seasonality: 'Medium',
    riskScore: 'Low',
    patientSatisfaction: 4.5,
    completionRate: 91.7,
    defaultRate: 2.3,
    avgAge: 52,
    genderSplit: { male: 58, female: 42 },
    topClinics: ['Bone & Joint Center', 'Sports Medicine', 'Orthopedic Institute'],
    monthlyTrend: [8, 9, 10, 12, 14, 16],
    icon: Bone,
    color: '#F59E0B'
  },
  {
    id: 'mental-health',
    name: 'Mental Health Services',
    category: 'Mental Health',
    count: 78,
    revenue: 93600,
    avgAmount: 1200,
    growth: 32.4,
    approvalRate: 97.1,
    avgDuration: 8,
    seasonality: 'Low',
    riskScore: 'Low',
    patientSatisfaction: 4.9,
    completionRate: 95.2,
    defaultRate: 1.8,
    avgAge: 34,
    genderSplit: { male: 40, female: 60 },
    topClinics: ['Wellness Center', 'Mental Health Clinic', 'Therapy Associates'],
    monthlyTrend: [10, 12, 14, 16, 18, 20],
    icon: Brain,
    color: '#06B6D4'
  },
  {
    id: 'dermatology',
    name: 'Dermatology Procedures',
    category: 'Dermatology',
    count: 92,
    revenue: 138000,
    avgAmount: 1500,
    growth: 22.7,
    approvalRate: 95.4,
    avgDuration: 6,
    seasonality: 'High',
    riskScore: 'Low',
    patientSatisfaction: 4.6,
    completionRate: 93.8,
    defaultRate: 2.0,
    avgAge: 41,
    genderSplit: { male: 30, female: 70 },
    topClinics: ['Skin Care Center', 'Dermatology Associates', 'Advanced Skin'],
    monthlyTrend: [14, 16, 18, 20, 22, 24],
    icon: Stethoscope,
    color: '#84CC16'
  },
  {
    id: 'physical-therapy',
    name: 'Physical Therapy',
    category: 'Rehabilitation',
    count: 156,
    revenue: 93600,
    avgAmount: 600,
    growth: -5.2,
    approvalRate: 98.1,
    avgDuration: 4,
    seasonality: 'Low',
    riskScore: 'Low',
    patientSatisfaction: 4.4,
    completionRate: 97.5,
    defaultRate: 1.1,
    avgAge: 48,
    genderSplit: { male: 52, female: 48 },
    topClinics: ['Rehab Center', 'Sports Therapy', 'Recovery Clinic'],
    monthlyTrend: [28, 26, 24, 22, 20, 18],
    icon: Activity,
    color: '#6366F1'
  }
];

const categoryData = [
  { category: 'Dental', procedures: 3, revenue: 508200, growth: 15.3, color: '#3B82F6' },
  { category: 'Cardiac', procedures: 1, revenue: 126500, growth: 8.7, color: '#EF4444' },
  { category: 'Cosmetic', procedures: 1, revenue: 201000, growth: 25.1, color: '#8B5CF6' },
  { category: 'Orthopedic', procedures: 1, revenue: 162000, growth: 15.8, color: '#F59E0B' },
  { category: 'Mental Health', procedures: 1, revenue: 93600, growth: 32.4, color: '#06B6D4' },
  { category: 'Dermatology', procedures: 1, revenue: 138000, growth: 22.7, color: '#84CC16' },
  { category: 'Rehabilitation', procedures: 1, revenue: 93600, growth: -5.2, color: '#6366F1' },
];

const seasonalityData = [
  { month: 'Jan', dental: 45, cosmetic: 12, cardiac: 8, orthopedic: 15 },
  { month: 'Feb', dental: 48, cosmetic: 15, cardiac: 6, orthopedic: 18 },
  { month: 'Mar', dental: 52, cosmetic: 18, cardiac: 7, orthopedic: 20 },
  { month: 'Apr', dental: 58, cosmetic: 22, cardiac: 9, orthopedic: 22 },
  { month: 'May', dental: 62, cosmetic: 28, cardiac: 8, orthopedic: 25 },
  { month: 'Jun', dental: 68, cosmetic: 35, cardiac: 10, orthopedic: 28 },
];

const performanceInsights = [
  {
    type: 'opportunity',
    title: 'Mental Health Surge',
    description: 'Mental health services showing 32% growth - highest in portfolio',
    action: 'Expand mental health partnerships',
    priority: 'high',
    impact: 'Revenue potential: +$180k annually'
  },
  {
    type: 'alert',
    title: 'Physical Therapy Decline',
    description: 'PT procedures down 5.2% - investigate market factors',
    action: 'Analyze competitive landscape',
    priority: 'medium',
    impact: 'Risk: -$25k monthly if trend continues'
  },
  {
    type: 'success',
    title: 'Cosmetic Surgery Peak',
    description: 'Cosmetic procedures at all-time high with 25% growth',
    action: 'Optimize pricing strategy',
    priority: 'low',
    impact: 'Opportunity: Premium pricing potential'
  }
];

export default function ProcedureAnalytics({ data }: ProcedureAnalyticsProps) {
  const [viewMode, setViewMode] = useState<'performance' | 'trends' | 'insights'>('performance');
  const [sortBy, setSortBy] = useState<'revenue' | 'growth' | 'volume' | 'approval'>('revenue');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedData = useMemo(() => {
    let filtered = enhancedProcedureData;
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(proc => proc.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(proc => 
        proc.name.toLowerCase().includes(query) ||
        proc.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'growth':
          return b.growth - a.growth;
        case 'volume':
          return b.count - a.count;
        case 'approval':
          return b.approvalRate - a.approvalRate;
        default:
          return 0;
      }
    });
  }, [sortBy, categoryFilter, searchTerm]);

  const totalRevenue = enhancedProcedureData.reduce((sum, proc) => sum + proc.revenue, 0);
  const totalProcedures = enhancedProcedureData.reduce((sum, proc) => sum + proc.count, 0);
  const avgGrowth = enhancedProcedureData.reduce((sum, proc) => sum + proc.growth, 0) / enhancedProcedureData.length;
  const avgApprovalRate = enhancedProcedureData.reduce((sum, proc) => sum + proc.approvalRate, 0) / enhancedProcedureData.length;

  const categories = ['all', ...Array.from(new Set(enhancedProcedureData.map(p => p.category)))];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeasonalityColor = (seasonality: string) => {
    switch (seasonality) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
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

  const renderPerformanceView = () => (
    <div className="space-y-8">
      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categoryData.slice(0, 4).map((category, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${category.color}15` }}>
                  <Activity className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="flex items-center space-x-1">
                  {category.growth > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.growth > 0 ? '+' : ''}{category.growth}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{category.category}</h3>
              <p className="text-2xl font-bold text-gray-900">${(category.revenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500 mt-1">{category.procedures} procedure{category.procedures !== 1 ? 's' : ''}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Procedure Performance Table */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Procedure Performance Rankings</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive metrics by procedure type</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search procedures..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-48"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                  
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="revenue">Sort by Revenue</option>
                    <option value="growth">Sort by Growth</option>
                    <option value="volume">Sort by Volume</option>
                    <option value="approval">Sort by Approval Rate</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedData.map((procedure, index) => {
                  const Icon = procedure.icon;
                  const marketShare = (procedure.revenue / totalRevenue) * 100;
                  
                  return (
                    <div key={procedure.id} className="p-6 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${procedure.color}15` }}>
                            <Icon className="w-6 h-6" style={{ color: procedure.color }} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="text-lg font-semibold text-gray-900">{procedure.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {procedure.category}
                              </Badge>
                              <Badge className={getRiskColor(procedure.riskScore)} variant="outline">
                                {procedure.riskScore} Risk
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{procedure.count} procedures</span>
                              <span>•</span>
                              <span>Avg: ${procedure.avgAmount.toLocaleString()}</span>
                              <span>•</span>
                              <span>{procedure.avgDuration} months</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${(procedure.revenue / 1000).toFixed(0)}k</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {procedure.growth > 0 ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500" />
                            ) : procedure.growth < 0 ? (
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                            ) : (
                              <ArrowRight className="w-4 h-4 text-gray-500" />
                            )}
                            <span className={`text-sm font-medium ${
                              procedure.growth > 0 ? 'text-green-600' : 
                              procedure.growth < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {procedure.growth > 0 ? '+' : ''}{procedure.growth}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Approval Rate</p>
                          <p className="font-semibold text-gray-900">{procedure.approvalRate}%</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
                          <p className="font-semibold text-gray-900">{procedure.completionRate}%</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Patient Rating</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="font-semibold text-gray-900">{procedure.patientSatisfaction}</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Default Rate</p>
                          <p className={`font-semibold ${procedure.defaultRate < 2 ? 'text-green-600' : procedure.defaultRate < 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {procedure.defaultRate}%
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Avg Patient Age</p>
                          <p className="font-semibold text-gray-900">{procedure.avgAge} years</p>
                        </div>
                      </div>

                      {/* Progress Bars and Trend */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Market Share</span>
                            <span className="text-xs font-medium text-gray-900">{marketShare.toFixed(1)}%</span>
                          </div>
                          <Progress value={marketShare} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Approval Rate</span>
                            <span className="text-xs font-medium text-gray-900">{procedure.approvalRate}%</span>
                          </div>
                          <Progress value={procedure.approvalRate} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-gray-600">6-Month Trend</span>
                            <div className="mt-1">
                              <MiniTrendChart data={procedure.monthlyTrend} color={procedure.color} />
                            </div>
                          </div>
                          <Badge className={getSeasonalityColor(procedure.seasonality)} variant="outline">
                            {procedure.seasonality} Seasonal
                          </Badge>
                        </div>
                      </div>

                      {/* Demographics */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-xs text-gray-600">
                              Gender Split: {procedure.genderSplit.male}% M / {procedure.genderSplit.female}% F
                            </div>
                            <div className="text-xs text-gray-600">
                              Top Clinic: {procedure.topClinics[0]}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-8">
                            View Details
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Charts & Insights */}
        <div className="xl:col-span-1 space-y-6">
          {/* Revenue Distribution */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Category</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Procedure category breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="revenue"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${(value / 1000).toFixed(0)}k`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {categoryData.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm text-gray-700">{category.category}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${(category.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Top Performers</CardTitle>
                  <p className="text-sm text-gray-600">Highest growth procedures</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enhancedProcedureData
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 3)
                  .map((procedure, index) => {
                    const Icon = procedure.icon;
                    return (
                      <div key={procedure.id} className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-white/50">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: `${procedure.color}15` }}>
                            <Icon className="w-4 h-4" style={{ color: procedure.color }} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{procedure.name}</p>
                            <p className="text-xs text-gray-600">{procedure.count} procedures</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                            <span className="text-sm font-bold text-green-600">+{procedure.growth}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Patient Demographics */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Demographics</CardTitle>
                  <p className="text-sm text-gray-600">Patient profile insights</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/70 rounded-lg p-4 border border-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Average Age</span>
                    <span className="text-lg font-bold text-gray-900">42 years</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Range: 28-58 years across all procedures
                  </div>
                </div>
                
                <div className="bg-white/70 rounded-lg p-4 border border-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Gender Distribution</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Female</span>
                      <span className="text-xs font-medium text-gray-900">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Male</span>
                      <span className="text-xs font-medium text-gray-900">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-white/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700">Avg Satisfaction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">4.7</span>
                    <span className="text-sm text-gray-600">/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTrendsView = () => (
    <div className="space-y-8">
      {/* Seasonal Trends Chart */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Seasonal Procedure Trends</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Monthly volume patterns by procedure category</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Dental</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Cosmetic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Cardiac</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Orthopedic</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seasonalityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                <Area type="monotone" dataKey="dental" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="cosmetic" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="cardiac" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                <Area type="monotone" dataKey="orthopedic" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Seasonal Insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Peak Season</span>
              </div>
              <p className="text-lg font-bold text-blue-900">June</p>
              <p className="text-xs text-blue-700">Highest procedure volume month</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Growth Leader</span>
              </div>
              <p className="text-lg font-bold text-green-900">Cosmetic</p>
              <p className="text-xs text-green-700">Strongest seasonal growth pattern</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Trajectory Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Growth Trajectory</CardTitle>
            <p className="text-sm text-gray-600 mt-1">6-month procedure volume trends</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  {enhancedProcedureData.slice(0, 4).map((procedure, index) => (
                    <Line
                      key={procedure.id}
                      type="monotone"
                      dataKey={`trend${index}`}
                      data={procedure.monthlyTrend.map((value, monthIndex) => ({
                        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][monthIndex],
                        [`trend${index}`]: value
                      }))}
                      stroke={procedure.color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name={procedure.name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Performance Metrics</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Key performance indicators</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Average Approval Rate</span>
                  <span className="text-lg font-bold text-gray-900">{avgApprovalRate.toFixed(1)}%</span>
                </div>
                <Progress value={avgApprovalRate} className="h-2" />
                <p className="text-xs text-gray-600 mt-1">Across all procedures</p>
              </div>
              
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Portfolio Growth</span>
                  <span className="text-lg font-bold text-green-600">+{avgGrowth.toFixed(1)}%</span>
                </div>
                <Progress value={Math.abs(avgGrowth) * 3} className="h-2" />
                <p className="text-xs text-gray-600 mt-1">Average across categories</p>
              </div>
              
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Procedures</span>
                  <span className="text-lg font-bold text-gray-900">{totalProcedures.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-600">
                  +{Math.round(totalProcedures * 0.18)} vs. last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInsightsView = () => (
    <div className="space-y-8">
      {/* AI-Powered Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceInsights.map((insight, index) => (
          <Card key={index} className={`border-0 shadow-sm bg-gradient-to-br ${
            insight.type === 'opportunity' ? 'from-blue-50 to-indigo-50 border-blue-100' :
            insight.type === 'alert' ? 'from-amber-50 to-orange-50 border-amber-100' :
            'from-green-50 to-emerald-50 border-green-100'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <Badge variant="outline" className={
                      insight.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                      insight.priority === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="bg-white/70 rounded-lg p-3 border border-white/50 mb-3">
                    <p className="text-xs font-medium text-gray-700">Impact:</p>
                    <p className="text-xs text-gray-600">{insight.impact}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-8 p-0">
                    {insight.action}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Optimization Recommendations */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Optimization Recommendations</CardTitle>
              <p className="text-sm text-gray-600 mt-1">AI-powered suggestions for procedure portfolio optimization</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pricing Optimization */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Pricing Optimization
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-900">Dental Implants</span>
                    <Badge className="bg-green-100 text-green-800">+$200 potential</Badge>
                  </div>
                  <p className="text-xs text-green-700">Market analysis suggests 8% price increase opportunity</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Cosmetic Surgery</span>
                    <Badge className="bg-blue-100 text-blue-800">Premium tier</Badge>
                  </div>
                  <p className="text-xs text-blue-700">Consider premium financing options for high-value procedures</p>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                Risk Management
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-900">Cosmetic Surgery</span>
                    <Badge className="bg-amber-100 text-amber-800">3.5% default</Badge>
                  </div>
                  <p className="text-xs text-amber-700">Higher default rate - consider stricter approval criteria</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-900">Mental Health</span>
                    <Badge className="bg-green-100 text-green-800">1.8% default</Badge>
                  </div>
                  <p className="text-xs text-green-700">Excellent performance - model for other categories</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procedure Lifecycle Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Procedure Lifecycle</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Average duration and completion patterns</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancedProcedureData.slice(0, 5).map((procedure, index) => {
                const Icon = procedure.icon;
                return (
                  <div key={procedure.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${procedure.color}15` }}>
                        <Icon className="w-5 h-5" style={{ color: procedure.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{procedure.name}</p>
                        <p className="text-xs text-gray-600">Completion: {procedure.completionRate}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{procedure.avgDuration} mo</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Patient Satisfaction</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Satisfaction scores by procedure type</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancedProcedureData
                .sort((a, b) => b.patientSatisfaction - a.patientSatisfaction)
                .slice(0, 5)
                .map((procedure, index) => {
                  const Icon = procedure.icon;
                  return (
                    <div key={procedure.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${procedure.color}15` }}>
                          <Icon className="w-5 h-5" style={{ color: procedure.color }} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{procedure.name}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star 
                                key={starIndex}
                                className={`w-3 h-3 ${
                                  starIndex < Math.floor(procedure.patientSatisfaction) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{procedure.patientSatisfaction}</span>
                        <p className="text-xs text-gray-600">/5.0</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Procedure Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive procedure performance and optimization insights</p>
        </div>
        
        {/* View Mode Selector */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('performance')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              viewMode === 'performance'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setViewMode('trends')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              viewMode === 'trends'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setViewMode('insights')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              viewMode === 'insights'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+{avgGrowth.toFixed(1)}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">${(totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500 mt-1">Across all procedures</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+18.3%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Procedures</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProcedures.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Financed procedures</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+2.1%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Approval Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{avgApprovalRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-1">Portfolio average</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-teal-100 rounded-xl">
                <Star className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+0.2</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Patient Satisfaction</h3>
            <p className="text-3xl font-bold text-gray-900">4.7</p>
            <p className="text-xs text-gray-500 mt-1">Average rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Content Based on View Mode */}
      {viewMode === 'performance' && renderPerformanceView()}
      {viewMode === 'trends' && renderTrendsView()}
      {viewMode === 'insights' && renderInsightsView()}
    </div>
  );
}