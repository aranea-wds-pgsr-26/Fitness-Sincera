import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("supabase") ? { rejectUnauthorized: false } : undefined,
});

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_users (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_sessions (
      token TEXT PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_meals (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      calories DOUBLE PRECISION DEFAULT 0,
      protein DOUBLE PRECISION DEFAULT 0,
      carbs DOUBLE PRECISION DEFAULT 0,
      fat DOUBLE PRECISION DEFAULT 0,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_diet_plans (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      meals TEXT[] DEFAULT ARRAY[]::TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_workout_plans (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      exercises TEXT[] DEFAULT ARRAY[]::TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_chat_messages (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitness_wearable_devices (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES fitness_users(id) ON DELETE CASCADE,
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      synced_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}
