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