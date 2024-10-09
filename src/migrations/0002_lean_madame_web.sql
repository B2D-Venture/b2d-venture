ALTER TABLE "investor" ALTER COLUMN "investable_amount" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "investor" ALTER COLUMN "investable_amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "investor" ALTER COLUMN "status" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "investor" ALTER COLUMN "status" DROP NOT NULL;