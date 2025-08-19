import { useState, useEffect } from 'react';
import { Claim, ClaimSearchFilters } from '../types';

// Mock data for development
const mockClaims: Claim[] = [
  {
    id: 'CLM-001',
    claimNumber: 'CLM-2024-001',
    patientId: 'PAT-001',
    payerName: 'Blue Cross Blue Shield',
    payerId: 'BCBS-CA',
    serviceDate: '2024-01-15',
    procedureCodes: ['99213', '99214'],
    diagnosisCodes: ['Z00.00', 'M25.511'],
    totalAmount: 450,
    allowedAmount: 400,
    paidAmount: 360,
    patientResponsibility: 40,
    status: 'paid',
    submissionDate: '2024-01-16T00:00:00Z',
    responseDate: '2024-01-20T00:00:00Z',
    paymentDate: '2024-01-25T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-001',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
  {
    id: 'CLM-002',
    claimNumber: 'CLM-2024-002',
    patientId: 'PAT-002',
    payerName: 'Aetna',
    payerId: 'AETNA-001',
    serviceDate: '2024-01-18',
    procedureCodes: ['D0150', 'D1110'],
    diagnosisCodes: ['K02.9'],
    totalAmount: 320,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'denied',
    submissionDate: '2024-01-19T00:00:00Z',
    responseDate: '2024-01-22T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-002',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: 'CLM-003',
    claimNumber: 'CLM-2024-003',
    patientId: 'PAT-003',
    payerName: 'Cigna',
    payerId: 'CIGNA-001',
    serviceDate: '2024-01-20',
    procedureCodes: ['99395'],
    diagnosisCodes: ['Z00.00'],
    totalAmount: 280,
    paidAmount: 0,
    patientResponsibility: 0,
    status: 'submitted',
    submissionDate: '2024-01-21T00:00:00Z',
    clearinghouseId: 'CH-001',
    clearinghouseClaimId: 'CH-CLM-003',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-21T00:00:00Z',
  },
];

export function useClaims(filters?: ClaimSearchFilters) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClaims = async () => {
    try {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredData = [...mockClaims];
      
      if (filters) {
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          filteredData = filteredData.filter(claim =>
            claim.claimNumber.toLowerCase().includes(searchLower) ||
            claim.payerName.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.status !== 'all') {
          filteredData = filteredData.filter(claim => claim.status === filters.status);
        }

        if (filters.payer) {
          filteredData = filteredData.filter(claim => claim.payerName === filters.payer);
        }
      }
      
      setClaims(filteredData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch claims');
      console.error('Error fetching claims:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [filters]);

  return {
    data: claims,
    isLoading,
    error,
    refetch: fetchClaims
  };
}