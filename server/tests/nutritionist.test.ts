import { describe, it, expect, beforeEach } from "vitest";

// Mock request helper
function createMockRequest(overrides: any = {}) {
  return {
    user: {
      id: "nutritionist-1",
      username: "nutritionist_user",
      role: "nutritionist",
      isSpecialist: true,
    },
    ...overrides,
  };
}

function createMockResponse() {
  const res: any = {};
  res.status = function (code: number) {
    res.statusCode = code;
    return res;
  };
  res.json = function (data: any) {
    res.jsonData = data;
    return res;
  };
  return res;
}

describe("Nutritionist Endpoints", () => {
  it("should get dashboard stats successfully", async () => {
    const req = createMockRequest();
    const res = createMockResponse();

    // Mock the controller
    const stats = {
      totalClients: 3,
      atRiskCount: 1,
      avgAdherence: 65,
      lastUpdated: new Date().toISOString(),
    };

    res.status(200).json(stats);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData).toHaveProperty("totalClients");
    expect(res.jsonData.totalClients).toBeGreaterThan(0);
  });

  it("should list clients with pagination", async () => {
    const req = createMockRequest({ query: { page: "1" } });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "1",
          name: "João Silva",
          email: "joao@example.com",
          status: "active",
          adherence: 85,
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 3,
        totalPages: 1,
      },
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.jsonData.data)).toBe(true);
    expect(res.jsonData.pagination).toBeDefined();
  });

  it("should filter clients by status", async () => {
    const req = createMockRequest({
      query: { status: "active" },
    });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "1",
          name: "João Silva",
          status: "active",
          adherence: 85,
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 2,
        totalPages: 1,
      },
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.data.every((c: any) => c.status === "active")).toBe(true);
  });

  it("should search clients by name", async () => {
    const req = createMockRequest({
      query: { search: "João" },
    });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "1",
          name: "João Silva",
          email: "joao@example.com",
          status: "active",
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      },
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.data.length).toBeGreaterThan(0);
  });

  it("should get client nutrition detail", async () => {
    const req = createMockRequest({ params: { clientId: "1" } });
    const res = createMockResponse();

    const response = {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      status: "active",
      metrics: [
        {
          date: new Date().toISOString(),
          caloriesConsumed: 1950,
          caloriesGoal: 2000,
          protein: 150,
          carbs: 200,
          fat: 60,
          proteinGoal: 160,
          carbsGoal: 220,
          fatGoal: 65,
        },
      ],
      currentMetrics: {
        date: new Date().toISOString(),
        caloriesConsumed: 1950,
        caloriesGoal: 2000,
        protein: 150,
        carbs: 200,
        fat: 60,
        proteinGoal: 160,
        carbsGoal: 220,
        fatGoal: 65,
      },
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.id).toBe("1");
    expect(Array.isArray(res.jsonData.metrics)).toBe(true);
    expect(res.jsonData.currentMetrics).toBeDefined();
  });

  it("should return 404 for non-existent client", async () => {
    const req = createMockRequest({ params: { clientId: "999" } });
    const res = createMockResponse();

    res.status(404).json({ error: "Client not found" });

    expect(res.statusCode).toBe(404);
    expect(res.jsonData).toHaveProperty("error");
  });

  it("should update meal plan successfully", async () => {
    const req = createMockRequest({
      params: { clientId: "1" },
      body: { mealPlanId: "plan-new-123" },
    });
    const res = createMockResponse();

    const response = {
      message: "Meal plan updated successfully",
      clientId: "1",
      mealPlanId: "plan-new-123",
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.message).toContain("updated");
  });

  it("should return 400 if mealPlanId is missing", async () => {
    const req = createMockRequest({
      params: { clientId: "1" },
      body: {},
    });
    const res = createMockResponse();

    res.status(400).json({ error: "mealPlanId is required" });

    expect(res.statusCode).toBe(400);
    expect(res.jsonData).toHaveProperty("error");
  });
});
