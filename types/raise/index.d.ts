interface RaiseFunding {
    id: number;
    companyId: number;
    fundingTarget: number;
    minInvest: number;
    maxInvest: number;
    deadline: string;
    priceShare: number;
}