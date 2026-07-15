import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";

async function getJson(baseUrl: string, path: string) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "x-request-id": `manual-${Date.now()}`,
    },
  });

  const body = await response.json();
  return {
    status: response.status,
    path,
    body,
  };
}

async function run() {
  console.log("======================================");
  console.log(" Fitness Sincera Backend Health Check ");
  console.log("======================================");

  const server = app.listen(0, "127.0.0.1");

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    console.log(`Backend started locally at ${baseUrl}`);

    const checks = await Promise.all([
      getJson(baseUrl, "/api/health"),
      getJson(baseUrl, "/api/readiness"),
      getJson(baseUrl, "/api/v1/health"),
      getJson(baseUrl, "/api/v1/system/meta"),
    ]);

    for (const check of checks) {
      console.log("");
      console.log(`${check.status} ${check.path}`);
      console.log(JSON.stringify(check.body, null, 2));
    }

    const failed = checks.filter((check) => check.status !== 200);
    if (failed.length > 0) {
      throw new Error(`${failed.length} health check(s) failed.`);
    }

    console.log("");
    console.log("OK - backend foundation endpoints are responding.");
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

run().catch((error) => {
  console.error("");
  console.error("FAILED - backend health manual check");
  console.error(error);
  process.exit(1);
});
