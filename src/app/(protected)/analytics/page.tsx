'use client'

import React, { useState } from 'react';
import { 
  Download, 
  BarChart3, 
  HelpCircle, 
  AlertTriangle, 
  Search,
  Filter,
  Command,
  TrendingUp,
  Calendar,
  Users,
  Building2
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ModernKPICards from '@/components/analytics/ModernKPICards';
import ModernRevenueChart from '@/components/analytics/ModernRevenueChart';
import ModernHourlyActivity from '@/components/analytics/ModernHourlyActivity';
import ModernWeeklyPerformance from '@/components/analytics/ModernWeeklyPerformance';
import ModernInsightChips from '@/components/analytics/ModernInsightChips';
import ModernQuickActions from '@/components/analytics/ModernQuickActions';
import ModernIssueDrawer from '@/components/analytics/ModernIssueDrawer';
import PaymentPerformanceMetrics from '@/components/analytics/PaymentPerformanceMetrics';
import ClinicPerformanceTable from '@/components/analytics/ClinicPerformanceTable';
import GeographicPerformance from '@/components/analytics/GeographicPerformance';
import ProcedureAnalytics from '@/components/analytics/ProcedureAnalytics';
import RiskAnalysis from '@/components/analytics/RiskAnalysis';
import Predictions from '@/components/analytics/Predictions';
import { useAnalyticsData } from '@/features/analytics/hooks/useAnalyticsData';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6months');
  const [compareMode, setCompareMode] = useState<'off' | 'mom' | 'yoy'>('off');
  const [segment, setSegment] = useState('all');
  const [activeView, setActiveView] = useState('overview');
  const [isIssueDrawerOpen, setIsIssueDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useAnalyticsData();

  const views = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'geographic', name: 'Geographic', icon: Building2 },
    { id: 'procedures', name: 'Procedures', icon: Calendar },
    { id: 'risk', name: 'Risk Analysis', icon: AlertTriangle, badge: '2' },
    { id: 'predictions', name: 'Predictions', icon: Users },
  ];

  const dateRangeOptions = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Clinics' },
    { value: 'top-performers', label: 'Top Performers' },
    { value: 'new-clinics', label: 'New Clinics' },
    { value: 'at-risk', label: 'At Risk' },
  ];

  const renderViewContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-8">
          {/* Skeleton loaders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
          <div className="analytics-grid">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse h-96"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse h-64"></div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse h-64"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse h-48"></div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse h-32"></div>
            </div>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Analytics</h3>
          <p className="text-gray-600">Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      );
    }

    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* KPI Cards - Now First */}
            <ModernKPICards />
            
            {/* Main Content Grid */}
            <div className="analytics-grid">
              {/* Left Column - Charts */}
              <div className="space-y-8">
                <ModernRevenueChart 
                  data={data.revenue} 
                  compareMode={compareMode}
                  onCompareModeChange={setCompareMode}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ModernHourlyActivity data={data.hourly} />
                  <ModernWeeklyPerformance data={data.weekly} />
                </div>
              </div>
              
              {/* Right Column - Insights & Actions */}
              <div className="space-y-6">
                <ModernInsightChips />
                <ModernQuickActions />
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6">
            <PaymentPerformanceMetrics data={data.paymentPerformance} />
            <ClinicPerformanceTable data={data.clinicPerformance} />
          </div>
        );
      case 'geographic':
        return <GeographicPerformance data={data.geographic} />;
      case 'procedures':
        return <ProcedureAnalytics data={data.procedures} />;
      case 'risk':
        return <RiskAnalysis data={data.riskMetrics} />;
      case 'predictions':
        return <Predictions />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Apple-style Large Title with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Advanced Analytics</h1>
          <p className="mt-2 text-lg text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Help & Documentation"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsIssueDrawerOpen(true)}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Issues & Alerts"
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="issue-badge absolute -top-1 -right-1">2</span>
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Search Bar with Command-K Hint */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search analytics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-mono text-gray-500">
            <Command className="w-3 h-3 mr-1" />K
          </kbd>
        </div>
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        {/* Date Range */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Compare Mode */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Compare:</span>
          <div className="segmented-control">
            <button
              onClick={() => setCompareMode('off')}
              className={compareMode === 'off' ? 'active' : ''}
            >
              Off
            </button>
            <button
              onClick={() => setCompareMode('mom')}
              className={compareMode === 'mom' ? 'active' : ''}
            >
              MoM
            </button>
            <button
              onClick={() => setCompareMode('yoy')}
              className={compareMode === 'yoy' ? 'active' : ''}
            >
              YoY
            </button>
          </div>
        </div>

        {/* Segment */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Segment:</span>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {segmentOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <nav className="flex space-x-1 overflow-x-auto">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeView === view.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{view.name}</span>
                {view.badge && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    {view.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      {renderViewContent()}

      {/* Issue Drawer */}
      <ModernIssueDrawer 
        isOpen={isIssueDrawerOpen}
        onClose={() => setIsIssueDrawerOpen(false)}
      />
    </div>
  );
}