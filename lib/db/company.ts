import { drizzle } from "drizzle-orm/neon-http";
import {
  CompanyData,
  CompanyRequestData,
} from "../../types/company/index.d.ts";
import { CompanyTable, CompanyRequestTable, DataRoomTable } from "../schema";
import { neon } from "@neondatabase/serverless";

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
