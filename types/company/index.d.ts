import { RaiseFunding } from "../raise";

interface Company {
  id?: number;
  logo: string;
  banner: string;
  name: string;
  abbr: string;
  description: string;
  pitch: string;
  registrationNumber: string;
}

export type CompanyWithRaiseFunding = Company & RaiseFunding;

export type CompanyRequest = {
  companyId: number;
};

export type DataRoom = {
  id?: number;
  companyId: number;
  documentName: string;
  documentSize: number;
  documentUrl: string;
};

export type DataRoomRequest = {
  id: number;
  companyId: number;
  investorId: number;
  requestDate: Date;
  approval: boolean;
};

interface CompanyRequestData {
  id: number;
  companyId: number;
  requestDate: Date;
  approval: boolean | null;
  company: CompanyWithFunding | null;
}

interface CompanyWithFunding extends Company {
  raiseFunding: RaiseFunding | null;
}
