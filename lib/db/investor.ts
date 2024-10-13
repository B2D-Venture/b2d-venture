import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../../types/index";
import { 
  InvestorTable, 
  InvestorRequestTable,
  UserTable,
} from "../schema";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './.env.local') });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function addInvestor(investor: InvestorFormData) {
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

export async function changeToInvestorRole({ email }: { email: string }) {
  const user = await db
      .update(UserTable)
      .set({ roleId: 2 })
      .where(eq(UserTable.email, email))
      .execute();
}
