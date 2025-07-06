'use client';
// import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateClinic() {
  // const { user } = useUser();
  const router = useRouter();

  async function handleSubmit() {
    /* 1️⃣  write clinic row to Supabase */
    /* 2️⃣  advance onboarding */
    // await user?.update({ unsafeMetadata: { onboardingStep: 'setUpBank' } });
    // await user?.reload();           // force new JWT immediately
    router.push('/onboarding/setUpBank');
  }

  return (
    <form action={handleSubmit}></form>
  )
}