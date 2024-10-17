import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  InvestorRequestTable,
  CompanyRequestTable,
  InvestmentRequestTable,
} from "../schema";
import dotenv from "dotenv";
import path from "path";
import { eq, isNull } from "drizzle-orm";

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
  return await db
    .update(CompanyRequestTable)
    .set({ approval: true })
    .where(eq(CompanyRequestTable.id, requestId))
    .execute();
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
