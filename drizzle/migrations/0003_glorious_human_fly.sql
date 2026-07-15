CREATE TABLE "fitness_client_anamneses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"objective" text NOT NULL,
	"height_cm" double precision,
	"weight_kg" double precision,
	"activity_level" text,
	"restrictions" text,
	"injuries" text,
	"medications" text,
	"sleep_quality" text,
	"hydration" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_client_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"phone" text,
	"birth_date" text,
	"gender" text,
	"goal" text NOT NULL,
	"plan_interest" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "fitness_client_anamneses" ADD CONSTRAINT "fitness_client_anamneses_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_client_profiles" ADD CONSTRAINT "fitness_client_profiles_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;