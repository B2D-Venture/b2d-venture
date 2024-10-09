CREATE TABLE IF NOT EXISTS "company_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"approval" boolean NOT NULL,
	"request_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" varchar NOT NULL,
	"banner" varchar NOT NULL,
	"name" varchar NOT NULL,
	"abbr" varchar(10) NOT NULL,
	"description" text NOT NULL,
	"funding_target" integer NOT NULL,
	"min_invest" integer NOT NULL,
	"max_invest" integer NOT NULL,
	"deadline" date NOT NULL,
	"security_type" varchar NOT NULL,
	"prince_share" real NOT NULL,
	"pitch" text NOT NULL,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_room" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"document_name" varchar NOT NULL,
	"document_url" varchar NOT NULL,
	"upload_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"investor_id" integer NOT NULL,
	"company_id" integer NOT NULL,
	"amount" real NOT NULL,
	"get_stock" real NOT NULL,
	"request_date" timestamp NOT NULL,
	"approval" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investor_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"investor_id" integer NOT NULL,
	"approval" boolean NOT NULL,
	"request_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investor" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_image" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"national_id" varchar NOT NULL,
	"birth_date" date NOT NULL,
	"email" varchar NOT NULL,
	"nationality" varchar NOT NULL,
	"networth" integer NOT NULL,
	"investable_amount" real NOT NULL,
	"status" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_request" ADD CONSTRAINT "company_request_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_room" ADD CONSTRAINT "data_room_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_request" ADD CONSTRAINT "investment_request_investor_id_investor_id_fk" FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_request" ADD CONSTRAINT "investment_request_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investor_request" ADD CONSTRAINT "investor_request_investor_id_investor_id_fk" FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
