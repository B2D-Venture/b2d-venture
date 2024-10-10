import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData } from "../types/index";
import { InvestorTable } from "./schema";
import {neon} from "@neondatabase/serverless";
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
  console.log("Investor Data before submission:", investor);

  const investorData = {
    ...investor,
    birthDate: investor.birthDate ? new Date(investor.birthDate).toISOString() : '',
  };

  return await db.insert(InvestorTable).values(investorData).execute();
}



