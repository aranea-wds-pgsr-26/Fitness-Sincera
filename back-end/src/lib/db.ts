import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const requiresSsl =
  connectionString?.includes("supabase") || connectionString?.includes("sslmode=require");

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 10_000,
  max: Number(process.env.PG_POOL_MAX ?? 1),
  ssl: requiresSsl ? { rejectUnauthorized: false } : undefined,
});

export async function checkDatabaseConnection() {
  if (!connectionString) {
    return {
      ok: false,
      configured: false,
      message: "DATABASE_URL is not configured",
    };
  }

  try {
    await pool.query("select 1");
    return {
      ok: true,
      configured: true,
      message: "Database connection ok",
    };
  } catch (error) {
    const dbError = error as NodeJS.ErrnoException & { code?: string };
    return {
      ok: false,
      configured: true,
      code: dbError.code,
      message: dbError.message,
    };
  }
}

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
