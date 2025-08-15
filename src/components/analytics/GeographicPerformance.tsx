'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  Building2,
  DollarSign,
  CreditCard,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Filter,
  Globe,
  Target,
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
  Eye,
  BarChart3
} from 'lucide-react';
import { GeographicData } from '@/features/analytics/types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface GeographicPerformanceProps {
  data: GeographicData[];
}

// Enhanced mock data for better visualization
const enhancedGeographicData = [
  { 
    state: 'California', 
    revenue: 785000, 
    clinics: 28, 
    plans: 324, 
    growth: 15.2,
    avgPlanValue: 2423,
    approvalRate: 94.8,
    marketShare: 32.1,
    population: 39538223,
    penetration: 0.82,
    topProcedure: 'Dental Implants',
    riskScore: 'Low'
  },
  { 
    state: 'Texas', 
    revenue: 456000, 
    clinics: 18, 
    plans: 198, 
    growth: 22.1,
    avgPlanValue: 2303,
    approvalRate: 92.3,
    marketShare: 18.6,
    population: 29145505,
    penetration: 0.68,
    topProcedure: 'Orthodontics',
    riskScore: 'Low'
  },
  { 
    state: 'Florida', 
    revenue: 324000, 
    clinics: 12, 
    plans: 145, 
    growth: 8.9,
    avgPlanValue: 2234,
    approvalRate: 89.7,
    marketShare: 13.2,
    population: 21538187,
    penetration: 0.67,
    topProcedure: 'Cosmetic Surgery',
    riskScore: 'Medium'
  },
  { 
    state: 'New York', 
    revenue: 298000, 
    clinics: 14, 
    plans: 134, 
    growth: 11.4,
    avgPlanValue: 2224,
    approvalRate: 91.2,
    marketShare: 12.2,
    population: 19453561,
    penetration: 0.69,
    topProcedure: 'Cardiac Procedures',
    riskScore: 'Low'
  },
  { 
    state: 'Arizona', 
    revenue: 187000, 
    clinics: 8, 
    plans: 89, 
    growth: 18.7,
    avgPlanValue: 2101,
    approvalRate: 93.5,
    marketShare: 7.6,
    population: 7151502,
    penetration: 1.24,
    topProcedure: 'Dental Implants',
    riskScore: 'Low'
  },
  { 
    state: 'Colorado', 
    revenue: 156000, 
    clinics: 6, 
    plans: 72, 
    growth: 12.8,
    avgPlanValue: 2167,
    approvalRate: 90.1,
    marketShare: 6.4,
    population: 5773714,
    penetration: 1.25,
    topProcedure: 'Orthodontics',
    riskScore: 'Medium'
  },
  { 
    state: 'Washington', 
    revenue: 134000, 
    clinics: 5, 
    plans: 61, 
    growth: 25.3,
    avgPlanValue: 2197,
    approvalRate: 95.2,
    marketShare: 5.5,
    population: 7705281,
    penetration: 0.79,
    topProcedure: 'Mental Health',
    riskScore: 'Low'
  },
  { 
    state: 'Oregon', 
    revenue: 98000, 
    clinics: 4, 
    plans: 45, 
    growth: 16.4,
    avgPlanValue: 2178,
    approvalRate: 92.8,
    marketShare: 4.0,
    population: 4237256,
    penetration: 1.06,
    topProcedure: 'Dermatology',
    riskScore: 'Low'
  }
];

const regionData = [
  { region: 'West Coast', revenue: 1017000, growth: 16.8, color: '#3B82F6' },
  { region: 'Southwest', revenue: 643000, growth: 20.4, color: '#10B981' },
  { region: 'Southeast', revenue: 324000, growth: 8.9, color: '#8B5CF6' },
  { region: 'Northeast', revenue: 298000, growth: 11.4, color: '#F59E0B' },
];

const opportunityData = [
  { state: 'Illinois', potential: 'High', reason: 'Large population, low penetration', score: 92 },
  { state: 'Pennsylvania', potential: 'High', reason: 'Growing healthcare market', score: 88 },
  { state: 'Ohio', potential: 'Medium', reason: 'Moderate competition', score: 76 },
  { state: 'Michigan', potential: 'Medium', reason: 'Emerging market', score: 72 },
];

