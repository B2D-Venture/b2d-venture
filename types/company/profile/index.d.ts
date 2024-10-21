interface DealTermProps {
  recentFunding: RaiseFunding;
  dayLeft: number;
  totalInvestor: number;
  currentInvestment: number;
  roleId: number | null;
  isOwnCompany: boolean;
}

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
