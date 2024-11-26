import { InvestorProps } from "../investor";

interface InvestmentRequest {
  id: number;
  investorId: number;
  raiseFundingId: number;
  amount: number;
  getStock: number;
  requestDate: string;
  approval: boolean;
  valuation: number;
}

interface InvestmentDetail extends InvestmentRequest {
  investor: InvestorProps;
  raiseFunding: RaiseFunding;
  company: Company;
}
