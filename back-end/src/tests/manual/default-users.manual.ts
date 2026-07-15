import "dotenv/config";

import { DEFAULT_AUTH_USERS } from "../../modules/auth/defaultUsers";
import { UserRepository } from "../../repositories/userRepository";

async function run() {
  console.log("====================================");
  console.log(" Fitness Sincera Default Users Seed ");
  console.log("====================================");

  for (const user of DEFAULT_AUTH_USERS) {
    const existing = await UserRepository.findByEmail(user.email);

    if (existing) {
      await UserRepository.updateByEmail(user.email, user);
      console.log(`OK - Updated ${user.role}: ${user.email}`);
      continue;
    }

    const created = await UserRepository.create(user);
    console.log(`OK - Created ${created.role}: ${created.email}`);
  }

  console.log("");
  console.log("Default users ready:");

  for (const user of DEFAULT_AUTH_USERS) {
    const saved = await UserRepository.findByEmail(user.email);

    if (!saved) {
      throw new Error(`Default user missing after seed: ${user.email}`);
    }

    console.log(`- ${saved.role}: ${saved.email} / ${user.password}`);
  }

  console.log("");
  console.log("ALL DEFAULT USERS SEEDED");
}

run().catch((error) => {
  console.error("");
  console.error("DEFAULT USERS SEED FAILED");
  console.error(error);
  process.exit(1);
});
