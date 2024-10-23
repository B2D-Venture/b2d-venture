CREATE TABLE IF NOT EXISTS "company_edit_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"logo" varchar NOT NULL,
	"banner" varchar NOT NULL,
	"name" varchar NOT NULL,
	"abbr" varchar(10) NOT NULL,
	"description" text NOT NULL,
	"pitch" text NOT NULL,
	"approval" boolean,
	"request_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_edit_request" ADD CONSTRAINT "company_edit_request_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
