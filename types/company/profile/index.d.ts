interface DealTermProps {
  recentFunding: RaiseFunding;
  dayLeft: number;
  totalInvestor: number;
  currentInvestment: number;
  roleId: number | null;
  isOwnCompany: boolean;
  urlId: number;
  investorId: number;
  user: User;
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
