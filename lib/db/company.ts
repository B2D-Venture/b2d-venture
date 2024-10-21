import { drizzle } from "drizzle-orm/neon-http";
import { Company, CompanyRequest, DataRoom } from "../../types/company/index";
import {
  CompanyTable,
  CompanyRequestTable,
  DataRoomTable,
  UserTable,
  RaiseFundingTable,
} from "../schema";
import { neon } from "@neondatabase/serverless";
import { eq, ilike, or } from "drizzle-orm";
import { validateIntegerId } from "../utils";
import { notFound } from "next/navigation";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function addCompany(company: Company) {
  const insertedCompany = await db
    .insert(CompanyTable)
    .values(company)
    .returning({ companyId: CompanyTable.id })
    .execute();

  return insertedCompany[0]?.companyId;
}

export async function addCompanyRequest(request: CompanyRequest) {
  return await db.insert(CompanyRequestTable).values(request).execute();
}

export async function getDataRoomByCompanyId(companyId: number) {
  if (!validateIntegerId(companyId)) {
    return notFound();
  }

  const dataRoom = await db
    .select()
    .from(DataRoomTable)
    .where(eq(DataRoomTable.companyId, companyId))
    .execute();

  return dataRoom;
}

export async function addDataRoom(data: DataRoom) {
  return await db.insert(DataRoomTable).values(data).execute();
}

export async function getAllCompanies(searchQuery?: string, limit?: number) {
  try {
    let query = db
      .select({
        company: CompanyTable,
        raiseFunding: RaiseFundingTable,
      })
      .from(CompanyTable)
      .leftJoin(
        RaiseFundingTable,
        eq(RaiseFundingTable.companyId, CompanyTable.id),
      );

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

    const companiesWithFunding = await query.execute();

    return companiesWithFunding;
  } catch (error) {
    console.error("Error retrieving companies with funding details:", error);
    throw error;
  }
}

export async function getCompanyById(id: number) {
  if (!validateIntegerId(id)) {
    return notFound();
  }

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
      approval: CompanyRequestTable.approval,
    })
    .from(CompanyRequestTable)
    .where(eq(CompanyRequestTable.companyId, id))
    .execute();
}

export async function changeToCompanyRole({
  email,
  companyId,
}: {
  email: string;
  companyId: number;
}) {
  return await db
    .update(UserTable)
    .set({
      roleId: 3,
      roleIdNumber: companyId,
    })
    .where(eq(UserTable.email, email))
    .execute();
}
