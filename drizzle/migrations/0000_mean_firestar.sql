CREATE TABLE "fitness_chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_diet_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"meals" text[] DEFAULT ARRAY[]::TEXT[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"calories" double precision DEFAULT 0,
	"protein" double precision DEFAULT 0,
	"carbs" double precision DEFAULT 0,
	"fat" double precision DEFAULT 0,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_sessions" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "fitness_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "fitness_wearable_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"synced_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fitness_workout_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"exercises" text[] DEFAULT ARRAY[]::TEXT[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "fitness_chat_messages" ADD CONSTRAINT "fitness_chat_messages_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_diet_plans" ADD CONSTRAINT "fitness_diet_plans_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_meals" ADD CONSTRAINT "fitness_meals_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_sessions" ADD CONSTRAINT "fitness_sessions_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_wearable_devices" ADD CONSTRAINT "fitness_wearable_devices_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fitness_workout_plans" ADD CONSTRAINT "fitness_workout_plans_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;