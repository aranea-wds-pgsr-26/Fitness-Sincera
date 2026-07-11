import "dotenv/config";
import app from "./app";
import { initializeStore } from "./lib/store";

async function start() {
  await initializeStore();

  const port = Number(process.env.PORT ?? 4001);
  app.listen(port, "0.0.0.0", () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
