import { drizzle } from "drizzle-orm/neon-http";
import {
  CompanyData,
  CompanyRequestData,
  DataRoomData,
} from "../../types/company/index";
import { CompanyTable, CompanyRequestTable, DataRoomTable } from "../schema";
import { neon } from "@neondatabase/serverless";
import { ilike, or } from "drizzle-orm";

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

export async function getAllCompanies(searchQuery?: string, limit?: number) {
  try {
    let query = db.select().from(CompanyTable);

    if (searchQuery) {
      const searchPattern = `%${searchQuery}%`;
      query = query.where(
        or(
          ilike(CompanyTable.name, searchPattern),
          ilike(CompanyTable.description, searchPattern),
        ),
      );
    }

    if (limit) {
      query.limit(limit);
    }

    const companies = await query.execute();

    return companies;
  } catch (error) {
    console.error("Error retrieving companies:", error);
    throw error;
  }
}
