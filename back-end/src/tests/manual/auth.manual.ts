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
  console.log("===============================");
  console.log(" Fitness Sincera Auth API Test ");
  console.log("===============================");

  const server = app.listen(0, "127.0.0.1");
  let token: string | undefined;
  let testEmail: string | undefined;

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;
    const email = `auth-test-${Date.now()}@fitnesssincera.local`;
    const password = "auth-test-password";
    testEmail = email;

    console.log(`Backend started locally at ${baseUrl}`);

    const register = await jsonRequest(baseUrl, "/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Auth Test User",
        email,
        password,
        role: "client",
      }),
    });

    if (register.response.status !== 201) {
      throw new Error(`Register failed: ${JSON.stringify(register.body)}`);
    }

    token = register.body.token;
    console.log("OK - User registered");
    console.log(`     ID: ${register.body.user.id}`);
    console.log(`     Email: ${register.body.user.email}`);

    const login = await jsonRequest(baseUrl, "/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (login.response.status !== 200) {
      throw new Error(`Login failed: ${JSON.stringify(login.body)}`);
    }

    token = login.body.token;
    console.log("OK - User logged in");

    const me = await jsonRequest(baseUrl, "/api/auth/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (me.response.status !== 200) {
      throw new Error(`Me failed: ${JSON.stringify(me.body)}`);
    }

    if (me.body.user.email !== email) {
      throw new Error("Authenticated user email does not match test user.");
    }

    console.log("OK - Authenticated profile loaded");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    if (testEmail) {
      await UserRepository.deleteByEmail(testEmail);
    }

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
  console.error("AUTH API TEST FAILED");
  console.error(error);
  process.exit(1);
});
