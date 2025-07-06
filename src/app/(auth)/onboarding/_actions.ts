'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async (status: boolean) => {
  const { userId } = await auth()

	if(status === false) {
	return { message: 'Onboarding not completed' }
	}

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        // applicationName: formData.get('applicationName'),
        // applicationType: formData.get('applicationType'),
      },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.', err }
  }
}