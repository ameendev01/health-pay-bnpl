import React from "react";
import { SignUpBenefits } from "../SignUpBenefits";
import { LoginForm } from "../LoginForm";
import { useSignInFlow } from "@/features/auth/hooks/useSignIn";

const Login = () => {
  const { onSubmit, isLoading, error } = useSignInFlow();

  return (
    <div className="min-h-screen flex bg-[#d5f9fb]">
      <SignUpBenefits />
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
