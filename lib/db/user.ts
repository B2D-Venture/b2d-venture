import { drizzle } from "drizzle-orm/neon-http";
import { UserTable } from "../schema";
import { eq, and } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";


const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function getUserByEmail(roleId: number, email: string) {
  const user = await db
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.email, email), eq(UserTable.roleId, roleId)))
    .execute();
  
  return user[0];
}

export async function getUser(email: string) {
  const user = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email))
    .execute();
  
  return user[0];
}