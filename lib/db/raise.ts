import { drizzle } from "drizzle-orm/neon-http";
import { RaiseFundingTable, RaiseFundingRequestTable } from "../schema";
import { eq, and } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function addRaiseFundingRequest(request: RaiseFundingRequest) {
  await db.insert(RaiseFundingRequestTable).values(request).execute();
}

export async function addRaiseFunding(fundingData: RaiseFunding, companyId: number) {
  const insertedFunding = await db
    .insert(RaiseFundingTable)
    .values({ ...fundingData, companyId })
    .returning({ raiseFundingId: RaiseFundingTable.id })
    .execute();

  console.log("insertedFunding", insertedFunding);
  return insertedFunding[0]?.raiseFundingId;
}

export const getRaiseFundingByCompanyId = async (companyId: number) => {
  try {
    const raiseFundingRecord = await db
      .select()
      .from(RaiseFundingTable)
      .where(eq(RaiseFundingTable.companyId, companyId))
      .execute();
      
    console.log("raiseFundingRecord", raiseFundingRecord);
    return raiseFundingRecord;
  } catch (error) {
    console.error("Error fetching raise funding record:", error);
    throw error;
  }
};