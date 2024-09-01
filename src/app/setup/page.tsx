"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import StepIndicator from "@/features/setup/components/step-indicator";
import ChooseDomainStep from "@/features/setup/components/steps/choose-domain";
import VerifyDomainStep from "@/features/setup/components/steps/verify-domain";
import RewriteStep from "@/features/setup/components/steps/rewrite";
import DoneStep from "@/features/setup/components/steps/done";
import { Step } from "@/features/setup/types/step";

const steps: Step[] = [
  {
    title: "What's your domain?",
    label: "Domain",
    component: ChooseDomainStep,
  },
  {
    title: "Are you the owner?",
    label: "Owner",
    component: VerifyDomainStep,
  },
  {
    title: "Can you change the rules?",
    label: "Setup",
    component: RewriteStep,
  },
  {
    title: "Congratulations",
    label: "Done",
    component: DoneStep,
  },
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/admin");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4'>
      <Card
        className={`w-full max-w-full shadow-lg shadow-black/20 transition-opacity duration-1000 ease-in-out sm:max-w-[400px] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl'>
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>

        <StepComponent handleNext={handleNext} handlePrevious={handlePrevious}>
          <StepIndicator currentStep={currentStep} steps={steps} />
        </StepComponent>
      </Card>
    </div>
  );
}
