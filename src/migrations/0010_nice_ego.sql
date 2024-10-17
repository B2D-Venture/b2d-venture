ALTER TABLE "investor_request" ALTER COLUMN "approval" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "investor" ALTER COLUMN "investable_amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "raise_funding" DROP COLUMN IF EXISTS "security_type";