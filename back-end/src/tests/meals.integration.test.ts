import "dotenv/config";

import {
  initializeStore,
  findUserByEmail,
  createMeal,
  listMealsForUser,
  updateMeal,
  deleteMeal,
} from "../lib/store";

async function run() {
  console.log("==================================");
  console.log(" Fitness Sincera Integration Test ");
  console.log("==================================");

  await initializeStore();
  console.log("✔ Database initialized");

  const admin = await findUserByEmail("admin@fitnesssincera.com");

  if (!admin) {
    throw new Error("Admin user not found.");
  }

  console.log(`✔ Admin found: ${admin.email}`);
  console.log(`   ID: ${admin.id}`);

  const meal = await createMeal(admin.id, {
    name: "Integration Test Meal",
    calories: 500,
    protein: 40,
    carbs: 45,
    fat: 15,
    notes: "Created by integration test",
  });

  console.log("✔ Meal created");
  console.log(meal);

  const meals = await listMealsForUser(admin.id);

  const created = meals.find((m) => m.id === meal.id);

  if (!created) {
    throw new Error("Created meal was not found in database.");
  }

  console.log("✔ Meal found in database");

  const updated = await updateMeal(meal.id, admin.id, {
    calories: 650,
  });

  if (!updated) {
    throw new Error("Meal update failed.");
  }

  console.log("✔ Meal updated");
  console.log(updated);

  const mealsAfterUpdate = await listMealsForUser(admin.id);

  const updatedMeal = mealsAfterUpdate.find(
    (m) => m.id === meal.id
  );

  if (!updatedMeal) {
    throw new Error("Updated meal not found.");
  }

  if (updatedMeal.calories !== 650) {
    throw new Error("Calories were not updated.");
  }

  console.log("✔ Update validated");

  const deleted = await deleteMeal(meal.id, admin.id);

  if (!deleted) {
    throw new Error("Meal deletion failed.");
  }

  console.log("✔ Meal deleted");

  const mealsAfterDelete = await listMealsForUser(admin.id);

  const stillExists = mealsAfterDelete.some(
    (m) => m.id === meal.id
  );

  if (stillExists) {
    throw new Error("Meal still exists after delete.");
  }

  console.log("✔ Delete validated");

  console.log("");
  console.log("🎉 ALL TESTS PASSED");
}

run().catch((error) => {
  console.error("");
  console.error("❌ INTEGRATION TEST FAILED");
  console.error(error);
  process.exit(1);
});