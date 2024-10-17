ALTER TABLE "investment_request" ADD COLUMN "raise_funding_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_request" ADD CONSTRAINT "investment_request_raise_funding_id_raise_funding_id_fk" FOREIGN KEY ("raise_funding_id") REFERENCES "public"."raise_funding"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
