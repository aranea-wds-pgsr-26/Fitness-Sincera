import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";
import { UserRepository } from "../../repositories/userRepository";

async function jsonRequest(
  baseUrl: string,
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const body = await response.json();
  return { response, body };
}

async function run() {
  console.log("================================");
  console.log(" Fitness Sincera Admin API Test ");
  console.log("================================");

  const server = app.listen(0, "127.0.0.1");
  const professionalEmail = `admin-professional-${Date.now()}@fitnesssincera.local`;
  let token: string | undefined;

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    const admin = await UserRepository.findByEmail("admin@fitnesssincera.com");

    if (!admin) {
      throw new Error("Default admin user not found.");
    }

    token = await UserRepository.createSession(admin);

    const authHeaders = {
      authorization: `Bearer ${token}`,
    };

    const dashboard = await jsonRequest(baseUrl, "/api/admin/dashboard", {
      headers: authHeaders,
    });

    if (dashboard.response.status !== 200 || !dashboard.body.success) {
      throw new Error(`Admin dashboard failed: ${JSON.stringify(dashboard.body)}`);
    }

    if (typeof dashboard.body.data.users !== "number") {
      throw new Error("Admin dashboard did not return user metrics.");
    }

    console.log("OK - Admin dashboard metrics loaded");

    const professionals = await jsonRequest(baseUrl, "/api/admin/professionals", {
      headers: authHeaders,
    });

    if (professionals.response.status !== 200 || !professionals.body.success) {
      throw new Error(`Admin professionals failed: ${JSON.stringify(professionals.body)}`);
    }

    if (!Array.isArray(professionals.body.data)) {
      throw new Error("Admin professionals response is not a list.");
    }

    console.log("OK - Admin professionals listed");

    const created = await jsonRequest(baseUrl, "/api/admin/professionals", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        name: "Admin Test Nutritionist",
        email: professionalEmail,
        password: "admin-test-password",
        role: "nutritionist",
      }),
    });

    if (created.response.status !== 201 || !created.body.success) {
      throw new Error(`Admin create professional failed: ${JSON.stringify(created.body)}`);
    }

    if (created.body.data.email !== professionalEmail) {
      throw new Error("Created professional email does not match.");
    }

    console.log("OK - Admin professional created");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    await UserRepository.deleteByEmail(professionalEmail);

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
  console.error("ADMIN API TEST FAILED");
  console.error(error);
  process.exit(1);
});
