import express from "express";
import fs from "node:fs";
import path from "node:path";
import apiRouter from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { requestId } from "./middleware/requestId";

interface CreateAppOptions {
  serveClient?: boolean;
}

export function createApp({ serveClient = false }: CreateAppOptions = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use(requestId);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", apiRouter);

  if (serveClient) {
    const clientDist = path.resolve(process.cwd(), "dist", "public");

    if (!fs.existsSync(clientDist)) {
      throw new Error("Client build not found. Run npm run build before starting production.");
    }

    app.use(express.static(clientDist));
    app.use("/{*path}", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export default createApp();
