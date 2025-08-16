import { useState, useEffect } from 'react';
import { Patient, PatientSearchFilters } from '../types';

// Mock data for development
const mockPatients: Patient[] = [
  {
    id: 'PAT-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    emergencyContactName: 'Jane Smith',
    emergencyContactPhone: '(555) 987-6543',
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BC123456789',
    medicalRecordNumber: 'MRN-001',
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'PAT-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1992-07-22',
    address: '456 Oak Ave',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    insuranceProvider: 'Aetna',
    insurancePolicyNumber: 'AET987654321',
    medicalRecordNumber: 'MRN-002',
    status: 'active',
    createdAt: '2023-12-05T00:00:00Z',
    updatedAt: '2023-12-05T00:00:00Z',
  },
  {
    id: 'PAT-003',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'michael.davis@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1978-11-08',
    address: '789 Pine St',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    insuranceProvider: 'Cigna',
    insurancePolicyNumber: 'CIG456789123',
    medicalRecordNumber: 'MRN-003',
    status: 'inactive',
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];

export function usePatients(filters?: PatientSearchFilters) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...mockPatients];
        
        if (filters) {
          if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filteredData = filteredData.filter(patient =>
              patient.firstName.toLowerCase().includes(searchLower) ||
              patient.lastName.toLowerCase().includes(searchLower) ||
              patient.email?.toLowerCase().includes(searchLower) ||
              patient.phone?.includes(filters.searchTerm)
            );
          }
          
          if (filters.status !== 'all') {
            filteredData = filteredData.filter(patient => patient.status === filters.status);
          }
        }
        
        setPatients(filteredData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch patients');
        console.error('Error fetching patients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [filters]);

  return {
    data: patients,
    isLoading,
    error,
    refetch: () => {
      // Trigger refetch logic here
    }
  };
}