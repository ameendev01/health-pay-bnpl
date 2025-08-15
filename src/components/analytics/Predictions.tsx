'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Calendar,
  DollarSign,
  Users,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Lightbulb,
  Sparkles,
  Eye,
  Download,
  RefreshCw,
  Filter,
  Settings,
  Globe,
  CreditCard,
  Shield,
  Award,
  Gauge
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Area,
  AreaChart,
  ComposedChart,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

// Comprehensive prediction data
const revenueForecasts = [
  { month: 'Feb', actual: 290000, predicted: null, confidence: null },
  { month: 'Mar', actual: null, predicted: 325000, confidence: 92, scenario: 'optimistic' },
  { month: 'Apr', actual: null, predicted: 340000, confidence: 89, scenario: 'base' },
  { month: 'May', actual: null, predicted: 365000, confidence: 85, scenario: 'base' },
  { month: 'Jun', actual: null, predicted: 380000, confidence: 82, scenario: 'conservative' },
  { month: 'Jul', actual: null, predicted: 395000, confidence: 78, scenario: 'optimistic' },
];

const scenarioData = [
  { scenario: 'Conservative', revenue: 1850000, probability: 85, growth: 12, plans: 2100 },
  { scenario: 'Base Case', revenue: 2150000, probability: 70, growth: 18, plans: 2450 },
  { scenario: 'Optimistic', revenue: 2450000, probability: 45, growth: 25, plans: 2800 },
];

const kpiPredictions = [
  {
    metric: 'Revenue Growth',
    current: 15.2,
    predicted: 18.5,
    confidence: 87,
    trend: 'up',
    timeframe: '3 months',
    factors: ['Market expansion', 'New procedures', 'Clinic growth'],
    impact: 'High'
  },
  {
    metric: 'Default Rate',
    current: 2.8,
    predicted: 2.3,
    confidence: 92,
    trend: 'down',
    timeframe: '6 months',
    factors: ['Enhanced screening', 'Economic stability', 'Payment automation'],
    impact: 'Medium'
  },
  {
    metric: 'Approval Rate',
    current: 94.2,
    predicted: 96.1,
    confidence: 78,
    trend: 'up',
    timeframe: '4 months',
    factors: ['AI improvements', 'Risk model updates', 'Process optimization'],
    impact: 'High'
  },
  {
    metric: 'Avg Plan Value',
    current: 2156,
    predicted: 2340,
    confidence: 83,
    trend: 'up',
    timeframe: '5 months',
    factors: ['Premium procedures', 'Market positioning', 'Clinic partnerships'],
    impact: 'Medium'
  },
];

const marketOpportunities = [
  {
    opportunity: 'Dental Implant Expansion',
    market: 'California',
    potential: 850000,
    probability: 78,
    timeframe: '6-9 months',
    requirements: ['3 new clinic partnerships', 'Marketing investment'],
    roi: 245,
    riskLevel: 'Low'
  },
  {
    opportunity: 'Cardiac Procedure Growth',
    market: 'Texas',
    potential: 650000,
    probability: 65,
    timeframe: '9-12 months',
    requirements: ['Specialist recruitment', 'Equipment financing'],
    roi: 180,
    riskLevel: 'Medium'
  },
  {
    opportunity: 'Cosmetic Surgery Entry',
    market: 'Florida',
    potential: 420000,
    probability: 55,
    timeframe: '12-18 months',
    requirements: ['Regulatory compliance', 'Premium positioning'],
    roi: 320,
    riskLevel: 'High'
  },
];

const riskFactors = [
  {
    factor: 'Economic Recession',
    probability: 25,
    impact: 'High',
    mitigation: 'Diversify procedure mix',
    timeline: 'Next 12 months'
  },
  {
    factor: 'Regulatory Changes',
    probability: 40,
    impact: 'Medium',
    mitigation: 'Compliance monitoring',
    timeline: 'Next 6 months'
  },
  {
    factor: 'Competition Increase',
    probability: 70,
    impact: 'Medium',
    mitigation: 'Enhance value proposition',
    timeline: 'Ongoing'
  },
  {
    factor: 'Technology Disruption',
    probability: 35,
    impact: 'High',
    mitigation: 'Innovation investment',
    timeline: 'Next 18 months'
  },
];

