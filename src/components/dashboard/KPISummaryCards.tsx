'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAdminStats } from '@/features/dashboard/hooks/useAdminStats';

export default function KPISummaryCards() {
  const { stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 animate-pulse">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-8">
            <p className="text-red-600">Error loading KPI data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <ArrowUpRight className="w-4 h-4 text-[#84cc16]" />;
    } else if (change.startsWith('-')) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) {
      return 'text-[#84cc16]';
    } else if (change.startsWith('-')) {
      return 'text-red-500';
    }
    return 'text-gray-500';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 card-hover"
          >
            <CardContent className="p-8">
              {/* Header with title and icon */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-sm font-medium text-gray-600 leading-relaxed">
                  {stat.name}
                </h3>
                <div className="p-2 bg-[#1557f6]/10 rounded-xl flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#1557f6]" />
                </div>
              </div>

              {/* Primary value */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900 leading-none">
                  {stat.value}
                </p>
              </div>

              {/* Change indicator */}
              <div className="flex items-center space-x-1">
                {getChangeIcon(stat.change)}
                <span className={`text-sm font-medium ${getChangeColor(stat.change)}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}