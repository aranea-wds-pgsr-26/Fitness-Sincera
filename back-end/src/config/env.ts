export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4001),
  DATABASE_URL: process.env.DATABASE_URL ?? "",
};