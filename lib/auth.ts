import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { UserTable } from "./schema";
import { eq } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

declare module "next-auth" {
  interface User {
    id: string;
    roleId: number;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      roleId: number;
    };
  }
}

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, credentials?.email ?? ""))
          .execute();

        if (user.length === 0 || !user[0].password) {
          throw new Error("No user found with this email");
        }

        if (!credentials) {
          throw new Error("Credentials are not provided");
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user[0].password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user[0].id.toString(), email: user[0].email, roleId: user[0].roleId };
      },
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
            password: "",
            roleId: 1,
          })
          .execute();
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = user.roleId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        roleId: token.roleId as number,
      };
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

