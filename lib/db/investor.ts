import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../../types/index";
import { InvestorTable, InvestorRequestTable, UserTable } from "../schema";
import { eq } from "drizzle-orm";
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

export async function getInvestorById(id: number) {
  const investor = await db
    .select()
    .from(InvestorTable)
    .where(eq(InvestorTable.id, id))
    .execute();

  return investor[0];
}

export async function addInvestor(investor: InvestorFormData) {
  const investorData = {
    ...investor,
    birthDate: investor.birthDate
      ? new Date(investor.birthDate).toISOString()
      : "",
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

export async function getInvestorRequestById(investorId: number) {
  const investorRequest = await db
    .select()
    .from(InvestorRequestTable)
    .where(eq(InvestorRequestTable.investorId, investorId))
    .execute();

  return investorRequest[0];
}

export async function changeToInvestorRole({ email, investor_id }: { email: string, investor_id: number }) {
  return await db
    .update(UserTable)
    .set({ 
      roleId: 2,
      roleIdNumber: investor_id
    })
    .where(eq(UserTable.email, email))
    .execute();
}

export async function UpdateInvestorAmount({ investorId, amount }: { investorId: number, amount: number }) {
  return await db
    .update(InvestorTable)
    .set({ investableAmount: amount })
    .where(eq(InvestorTable.id, investorId))
    .execute();
}

export async function increaseInvestorAmount({ investorId, amount }: { investorId: number, amount: number }) {
  const investor = await getInvestorById(investorId);
  const newAmount = investor.investableAmount + amount;
  return await UpdateInvestorAmount({ investorId, amount: newAmount });
}