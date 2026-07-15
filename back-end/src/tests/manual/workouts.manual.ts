import "dotenv/config";

import {
  findUserByEmail,
  initializeStore,
} from "../../lib/store";
import { WorkoutRepository } from "../../repositories/workoutRepository";

async function run() {
  console.log("====================================");
  console.log(" Fitness Sincera Workouts API Test ");
  console.log("====================================");

  await initializeStore();
  console.log("OK - Database initialized");

  const admin = await findUserByEmail("admin@fitnesssincera.com");

  if (!admin) {
    throw new Error("Admin user not found.");
  }

  console.log(`OK - Admin found: ${admin.email}`);
  console.log(`     ID: ${admin.id}`);

  const workout = await WorkoutRepository.create(admin.id, {
    name: "Integration Test Workout",
    description: "Created by workouts integration test",
    exercises: ["squat", "bench press"],
  });

  console.log("OK - Workout created");
  console.log(workout);

  const workouts = await WorkoutRepository.listByUser(admin.id);
  const created = workouts.find((item) => item.id === workout.id);

  if (!created) {
    throw new Error("Created workout was not found in database.");
  }

  console.log("OK - Workout found in database");

  const updated = await WorkoutRepository.update(workout.id, admin.id, {
    description: "Updated by workouts integration test",
    exercises: ["squat", "bench press", "deadlift"],
  });

  if (!updated) {
    throw new Error("Workout update failed.");
  }

  console.log("OK - Workout updated");
  console.log(updated);

  const workoutsAfterUpdate = await WorkoutRepository.listByUser(admin.id);
  const updatedWorkout = workoutsAfterUpdate.find((item) => item.id === workout.id);

  if (!updatedWorkout) {
    throw new Error("Updated workout not found.");
  }

  if (updatedWorkout.exercises.length !== 3) {
    throw new Error("Workout exercises were not updated.");
  }

  console.log("OK - Update validated");

  const deleted = await WorkoutRepository.delete(workout.id, admin.id);

  if (!deleted) {
    throw new Error("Workout deletion failed.");
  }

  console.log("OK - Workout deleted");

  const workoutsAfterDelete = await WorkoutRepository.listByUser(admin.id);
  const stillExists = workoutsAfterDelete.some((item) => item.id === workout.id);

  if (stillExists) {
    throw new Error("Workout still exists after delete.");
  }

  console.log("OK - Delete validated");
  console.log("");
  console.log("ALL TESTS PASSED");
}

run().catch((error) => {
  console.error("");
  console.error("WORKOUTS INTEGRATION TEST FAILED");
  console.error(error);
  process.exit(1);
});
