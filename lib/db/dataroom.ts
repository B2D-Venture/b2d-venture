import { drizzle } from "drizzle-orm/neon-http";
import { Company, CompanyRequest, DataRoom } from "../../types/company/index";
import {
  CompanyTable,
  CompanyRequestTable,
  DataRoomTable,
  DataRoomRequestTable,
  UserTable,
} from "../schema";
import { neon } from "@neondatabase/serverless";
import { eq, ilike, isNull, or, and } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function getDataRoomRequests() {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(isNull(DataRoomRequestTable.approval))
    .execute();
}

export async function approveDataRoomRequest(requestId: number) {
  return await db
    .update(DataRoomRequestTable)
    .set({ approval: true })
    .where(eq(DataRoomRequestTable.id, requestId))
    .execute();
}

export async function rejectDataRoomRequest(requestId: number) {
  return await db
    .update(DataRoomRequestTable)
    .set({ approval: false })
    .where(eq(DataRoomRequestTable.id, requestId))
    .execute();
}

export async function addDataRoomRequest(
  companyId: number,
  investorId: number
) {
  return await db
    .insert(DataRoomRequestTable)
    .values({
      companyId,
      investorId,
    })
    .execute();
}

export async function getCompanyDataRoomRequestsByCompany(companyId: number) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(eq(DataRoomRequestTable.companyId, companyId))
    .execute();
}

export async function getCompanyDataRoomRequestsByInvestor(investorId: number) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(eq(DataRoomRequestTable.investorId, investorId))
    .execute();
}

export async function getCompanyDataRoomRequestsByCompanyAndInvestor(
  companyId: number,
  investorId: number
) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(
      and(
        eq(DataRoomRequestTable.companyId, companyId),
        eq(DataRoomRequestTable.investorId, investorId)
      )
    )
    .execute();
}