export type UserRole = "admin" | "nutritionist" | "trainer" | "client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date | null;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
