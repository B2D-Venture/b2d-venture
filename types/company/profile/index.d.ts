interface DealTermElementProps {
  data: string | number;
  label: string;
  type?: "deadline";
}

interface ProgressBarProps {
  currentInvestAmount: number;
  dayLeft: number;
  fundingTarget: number | undefined;
}
