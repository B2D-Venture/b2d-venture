interface RaiseFunding {
  totalShare: number | SQL<unknown> | Placeholder<string, any>;
  id?: number;
  companyId?: number;
  fundingTarget: number;
  minInvest: number;
  maxInvest: number;
  deadline: string;
  priceShare: number;
  valuation: number;
}

interface RaiseFundingRequest {
  raiseFundingId: number;
}

interface RaiseFundingRequestList {
  id: number;
  raiseFundingId: number;
  requestDate: Date;
  approval: boolean | null;
}

interface RaiseFundingRequestData extends RaiseFundingRequestList {
  raiseFunding: RaiseFunding | null;
  company: Company | null;
}
