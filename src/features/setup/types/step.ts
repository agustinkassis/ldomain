export interface StepProps {
  children: React.ReactNode;
  handlePrevious: () => void;
  handleNext: () => void;
}

export interface Step {
  title: string;
  label: string;
  component: React.FC<StepProps>;
}
