ALTER TABLE "investment_request" DROP CONSTRAINT "investment_request_company_id_company_id_fk";
--> statement-breakpoint
ALTER TABLE "investment_request" DROP COLUMN IF EXISTS "company_id";