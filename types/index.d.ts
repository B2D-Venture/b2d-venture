interface CompanyCardProps {
    logoUrl: string;
    backgroundUrl: string;
    companyName: string;
    shortDescription: string;
    investmentGoal: number;
    investorCount: number;
    minInvest: number;
};

interface CompanyLogoBoxProps {
    logoUrl: string;
    companyAbbr: string;
    companyName: string;
};

type InvestorFormFieldProps = {
  label: string;
  type: string;
};

type InvestorFormButtonProps = {
  label: string;
};
