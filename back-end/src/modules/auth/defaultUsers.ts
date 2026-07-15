import type { CreateUserInput } from "./types";

export const DEFAULT_AUTH_USERS: CreateUserInput[] = [
  {
    name: "Admin Fitness Sincera",
    email: "admin@fitnesssincera.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Lucas Bennett",
    email: "bennet02@gmail.com",
    password: "client123",
    role: "client",
  },
  {
    name: "Dra. Sofia Almeida",
    email: "sofia.almeida@fitnesssincera.com",
    password: "nutritionist123",
    role: "nutritionist",
  },
  {
    name: "Coach Ricardo",
    email: "ricardo@fitnesssincera.com",
    password: "trainer123",
    role: "trainer",
  },
];
