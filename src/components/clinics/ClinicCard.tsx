import React from 'react';
import { Building2, Mail, MapPin, MoreVertical, Phone, Star, Eye } from 'lucide-react';
import { Clinic } from '@/features/clinics/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClinicCardProps {
  clinic: Clinic;
  onView: (clinic: Clinic) => void;
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

export default function ClinicCard({ clinic, onView }: ClinicCardProps) {
  return (
    <Card className="shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 card-hover overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="font-semibold text-gray-900">{clinic.name}</CardTitle>
            <p className="text-sm text-gray-600">{clinic.type}</p>
          </div>
        </div>
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{clinic.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{clinic.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{clinic.email}</span>
          </div>
        </div>

        {clinic.status === 'active' && (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{clinic.totalPlans}</p>
              <p className="text-xs text-gray-600">Active Plans</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{clinic.monthlyRevenue}</p>
              <p className="text-xs text-gray-600">Revenue</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(clinic.status)}`}>
              {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
            </span>
            {clinic.status === 'active' && clinic.rating > 0 && (
              <div className="flex items-center space-x-1">
                {renderStars(clinic.rating)}
                <span className="text-xs text-gray-600 ml-1">{clinic.rating}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onView(clinic)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
