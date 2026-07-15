import { Pool } from "pg";

const databaseEnvCandidates = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "SUPABASE_DB_URL",
] as const;

function getDatabaseConnectionString() {
  for (const key of databaseEnvCandidates) {
    const value = process.env[key];
    if (value?.trim()) {
      return {
        source: key,
        value: value.trim(),
      };
    }
  }

  return null;
}

function getSafeDatabaseTarget(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return {
      protocol: url.protocol.replace(":", ""),
      host: url.hostname,
      port: url.port || (url.protocol === "postgresql:" ? "5432" : ""),
      database: url.pathname.replace("/", "") || null,
      sslmode: url.searchParams.get("sslmode"),
    };
  } catch {
    return {
      parseError: "Invalid database URL format",
    };
  }
}

function getSupabaseEnvDiagnostics() {
  return {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    POSTGRES_URL: Boolean(process.env.POSTGRES_URL),
    SUPABASE_DB_URL: Boolean(process.env.SUPABASE_DB_URL),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

const databaseConnection = getDatabaseConnectionString();
const connectionString = databaseConnection?.value;
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
      env: getSupabaseEnvDiagnostics(),
      message:
        "No PostgreSQL connection string configured. Drizzle needs DATABASE_URL, POSTGRES_URL or SUPABASE_DB_URL; Supabase URL/anon keys alone are not enough for backend database access.",
    };
  }

  try {
    await pool.query("select 1");
    return {
      ok: true,
      configured: true,
      source: databaseConnection.source,
      target: getSafeDatabaseTarget(connectionString),
      env: getSupabaseEnvDiagnostics(),
      message: "Database connection ok",
    };
  } catch (error) {
    const dbError = error as NodeJS.ErrnoException & { code?: string };
    return {
      ok: false,
      configured: true,
      source: databaseConnection.source,
      target: getSafeDatabaseTarget(connectionString),
      env: getSupabaseEnvDiagnostics(),
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
