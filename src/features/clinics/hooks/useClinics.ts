import { clinics } from '../constants';

export function useClinics() {
  // This is a placeholder for a real data fetching hook with React Query.
  // For now, it just returns the mock data.
  return {
    data: clinics,
    isLoading: false,
    error: null,
  };
}
