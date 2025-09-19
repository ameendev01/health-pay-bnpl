import type { OnboardingData } from "@/features/onboarding/types";

export type PartialOnboardingRecord = {
  data: OnboardingData;
  lastCompletedStep: number;
} | null;

export async function fetchPartialOnboarding(supabase: any): Promise<PartialOnboardingRecord> {
  const { data, error } = await supabase
    .from('partial_onboarding')
    .select('data, last_completed_step')
    .single();

  if (error) {
    console.error('Error fetching partial onboarding:', error);
    return null;
  }

  if (!data) return null;

  return {
    data: data.data as OnboardingData,
    lastCompletedStep: data.last_completed_step as number,
  };
}