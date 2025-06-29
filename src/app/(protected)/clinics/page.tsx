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
  Trash2,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Grid3X3,
  List
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
    joinDate: '2023-01-15',
    rating: 4.8,
    patients: 1250,
    growth: '+12.5%'
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
    joinDate: '2023-03-22',
    rating: 4.6,
    patients: 890,
    growth: '+8.2%'
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
    joinDate: '2023-02-10',
    rating: 4.9,
    patients: 650,
    growth: '-2.1%'
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
    joinDate: '2024-01-08',
    rating: 0,
    patients: 0,
    growth: '0%'
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
    joinDate: '2022-11-30',
    rating: 4.7,
    patients: 2100,
    growth: '+15.7%'
  }
];

export default function Clinics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Healthcare Providers</h1>
          <p className="mt-2 text-gray-600">Manage and monitor your clinic network</p>
        </div>
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" />
          Add New Clinic
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{clinics.length}</p>
              <p className="text-sm text-gray-600">Total Clinics</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4,890</p>
              <p className="text-sm text-gray-600">Total Patients</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$480.7K</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">+12.5%</p>
              <p className="text-sm text-gray-600">Growth Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 transition-all duration-200"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-5 h-5 mr-2" />
              More Filters
            </button>
            
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinics Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <div key={clinic.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 card-hover overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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

                {clinic.status === 'active' && (
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{clinic.totalPlans}</p>
                      <p className="text-xs text-gray-600">Plans</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{clinic.patients}</p>
                      <p className="text-xs text-gray-600">Patients</p>
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
                      onClick={() => handleViewClinic(clinic)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleViewClinic(clinic)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plans</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClinics.map((clinic) => (
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
                          onClick={() => handleViewClinic(clinic)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleViewClinic(clinic)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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