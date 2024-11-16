import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { getUser } from "@/lib/db/index";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await getUser(email);
    if (!user) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }

    return NextResponse.json({ message: "Sign-in successful." });
  } catch (err) {
    return NextResponse.json({ error: "Failed to sign in." }, { status: 500 });
  }
}
