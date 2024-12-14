import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { getUser } from "@/lib/db/index";
import logger from "@/lib/logger";

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
      logger.error("Incorrect email or password.");
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.error("Incorrect email or password.");
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }

    logger.info("email: " + email + " signed in successfully.");
    return NextResponse.json({ message: "Sign-in successful." });
  } catch (err) {
    logger.error("Failed to sign in.");
    return NextResponse.json({ error: "Failed to sign in." }, { status: 500 });
  }
}
