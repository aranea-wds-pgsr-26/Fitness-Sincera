import "dotenv/config";

import type { AddressInfo } from "node:net";
import { createExpressApp } from "../../../../server/app";
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

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  return { response, body };
}

function assertOk(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  console.log("=======================================");
  console.log(" Fitness Sincera Functional CRUD Test ");
  console.log("=======================================");

  const { httpServer } = await createExpressApp({ clientMode: "none" });
  const created: Array<{ path: string; id: string; token: string }> = [];
  const tokens: string[] = [];

  try {
    await new Promise<void>((resolve) => {
      httpServer.listen(0, "127.0.0.1", resolve);
    });

    const { port } = httpServer.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;
    const nutritionist = await UserRepository.findByEmail("sofia.almeida@fitnesssincera.com");
    const trainer = await UserRepository.findByEmail("ricardo@fitnesssincera.com");

    assertOk(nutritionist, "Default nutritionist user not found.");
    assertOk(trainer, "Default trainer user not found.");

    const nutritionistToken = await UserRepository.createSession(nutritionist);
    const trainerToken = await UserRepository.createSession(trainer);
    tokens.push(nutritionistToken, trainerToken);

    const nutritionistHeaders = { authorization: `Bearer ${nutritionistToken}` };
    const trainerHeaders = { authorization: `Bearer ${trainerToken}` };

    const diet = await jsonRequest(baseUrl, "/api/diets", {
      method: "POST",
      headers: nutritionistHeaders,
      body: JSON.stringify({
        name: "Sprint 17 Diet Test",
        description: "Plano alimentar criado pelo teste funcional.",
        meals: ["Cafe da manha proteico", "Almoco equilibrado"],
      }),
    });

    assertOk(diet.response.status === 201 && diet.body.success, "Diet creation failed.");
    created.push({ path: "/api/diets", id: diet.body.data.id, token: nutritionistToken });
    console.log("OK - Diet created");

    const updatedDiet = await jsonRequest(baseUrl, `/api/diets/${diet.body.data.id}`, {
      method: "PUT",
      headers: nutritionistHeaders,
      body: JSON.stringify({ description: "Plano alimentar atualizado." }),
    });

    assertOk(updatedDiet.response.status === 200 && updatedDiet.body.data.description.includes("atualizado"), "Diet update failed.");
    console.log("OK - Diet updated");

    const workout = await jsonRequest(baseUrl, "/api/workout-plans", {
      method: "POST",
      headers: trainerHeaders,
      body: JSON.stringify({
        name: "Sprint 17 Workout Test",
        description: "Treino criado pelo teste funcional.",
        exercises: ["Agachamento 4x10", "Supino 4x8"],
      }),
    });

    assertOk(workout.response.status === 201 && workout.body.success, "Workout creation failed.");
    created.push({ path: "/api/workout-plans", id: workout.body.data.id, token: trainerToken });
    console.log("OK - Workout created");

    const updatedWorkout = await jsonRequest(baseUrl, `/api/workout-plans/${workout.body.data.id}`, {
      method: "PUT",
      headers: trainerHeaders,
      body: JSON.stringify({ exercises: ["Agachamento 4x10", "Supino 4x8", "Prancha 3x45s"] }),
    });

    assertOk(updatedWorkout.response.status === 200 && updatedWorkout.body.data.exercises.length === 3, "Workout update failed.");
    console.log("OK - Workout updated");

    const food = await jsonRequest(baseUrl, "/api/foods", {
      method: "POST",
      headers: nutritionistHeaders,
      body: JSON.stringify({
        name: `Sprint 17 Food Test ${Date.now()}`,
        category: "teste",
        servingSize: 100,
        servingUnit: "g",
        calories: 123,
        protein: 12,
        carbs: 20,
        fat: 3,
      }),
    });

    assertOk(food.response.status === 201 && food.body.success, "Food creation failed.");
    created.push({ path: "/api/foods", id: food.body.data.id, token: nutritionistToken });
    console.log("OK - Food created");

    const updatedFood = await jsonRequest(baseUrl, `/api/foods/${food.body.data.id}`, {
      method: "PUT",
      headers: nutritionistHeaders,
      body: JSON.stringify({
        ...food.body.data,
        protein: 18,
      }),
    });

    assertOk(updatedFood.response.status === 200 && updatedFood.body.data.protein === 18, "Food update failed.");
    console.log("OK - Food updated");

    const meal = await jsonRequest(baseUrl, "/api/meals", {
      method: "POST",
      headers: nutritionistHeaders,
      body: JSON.stringify({
        name: "Sprint 17 Meal Test",
        notes: "Refeicao criada pelo teste funcional.",
        calories: 450,
        protein: 35,
        carbs: 42,
        fat: 12,
      }),
    });

    assertOk(meal.response.status === 201 && meal.body.success, "Meal creation failed.");
    created.push({ path: "/api/meals", id: meal.body.data.id, token: nutritionistToken });
    console.log("OK - Meal created");

    const updatedMeal = await jsonRequest(baseUrl, `/api/meals/${meal.body.data.id}`, {
      method: "PUT",
      headers: nutritionistHeaders,
      body: JSON.stringify({ calories: 500 }),
    });

    assertOk(updatedMeal.response.status === 200 && updatedMeal.body.data.calories === 500, "Meal update failed.");
    console.log("OK - Meal updated");

    for (const item of created.reverse()) {
      const deleted = await jsonRequest(baseUrl, `${item.path}/${item.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${item.token}`,
        },
      });

      assertOk(deleted.response.status === 204, `Delete failed for ${item.path}/${item.id}`);
    }

    created.length = 0;
    console.log("OK - Created records deleted");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    for (const item of created.reverse()) {
      await jsonRequest(baseUrlFromServer(httpServer), `${item.path}/${item.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${item.token}`,
        },
      }).catch(() => undefined);
    }

    for (const token of tokens) {
      await UserRepository.revokeSession(token).catch(() => undefined);
    }

    await new Promise<void>((resolve, reject) => {
      httpServer.close((error?: Error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

function baseUrlFromServer(server: { address(): string | AddressInfo | null }) {
  const address = server.address() as AddressInfo | null;
  return `http://127.0.0.1:${address?.port ?? 0}`;
}

run().catch((error) => {
  console.error("");
  console.error("FUNCTIONAL CRUD TEST FAILED");
  console.error(error);
  process.exit(1);
});
