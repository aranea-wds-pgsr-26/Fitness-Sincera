import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";
import { ClientOnboardingRepository } from "../../repositories/clientOnboardingRepository";
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
  console.log("=========================================");
  console.log(" Fitness Sincera Client Signup API Test ");
  console.log("=========================================");

  await ClientOnboardingRepository.ensureTables();

  const server = app.listen(0, "127.0.0.1");
  const email = `client-signup-${Date.now()}@fitnesssincera.local`;
  let token: string | undefined;

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    const signup = await jsonRequest(baseUrl, "/api/public/client-signup", {
      method: "POST",
      body: JSON.stringify({
        name: "Client Signup Test",
        email,
        password: "client-signup-test",
        phone: "(11) 90000-0000",
        birthDate: "1992-05-10",
        gender: "prefer_not_to_say",
        goal: "Ganhar massa magra com acompanhamento integrado.",
        planInterest: "complete",
        heightCm: 178,
        weightKg: 82,
        activityLevel: "moderate",
        restrictions: "Sem restricoes alimentares declaradas.",
        injuries: "Sem lesoes atuais.",
        medications: "Nenhum medicamento continuo.",
        sleepQuality: "Sono regular.",
        hydration: "Cerca de 2 litros por dia.",
        notes: "Teste manual da Sprint 18.",
      }),
    });

    if (signup.response.status !== 201 || !signup.body.success) {
      throw new Error(`Client signup failed: ${JSON.stringify(signup.body)}`);
    }

    if (signup.body.data.user.role !== "client" || !signup.body.data.token) {
      throw new Error("Client signup did not return a client session.");
    }

    token = signup.body.data.token;
    console.log("OK - Client signup created user, anamnesis and token");

    const login = await jsonRequest(baseUrl, "/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password: "client-signup-test",
      }),
    });

    if (login.response.status !== 200 || login.body.user.email !== email) {
      throw new Error(`Login after signup failed: ${JSON.stringify(login.body)}`);
    }

    console.log("OK - Created client can login");

    const duplicated = await jsonRequest(baseUrl, "/api/public/client-signup", {
      method: "POST",
      body: JSON.stringify({
        name: "Duplicated Client",
        email,
        password: "client-signup-test",
        goal: "Duplicated account.",
        planInterest: "nutrition",
      }),
    });

    if (duplicated.response.status !== 409) {
      throw new Error(`Duplicated email was not rejected: ${JSON.stringify(duplicated.body)}`);
    }

    console.log("OK - Duplicated email is rejected");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    await UserRepository.deleteByEmail(email);

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
  console.error("CLIENT SIGNUP API TEST FAILED");
  console.error(error);
  process.exit(1);
});
