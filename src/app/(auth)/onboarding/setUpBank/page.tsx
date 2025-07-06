'use client';
// import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SetUpBank() {
  // const { user } = useUser();
  const router = useRouter();

  async function handleSubmit() {
    /* 1️⃣  write bank info to Supabase */
    /* 2️⃣  advance onboarding */
    // await user?.update({ unsafeMetadata: { onboardingStep: 'addPaymentPlan' } });
    // await user?.reload();
    router.push('/onboarding/addPaymentPlan');
  }

  return <form action={handleSubmit}></form>
}