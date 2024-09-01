import { Step } from "../types/step";

export interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export default function StepIndicator({
  currentStep,
  steps,
}: StepIndicatorProps) {
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
            {step.label}
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
