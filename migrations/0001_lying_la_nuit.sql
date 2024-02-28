ALTER TABLE "posts" ALTER COLUMN "colour" SET DEFAULT 'fff740';--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "created_by_ip" text NOT NULL;