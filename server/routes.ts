import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  nutritionistMockData,
  trainerMockData,
  authMockData,
  INITIAL_MEAL_PLANS,
} from "./data/mockData";
import { UserRepository } from "../back-end/src/repositories/userRepository";
import { AdminRepository } from "../back-end/src/repositories/adminRepository";
import { SiteLeadRepository } from "../back-end/src/repositories/siteLeadRepository";

// DEMO: In production, userId comes from req.session.userId (Passport.js)
const DEMO_USER_ID = "user-1";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "fitness-sincera",
    });
  });

  app.get("/api/readiness", (_req, res) => {
    res.json({
      status: "ok",
      service: "fitness-sincera",
      database: {
        configured: Boolean(process.env.DATABASE_URL),
      },
    });
  });

  // ─── Professional Dashboards ─────────────────────────────────────────────────

  app.get("/api/nutritionist/dashboard", (_req, res) => {
    res.json(nutritionistMockData.dashboard);
  });

  app.get("/api/nutritionist/clients", (req, res) => {
    const { status, search, page = "1", limit = "20" } = req.query as Record<string, string>;
    let clients = [...nutritionistMockData.clients];
    if (status && status !== "all") clients = clients.filter(c => c.status === status);
    if (search) clients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const start = (pageNum - 1) * limitNum;
    const paginated = clients.slice(start, start + limitNum);
    res.json({
      data: paginated,
      pagination: { page: pageNum, totalItems: clients.length, totalPages: Math.ceil(clients.length / limitNum) },
    });
  });

  app.get("/api/nutritionist/clients/:clientId", (req, res) => {
    const detail = nutritionistMockData.getClientDetail(req.params.clientId);
    if (!detail) return res.status(404).json({ error: "Client not found" });
    res.json(detail);
  });

  app.get("/api/trainer/dashboard", (_req, res) => {
    res.json(trainerMockData.dashboard);
  });

  app.get("/api/trainer/clients", (req, res) => {
    const { status, search, page = "1", limit = "20" } = req.query as Record<string, string>;
    let clients = [...trainerMockData.clients];
    if (status && status !== "all") clients = clients.filter(c => c.status === status);
    if (search) clients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const start = (pageNum - 1) * limitNum;
    const paginated = clients.slice(start, start + limitNum);
    res.json({
      data: paginated,
      pagination: { page: pageNum, totalItems: clients.length, totalPages: Math.ceil(clients.length / limitNum) },
    });
  });

  app.get("/api/trainer/clients/:clientId", (req, res) => {
    const detail = trainerMockData.getClientDetail(req.params.clientId);
    if (!detail) return res.status(404).json({ error: "Student not found" });
    res.json(detail);
  });


  // --- Profile ---
  app.get("/api/profile", async (_req, res) => {
    const profile = await storage.getProfile(DEMO_USER_ID);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  });

  app.put("/api/profile", async (req, res) => {
    const updated = await storage.updateProfile(DEMO_USER_ID, req.body);
    if (!updated) return res.status(404).json({ error: "Profile not found" });
    res.json(updated);
  });

  // --- Meals ---
  app.get("/api/meals/today", async (_req, res) => {
    const meals = await storage.getMealsToday(DEMO_USER_ID);
    res.json(meals);
  });

  app.put("/api/meals/:id/status", async (req, res) => {
    const { status } = req.body;
    const meal = await storage.updateMealStatus(req.params.id, status);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  });

  app.put("/api/meals/:id/swap", async (req, res) => {
    const meal = await storage.swapMeal(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  });

  app.get("/api/nutrition/summary", async (_req, res) => {
    const summary = await storage.getNutritionSummary(DEMO_USER_ID);
    res.json(summary);
  });

  // --- Workouts ---
  app.get("/api/workouts", async (req, res) => {
    const category = req.query.category as string | undefined;
    const workouts = await storage.getWorkouts(category);
    res.json(workouts);
  });

  app.get("/api/workouts/:id", async (req, res) => {
    const workout = await storage.getWorkout(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json(workout);
  });

  app.post("/api/workouts/:id/start", async (req, res) => {
    const session = await storage.startWorkout(req.params.id, DEMO_USER_ID);
    res.json(session);
  });

  app.post("/api/workouts/:id/complete", async (req, res) => {
    const session = await storage.completeWorkout(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  });

  // --- Dashboard ---
  app.get("/api/dashboard/summary", async (_req, res) => {
    const summary = await storage.getDashboardSummary(DEMO_USER_ID);
    res.json(summary);
  });

  // --- Progress ---
  app.get("/api/progress/history", async (_req, res) => {
    const history = await storage.getProgressHistory(DEMO_USER_ID);
    res.json(history);
  });

  // --- Water ---
  app.get("/api/water/today", async (_req, res) => {
    const water = await storage.getWaterToday(DEMO_USER_ID);
    res.json(water);
  });

  app.post("/api/water/add", async (req, res) => {
    const { amount } = req.body;
    const water = await storage.addWater(DEMO_USER_ID, amount);
    res.json(water);
  });

  // --- Achievements ---
  app.get("/api/achievements", async (_req, res) => {
    const achievements = await storage.getAchievements(DEMO_USER_ID);
    res.json(achievements);
  });

  // ─── Auth Session (Sprint 1 stub) ──────────────────────────────────────────
  // In production this will validate a JWT. For now it returns the demo session
  // based on a role header sent by the client.
  app.get("/api/auth/session", (req, res) => {
    const role = (req.headers["x-demo-role"] as string) || "client";
    const sessions: Record<string, object> = {
      client: { userId: "user-1", role: "client", name: "Lucas Bennett", email: "bennet02@gmail.com" },
      nutritionist: { userId: "nutri-1", role: "nutritionist", name: "Dra. Sofia Almeida", email: "sofia@fitnesssincera.com" },
      trainer: { userId: "pt-1", role: "trainer", name: "Coach Ricardo", email: "ricardo@fitnesssincera.com" },
    };
    res.json(sessions[role] ?? sessions.client);
  });

  app.post("/api/auth/login", async (req, res) => {
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

  app.get("/api/auth/me", async (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length)
      : undefined;

    if (!token) {
      return res.status(401).json({ message: "Missing bearer token" });
    }

    const user = await UserRepository.getSessionUser(token);

    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    return res.json({ user });
  });

  app.post("/api/public/leads", async (req, res) => {
    const { name, email, phone, audience, interest, message } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      audience?: "client" | "nutritionist" | "trainer" | "company";
      interest?: "complete" | "nutrition" | "training" | "professional" | "partnership";
      message?: string;
    };

    if (!name || !email || !audience || !interest) {
      return res.status(400).json({ message: "name, email, audience and interest are required" });
    }

    if (!["client", "nutritionist", "trainer", "company"].includes(audience)) {
      return res.status(400).json({ message: "audience is invalid" });
    }

    if (!["complete", "nutrition", "training", "professional", "partnership"].includes(interest)) {
      return res.status(400).json({ message: "interest is invalid" });
    }

    const lead = await SiteLeadRepository.create({
      name,
      email,
      phone,
      audience,
      interest,
      message,
    });

    return res.status(201).json({ success: true, data: { id: lead.id, status: lead.status } });
  });

  async function requireAdminFromRequest(req: any, res: any) {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length)
      : undefined;

    if (!token) {
      res.status(401).json({ message: "Missing bearer token" });
      return null;
    }

    const user = await UserRepository.getSessionUser(token);

    if (!user || user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }

    return user;
  }

  app.get("/api/admin/dashboard", async (req, res) => {
    const user = await requireAdminFromRequest(req, res);
    if (!user) return;

    const dashboard = await AdminRepository.getDashboard();
    return res.json({ success: true, data: dashboard });
  });

  app.get("/api/admin/professionals", async (req, res) => {
    const user = await requireAdminFromRequest(req, res);
    if (!user) return;

    const professionals = await AdminRepository.listProfessionals();
    return res.json({ success: true, data: professionals });
  });

  app.get("/api/admin/site-leads", async (req, res) => {
    const user = await requireAdminFromRequest(req, res);
    if (!user) return;

    const leads = await AdminRepository.listSiteLeads();
    return res.json({ success: true, data: leads });
  });

  app.post("/api/admin/professionals", async (req, res) => {
    const user = await requireAdminFromRequest(req, res);
    if (!user) return;

    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "nutritionist" | "trainer";
    };

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "name, email, password and role are required" });
    }

    if (!["nutritionist", "trainer"].includes(role)) {
      return res.status(400).json({ message: "role must be nutritionist or trainer" });
    }

    const professional = await AdminRepository.createProfessional({ name, email, password, role });

    if (!professional) {
      return res.status(409).json({ message: "Professional already exists" });
    }

    return res.status(201).json({ success: true, data: professional });
  });

  // ─── Meal Plans (Nutritionist → Client) ────────────────────────────────────

  // Seed in-memory meal plans (will move to DB in Sprint 2)
  const MOCK_MEAL_PLANS: Record<string, object> = {
    "plan-lucas-week1": {
      id: "plan-lucas-week1",
      nutritionistId: "nutri-1",
      clientId: "user-1",
      name: "Plano Semana 1 — Lucas",
      status: "published",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      blocks: [
        {
          id: "block-1", time: "07:00", title: "Café da Manhã", type: "meal",
          items: [
            { id: "i1", name: "Ovos Mexidos", quantity: "3 unidades", calories: 210, protein: 18, carbs: 3, fat: 14 },
            { id: "i2", name: "Pão Integral", quantity: "1 fatia", calories: 80, protein: 4, carbs: 15, fat: 1 },
            { id: "i3", name: "Café Preto", quantity: "1 xícara", calories: 5, protein: 0, carbs: 1, fat: 0 },
          ],
        },
        {
          id: "block-2", time: "10:00", title: "Lanche da Manhã", type: "snack",
          items: [
            { id: "i4", name: "Maçã", quantity: "1 unidade", calories: 95, protein: 0, carbs: 25, fat: 0 },
            { id: "i5", name: "Castanhas", quantity: "15g", calories: 90, protein: 2, carbs: 2, fat: 8 },
          ],
        },
        {
          id: "block-3", time: "13:00", title: "Almoço", type: "meal",
          items: [
            { id: "i6", name: "Peito de Frango Grelhado", quantity: "150g", calories: 247, protein: 46, carbs: 0, fat: 5 },
            { id: "i7", name: "Arroz Branco", quantity: "100g cozido", calories: 130, protein: 3, carbs: 28, fat: 0 },
            { id: "i8", name: "Salada Mista", quantity: "à vontade", calories: 40, protein: 2, carbs: 7, fat: 0 },
          ],
        },
        {
          id: "block-4", time: "16:00", title: "Pré-Treino", type: "snack",
          items: [
            { id: "i9", name: "Banana", quantity: "1 unidade", calories: 90, protein: 1, carbs: 23, fat: 0 },
            { id: "i10", name: "Creatina", quantity: "5g", calories: 0, protein: 0, carbs: 0, fat: 0 },
          ],
        },
        {
          id: "block-5", time: "20:00", title: "Jantar", type: "meal",
          items: [
            { id: "i11", name: "Tilápia Grelhada", quantity: "150g", calories: 180, protein: 33, carbs: 0, fat: 4 },
            { id: "i12", name: "Purê de Batata Doce", quantity: "100g", calories: 90, protein: 2, carbs: 21, fat: 0 },
          ],
        },
        {
          id: "block-6", time: "22:30", title: "Ceia", type: "snack",
          items: [
            { id: "i13", name: "Iogurte Grego", quantity: "200g", calories: 130, protein: 17, carbs: 6, fat: 4 },
            { id: "i14", name: "Pasta de Amendoim", quantity: "1 colher", calories: 90, protein: 4, carbs: 3, fat: 8 },
          ],
        },
      ],
    },
  };

  // List plans for a nutritionist
  app.get("/api/meal-plans", (_req, res) => {
    res.json(Object.values(MOCK_MEAL_PLANS));
  });

  // Get a specific plan
  app.get("/api/meal-plans/:id", (req, res) => {
    const plan = MOCK_MEAL_PLANS[req.params.id];
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.json(plan);
  });

  // Update plan (nutritionist edits)
  app.put("/api/meal-plans/:id", (req, res) => {
    const existing = MOCK_MEAL_PLANS[req.params.id] as Record<string, unknown> | undefined;
    if (!existing) return res.status(404).json({ error: "Plan not found" });
    const updated = { ...existing, ...req.body, updatedAt: new Date().toISOString() };
    MOCK_MEAL_PLANS[req.params.id] = updated;
    res.json(updated);
  });

  // Publish a plan to client
  app.post("/api/meal-plans/:id/publish", (req, res) => {
    const plan = MOCK_MEAL_PLANS[req.params.id] as Record<string, unknown> | undefined;
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    plan.status = "published";
    plan.publishedAt = new Date().toISOString();
    res.json({ success: true, plan });
  });

  // Client: get today's active meal plan
  app.get("/api/client/meal-plan/today", (_req, res) => {
    const published = Object.values(MOCK_MEAL_PLANS).find(
      (p: any) => p.status === "published" && p.clientId === DEMO_USER_ID
    );
    if (!published) return res.status(404).json({ error: "No active plan" });
    res.json(published);
  });

  // Client: create swap request
  app.post("/api/client/meals/:blockId/swap-request", (req, res) => {
    const request = {
      id: Math.random().toString(36).slice(2),
      clientId: DEMO_USER_ID,
      mealBlockId: req.params.blockId,
      reason: req.body.reason ?? "Sem motivo especificado",
      suggestedBy: "ai",
      status: "pending",
      suggestion: null, // AI will fill this (Sprint 5)
      createdAt: new Date().toISOString(),
    };
    res.json({ success: true, request });
  });

  // Client: chat endpoint (Sprint 5 stub)
  app.post("/api/client/chat", (req, res) => {
    const { message } = req.body;
    // Stub — real response will come from Python AI service in Sprint 5
    const aiReplies: Record<string, string> = {
      default: "Entendido! Vou analisar o seu plano e dar uma sugestão personalizada em breve. 🥗",
    };
    const keywords = ["substituir", "trocar", "alternativa"];
    const isSwap = keywords.some((k) => message?.toLowerCase().includes(k));
    res.json({
      id: Math.random().toString(36).slice(2),
      role: "assistant",
      content: isSwap
        ? "Posso sugerir uma substituição! Com base no seu perfil, uma boa alternativa seria Atum em Lata (150g) com os mesmos macros. Deseja aplicar? 🐟"
        : aiReplies.default,
      createdAt: new Date().toISOString(),
    });
  });

  return httpServer;
}
