'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface ClinicMetrics {
  id: string;
  name: string;
  location: string;
  financingVolume: number;
  insuranceCollections: number;
  activePlans: number;
  approvalRate: number;
  avgPlanValue: number;
  arDays: number;
  growth: number;
  status: 'excellent' | 'good' | 'needs_attention';
}

const clinicData: ClinicMetrics[] = [
  {
    id: 'CLI-001',
    name: 'Sunrise Dental Center',
    location: 'Los Angeles, CA',
    financingVolume: 125000,
    insuranceCollections: 280000,
    activePlans: 145,
    approvalRate: 96.2,
    avgPlanValue: 2400,
    arDays: 24.5,
    growth: 15.2,
    status: 'excellent'
  },
  {
    id: 'CLI-002',
    name: 'Valley Orthodontics',
    location: 'Phoenix, AZ',
    financingVolume: 89500,
    insuranceCollections: 195000,
    activePlans: 98,
    approvalRate: 94.8,
    avgPlanValue: 1850,
    arDays: 28.2,
    growth: 8.7,
    status: 'good'
  },
  {
    id: 'CLI-003',
    name: 'Metro Dental Care',
    location: 'Denver, CO',
    financingVolume: 67800,
    insuranceCollections: 145000,
    activePlans: 76,
    approvalRate: 91.3,
    avgPlanValue: 2100,
    arDays: 35.8,
    growth: -2.1,
    status: 'needs_attention'
  },
  {
    id: 'CLI-004',
    name: 'Heart Health Specialists',
    location: 'Austin, TX',
    financingVolume: 198400,
    insuranceCollections: 420000,
    activePlans: 187,
    approvalRate: 97.1,
    avgPlanValue: 3200,
    arDays: 22.1,
    growth: 22.3,
    status: 'excellent'
  },
  {
    id: 'CLI-005',
    name: 'Family Wellness Center',
    location: 'San Diego, CA',
    financingVolume: 45200,
    insuranceCollections: 98000,
    activePlans: 52,
    approvalRate: 89.4,
    avgPlanValue: 1650,
    arDays: 31.2,
    growth: 5.8,
    status: 'good'
  }
];

export default function MultiClinicComparison() {
  const [sortBy, setSortBy] = useState<'financing' | 'growth' | 'plans'>('financing');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-[#84cc16] text-white';
      case 'good':
        return 'bg-[#1557f6] text-white';
      case 'needs_attention':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedClinics = [...clinicData].sort((a, b) => {
    switch (sortBy) {
      case 'financing':
        return b.financingVolume - a.financingVolume;
      case 'growth':
        return b.growth - a.growth;
      case 'plans':
        return b.activePlans - a.activePlans;
      default:
        return 0;
    }
  });

  const totalFinancing = clinicData.reduce((sum, clinic) => sum + clinic.financingVolume, 0);
  const totalInsurance = clinicData.reduce((sum, clinic) => sum + clinic.insuranceCollections, 0);
  const totalPlans = clinicData.reduce((sum, clinic) => sum + clinic.activePlans, 0);

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-[#1557f6]" />
              Multi-Clinic Performance Dashboard
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Compare financing and collection metrics across all locations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1557f6] focus:border-[#1557f6]"
            >
              <option value="financing">Sort by Financing</option>
              <option value="growth">Sort by Growth</option>
              <option value="plans">Sort by Active Plans</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#e9f9fb] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total BNPL Volume</p>
                <p className="text-2xl font-bold text-gray-900">${(totalFinancing / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#84cc16]" />
            </div>
          </div>
          <div className="bg-[#e9f9fb] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Insurance Collections</p>
                <p className="text-2xl font-bold text-gray-900">${(totalInsurance / 1000).toFixed(0)}k</p>
              </div>
              <Building2 className="w-8 h-8 text-[#1557f6]" />
            </div>
          </div>
          <div className="bg-[#e9f9fb] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-gray-900">{totalPlans}</p>
              </div>
              <CreditCard className="w-8 h-8 text-[#84cc16]" />
            </div>
          </div>
        </div>

        {/* Clinic Comparison Table */}
        <div className="space-y-3">
          {sortedClinics.map((clinic, index) => (
            <div key={clinic.id} className="p-4 border border-gray-200 rounded-lg hover:bg-[#fefcf5] transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-lg flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{clinic.name}</h4>
                      <Badge className={getStatusColor(clinic.status)}>
                        {clinic.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{clinic.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {clinic.growth > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-[#84cc16]" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    clinic.growth > 0 ? 'text-[#84cc16]' : 'text-red-500'
                  }`}>
                    {clinic.growth > 0 ? '+' : ''}{clinic.growth}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">BNPL Volume</p>
                  <p className="font-semibold text-gray-900">${(clinic.financingVolume / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Insurance</p>
                  <p className="font-semibold text-gray-900">${(clinic.insuranceCollections / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Active Plans</p>
                  <p className="font-semibold text-gray-900">{clinic.activePlans}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Approval Rate</p>
                  <p className="font-semibold text-gray-900">{clinic.approvalRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg Plan Value</p>
                  <p className="font-semibold text-gray-900">${clinic.avgPlanValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">A/R Days</p>
                  <p className={`font-semibold ${
                    clinic.arDays < 30 ? 'text-[#84cc16]' : 
                    clinic.arDays < 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {clinic.arDays}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Insights */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#84cc16]" />
                <span className="text-sm font-medium text-gray-700">Top Performer</span>
              </div>
              <p className="font-semibold text-gray-900">Heart Health Specialists</p>
              <p className="text-xs text-gray-600">+22.3% growth, 97.1% approval rate</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">Needs Attention</span>
              </div>
              <p className="font-semibold text-gray-900">Metro Dental Care</p>
              <p className="text-xs text-gray-600">-2.1% growth, 35.8 A/R days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}