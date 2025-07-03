'use client'

import React, { useState } from 'react';
import { Building2, Plus, Grid3X3, List } from 'lucide-react';
import { useClinics } from '@/features/clinics/hooks/useClinics';
import { Clinic } from '@/features/clinics/types';
import PageHeader from '@/components/shared/PageHeader';
import FilterBar from '@/components/shared/FilterBar';
import EmptyState from '@/components/shared/EmptyState';
import ClinicGrid from '@/components/clinics/ClinicGrid';
import ClinicList from '@/components/clinics/ClinicList';
import ClinicViewModal from '@/components/ClinicViewModal';

export default function ClinicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { data: clinics, isLoading, error } = useClinics();

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || clinic.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setIsViewModalOpen(true);
  };

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'discontinued', label: 'Discontinued' },
  ];

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner
  }

  if (error) {
    return <div>Error loading clinics.</div>; // Replace with a proper error component
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Healthcare Providers" description="Manage and monitor your clinic network">
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" />
          Add New Clinic
        </button>
      </PageHeader>

      <FilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filterOptions={statusFilterOptions}
        selectedFilter={selectedStatus}
        onFilterChange={setSelectedStatus}
      >
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
      </FilterBar>

      {filteredClinics.length > 0 ? (
        viewMode === 'grid' ? (
          <ClinicGrid clinics={filteredClinics} onViewClinic={handleViewClinic} />
        ) : (
          <ClinicList clinics={filteredClinics} onViewClinic={handleViewClinic} />
        )
      ) : (
        <EmptyState 
          icon={Building2} 
          title="No clinics found" 
          description="Try adjusting your search or filter criteria" 
        />
      )}

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
