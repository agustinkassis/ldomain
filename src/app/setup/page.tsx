"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StepIndicator from "@/features/setup/components/step-indicator";
import LoadingSpinner from "@/features/setup/components/loading-spinner";
import ChooseDomainStep from "@/features/setup/components/steps/choose-domain";
import VerifyDomainStep from "@/features/setup/components/steps/verify-domain";
import RewriteStep from "@/features/setup/components/steps/rewrite";
import DoneStep from "@/features/setup/components/steps/done";

const steps = ["Domain", "Owner", "Rewrite", "Done"];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 1000); // Simulating a 1-second loading time
    } else {
      router.push("/admin");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4'>
      {isLoading && <LoadingSpinner />}
      <Card
        className={`w-full max-w-full shadow-lg shadow-black/20 transition-opacity duration-1000 ease-in-out sm:max-w-[400px] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl'>
            Setup in 1 minute
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StepIndicator currentStep={currentStep} steps={steps} />
          <div className='mt-6 space-y-4'>
            <div className='space-y-4'>
              {currentStep === 0 && <ChooseDomainStep />}
              {currentStep === 1 && <VerifyDomainStep />}
              {currentStep === 2 && <RewriteStep />}
              {currentStep === 3 && <DoneStep />}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          {currentStep < steps.length - 1 && currentStep > 0 ? (
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0 || isLoading}
              className='text-sm sm:text-md px-2 sm:px-8'
            >
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={handleNext}
            disabled={isLoading}
            size={"lg"}
            className='text-sm sm:text-md px-2 sm:px-8'
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
