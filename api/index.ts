import { createRequire } from "node:module";
import type { Express } from "express";

const require = createRequire(import.meta.url);
const bundledApi = require("../dist/api.cjs") as Express | { default: Express };
const app = "default" in bundledApi ? bundledApi.default : bundledApi;

// The runtime bundle keeps Vercel independent from TypeScript source imports.
export default function handler(req: unknown, res: unknown) {
  return app(req as never, res as never);
}