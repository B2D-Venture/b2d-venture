import { number } from "zod";
import { Company } from "./company";
import { CompanyWithRaiseFunding } from "@/types/company";

interface CompanyCardProps {
  company: CompanyWithRaiseFunding;
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
  link: string;
}

interface CompanyLogoBoxProps {
  companyId: number;
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
}


interface InvestmentItemProps {
  company: Company;
  request: InvestmentRequest;
  status: string;
  lastraisedFunding: RaiseFunding;
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
