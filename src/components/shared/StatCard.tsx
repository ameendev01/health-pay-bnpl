import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export default function StatCard({ label, value, icon: Icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-xl">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
      {change && changeType && (
        <div className={`mt-4 flex items-center space-x-1 text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
