import {
  timestamp,
  text,
  pgTable,
  serial,
  varchar,
  date,
  integer,
  real,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role_type", ["viewer", "investor", "company"]);

export const RoleTable = pgTable("role", {
  id: serial("id").primaryKey().notNull(),
  name: roleEnum("name").default("viewer").notNull(),
});

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  roleId: integer("role_id")
    .references(() => RoleTable.id)
    .notNull(),
  roleIdNumber: integer("role_id_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const AdminTable = pgTable("admin", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
});

export const InvestorTable = pgTable("investor", {
  id: serial("id").primaryKey().notNull(),
  profileImage: varchar("profile_image").notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  nationalId: varchar("national_id").notNull(),
  birthDate: date("birth_date").notNull(),
  email: varchar("email").notNull(),
  nationality: varchar("nationality").notNull(),
  networth: integer("networth").notNull(),
  investableAmount: real("investable_amount").default(0).notNull(),
});

export const CompanyTable = pgTable("company", {
  id: serial("id").primaryKey().notNull(),
  logo: varchar("logo").notNull(),
  banner: varchar("banner").notNull(),
  name: varchar("name").notNull(),
  abbr: varchar("abbr", { length: 10 }).notNull(),
  description: text("description").notNull(),
  pitch: text("pitch").notNull(),
});

export const DataRoomTable = pgTable("data_room", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id")
    .references(() => CompanyTable.id)
    .notNull(),
  documentName: varchar("document_name").notNull(),
  documentSize: integer("document_size").default(0).notNull(),
  documentUrl: varchar("document_url").notNull(),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
});

export const InvestmentRequestTable = pgTable("investment_request", {
  id: serial("id").primaryKey().notNull(),
  investorId: integer("investor_id")
    .references(() => InvestorTable.id)
    .notNull(),
  raiseFundingId: integer("raise_funding_id")
    .references(() => RaiseFundingTable.id)
    .notNull(),
  amount: real("amount").notNull(),
  getStock: real("get_stock").notNull(),
  requestDate: timestamp("request_date").defaultNow().notNull(),
  approval: boolean("approval"),
});

export const CompanyRequestTable = pgTable("company_request", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id")
    .references(() => CompanyTable.id)
    .notNull(),
  approval: boolean("approval"),
  requestDate: timestamp("request_date").defaultNow().notNull(),
});

export const CompanyEditRequestTable = pgTable("company_edit_request", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id")
    .references(() => CompanyTable.id)
    .notNull(),
  logo: varchar("logo").notNull(),
  banner: varchar("banner").notNull(),
  name: varchar("name").notNull(),
  abbr: varchar("abbr", { length: 10 }).notNull(),
  description: text("description").notNull(),
  pitch: text("pitch").notNull(),
  approval: boolean("approval"),
  requestDate: timestamp("request_date").defaultNow().notNull(),
});

export const InvestorRequestTable = pgTable("investor_request", {
  id: serial("id").primaryKey().notNull(),
  investorId: integer("investor_id")
    .references(() => InvestorTable.id)
    .notNull(),
  approval: boolean("approval"),
  requestDate: timestamp("request_date").defaultNow().notNull(),
});

export const RaiseFundingTable = pgTable("raise_funding", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id")
    .references(() => CompanyTable.id)
    .notNull(),
  fundingTarget: integer("funding_target").notNull(),
  minInvest: integer("min_invest").notNull(),
  maxInvest: integer("max_invest").notNull(),
  deadline: date("deadline").notNull(),
  priceShare: real("price_share").notNull(),
  valuation: real("valuation").default(0).notNull(),
});

export const RaiseFundingRequestTable = pgTable("raise_funding_request", {
  id: serial("id").primaryKey().notNull(),
  raiseFundingId: integer("raise_funding_id")
    .references(() => RaiseFundingTable.id)
    .notNull(),
  requestDate: timestamp("request_date").defaultNow().notNull(),
  approval: boolean("approval"),
});

export const DataRoomRequestTable = pgTable("data_room_request", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id")
    .references(() => CompanyTable.id)
    .notNull(),
  investorId: integer("investor_id")
    .references(() => InvestorTable.id)
    .notNull(),
  requestDate: timestamp("request_date").defaultNow().notNull(),
  approval: boolean("approval"),
});