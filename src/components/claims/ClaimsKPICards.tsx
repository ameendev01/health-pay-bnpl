import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface KPIData {
  awaitingAction: number;
  avgTimeToFund: number;
  infoNeededAmount: number;
  denialRate: number;
  agingOver7Days: number;
}

interface ClaimsKPICardsProps {
  data: KPIData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(amount);
};

export default function ClaimsKPICards({ data }: ClaimsKPICardsProps) {
  const kpis = [
    {
      title: 'Awaiting Action',
      value: data.awaitingAction.toString(),
      change: '+12%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      description: 'Claims requiring attention',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Avg Time to Fund',
      value: `${data.avgTimeToFund} days`,
      change: '-2.3 days',
      changeType: 'positive' as const,
      icon: Clock,
      description: 'Average processing time',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Info Needed Amount',
      value: formatCurrency(data.infoNeededAmount),
      change: '+8%',
      changeType: 'negative' as const,
      icon: DollarSign,
      description: 'Value pending information',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Denial Rate',
      value: `${data.denialRate}%`,
      change: '-1.2%',
      changeType: 'positive' as const,
      icon: FileText,
      description: 'Claims denied this month',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Aging >7 Days',
      value: data.agingOver7Days.toString(),
      change: '-5',
      changeType: 'positive' as const,
      icon: CheckCircle,
      description: 'Claims over 7 days old',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const isPositiveChange = kpi.changeType === 'positive';
        
        return (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {kpi.value}
                </div>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    isPositiveChange ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveChange ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}