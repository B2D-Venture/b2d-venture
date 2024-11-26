import { number } from "zod";

interface InvestorProps {
  id: number;
  profileImage: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  email: string;
  nationality: string;
  networth: number;
  investableAmount: number;
}

interface InvestorProfileCardProps {
  investor: InvestorProps;
}

interface InvestorRequest {
  id: number;
  investorId: number;
  requestDate: Date;
  approval: boolean | null;
  investor: InvestorProps;
}

interface InvestableAmountProps {
  initialAmount: number;
  investorId: number;
  email: string;
}
