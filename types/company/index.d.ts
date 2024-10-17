import { RaiseFunding } from '../raise';
interface Company {
    id: number;
    logo: string;
    banner: string;
    name: string;
    abbr: string;
    description: string;
    pitch: string;
    raisefunding: RaiseFunding;
  }

export type CompanyRequestData = {
    companyId: number;
}

export type DataRoomData = {
    companyId: number;
    documentName: string;
    documentUrl: string;
}

