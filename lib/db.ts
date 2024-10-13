import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../types/index";
import { InvestorTable, InvestorRequestTable, CompanyRequestTable, InvestmentRequestTable, CompanyTable } from "./schema";
import {neon} from "@neondatabase/serverless";
import dotenv from 'dotenv';
import path from 'path';
import { eq, lt, gte, ne, isNull } from 'drizzle-orm';

dotenv.config({ path: path.resolve(__dirname, './.env.local') });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function addInvestor(investor: InvestorFormData) {
  console.log("Investor Data before submission:", investor);

  const investorData = {
    ...investor,
    birthDate: investor.birthDate ? new Date(investor.birthDate).toISOString() : '',
  };

  const insertedInvestor = await db
    .insert(InvestorTable)
    .values(investorData)
    .returning({ investorId: InvestorTable.id })
    .execute();

  return insertedInvestor[0]?.investorId;
}

export async function addInvestorRequest(request: InvestorRequestData) {
  return await db.insert(InvestorRequestTable).values(request).execute();
}

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


export async function getCompanyById(companyId: number) {
  return await db.select().from(CompanyTable).where(eq(CompanyTable.id, companyId)).execute();
}

export async function getInvestorById(investorId: number) {
  return await db.select().from(InvestorTable).where(eq(InvestorTable.id, investorId)).execute();
}