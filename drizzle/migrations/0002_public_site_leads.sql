CREATE TABLE IF NOT EXISTS "fitness_site_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"audience" text NOT NULL,
	"interest" text NOT NULL,
	"message" text,
	"source" text DEFAULT 'public_site',
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now()
);
