CREATE TABLE "fitness_foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"brand" text,
	"category" text,
	"serving_size" double precision DEFAULT 100,
	"serving_unit" text DEFAULT 'g',
	"calories" double precision DEFAULT 0,
	"protein" double precision DEFAULT 0,
	"carbs" double precision DEFAULT 0,
	"fat" double precision DEFAULT 0,
	"fiber" double precision DEFAULT 0,
	"sodium" double precision DEFAULT 0,
	"source" text DEFAULT 'manual',
	"external_id" text,
	"created_at" timestamp with time zone DEFAULT now()
);
