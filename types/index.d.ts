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
  label: string | number;
  value: string | number;
  classNameLabel?: string;
  classNameValue?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
