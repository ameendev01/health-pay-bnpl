'use client'

import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import ClinicViewModal from '@/components/ClinicViewModal';

const clinics = [
  {
    id: 1,
    name: 'Sunrise Medical Center',
    type: 'General Practice',
    location: 'Los Angeles, CA',
    phone: '(555) 123-4567',
    email: 'contact@sunrisemedical.com',
    status: 'active',
    totalPlans: 45,
    monthlyRevenue: '$125,000',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Valley Health Clinic',
    type: 'Family Medicine',
    location: 'Phoenix, AZ',
    phone: '(555) 234-5678',
    email: 'info@valleyhealth.com',
    status: 'active',
    totalPlans: 32,
    monthlyRevenue: '$89,500',
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    name: 'Metro Dental Care',
    type: 'Dental',
    location: 'Denver, CO',
    phone: '(555) 345-6789',
    email: 'hello@metrodental.com',
    status: 'active',
    totalPlans: 28,
    monthlyRevenue: '$67,800',
    joinDate: '2023-02-10'
  },
  {
    id: 4,
    name: 'Family Health Partners',
    type: 'Pediatrics',
    location: 'Austin, TX',
    phone: '(555) 456-7890',
    email: 'support@familyhealth.com',
    status: 'pending',
    totalPlans: 0,
    monthlyRevenue: '$0',
    joinDate: '2024-01-08'
  },
  {
    id: 5,
    name: 'Westside Cardiology',
    type: 'Cardiology',
    location: 'San Diego, CA',
    phone: '(555) 567-8901',
    email: 'admin@westsidecardio.com',
    status: 'active',
    totalPlans: 67,
    monthlyRevenue: '$198,400',
    joinDate: '2022-11-30'
  }
];

export default function Clinics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [clinicsList, setClinicsList] = useState(clinics);
  const [selectedClinic, setSelectedClinic] = useState<typeof clinics[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredClinics = clinicsList.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || clinic.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewClinic = (clinic: typeof clinics[0]) => {
    setSelectedClinic(clinic);
    setIsViewModalOpen(true);
  };

  const handleUpdateClinic = (updatedClinic: typeof clinics[0]) => {
    setClinicsList(prev => 
      prev.map(clinic => 
        clinic.id === updatedClinic.id ? updatedClinic : clinic
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinics</h1>
          <p className="mt-2 text-gray-600">Manage healthcare providers in your network</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Add Clinic
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-5 h-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
                    <p className="text-sm text-gray-600">{clinic.type}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Active Plans</p>
                  <p className="font-semibold text-gray-900">{clinic.totalPlans}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="font-semibold text-gray-900">{clinic.monthlyRevenue}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  clinic.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : clinic.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewClinic(clinic)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleViewClinic(clinic)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClinics.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clinics found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Clinic View Modal */}
      <ClinicViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedClinic(null);
        }}
        clinic={selectedClinic}
        onUpdate={handleUpdateClinic}
      />
    </div>
  );
}