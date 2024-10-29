import { drizzle } from "drizzle-orm/neon-http";
import { InvestorFormData, InvestorRequestData } from "../types/index";
import { neon } from "@neondatabase/serverless";
import {
  InvestorTable,
  InvestorRequestTable,
  CompanyRequestTable,
  InvestmentRequestTable,
  CompanyTable,
} from "./schema";
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