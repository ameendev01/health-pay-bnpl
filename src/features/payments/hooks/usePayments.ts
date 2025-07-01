import { payments } from '../constants';

export function usePayments() {
  // This is a placeholder for a real data fetching hook with React Query.
  // For now, it just returns the mock data.
  return {
    data: payments,
    isLoading: false,
    error: null,
  };
}
