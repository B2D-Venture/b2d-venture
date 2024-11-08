import { drizzle } from "drizzle-orm/neon-http";
import {
  InvestmentRequestTable,
} from "../schema";
import { eq, and, isNull, or } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env.local") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function getInvesmentByFundingId(id: number) {
  const funding = await db
    .select()
    .from(InvestmentRequestTable)
    .where(
      and(
        eq(InvestmentRequestTable.raiseFundingId, id),
        eq(InvestmentRequestTable.approval, true)
      )
    )
    .execute();

  return funding;
}

export async function getAllInvestmentRequestByInvestorId(investorId: number) {
  const investment = await db
    .select()
    .from(InvestmentRequestTable)
    .where(eq(InvestmentRequestTable.investorId, investorId))
    .execute();

  return investment;
}

export async function addInvestmentRequest(
  investorId: number,
  raiseFundingId: number,
  amount: number,
  getStock: number
) {
  await db
    .insert(InvestmentRequestTable)
    .values({ investorId, raiseFundingId, amount, getStock })
    .execute();
}

export async function getInvestorRequestByInvestorandRaiseFunding(
  investorId: number,
  raiseFundingId: number
) {
  const request = await db
    .select()
    .from(InvestmentRequestTable)
    .where(
      and(
        eq(InvestmentRequestTable.investorId, investorId),
        eq(InvestmentRequestTable.raiseFundingId, raiseFundingId),
        or(isNull(InvestmentRequestTable.approval), eq(InvestmentRequestTable.approval, true))
      )
    )
    .execute();

  return request[0];
}

export async function addAmount(
  investorId: number,
  raiseFundingId: number,
  amount: number,
  getStock: number
) {
  return await db
    .update(InvestmentRequestTable)
    .set({ amount, getStock })
    .where(
      and(
        eq(InvestmentRequestTable.investorId, investorId),
        eq(InvestmentRequestTable.raiseFundingId, raiseFundingId)
      )
    )
    .execute();
}
