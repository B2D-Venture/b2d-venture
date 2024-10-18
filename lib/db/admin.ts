import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  InvestorRequestTable,
  CompanyRequestTable,
  InvestmentRequestTable,
  RaiseFundingRequestTable,
  RaiseFundingTable,
} from "../schema";
import dotenv from "dotenv";
import path from "path";
import { eq, isNull, desc } from "drizzle-orm";

dotenv.config({ path: path.resolve(__dirname, "./.env.local") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function getInvestorRequest() {
  return await db
    .select()
    .from(InvestorRequestTable)
    .where(isNull(InvestorRequestTable.approval))
    .execute();
}

export async function getCompanyRequest() {
  return await db
    .select()
    .from(CompanyRequestTable)
    .where(isNull(CompanyRequestTable.approval))
    .execute();
}

export async function getInvestmentRequest() {
  return await db
    .select()
    .from(InvestmentRequestTable)
    .where(isNull(InvestmentRequestTable.approval))
    .execute();
}

export async function approveCompanyRequest(requestId: number) {
  // Update the company request approval status
  const companyRequest = await db
    .update(CompanyRequestTable)
    .set({ approval: true })
    .where(eq(CompanyRequestTable.id, requestId))
    .returning({ companyId: CompanyRequestTable.companyId })
    .execute();

  const companyId = companyRequest[0]?.companyId;
  if (!companyId) {
    throw new Error("Company ID not found for this request.");
  }

  const raiseFunding = await db
    .select()
    .from(RaiseFundingTable)
    .where(eq(RaiseFundingTable.companyId, companyId))
    .orderBy(desc(RaiseFundingTable.id))
    .limit(1)
    .execute();

  if (raiseFunding.length === 0) {
    throw new Error("No RaiseFunding entry found for this company.");
  }

  await db
    .update(RaiseFundingRequestTable)
    .set({ approval: true })
    .where(eq(RaiseFundingRequestTable.raiseFundingId, raiseFunding[0].id))
    .execute();

  return;
}

export async function approveInvestorRequest(requestId: number) {
  return await db
    .update(InvestorRequestTable)
    .set({ approval: true })
    .where(eq(InvestorRequestTable.id, requestId))
    .execute();
}

export async function approveInvestmentRequest(requestId: number) {
  return await db
    .update(InvestmentRequestTable)
    .set({ approval: true })
    .where(eq(InvestmentRequestTable.id, requestId))
    .execute();
}

export async function rejectCompanyRequest(requestId: number) {
  return await db
    .update(CompanyRequestTable)
    .set({ approval: false })
    .where(eq(CompanyRequestTable.id, requestId))
    .execute();
}

export async function rejectInvestorRequest(requestId: number) {
  return await db
    .update(InvestorRequestTable)
    .set({ approval: false })
    .where(eq(InvestorRequestTable.id, requestId))
    .execute();
}

export async function rejectInvestmentRequest(requestId: number) {
  return await db
    .update(InvestmentRequestTable)
    .set({ approval: false })
    .where(eq(InvestmentRequestTable.id, requestId))
    .execute();
}
