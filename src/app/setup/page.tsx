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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = ["Domain", "Admin", "Owner", "Rewrite"];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className='mb-4'>
      <div className='flex justify-between mb-2'>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs sm:text-sm font-medium ${
              index <= currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className='w-full bg-secondary h-2 rounded-full'>
        <div
          className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 flex flex-col items-center'>
        <Loader2 className='w-16 h-16 animate-spin text-primary' />
        <p className='mt-4 text-lg font-semibold'>Loading...</p>
      </div>
    </div>
  );
}

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
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
      }, 1000); // Simulating a 1-second loading time
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4'>
      {isLoading && <LoadingSpinner />}
      <Card
        className={`w-full max-w-[400px] shadow-lg shadow-black/20 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className='flex justify-center items-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-lg'>
          <Zap className='w-8 h-8 text-white mr-2' aria-hidden='true' />
          <span className='text-2xl font-bold text-white'>
            Lightning Domains
          </span>
        </div>
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl'>
            Domain Setup Wizard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StepIndicator currentStep={currentStep} />
          <div className='mt-6 space-y-4'>
            {currentStep === 0 && (
              <div className='space-y-4'>
                <img
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Choose Domain'
                  className='w-full h-auto rounded-lg'
                />
                <Label htmlFor='domain' className='text-sm font-medium'>
                  Choose Domain
                </Label>
                <Input
                  id='domain'
                  placeholder='Enter your domain name'
                  className='w-full'
                />
              </div>
            )}
            {currentStep === 1 && (
              <div className='space-y-4'>
                <img
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Admin Pubkey'
                  className='w-full h-auto rounded-lg'
                />
                <Label htmlFor='pubkey' className='text-sm font-medium'>
                  Admin Pubkey
                </Label>
                <Input
                  id='pubkey'
                  placeholder='Enter admin public key'
                  className='w-full'
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className='space-y-4'>
                <img
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Verify Domain'
                  className='w-full h-auto rounded-lg'
                />
                <Label htmlFor='verify' className='text-sm font-medium'>
                  Verify Domain
                </Label>
                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Please verify your domain ownership. Instructions will be
                  provided here.
                </p>
              </div>
            )}
            {currentStep === 3 && (
              <div className='space-y-4'>
                <img
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Rewrite .well-known'
                  className='w-full h-auto rounded-lg'
                />
                <Label htmlFor='rewrite' className='text-sm font-medium'>
                  Rewrite .well-known
                </Label>
                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Rewrite your .well-known file. Detailed steps will be shown
                  here.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={handlePrevious}
            disabled={currentStep === 0 || isLoading}
            className='text-xs sm:text-sm px-2 sm:px-4'
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLoading}
            className='text-xs sm:text-sm px-2 sm:px-4'
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
