import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import {
  NutritionistDashboardStats,
  ClientListItem,
  ClientNutritionDetail,
} from "../../shared/types/professional";

// Mock data for development
const mockClients: ClientListItem[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    status: "active",
    lastCheckin: new Date(Date.now() - 86400000).toISOString(),
    mealPlanId: "plan-1",
    adherence: 85,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    status: "active",
    lastCheckin: new Date(Date.now() - 172800000).toISOString(),
    mealPlanId: "plan-2",
    adherence: 65,
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@example.com",
    status: "active",
    lastCheckin: null,
    mealPlanId: "plan-3",
    adherence: 45,
  },
];

const mockNutritionMetrics = [
  { date: new Date(Date.now() - 604800000).toISOString(), caloriesConsumed: 1950, caloriesGoal: 2000, protein: 150, carbs: 200, fat: 60, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 518400000).toISOString(), caloriesConsumed: 2010, caloriesGoal: 2000, protein: 155, carbs: 210, fat: 62, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 432000000).toISOString(), caloriesConsumed: 1920, caloriesGoal: 2000, protein: 148, carbs: 198, fat: 58, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 345600000).toISOString(), caloriesConsumed: 2050, caloriesGoal: 2000, protein: 162, carbs: 225, fat: 68, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 259200000).toISOString(), caloriesConsumed: 1980, caloriesGoal: 2000, protein: 151, carbs: 205, fat: 61, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 172800000).toISOString(), caloriesConsumed: 2005, caloriesGoal: 2000, protein: 156, carbs: 212, fat: 63, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
  { date: new Date(Date.now() - 86400000).toISOString(), caloriesConsumed: 1990, caloriesGoal: 2000, protein: 152, carbs: 207, fat: 60, proteinGoal: 160, carbsGoal: 220, fatGoal: 65 },
];

export async function getNutritionistDashboard(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const clientsAtRisk = mockClients.filter((c) => c.adherence < 70).length;
    const activeClients = mockClients.filter((c) => c.status === "active").length;
    const avgCompliancePercent = Math.round(
      mockClients.reduce((sum, c) => sum + c.adherence, 0) / mockClients.length
    );

    const stats: NutritionistDashboardStats = {
      totalClients: mockClients.length,
      activeClients,
      clientsAtRisk,
      avgCompliancePercent,
      recentActivity: [
        { id: "1", clientName: "João Silva", action: "registrou refeição", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: "2", clientName: "Maria Santos", action: "completou meta diária", timestamp: new Date(Date.now() - 7200000).toISOString() },
      ],
      weeklyCaloriesData: [
        { label: "Seg", value: 1950 },
        { label: "Ter", value: 2010 },
        { label: "Qua", value: 1920 },
        { label: "Qui", value: 2050 },
        { label: "Sex", value: 1980 },
        { label: "Sab", value: 2005 },
        { label: "Dom", value: 1990 },
      ],
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error in getNutritionistDashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listNutritionistClients(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { status, search, page = "1" } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const pageSize = 10;

    let filtered = [...mockClients];

    if (status && status !== "all") {
      filtered = filtered.filter((c) => c.status === status);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm) ||
          c.email.toLowerCase().includes(searchTerm)
      );
    }

    const total = filtered.length;
    const start = (pageNum - 1) * pageSize;
    const clients = filtered.slice(start, start + pageSize);

    res.status(200).json({
      data: clients,
      pagination: {
        page: pageNum,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error in listNutritionistClients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getNutritionistClientDetail(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { clientId } = req.params;

    const client = mockClients.find((c) => c.id === clientId);
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    const detail: ClientNutritionDetail = {
      id: client.id,
      name: client.name,
      email: client.email,
      status: client.status,
      metrics: mockNutritionMetrics,
      currentMetrics: mockNutritionMetrics[mockNutritionMetrics.length - 1],
    };

    res.status(200).json(detail);
  } catch (error) {
    console.error("Error in getNutritionistClientDetail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateNutritionistClientPlan(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { clientId } = req.params;
    const { mealPlanId } = req.body;

    if (!mealPlanId) {
      res.status(400).json({ error: "mealPlanId is required" });
      return;
    }

    const client = mockClients.find((c) => c.id === clientId);
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    // Update mock client
    client.mealPlanId = mealPlanId;

    res.status(200).json({
      message: "Meal plan updated successfully",
      clientId,
      mealPlanId,
    });
  } catch (error) {
    console.error("Error in updateNutritionistClientPlan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
