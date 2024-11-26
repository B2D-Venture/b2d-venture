import { drizzle } from "drizzle-orm/neon-http";
import { DataRoom } from "../../types/company/index";
import {
  DataRoomTable,
  DataRoomRequestTable,
} from "../schema";
import { neon } from "@neondatabase/serverless";
import { eq, isNull, and } from "drizzle-orm";
import { validateIntegerId } from "../utils";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export async function getDataRoomByCompanyId(companyId: number) {
  if (!validateIntegerId(companyId)) {
    return null;
  }

  const dataRoom = await db
    .select()
    .from(DataRoomTable)
    .where(eq(DataRoomTable.companyId, companyId))
    .execute();

  return dataRoom;
}

export async function getDataRoomRequests() {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(isNull(DataRoomRequestTable.approval))
    .execute();
}

export async function approveDataRoomRequest(requestId: number) {
  return await db
    .update(DataRoomRequestTable)
    .set({ approval: true })
    .where(eq(DataRoomRequestTable.id, requestId))
    .execute();
}

export async function rejectDataRoomRequest(requestId: number) {
  return await db
    .update(DataRoomRequestTable)
    .set({ approval: false })
    .where(eq(DataRoomRequestTable.id, requestId))
    .execute();
}

export async function updateDataRoom(data: DataRoom) {
  if (data.id === undefined) {
    throw new Error("DataRoom id is undefined");
  }
  return await db
    .update(DataRoomTable)
    .set(data)
    .where(eq(DataRoomTable.id, data.id))
    .execute();
}

export async function deleteDataRoom(id: number) {
  return await db
    .delete(DataRoomTable)
    .where(eq(DataRoomTable.id, id))
    .execute();
}

export async function addDataRoomRequest(
  companyId: number,
  investorId: number
) {
  return await db
    .insert(DataRoomRequestTable)
    .values({
      companyId,
      investorId,
    })
    .execute();
}

export async function getCompanyDataRoomRequestsByCompany(companyId: number) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(and(eq(DataRoomRequestTable.companyId, companyId), isNull(DataRoomRequestTable.approval)))
    .execute();
}

export async function getCompanyDataRoomRequestsByInvestor(investorId: number) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(eq(DataRoomRequestTable.investorId, investorId))
    .execute();
}

export async function getCompanyDataRoomRequestsByCompanyAndInvestor(
  companyId: number,
  investorId: number
) {
  return await db
    .select()
    .from(DataRoomRequestTable)
    .where(
      and(
        eq(DataRoomRequestTable.companyId, companyId),
        eq(DataRoomRequestTable.investorId, investorId)
      )
    )
    .execute();
}