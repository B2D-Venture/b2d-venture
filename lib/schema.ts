import { timestamp, text, pgTable, serial } from "drizzle-orm/pg-core";

const AdminTable = pgTable("admin", {
    id: serial('id').primaryKey().notNull(),
    email: text('email').notNull(),
});

export default AdminTable;
