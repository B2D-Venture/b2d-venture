import { drizzle } from "drizzle-orm/neon-http";
import { Company, CompanyRequest, DataRoom } from "../../types/company/index";
import {
  CompanyTable,
  CompanyRequestTable,
  DataRoomTable,
  UserTable,
} from "../schema";
import { neon } from "@neondatabase/serverless";
import { sql, eq } from "drizzle-orm";
import { validateIntegerId } from "../utils";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console;
  throw new Error("DATABASE_URL is not defined");
}

const sqlNeon = neon(databaseUrl);
const db = drizzle(sqlNeon);

export async function addCompany(company: Company) {
  const insertedCompany = await db
    .insert(CompanyTable)
    .values(company)
    .returning({ companyId: CompanyTable.id })
    .execute();

  return insertedCompany[0]?.companyId;
}

export async function addCompanyRequest(request: CompanyRequest) {
  return await db.insert(CompanyRequestTable).values(request).execute();
}

export async function addDataRoom(data: DataRoom) {
  return await db.insert(DataRoomTable).values(data).execute();
}

export async function getAllCompanies(
  searchQuery?: string,
  limit?: number,
  sortBy?: string,
  sortDirection: "asc" | "desc" = "asc",
) {
  try {
    let baseQuery = `
      WITH LatestApproved AS (
        SELECT 
          rfr.raise_funding_id,
          rfr.approval,
          rfr.request_date,
          ROW_NUMBER() OVER (PARTITION BY rf.company_id ORDER BY rfr.request_date DESC) AS rn
        FROM 
          raise_funding_request rfr
        JOIN 
          raise_funding rf ON rfr.raise_funding_id = rf.id
        WHERE 
          rfr.approval = true
      )
      SELECT 
        c.*, 
        rf.*, 
        LatestApproved.raise_funding_id AS latest_approved_raise_funding_id,
        LatestApproved.approval
      FROM 
        company c
      LEFT JOIN 
        raise_funding rf ON c.id = rf.company_id
      LEFT JOIN 
        LatestApproved ON rf.id = LatestApproved.raise_funding_id
      WHERE 
        LatestApproved.rn = 1`;

    if (searchQuery) {
      const searchPattern = `%${searchQuery}%`;
      baseQuery += `
      AND (
        c.name ILIKE ${searchPattern} OR
        c.description ILIKE ${searchPattern}
      )`;
    }

    if (sortBy) {
      const sortColumn = {
        valuation: "rf.valuation",
        fundingTarget: "rf.funding_target",
        pricePerShare: "rf.price_per_share",
        investmentDeadline: "rf.deadline",
        minInvestment: "rf.min_invest",
        maxInvestment: "rf.max_invest",
      }[sortBy];

      if (sortColumn) {
        baseQuery += ` ORDER BY ${sortColumn} ${sortDirection}`;
      }
    }

    if (limit) {
      baseQuery += ` LIMIT ${limit}`;
    }

    const result = await db.execute(sql.raw(baseQuery));

    const companiesWithFunding = result.rows.map((row) => ({
      company: {
        id: row.company_id,
        abbr: row.abbr,
        name: row.name,
        logo: row.logo,
        banner: row.banner,
        description: row.description,
        pitch: row.pitch,
        registrationNumber: row.registration_number,
      },
      raiseFunding: {
        id: row.id,
        companyId: row.company_id,
        fundingTarget: row.funding_target,
        minInvest: row.min_invest,
        maxInvest: row.max_invest,
        priceShare: row.price_per_share,
        valuation: row.valuation,
        deadline: row.deadline,
        approval: row.approval,
      },
    }));

    return companiesWithFunding;
  } catch (error) {
    console.error("Error retrieving companies with funding details:", error);
    throw error;
  }
}

export async function getCompanyById(id: number) {
  if (!validateIntegerId(id)) {
    return null;
  }

  const company = await db
    .select()
    .from(CompanyTable)
    .where(eq(CompanyTable.id, id))
    .execute();

  return company[0];
}

export async function getCompanyRequestById(id: number) {
  if (!validateIntegerId(id)) {
    return null;
  }

  return await db
    .select({
      approval: CompanyRequestTable.approval,
    })
    .from(CompanyRequestTable)
    .where(eq(CompanyRequestTable.companyId, id))
    .execute();
}

export async function changeToCompanyRole({
  email,
  companyId,
}: {
  email: string;
  companyId: number;
}) {
  if (!validateIntegerId(companyId)) {
    return null;
  }

  return await db
    .update(UserTable)
    .set({
      roleId: 3,
      roleIdNumber: companyId,
    })
    .where(eq(UserTable.email, email))
    .execute();
}

export async function updateCompany(company: Company) {
  if (company.id === undefined) {
    throw new Error("Company ID is undefined");
  }

  return await db
    .update(CompanyTable)
    .set({
      name: company.name,
      logo: company.logo,
      banner: company.banner,
      abbr: company.abbr,
      description: company.description,
      pitch: company.pitch,
    })
    .where(eq(CompanyTable.id, company.id))
    .execute();
}
