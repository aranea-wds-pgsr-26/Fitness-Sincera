import { Router } from "express";
//import { createSessionToken, createUser, findUserByEmail, type UserRole } from "../../lib/store";
import { UserRepository, type UserRole } from "../../repositories/userRepository";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role = "client" } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await UserRepository.create({ name, email, password, role });
  const token = await UserRepository.createSession(user);

  return res.status(201).json({ user, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await UserRepository.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = await UserRepository.createSession(user);
  return res.json({ user, token });
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
