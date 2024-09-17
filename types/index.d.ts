import { number } from "zod";

interface CompanyCardProps {
  logoUrl: string;
  backgroundUrl: string;
  companyName: string;
  shortDescription: string;
  investmentGoal: number;
  investorCount: number;
  minInvest: number;
}

interface CompanyLogoBoxProps {
  logoUrl: string;
  companyAbbr: string;
  companyName: string;
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
