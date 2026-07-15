import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";
import { DEFAULT_FOODS } from "../../database/seeds/foods";
import { FoodRepository } from "../../repositories/foodRepository";
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
  console.log(" Fitness Sincera Foods Seed Test ");
  console.log("================================");

  let createdOrUpdated = 0;

  for (const food of DEFAULT_FOODS) {
    await FoodRepository.upsertByName(food);
    createdOrUpdated += 1;
  }

  console.log(`OK - Seeded ${createdOrUpdated} foods`);

  const foods = await FoodRepository.list({ limit: 200 });
  const rice = foods.find((food) => food.name === "Arroz branco cozido");
  const chicken = foods.find((food) => food.name === "Peito de frango grelhado");

  if (!rice) {
    throw new Error("Rice seed was not found.");
  }

  if (!chicken) {
    throw new Error("Chicken seed was not found.");
  }

  if (chicken.protein < 25) {
    throw new Error("Chicken protein value looks invalid.");
  }

  const proteinFoods = await FoodRepository.list({ search: "proteina", limit: 20 });

  if (proteinFoods.length === 0) {
    throw new Error("Food search by category did not return results.");
  }

  console.log(`OK - Listed ${foods.length} foods`);
  console.log(`OK - Search returned ${proteinFoods.length} protein foods`);

  const server = app.listen(0, "127.0.0.1");
  const testEmail = `foods-test-${Date.now()}@fitnesssincera.local`;
  let token: string | undefined;

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;
    const user = await UserRepository.create({
      name: "Foods Test Nutritionist",
      email: testEmail,
      password: "foods-test-password",
      role: "nutritionist",
    });

    token = await UserRepository.createSession(user);

    const apiFoods = await jsonRequest(baseUrl, "/api/foods?search=proteina&limit=20", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (apiFoods.response.status !== 200) {
      throw new Error(`Foods API failed: ${JSON.stringify(apiFoods.body)}`);
    }

    if (!apiFoods.body.success || !Array.isArray(apiFoods.body.data) || apiFoods.body.data.length === 0) {
      throw new Error("Foods API did not return seeded foods.");
    }

    console.log("OK - Foods API search validated");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    await UserRepository.deleteByEmail(testEmail);

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  console.log("");
  console.log("ALL TESTS PASSED");
}

run().catch((error) => {
  console.error("");
  console.error("FOODS SEED TEST FAILED");
  console.error(error);
  process.exit(1);
});
