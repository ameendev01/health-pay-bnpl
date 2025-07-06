"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import AddPaymentPlanForm from "@/components/onboarding/AddPaymentPlanForm";
import CreateClinicForm from "@/components/onboarding/CreateClinicForm";
import SetUpBankForm from "@/components/onboarding/SetUpBankForm";
import { completeOnboarding } from "./_actions";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleOnboardingComplete = async () => {
    const res = await completeOnboarding(true);
    if (res.message) {
      await user?.reload();
      router.push("/dashboard");
    } else if (res.error) {
      console.error("Error completing onboarding:", res.error);
      // Handle error (e.g., show a notification)
    }
  };

  const steps = [
    {
      id: "addPaymentPlan",
      name: "Add Payment Plan",
      component: <AddPaymentPlanForm onSuccess={handleOnboardingComplete} />,
    },
    {
      id: "createClinic",
      name: "Create Clinic",
      component: <CreateClinicForm onSuccess={handleOnboardingComplete} />,
    },
    {
      id: "setUpBank",
      name: "Set Up Bank Account",
      component: <SetUpBankForm onSuccess={handleOnboardingComplete} />,
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <OnboardingStepper steps={steps} onComplete={handleOnboardingComplete} />
    </div>
  );
}
