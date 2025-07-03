'use client'

import React, { useState } from 'react';
import { Download, BarChart3, Target, MapPin, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import KeyMetrics from '@/components/analytics/KeyMetrics';
import RevenueChart from '@/components/analytics/RevenueChart';
import HourlyPaymentActivity from '@/components/analytics/HourlyPaymentActivity';
import WeeklyPerformance from '@/components/analytics/WeeklyPerformance';
import PaymentPerformanceMetrics from '@/components/analytics/PaymentPerformanceMetrics';
import ClinicPerformanceTable from '@/components/analytics/ClinicPerformanceTable';
import GeographicPerformance from '@/components/analytics/GeographicPerformance';
import ProcedureAnalytics from '@/components/analytics/ProcedureAnalytics';
import RiskAnalysis from '@/components/analytics/RiskAnalysis';
import Predictions from '@/components/analytics/Predictions';
import { useAnalyticsData } from '@/features/analytics/hooks/useAnalyticsData';
import KeyInsights from '@/components/analytics/KeyInsights';
import ClinicViewModal from '@/components/ClinicViewModal';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('6months');
  const [activeView, setActiveView] = useState('overview');
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { data, isLoading, error } = useAnalyticsData();

  const views = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'performance', name: 'Performance', icon: Target },
    { id: 'geographic', name: 'Geographic', icon: MapPin },
    { id: 'procedures', name: 'Procedures', icon: Activity },
    { id: 'risk', name: 'Risk Analysis', icon: AlertTriangle },
    { id: 'predictions', name: 'Predictions', icon: TrendingUp },
  ];

  const handleViewClinic = (clinic: any) => {
    // Transform the clinic data to match the expected format
    const clinicData = {
      id: clinic.id,
      name: clinic.name,
      type: clinic.type,
      location: clinic.location,
      phone: clinic.phone,
      email: clinic.email,
      status: clinic.status,
      totalPlans: clinic.totalPlans,
      monthlyRevenue: clinic.monthlyRevenue,
      joinDate: new Date().toISOString().split('T')[0], // Mock join date
      rating: clinic.rating || 0,
      patients: Math.floor(Math.random() * 1000) + 500, // Mock patient count
      growth: `${clinic.growth > 0 ? '+' : ''}${clinic.growth}%`
    };
    
    setSelectedClinic(clinicData);
    setIsViewModalOpen(true);
  };

  const renderViewContent = () => {
    if (isLoading) {
      return <div>Loading analytics data...</div>; // Replace with a proper loading spinner
    }
    if (error) {
      return <div>Error loading analytics data.</div>; // Replace with a proper error component
    }

    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <KeyInsights />
            <KeyMetrics />
            <RevenueChart data={data.revenue} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HourlyPaymentActivity data={data.hourly} />
              <WeeklyPerformance data={data.weekly} />
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6">
            <PaymentPerformanceMetrics data={data.paymentPerformance} />
            <ClinicPerformanceTable data={data.clinicPerformance} onViewClinic={handleViewClinic} />
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
    <div className="space-y-6">
      <PageHeader title="Advanced Analytics" description="Comprehensive insights and performance metrics">
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
      </PageHeader>

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

      {renderViewContent()}

      {/* Clinic View Modal */}
      <ClinicViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedClinic(null);
        }}
        clinic={selectedClinic}
        onUpdate={() => { /* Implement update logic */ }}
      />
    </div>
  );
}