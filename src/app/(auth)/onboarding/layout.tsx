
export const dynamic = 'force-dynamic';

import { OnboardingNav } from '@/components/onboarding/OnboardingNav';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function OnboardingLayout({ children }: PropsWithChildren) {
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect('/dashboard')
  }
  return (
    <div className="w-full h-screen bg-[#d5f9fb] p-4">
      <OnboardingNav/>
      <div className='h-full rounded-xl p-2 bg-[#fefcf5] overflow-y-auto flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
