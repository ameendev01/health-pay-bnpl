'use client';

import { SignUpBenefits } from "@/components/SignUpBenefits";
import { SignUpForm } from "@/components/SignUpForm";
import { useSignUpFlow } from "@/features/auth/hooks/useSignUp";

export default function SignUpPage() {
  const { onSubmit, isLoading } = useSignUpFlow();

  return (
    <div className="min-h-screen flex bg-[#d5f9fb]">
      <SignUpBenefits />
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
