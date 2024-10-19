import { RaiseFunding } from "../raise";

interface Company {
  id?: number;
  logo: string;
  banner: string;
  name: string;
  abbr: string;
  description: string;
  pitch: string;
}

export type CompanyWithRaiseFunding = Company & RaiseFunding;

export type CompanyRequest = {
  companyId: number;
};

export type DataRoom = {
  companyId: number;
  documentName: string;
  documentUrl: string;
};
