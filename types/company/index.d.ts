export type CompanyData = {
    logo: string;
    banner: string;
    name: string;
    abbr: string;
    description: string;
    fundingTarget: number;
    minInvest: number;
    maxInvest: number;
    deadline: Date;
    securityType: string;
    princeShare: number;
    pitch: string;
    status: boolean;
}

export type CompanyRequestData = {
    companyId: number;
}

export type DataRoomData = {
    companyId: number;
    documentName: string;
    documentUrl: string;
}
