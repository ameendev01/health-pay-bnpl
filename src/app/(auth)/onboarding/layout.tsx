
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function OnboardingLayout({ children }: PropsWithChildren) {
  if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
    redirect('/dashboard')
  }
  return (
    <div className="w-full min-h-screen bg-[#fefcf5]">
      {children}
    </div>
  );
}
