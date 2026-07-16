CREATE TABLE "fitness_daily_trackings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "tracking_date" text NOT NULL,
  "water_ml" double precision DEFAULT 0 NOT NULL,
  "water_goal_ml" double precision DEFAULT 3000 NOT NULL,
  "steps" double precision DEFAULT 0 NOT NULL,
  "sleep_minutes" double precision,
  "calories_burned" double precision DEFAULT 0 NOT NULL,
  "notes" text,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "fitness_daily_trackings" ADD CONSTRAINT "fitness_daily_trackings_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "fitness_daily_trackings_user_date_unique" ON "fitness_daily_trackings" USING btree ("user_id","tracking_date");