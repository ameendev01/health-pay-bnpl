'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../../supabase/admin';
import type { OnboardingData } from '@/features/onboarding/types';

export const savePartialOnboarding = async (data: Partial<OnboardingData>, lastCompletedStep: number) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: 'Authentication failed: No user ID found.',
    };
  }

  try {
    // Upsert the partial data into a dedicated table
    const { error: upsertError } = await supabaseAdmin
      .from('partial_onboarding')
      .upsert({
        user_id: userId,
        data: data,
        last_completed_step: lastCompletedStep,
      }, { onConflict: 'user_id' });

    if (upsertError) {
      throw new Error(`Database error: ${upsertError.message}`);
    }

    // Update Clerk user metadata with the last completed step
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: {
        ...((await client.users.getUser(userId)).publicMetadata || {}),
        lastCompletedStep: lastCompletedStep,
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error('Partial onboarding save failed:', err);
    return {
      success: false,
      error: `An unexpected error occurred: ${err.message}`,
    };
  }
};