import { useState } from "react";

export default function useSteps() {
  const [submit, setSubmit] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return { currentStep, steps, nextStep, prevStep };
}
