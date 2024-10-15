import { drizzle } from "drizzle-orm/neon-http";
import {
  CompanyData,
  CompanyRequestData,
  DataRoomData
} from "../../types/company/index";
import { 
  CompanyTable, 
  CompanyRequestTable, 
  DataRoomTable, 
  UserTable 
} from "../schema";
import { neon } from "@neondatabase/serverless";
import { eq, isNull } from 'drizzle-orm';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function addCompany(company: CompanyData) {
  const insertedCompany = await db
    .insert(CompanyTable)
    .values(company)
    .returning({ companyId: CompanyTable.id })
    .execute();

  return insertedCompany[0]?.companyId;
}

export async function addCompanyRequest(request: CompanyRequestData) {
  return await db.insert(CompanyRequestTable).values(request).execute();
}

export async function addDataRoom(data: DataRoomData) {
  return await db.insert(DataRoomTable).values(data).execute();
}

export async function getCompanyById(id: number) {
  const company = await db
    .select()
    .from(CompanyTable)
    .where(eq(CompanyTable.id, id))
    .execute();

  return company[0];
}

export async function getCompanyRequestById(id: number) {
  return await db
    .select({
      approval: CompanyRequestTable.approval
    })
    .from(CompanyRequestTable)
    .where(eq(CompanyRequestTable.companyId, id))
    .execute();
}

export async function changeToCompanyRole({ email, companyId }: { email: string, companyId: number }) {
  return await db
    .update(UserTable)
    .set({ 
      roleId: 3,
      roleIdNumber: companyId
    })
    .where(eq(UserTable.email, email))
    .execute();
}
