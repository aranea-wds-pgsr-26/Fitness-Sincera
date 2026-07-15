import "dotenv/config";

import {
  findUserByEmail,
  initializeStore,
} from "../../lib/store";
import { DietRepository } from "../../repositories/dietRepository";

async function run() {
  console.log("==================================");
  console.log(" Fitness Sincera Diets API Test ");
  console.log("==================================");

  await initializeStore();
  console.log("OK - Database initialized");

  const admin = await findUserByEmail("admin@fitnesssincera.com");

  if (!admin) {
    throw new Error("Admin user not found.");
  }

  console.log(`OK - Admin found: ${admin.email}`);
  console.log(`     ID: ${admin.id}`);

  const diet = await DietRepository.create(admin.id, {
    name: "Integration Test Diet",
    description: "Created by diets integration test",
    meals: ["breakfast", "lunch"],
  });

  console.log("OK - Diet created");
  console.log(diet);

  const diets = await DietRepository.listByUser(admin.id);
  const created = diets.find((item) => item.id === diet.id);

  if (!created) {
    throw new Error("Created diet was not found in database.");
  }

  console.log("OK - Diet found in database");

  const updated = await DietRepository.update(diet.id, admin.id, {
    description: "Updated by diets integration test",
    meals: ["breakfast", "lunch", "dinner"],
  });

  if (!updated) {
    throw new Error("Diet update failed.");
  }

  console.log("OK - Diet updated");
  console.log(updated);

  const dietsAfterUpdate = await DietRepository.listByUser(admin.id);
  const updatedDiet = dietsAfterUpdate.find((item) => item.id === diet.id);

  if (!updatedDiet) {
    throw new Error("Updated diet not found.");
  }

  if (updatedDiet.meals.length !== 3) {
    throw new Error("Diet meals were not updated.");
  }

  console.log("OK - Update validated");

  const deleted = await DietRepository.delete(diet.id, admin.id);

  if (!deleted) {
    throw new Error("Diet deletion failed.");
  }

  console.log("OK - Diet deleted");

  const dietsAfterDelete = await DietRepository.listByUser(admin.id);
  const stillExists = dietsAfterDelete.some((item) => item.id === diet.id);

  if (stillExists) {
    throw new Error("Diet still exists after delete.");
  }

  console.log("OK - Delete validated");
  console.log("");
  console.log("ALL TESTS PASSED");
}

run().catch((error) => {
  console.error("");
  console.error("DIETS INTEGRATION TEST FAILED");
  console.error(error);
  process.exit(1);
});
