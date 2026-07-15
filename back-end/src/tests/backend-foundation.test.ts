import { strict as assert } from "node:assert";
import type { AddressInfo } from "node:net";
import app from "../app";

async function request(baseUrl: string, path: string) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "x-request-id": "test-request-id",
    },
  });

  const body = await response.json();
  return { response, body };
}

async function main() {
  const server = app.listen(0, "127.0.0.1");

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    const health = await request(baseUrl, "/api/health");
    assert.equal(health.response.status, 200);
    assert.equal(health.body.status, "ok");
    assert.equal(health.body.service, "fitness-sincera-backend");
    assert.equal(health.body.requestId, "test-request-id");
    assert.equal(health.response.headers.get("x-request-id"), "test-request-id");

    const v1Health = await request(baseUrl, "/api/v1/health");
    assert.equal(v1Health.response.status, 200);
    assert.equal(v1Health.body.status, "ok");

    const meta = await request(baseUrl, "/api/v1/system/meta");
    assert.equal(meta.response.status, 200);
    assert.equal(meta.body.apiVersion, "v1");

    const notFound = await request(baseUrl, "/api/missing-route");
    assert.equal(notFound.response.status, 404);
    assert.equal(notFound.body.success, false);
    assert.equal(notFound.body.requestId, "test-request-id");
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
