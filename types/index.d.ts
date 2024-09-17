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

interface InvestorProfileCardProps {
  profileImage: string;
  firstName: string;
  lastName: string;
  nationalIdCard: string;
  birthdate: string;
  emailAddress: string;
  nationality: string;
  netWorth: number;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
