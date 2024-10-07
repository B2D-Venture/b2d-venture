import { timestamp, text, pgTable, serial } from "drizzle-orm/pg-core";

const AdminTable = pgTable("admin", {
    id: serial('id').primaryKey().notNull(),
    email: text('email').notNull(),
});

const InvestorTable = pgTable("investor", {
    id: serial('id').primaryKey().notNull(),
    profileImage: text('profile_image').notNull(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    phone: text('phone').notNull(),
    investment: text('investment').notNull(),
    date: timestamp('date').notNull(),
});

export default AdminTable;
