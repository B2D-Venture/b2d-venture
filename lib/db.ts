import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../types/index";
import { 
  InvestorTable, 
  InvestorRequestTable,
  UserTable,
} from "./schema";
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

