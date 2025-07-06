"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AddPaymentPlan() {
  const { user } = useUser();
  const router = useRouter();

  async function handleSubmit() {
    /* 1️⃣  write payment plan to Supabase */
    /* 2️⃣  advance onboarding */
    await user?.reload();
    router.push("/dashboard");
  }

  async function handleSkip() {
    await user?.reload();
    router.push("/dashboard");
  }

  return (
    <form action={handleSubmit}>
      <button type="button" onClick={handleSkip}>
        Skip
      </button>
    </form>
  );
}
