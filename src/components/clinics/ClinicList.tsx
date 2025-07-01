import React from 'react';
import { Clinic } from '@/features/clinics/types';
import DataTable from '@/components/shared/DataTable';
import { Eye, Star } from 'lucide-react';

interface ClinicListProps {
  clinics: Clinic[];
  onViewClinic: (clinic: Clinic) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating) 
          ? 'text-yellow-400 fill-current' 
          : 'text-gray-300'
      }`}
    />
  ));
};

export default function ClinicList({ clinics, onViewClinic }: ClinicListProps) {
  const headers = [
    { key: 'name', label: 'Clinic' },
    { key: 'type', label: 'Type' },
    { key: 'location', label: 'Location' },
    { key: 'plans', label: 'Plans' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderRow = (clinic: Clinic) => (
    <tr key={clinic.id} className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {clinic.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{clinic.name}</div>
            {clinic.rating > 0 && (
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(clinic.rating)}
                <span className="text-xs text-gray-500">{clinic.rating}</span>
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clinic.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clinic.location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clinic.totalPlans}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{clinic.monthlyRevenue}</div>
        {clinic.growth !== '0%' && (
          <div className={`text-xs ${clinic.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {clinic.growth}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(clinic.status)}`}>
          {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onViewClinic(clinic)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return <DataTable headers={headers} data={clinics} renderRow={renderRow} />;
}
