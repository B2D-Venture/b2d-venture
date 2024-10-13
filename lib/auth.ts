import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { UserTable } from "./schema";
import { eq } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No email returned from Google");
      }

      const existingUser = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, profile.email))
        .execute();

      console.log("existingUser", existingUser);
      if (existingUser.length === 0) {
        // If the user does not exist, create a new user
        // Role Id
        // 1 - Viewer
        // 2 - Investor
        // 3 - Company
        await db
          .insert(UserTable)
          .values({
            email: profile.email,
            roleId: 1,
          })
          .execute();
      }

      return true;
    },
  },
};
