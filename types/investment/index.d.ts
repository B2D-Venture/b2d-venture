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
  investor: InvestorProps | null;
  raiseFunding: RaiseFunding | null;
  company: Company | null;
}
