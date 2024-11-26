CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"approval" boolean,
	"request_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" varchar NOT NULL,
	"banner" varchar NOT NULL,
	"name" varchar NOT NULL,
	"abbr" varchar(10) NOT NULL,
	"description" text NOT NULL,
	"pitch" text NOT NULL,
	"registration_number" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_room_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"investor_id" integer NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"approval" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_room" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"document_name" varchar NOT NULL,
	"document_size" integer DEFAULT 0 NOT NULL,
	"document_url" varchar NOT NULL,
	"upload_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"investor_id" integer NOT NULL,
	"raise_funding_id" integer NOT NULL,
	"amount" real NOT NULL,
	"get_stock" real NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"approval" boolean,
	"private_offer" boolean DEFAULT false NOT NULL,
	"price_share" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investor_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"investor_id" integer NOT NULL,
	"approval" boolean,
	"request_date" timestamp DEFAULT now() NOT NULL
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
	"investable_amount" real DEFAULT 0 NOT NULL
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
	"price_share" integer NOT NULL,
	"valuation" real DEFAULT 0 NOT NULL,
	"total_share" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "role_type" DEFAULT 'viewer' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role_id" integer NOT NULL,
	"role_id_number" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_category" ADD CONSTRAINT "company_category_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_category" ADD CONSTRAINT "company_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_request" ADD CONSTRAINT "company_request_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "investment_request" ADD CONSTRAINT "investment_request_raise_funding_id_raise_funding_id_fk" FOREIGN KEY ("raise_funding_id") REFERENCES "public"."raise_funding"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investor_request" ADD CONSTRAINT "investor_request_investor_id_investor_id_fk" FOREIGN KEY ("investor_id") REFERENCES "public"."investor"("id") ON DELETE no action ON UPDATE no action;
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
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