export default function GeographicPerformance({ data }: GeographicPerformanceProps) {
  const [viewMode, setViewMode] = useState<'performance' | 'opportunities' | 'penetration'>('performance');
  const [sortBy, setSortBy] = useState<'revenue' | 'growth' | 'penetration'>('revenue');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const sortedData = useMemo(() => {
    return [...enhancedGeographicData].sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'growth':
          return b.growth - a.growth;
        case 'penetration':
          return b.penetration - a.penetration;
        default:
          return 0;
      }
    });
  }, [sortBy]);

  const totalRevenue = enhancedGeographicData.reduce((sum, state) => sum + state.revenue, 0);
  const totalClinics = enhancedGeographicData.reduce((sum, state) => sum + state.clinics, 0);
  const totalPlans = enhancedGeographicData.reduce((sum, state) => sum + state.plans, 0);
  const avgGrowth = enhancedGeographicData.reduce((sum, state) => sum + state.growth, 0) / enhancedGeographicData.length;

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

  const getOpportunityColor = (potential: string) => {
    switch (potential) {
      case 'High':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderPerformanceView = () => (
    <div className="space-y-8">
      {/* Regional Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {regionData.map((region, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${region.color}15` }}>
                  <Globe className="w-5 h-5" style={{ color: region.color }} />
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">+{region.growth}%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{region.region}</h3>
              <p className="text-2xl font-bold text-gray-900">${(region.revenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500 mt-1">Regional revenue</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* State Performance Table */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">State Performance Rankings</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive metrics by state</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="revenue">Sort by Revenue</option>
                    <option value="growth">Sort by Growth</option>
                    <option value="penetration">Sort by Penetration</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedData.map((state, index) => (
                  <div key={state.state} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">{state.state}</h4>
                            <Badge className={getRiskColor(state.riskScore)} variant="outline">
                              {state.riskScore} Risk
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{state.clinics} clinics • {state.plans} active plans</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${(state.revenue / 1000).toFixed(0)}k</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {state.growth > 0 ? (
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-xs font-medium ${state.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {state.growth > 0 ? '+' : ''}{state.growth}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Avg Plan Value</p>
                        <p className="font-semibold text-gray-900">${state.avgPlanValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Approval Rate</p>
                        <p className="font-semibold text-gray-900">{state.approvalRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Market Penetration</p>
                        <p className="font-semibold text-gray-900">{state.penetration}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Top Procedure</p>
                        <p className="font-semibold text-gray-900 text-xs">{state.topProcedure}</p>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Market Share</span>
                          <span className="text-xs font-medium text-gray-900">{state.marketShare}%</span>
                        </div>
                        <Progress value={state.marketShare} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Approval Rate</span>
                          <span className="text-xs font-medium text-gray-900">{state.approvalRate}%</span>
                        </div>
                        <Progress value={state.approvalRate} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Charts & Insights */}
        <div className="xl:col-span-1 space-y-6">
          {/* Revenue Distribution Chart */}
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue by Region</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Regional distribution breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="revenue"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${(value / 1000).toFixed(0)}k`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }}></div>
                      <span className="text-sm text-gray-700">{region.region}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${(region.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Growth Leaders */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Growth Leaders</CardTitle>
                  <p className="text-sm text-gray-600">Top performing states</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enhancedGeographicData
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 3)
                  .map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-white/50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full text-green-700 text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{state.state}</p>
                          <p className="text-xs text-gray-600">{state.clinics} clinics</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <ArrowUpRight className="w-3 h-3 text-green-500" />
                          <span className="text-sm font-bold text-green-600">+{state.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Geographic Insights</CardTitle>
                  <p className="text-sm text-gray-600">AI-powered recommendations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-white rounded-lg shadow-sm">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Expansion Opportunity</h4>
                      <p className="text-xs text-gray-600 mt-1">Illinois shows 92% growth potential with low current penetration</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-white rounded-lg shadow-sm">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Top Performer</h4>
                      <p className="text-xs text-gray-600 mt-1">Washington leads with 25.3% growth and 95.2% approval rate</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 rounded-xl p-4 border border-white/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-white rounded-lg shadow-sm">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Attention Needed</h4>
                      <p className="text-xs text-gray-600 mt-1">Florida showing slower growth - consider market analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Trends Chart */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Revenue Comparison by State</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Monthly revenue performance across top states</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData.slice(0, 6)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="state" 
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
                <Tooltip 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={(label) => `State: ${label}`}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOpportunitiesView = () => (
    <div className="space-y-8">
      {/* Opportunity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">High Potential</h3>
                <p className="text-sm text-gray-600">Markets ready for expansion</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600 mt-1">States identified</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Revenue Potential</h3>
                <p className="text-sm text-gray-600">Estimated opportunity</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">$2.1M</p>
            <p className="text-sm text-gray-600 mt-1">Annual potential</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Clinic Targets</h3>
                <p className="text-sm text-gray-600">Recommended additions</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600 mt-1">New clinic targets</p>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Expansion Opportunities</CardTitle>
            <p className="text-sm text-gray-600 mt-1">AI-identified markets with high growth potential</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunityData.map((opportunity, index) => (
                <div key={opportunity.state} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{opportunity.state}</h4>
                        <Badge className={getOpportunityColor(opportunity.potential)} variant="outline">
                          {opportunity.potential} Potential
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-gray-900">{opportunity.score}</span>
                        <span className="text-sm text-gray-500">/100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{opportunity.reason}</p>
                  <div className="flex items-center justify-between">
                    <Progress value={opportunity.score} className="flex-1 mr-3" />
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-8">
                      Analyze
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Market Penetration Analysis</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Population vs. current coverage</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enhancedGeographicData.slice(0, 5)} layout="horizontal">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis 
                    type="category" 
                    dataKey="state" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    width={80}
                  />
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Penetration']} />
                  <Bar dataKey="penetration" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Market Leader</span>
                </div>
                <p className="text-xs text-blue-700">Colorado leads with 1.25% market penetration</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Untapped Potential</span>
                </div>
                <p className="text-xs text-amber-700">California has significant room for growth despite high revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPenetrationView = () => (
    <div className="space-y-8">
      {/* Penetration Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Population</h3>
                <p className="text-2xl font-bold text-gray-900">142M</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Across active states</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Avg Penetration</h3>
                <p className="text-2xl font-bold text-gray-900">0.89%</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Market coverage rate</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Growth Rate</h3>
                <p className="text-2xl font-bold text-gray-900">+{avgGrowth.toFixed(1)}%</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Average across states</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-xl">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Market Coverage</h3>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Active states</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Penetration Analysis */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Market Penetration Deep Dive</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Population coverage and growth opportunities by state</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {enhancedGeographicData.map((state, index) => (
              <div key={state.state} className="p-6 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{state.state}</h4>
                      <p className="text-sm text-gray-600">Population: {(state.population / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{state.penetration}%</p>
                    <p className="text-sm text-gray-600">Market penetration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-900">${(state.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Active Plans</p>
                    <p className="font-semibold text-gray-900">{state.plans}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Clinics</p>
                    <p className="font-semibold text-gray-900">{state.clinics}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Growth</p>
                    <div className="flex items-center space-x-1">
                      {state.growth > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`font-semibold ${state.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {state.growth > 0 ? '+' : ''}{state.growth}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Penetration</span>
                    <span className="text-sm font-medium text-gray-900">{state.penetration}%</span>
                  </div>
                  <Progress value={state.penetration * 10} className="h-3" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Current coverage</span>
                    <span>Target: {(state.penetration * 1.5).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Geographic Performance</h2>
          <p className="text-gray-600 mt-1">Regional insights and market opportunities</p>
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
            onClick={() => setViewMode('opportunities')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              viewMode === 'opportunities'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setViewMode('penetration')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              viewMode === 'penetration'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Penetration
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
            <p className="text-xs text-gray-500 mt-1">Across all states</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+12</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Clinics</h3>
            <p className="text-3xl font-bold text-gray-900">{totalClinics}</p>
            <p className="text-xs text-gray-500 mt-1">Partner locations</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+18.3%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Plans</h3>
            <p className="text-3xl font-bold text-gray-900">{totalPlans.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Payment plans</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-teal-100 rounded-xl">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">+0.12%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Penetration</h3>
            <p className="text-3xl font-bold text-gray-900">0.89%</p>
            <p className="text-xs text-gray-500 mt-1">Market coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Content Based on View Mode */}
      {viewMode === 'performance' && renderPerformanceView()}
      {viewMode === 'opportunities' && renderOpportunitiesView()}
      {viewMode === 'penetration' && renderPenetrationView()}
    </div>
  );
}