const aiInsights = [
  {
    type: 'revenue',
    title: 'Q2 Revenue Acceleration',
    description: 'Model predicts 32% revenue increase in Q2 driven by dental implant procedures',
    confidence: 89,
    action: 'Prepare capacity expansion',
    priority: 'High',
    impact: '$450k additional revenue'
  },
  {
    type: 'risk',
    title: 'Default Rate Optimization',
    description: 'Enhanced screening could reduce default rate to 1.8% within 6 months',
    confidence: 76,
    action: 'Implement AI screening',
    priority: 'Medium',
    impact: '35% risk reduction'
  },
  {
    type: 'market',
    title: 'Geographic Expansion Window',
    description: 'Illinois market shows optimal entry conditions for next 8 months',
    confidence: 82,
    action: 'Initiate market research',
    priority: 'High',
    impact: '$1.2M market opportunity'
  },
  {
    type: 'operational',
    title: 'Processing Time Improvement',
    description: 'Workflow optimization could reduce approval time to 45 seconds',
    confidence: 94,
    action: 'Deploy automation',
    priority: 'Medium',
    impact: '40% efficiency gain'
  },
];

export default function Predictions() {
  const [viewMode, setViewMode] = useState<'forecasts' | 'scenarios' | 'opportunities' | 'risks'>('forecasts');
  const [timeframe, setTimeframe] = useState<'3months' | '6months' | '12months'>('6months');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filteredInsights = useMemo(() => {
    return aiInsights.filter(insight => {
      if (confidenceFilter === 'high') return insight.confidence >= 80;
      if (confidenceFilter === 'medium') return insight.confidence >= 60 && insight.confidence < 80;
      return true;
    });
  }, [confidenceFilter]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (confidence >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (confidence >= 55) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'risk': return <Shield className="w-4 h-4 text-amber-600" />;
      case 'market': return <Globe className="w-4 h-4 text-blue-600" />;
      case 'operational': return <Zap className="w-4 h-4 text-purple-600" />;
      default: return <Brain className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderForecastsView = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Revenue Forecast Chart - Takes 8 columns */}
      <div className="col-span-12 xl:col-span-8">
        <Card className="h-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Revenue Forecast Model</CardTitle>
                <p className="text-sm text-gray-600 mt-1">AI-powered 6-month revenue predictions with confidence intervals</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Model v2.1
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueForecasts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `$${value?.toLocaleString()}`, 
                      name === 'actual' ? 'Actual Revenue' : 'Predicted Revenue'
                    ]}
                  />
                  <Bar dataKey="actual" fill="#10B981" name="actual" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" name="predicted" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            {/* Compact forecast summary */}
            <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Next Month</p>
                <p className="text-xl font-bold text-gray-900">$325k</p>
                <p className="text-xs text-green-600">+12% vs current</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">6-Month Total</p>
                <p className="text-xl font-bold text-gray-900">$2.1M</p>
                <p className="text-xs text-blue-600">92% confidence</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-xl font-bold text-gray-900">+18.5%</p>
                <p className="text-xs text-purple-600">Accelerating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Predictions - Takes 4 columns */}
      <div className="col-span-12 xl:col-span-4 space-y-4">
        {kpiPredictions.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">{kpi.metric}</h4>
                <Badge className={getConfidenceColor(kpi.confidence)} variant="outline">
                  {kpi.confidence}%
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-lg font-bold text-gray-900">
                    {typeof kpi.current === 'number' && kpi.current > 100 ? 
                      `$${kpi.current.toLocaleString()}` : 
                      `${kpi.current}${kpi.metric.includes('Rate') ? '%' : ''}`
                    }
                  </p>
                </div>
                <div className="flex items-center">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Predicted</p>
                  <p className="text-lg font-bold text-blue-600">
                    {typeof kpi.predicted === 'number' && kpi.predicted > 100 ? 
                      `$${kpi.predicted.toLocaleString()}` : 
                      `${kpi.predicted}${kpi.metric.includes('Rate') ? '%' : ''}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-2">
                <span className="font-medium">{kpi.timeframe}</span> • {kpi.impact} impact
              </div>
              
              <div className="flex flex-wrap gap-1">
                {kpi.factors.slice(0, 2).map((factor, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    {factor}
                  </Badge>
                ))}
                {kpi.factors.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    +{kpi.factors.length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights - Full width, compact */}
      <div className="col-span-12">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">AI-Powered Insights</CardTitle>
                  <p className="text-sm text-gray-600">Machine learning predictions and recommendations</p>
                </div>
              </div>
              <select
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value as any)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              >
                <option value="all">All Confidence</option>
                <option value="high">High (80%+)</option>
                <option value="medium">Medium (60-79%)</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredInsights.map((insight, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/50 hover:bg-white/90 transition-all duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      {getInsightIcon(insight.type)}
                    </div>
                    <Badge className={getConfidenceColor(insight.confidence)} variant="outline">
                      {insight.confidence}%
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className={
                      insight.priority === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                      'bg-blue-100 text-blue-700 border-blue-200'
                    } variant="outline">
                      {insight.priority}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600">
                      Act
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-1">{insight.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderScenariosView = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Scenario Comparison - 8 columns */}
      <div className="col-span-12 xl:col-span-8">
        <Card className="h-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">Scenario Planning & Analysis</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Compare different business scenarios and their projected outcomes</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {scenarioData.map((scenario, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  scenario.scenario === 'Base Case' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50/50'
                }`}>
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{scenario.scenario}</h4>
                        {scenario.scenario === 'Base Case' && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{scenario.probability}% probability</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-lg font-bold text-gray-900">${(scenario.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Growth</p>
                      <p className="text-lg font-bold text-green-600">+{scenario.growth}%</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Plans</p>
                      <p className="text-lg font-bold text-gray-900">{scenario.plans.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-center">
                      <Progress value={scenario.probability} className="mb-1" />
                      <p className="text-xs text-gray-600">Confidence</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scenario Impact Summary */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Best Case Impact</span>
                </div>
                <p className="text-lg font-bold text-green-900">+$600k</p>
                <p className="text-xs text-green-700">vs. base case</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Expected Outcome</span>
                </div>
                <p className="text-lg font-bold text-blue-900">$2.15M</p>
                <p className="text-xs text-blue-700">70% probability</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Risk Exposure</span>
                </div>
                <p className="text-lg font-bold text-amber-900">-$300k</p>
                <p className="text-xs text-amber-700">worst case scenario</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Drivers - 4 columns */}
      <div className="col-span-12 xl:col-span-4">
        <Card className="h-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">Key Drivers</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Factors influencing predictions</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { driver: 'Market Expansion', impact: 85, trend: 'up' },
                { driver: 'Clinic Partnerships', impact: 72, trend: 'up' },
                { driver: 'Economic Conditions', impact: 45, trend: 'stable' },
                { driver: 'Competition', impact: 38, trend: 'down' },
                { driver: 'Regulatory Changes', impact: 25, trend: 'stable' },
                { driver: 'Technology Adoption', impact: 67, trend: 'up' }
              ].map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{driver.driver}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={driver.impact} className="flex-1 h-1.5" />
                      <span className="text-xs text-gray-600 w-8">{driver.impact}%</span>
                    </div>
                  </div>
                  <div className="ml-2">
                    {driver.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-green-500" />}
                    {driver.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-red-500" />}
                    {driver.trend === 'stable' && <div className="w-3 h-0.5 bg-gray-400 rounded" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOpportunitiesView = () => (
    <div className="space-y-6">
      {/* Opportunity Cards - Compact grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {marketOpportunities.map((opportunity, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">{opportunity.opportunity}</h4>
                <Badge className={getRiskColor(opportunity.riskLevel)} variant="outline">
                  {opportunity.riskLevel}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Market</span>
                  <span className="text-sm font-medium text-gray-900">{opportunity.market}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Revenue Potential</span>
                  <span className="text-sm font-bold text-green-600">${(opportunity.potential / 1000).toFixed(0)}k</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">ROI</span>
                  <span className="text-sm font-bold text-blue-600">{opportunity.roi}%</span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Probability</span>
                    <span className="text-xs font-medium text-gray-900">{opportunity.probability}%</span>
                  </div>
                  <Progress value={opportunity.probability} className="h-1.5" />
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.requirements.map((req, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">{opportunity.timeframe}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600">
                    Analyze
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Analysis Chart */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Market Opportunity Analysis</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Revenue potential vs. implementation probability</p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Detailed Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketOpportunities} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="opportunity" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue Potential']}
                />
                <Bar dataKey="potential" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRisksView = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Risk Factors - 8 columns */}
      <div className="col-span-12 xl:col-span-8">
        <Card className="h-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">Predictive Risk Assessment</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Potential risks and their impact on business objectives</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {riskFactors.map((risk, index) => (
                <div key={index} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="col-span-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{risk.factor}</h4>
                      <p className="text-xs text-gray-600 mt-1">{risk.timeline}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Probability</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={risk.probability} className="flex-1 h-2" />
                        <span className="text-sm font-bold text-gray-900 w-8">{risk.probability}%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Impact</p>
                      <Badge className={
                        risk.impact === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                        risk.impact === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-green-100 text-green-700 border-green-200'
                      } variant="outline">
                        {risk.impact}
                      </Badge>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Mitigation Strategy</p>
                      <p className="text-sm font-medium text-gray-900">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary - 4 columns */}
      <div className="col-span-12 xl:col-span-4 space-y-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Risk Summary</CardTitle>
                <p className="text-sm text-gray-600">Overall risk assessment</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-3 border border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Portfolio Risk Score</span>
                  <span className="text-lg font-bold text-amber-600">42.5</span>
                </div>
                <Progress value={42.5} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Medium risk level</p>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Mitigation Coverage</span>
                  <span className="text-lg font-bold text-green-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Risks with active mitigation</p>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Early Warning</span>
                  <span className="text-lg font-bold text-blue-600">15 days</span>
                </div>
                <p className="text-xs text-gray-500">Average prediction lead time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">Risk Actions</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Recommended immediate actions</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { action: 'Review high-risk clinics', priority: 'High', due: '2 days' },
                { action: 'Update screening criteria', priority: 'Medium', due: '1 week' },
                { action: 'Diversify procedure mix', priority: 'Low', due: '1 month' }
              ].map((action, index) => (
                <div key={index} className="p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{action.action}</p>
                    <Badge className={
                      action.priority === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                      action.priority === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-green-100 text-green-700 border-green-200'
                    } variant="outline">
                      {action.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Due: {action.due}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600">
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Compact Header with View Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Predictive Analytics</h2>
          <p className="text-gray-600 mt-1">AI-powered forecasts and business intelligence</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Compact View Selector */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('forecasts')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'forecasts' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Forecasts
            </button>
            <button
              onClick={() => setViewMode('scenarios')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'scenarios' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Scenarios
            </button>
            <button
              onClick={() => setViewMode('opportunities')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'opportunities' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Target className="w-4 h-4 mr-1" />
              Opportunities
            </button>
            <button
              onClick={() => setViewMode('risks')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                viewMode === 'risks' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Risks
            </button>
          </div>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="12months">12 Months</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Dynamic Content Based on View Mode */}
      {viewMode === 'forecasts' && renderForecastsView()}
      {viewMode === 'scenarios' && renderScenariosView()}
      {viewMode === 'opportunities' && renderOpportunitiesView()}
      {viewMode === 'risks' && renderRisksView()}
    </div>
  );
}