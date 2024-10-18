import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../../types/index";
import { InvestorTable, InvestorRequestTable, UserTable, InvestmentRequestTable } from "../schema";
import { eq, and } from "drizzle-orm";
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
    .where(and(eq(InvestmentRequestTable.raiseFundingId, id), eq(InvestmentRequestTable.approval, true)))
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

