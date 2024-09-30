"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined");
        }
        const sql = neon(process.env.DATABASE_URL);
        const data = await sql`SELECT * FROM "Admin"`;
        console.log("Database response:", data);
        return data;
    } catch (error) {
        console.error("Database query failed:", error);
        throw new Error("Failed to fetch data");
    }
}