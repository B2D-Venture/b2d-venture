ALTER TABLE "user" ALTER COLUMN "password" SET DEFAULT 'defaultPassword';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;