interface DealTermElementProps {
  data: string | number;
  label: string;
  type?: "deadline";
}

interface ProgressBarProps {
  percentage: number;
  dayLeft: number;
  fundingTarget: number | undefined;
}
