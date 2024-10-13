ALTER TABLE "company_request" ALTER COLUMN "approval" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "company_request" ALTER COLUMN "approval" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company_request" ALTER COLUMN "request_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "status" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "investment_request" ALTER COLUMN "approval" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "investment_request" ALTER COLUMN "approval" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "investor_request" ALTER COLUMN "approval" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "investor_request" ALTER COLUMN "approval" DROP NOT NULL;