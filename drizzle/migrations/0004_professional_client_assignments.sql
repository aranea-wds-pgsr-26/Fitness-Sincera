CREATE TABLE "fitness_professional_clients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "professional_id" uuid NOT NULL,
  "client_id" uuid NOT NULL,
  "specialty" text NOT NULL,
  "status" text DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "fitness_professional_clients" ADD CONSTRAINT "fitness_professional_clients_professional_id_fitness_users_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "fitness_professional_clients" ADD CONSTRAINT "fitness_professional_clients_client_id_fitness_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."fitness_users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "fitness_professional_clients_unique_assignment" ON "fitness_professional_clients" USING btree ("professional_id","client_id","specialty");
--> statement-breakpoint
CREATE INDEX "fitness_professional_clients_client_idx" ON "fitness_professional_clients" USING btree ("client_id");