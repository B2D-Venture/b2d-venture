ALTER TABLE "user" ALTER COLUMN "password" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;