// {
//     logoUrl:
//       "https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png",
//     companyName: "Amazon",
//     companyAbbr: "AMZ",
//     status: "Finalized",
//     date: "December 13, 2023",
//     amount: 1000,
//     marketPrice: 1100,
//     priceChange: 10.0,
//     stockPercentage: 0.5,
//     valuationAtInvest: 200000,
//     valuationMarket: 220000,
//   },

interface InvestmentRequest {
  id: number;
  investorId: number;
  raiseFundingId: number;
  amount: number;
  getStock: number;
  requestDate: string;
  approval: boolean;
}
