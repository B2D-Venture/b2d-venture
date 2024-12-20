import { drizzle } from "drizzle-orm/neon-http";
import { Company, CompanyRequest, DataRoom } from "../../types/company/index";
import {
  CompanyTable,
  CompanyRequestTable,
  DataRoomTable,
  UserTable,
  CategoryTable,
  CompanyCategoryTable,
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
      ),
      InvestorCount AS (
        SELECT
          ir.raise_funding_id,
          COUNT(ir.id)::integer AS investor_count
        FROM
          investment_request ir
        WHERE
          ir.approval = true
        GROUP BY
          ir.raise_funding_id
      )
      SELECT 
        c.*, 
        rf.*, 
        LatestApproved.raise_funding_id AS latest_approved_raise_funding_id,
        LatestApproved.approval,
        COALESCE(InvestorCount.investor_count, 0) AS investor_count
      FROM 
        company c
      LEFT JOIN 
        raise_funding rf ON c.id = rf.company_id
      LEFT JOIN 
        LatestApproved ON rf.id = LatestApproved.raise_funding_id
      LEFT JOIN 
        InvestorCount ON rf.id = InvestorCount.raise_funding_id
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
        companyId: "c.id",
        valuation: "rf.valuation",
        totalShare: "rf.total_share",
        fundingTarget: "rf.funding_target * rf.price_share",
        priceShare: "rf.price_share",
        deadline: "rf.deadline",
        minInvest: "rf.min_invest * rf.price_share",
        maxInvest: "rf.max_invest * rf.price_share",
        investorCount: "investor_count",
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
        totalShare: row.total_share,
        fundingTarget: row.funding_target,
        minInvest: row.min_invest,
        maxInvest: row.max_invest,
        priceShare: row.price_share,
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
      registrationNumber: company.registrationNumber,
    })
    .where(eq(CompanyTable.id, company.id))
    .execute();
}

export async function getAllCategories() {
  return await db
    .select({
      id: CategoryTable.id,
      name: CategoryTable.name,
    })
    .from(CategoryTable)
    .execute();
}

export async function assignCategoriesToCompany(
  companyId: number,
  categoryIds: number[],
) {
  if (!validateIntegerId(companyId)) {
    throw new Error("Invalid company ID");
  }

  const values = categoryIds.map((categoryId) => ({
    companyId,
    categoryId,
  }));

  return await db.insert(CompanyCategoryTable).values(values).execute();
}

export async function getCategoriesByCompanyId(companyId: number) {
  if (!validateIntegerId(companyId)) {
    throw new Error("Invalid company ID");
  }

  return await db
    .select({
      id: CategoryTable.id,
      name: CategoryTable.name,
    })
    .from(CompanyCategoryTable)
    .leftJoin(
      CategoryTable,
      eq(CompanyCategoryTable.categoryId, CategoryTable.id),
    )
    .where(eq(CompanyCategoryTable.companyId, companyId))
    .execute();
}

export async function getCategoryIdsByCompanyId(companyId: number) {
  if (!validateIntegerId(companyId)) {
    throw new Error("Invalid company ID");
  }

  const categoryIds = await db
    .select({
      id: CategoryTable.id,
    })
    .from(CompanyCategoryTable)
    .leftJoin(
      CategoryTable,
      eq(CompanyCategoryTable.categoryId, CategoryTable.id),
    )
    .where(eq(CompanyCategoryTable.companyId, companyId))
    .execute();

  return categoryIds.map((categoryId) => String(categoryId.id));
}

export async function updateCategoriesForCompany(
  companyId: number,
  categoryIds: number[],
) {
  if (!validateIntegerId(companyId)) {
    throw new Error("Invalid company ID");
  }

  await db
    .delete(CompanyCategoryTable)
    .where(eq(CompanyCategoryTable.companyId, companyId))
    .execute();

  const values = categoryIds.map((categoryId) => ({
    companyId,
    categoryId,
  }));

  return await db.insert(CompanyCategoryTable).values(values).execute();
}
