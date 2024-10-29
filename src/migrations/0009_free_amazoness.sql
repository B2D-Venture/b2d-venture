CREATE TABLE IF NOT EXISTS "data_room_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"investor_id" integer NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"approval" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raise_funding_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"raise_funding_id" integer NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"approval" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raise_funding" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"funding_target" integer NOT NULL,
	"min_invest" integer NOT NULL,
	"max_invest" integer NOT NULL,
	"deadline" date NOT NULL,
	"security_type" varchar NOT NULL,
	"price_share" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company_request" ALTER COLUMN "request_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "data_room" ALTER COLUMN "upload_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "investor_request" ALTER COLUMN "approval" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_room_request" ADD CONSTRAINT "data_room_request_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_room_request" ADD CONSTRAINT "data_room_request_investor_id_investor_id_fk" FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raise_funding_request" ADD CONSTRAINT "raise_funding_request_raise_funding_id_raise_funding_id_fk" FOREIGN KEY ("raise_funding_id") REFERENCES "public"."raise_funding"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raise_funding" ADD CONSTRAINT "raise_funding_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "funding_target";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "min_invest";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "max_invest";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "deadline";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "security_type";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "price_share";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "investor" DROP COLUMN IF EXISTS "status";