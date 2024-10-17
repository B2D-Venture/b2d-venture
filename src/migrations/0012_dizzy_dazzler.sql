ALTER TABLE "data_room" ALTER COLUMN "upload_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "investment_request" ALTER COLUMN "request_date" SET DEFAULT now();