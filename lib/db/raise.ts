import { drizzle } from "drizzle-orm/neon-http";
import {
  RaiseFundingTable,
  RaiseFundingRequestTable,
} from "../schema";
import { eq, and, desc } from "drizzle-orm";
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

export async function addRaiseFunding(
  fundingData: RaiseFunding,
  companyId: number,
) {
  const insertedFunding = await db
    .insert(RaiseFundingTable)
    .values({ ...fundingData, companyId, totalShare: fundingData.totalShare })
    .returning({ raiseFundingId: RaiseFundingTable.id })
    .execute();

  return insertedFunding[0]?.raiseFundingId;
}

export async function getRecentRaiseFundingByCompanyId(companyId: number) {
  try {
    const latestApprovedRequest = await db
      .select({
        raiseFundingId: RaiseFundingRequestTable.raiseFundingId,
      })
      .from(RaiseFundingRequestTable)
      .innerJoin(
        RaiseFundingTable,
        eq(RaiseFundingRequestTable.raiseFundingId, RaiseFundingTable.id),
      )
      .where(
        and(
          eq(RaiseFundingTable.companyId, companyId),
          eq(RaiseFundingRequestTable.approval, true),
        ),
      )
      .orderBy(desc(RaiseFundingRequestTable.requestDate))
      .limit(1)
      .execute();

    if (latestApprovedRequest.length === 0) {
      return null;
    }

    const recentFunding = await db
      .select()
      .from(RaiseFundingTable)
      .where(eq(RaiseFundingTable.id, latestApprovedRequest[0].raiseFundingId))
      .execute();

    if (recentFunding.length > 0) {
      const row = recentFunding[0];
      return {
        id: row.id,
        companyId: row.companyId,
        fundingTarget: row.fundingTarget,
        minInvest: row.minInvest,
        maxInvest: row.maxInvest,
        priceShare: row.priceShare,
        valuation: row.valuation,
        deadline: row.deadline,
      };
    }

    return null;
  } catch (error) {
    console.error("Error retrieving recent raise funding:", error);
    throw error;
  }
}

export async function getOneRecentFundingByCompanyId(companyId: number) {
  const recentFunding = await db
    .select()
    .from(RaiseFundingTable)
    .where(eq(RaiseFundingTable.companyId, companyId))
    .orderBy(desc(RaiseFundingTable.id))
    .execute();
  return recentFunding[0];
}

export const getRaiseFundingByCompanyId = async (companyId: number) => {
  try {
    const raiseFundingRecord = await db
      .select()
      .from(RaiseFundingTable)
      .where(eq(RaiseFundingTable.companyId, companyId))
      .execute();

    return raiseFundingRecord;
  } catch (error) {
    console.error("Error fetching raise funding record:", error);
    throw error;
  }
};

export async function getRaiseFundingById(raiseFundingId: number) {
  const raiseFunding = await db
    .select()
    .from(RaiseFundingTable)
    .where(eq(RaiseFundingTable.id, raiseFundingId))
    .execute();
  return raiseFunding[0];
}

export async function getRaiseFundingRequestById(raiseFundingId: number) {
  const raiseFundingRequest = await db
    .select()
    .from(RaiseFundingRequestTable)
    .where(eq(RaiseFundingRequestTable.raiseFundingId, raiseFundingId))
    .execute();
  return raiseFundingRequest[0];
}

