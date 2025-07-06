
"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OnboardingStepperProps {
  steps: {
    id: string;
    name: string;
    component: React.ReactNode;
  }[];
  onComplete: () => void;
}

export default function OnboardingStepper({ steps, onComplete }: OnboardingStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  // const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card className="w-[450px] text-black">
      <CardHeader>
        <CardTitle>{steps[currentStep].name}</CardTitle>
        <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
      </CardHeader>
      <CardContent>
        {CurrentStepComponent}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
