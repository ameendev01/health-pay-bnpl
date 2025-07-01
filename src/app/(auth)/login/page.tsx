'use client';

import { LoginForm } from "@/components/LoginForm";
import { SignUpBenefits } from "@/components/SignUpBenefits"; // Reusing the benefits component
import { useSignInFlow } from "@/features/auth/hooks/useSignIn";

export default function LoginPage() {
  const { onSubmit, isLoading, error } = useSignInFlow();

  return (
    <div className="min-h-screen flex bg-[#d5f9fb]">
      <SignUpBenefits />
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}
    </div>
  );
}
