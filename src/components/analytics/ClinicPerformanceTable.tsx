import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { ClinicPerformanceData } from '@/features/analytics/types';

interface ClinicPerformanceTableProps {
  data: ClinicPerformanceData[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < fullStars
                ? 'text-[#FF385C] fill-[#FF385C]'
                : i === fullStars && hasHalfStar
                ? 'text-[#FF385C] fill-[#FF385C]'
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function ClinicPerformanceTable({ data }: ClinicPerformanceTableProps) {
  // Add mock ratings for demonstration
  const dataWithRatings = data.map((clinic, index) => ({
    ...clinic,
    rating: 4.2 + (index * 0.1) + Math.random() * 0.5
  }));

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-50">
      <div className="p-6 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">Clinic Performance</h2>
          <p className="text-sm text-gray-500">Detailed metrics across all partner clinics</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Clinic
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Plans
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Avg Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Default Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {dataWithRatings.map((clinic, index) => (
              <tr key={index} className="hover:bg-gray-25 transition-colors duration-150">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-xs font-semibold text-white">
                        {clinic.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{clinic.name}</div>
                      <div className="text-sm text-gray-500">Healthcare Provider</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StarRating rating={clinic.rating} />
                </td>
                <td className="px-6 py-5">
                  <div className="font-semibold text-gray-900">${clinic.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Monthly</div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-medium text-gray-900">{clinic.plans}</div>
                  <div className="text-sm text-gray-500">Active plans</div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-medium text-gray-900">${clinic.avgPayment.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Per plan</div>
                </td>
                <td className="px-6 py-5">
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    clinic.defaultRate < 2 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : clinic.defaultRate < 3 
                      ? 'bg-yellow-50 text-yellow-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {clinic.defaultRate}%
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-1">
                    {clinic.growth > 0 ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      clinic.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {clinic.growth > 0 ? '+' : ''}{clinic.growth}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}