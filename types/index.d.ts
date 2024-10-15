import { number } from "zod";

interface Company {
  id: number;
  logo: string;
  banner: string;
  name: string;
  abbr: string;
  description: string;
  fundingTarget: number;
  minInvest: number;
  maxInvest: number;
  deadline: string;
  securityType: string;
  priceShare: number;
  pitch: string;
  status: boolean;
}

interface CompanyCardProps {
  logoUrl: string;
  backgroundUrl: string;
  companyName: string;
  shortDescription: string;
  investmentGoal: number;
  investorCount?: number;
  minInvest: number;
  className: string;
}

interface PitchDescriptionProps {
  label: string;
  desc: string;
}

interface DealTermBtnProps {
  text: string;
  textColor: string;
  hoverTextColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
  hoverBorderColor: string;
}

interface CompanyLogoBoxProps {
  logoUrl: string;
  companyAbbr: string;
  companyName: string;
}

type InvestorFormData = {
  profileImage: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  nationality: string;
  networth: number;
  birthDate: Date;
}

type InvestorRequestData = {
  investorId: number;
  approval: boolean;
}


interface InvestmentItemProps {
  logoUrl: string;
  companyAbbr: string;
  companyName: string;
  amount: number;
  status: string;
  date: string;
  marketPrice: number;
  priceChange: number;
  stockPercentage: number;
  valuationAtInvest: number;
  valuationMarket: number;
}

interface OutputTextBoxProps {
  label: string;
  value: string | number;
  classNameLabel?: string;
  classNameValue?: string;
}

interface OutputTextBoxDollarProps {
  label: string;
  value: string | number;
  classNameLabel?: string;
  classNameValue?: string;
}

interface OutputTextBoxPercentageProps {
  label: string;
  value: string | number;
  classNameLabel?: string;
  classNameValue?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
