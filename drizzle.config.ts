import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local file
dotenv.config({ path: path.resolve(__dirname, './.env.local') });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the .env.local file');
}

export default defineConfig({
    schema: "./lib/schema.ts",
    out: "./src/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL || "",
    },
});
