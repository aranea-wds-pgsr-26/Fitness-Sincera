import "dotenv/config";
import app from "./app";
import { env } from "./config";
import { initializeStore } from "./lib/store";

async function start() {
  if (env.DATABASE_URL) {
    try {
      await initializeStore();
    } catch (error) {
      console.warn("Database initialization failed. Health checks will remain available.");
      console.warn(error);
    }
  } else {
    console.warn("DATABASE_URL not configured. Database-backed routes will be unavailable.");
  }

  const port = env.PORT;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
