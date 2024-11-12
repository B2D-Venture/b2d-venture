import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/neon-http";
import { UserTable } from "../../../../lib/schema";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const existingUser = await db.select().from(UserTable).where(eq(UserTable.email, email)).execute();

  if (existingUser.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  // const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(UserTable).values({
    email,
    password: password,
    roleId: 1,
  }).execute();

  // console.log("User created successfully");
  return NextResponse.json({ error: "User created successfully" }, { status: 200 });
}
