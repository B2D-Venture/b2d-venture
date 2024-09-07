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

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
