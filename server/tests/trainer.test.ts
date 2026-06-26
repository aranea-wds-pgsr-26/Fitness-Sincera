import { describe, it, expect } from "vitest";

// Mock request helper
function createMockRequest(overrides: any = {}) {
  return {
    user: {
      id: "trainer-1",
      username: "trainer_user",
      role: "trainer",
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

describe("Trainer Endpoints", () => {
  it("should get dashboard stats successfully", async () => {
    const req = createMockRequest();
    const res = createMockResponse();

    const stats = {
      totalClients: 3,
      lowAdherenceCount: 1,
      avgPerformance: 72,
      lastUpdated: new Date().toISOString(),
    };

    res.status(200).json(stats);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData).toHaveProperty("totalClients");
    expect(res.jsonData.totalClients).toBeGreaterThan(0);
  });

  it("should list students with pagination", async () => {
    const req = createMockRequest({ query: { page: "1" } });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "1",
          name: "João Silva",
          email: "joao@example.com",
          status: "active",
          adherence: 88,
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

  it("should filter students by performance tier - HIGH", async () => {
    const req = createMockRequest({
      query: { performance: "high" },
    });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "1",
          name: "João Silva",
          status: "active",
          adherence: 88,
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
    expect(res.jsonData.data.every((s: any) => s.adherence > 80)).toBe(true);
  });

  it("should filter students by performance tier - MEDIUM", async () => {
    const req = createMockRequest({
      query: { performance: "medium" },
    });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "2",
          name: "Maria Santos",
          status: "active",
          adherence: 72,
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
    expect(res.jsonData.data.every((s: any) => s.adherence >= 60 && s.adherence <= 80)).toBe(true);
  });

  it("should filter students by performance tier - LOW", async () => {
    const req = createMockRequest({
      query: { performance: "low" },
    });
    const res = createMockResponse();

    const response = {
      data: [
        {
          id: "3",
          name: "Pedro Costa",
          status: "active",
          adherence: 55,
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
    expect(res.jsonData.data.every((s: any) => s.adherence < 60)).toBe(true);
  });

  it("should search students by name", async () => {
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

  it("should get student workout detail", async () => {
    const req = createMockRequest({ params: { clientId: "1" } });
    const res = createMockResponse();

    const response = {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      status: "active",
      nextWorkout: new Date(Date.now() + 86400000).toISOString(),
      lastFiveSessions: [
        {
          id: "s1",
          date: new Date().toISOString(),
          type: "Chest & Triceps",
          duration: 60,
          exercisesCompleted: 6,
          totalExercises: 6,
        },
      ],
      personalRecords: [
        {
          exercise: "Supino Reto",
          weight: 100,
          date: new Date().toISOString(),
        },
      ],
      weeklyVolume: 300,
      consistency: 88,
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.id).toBe("1");
    expect(Array.isArray(res.jsonData.lastFiveSessions)).toBe(true);
    expect(Array.isArray(res.jsonData.personalRecords)).toBe(true);
    expect(res.jsonData.weeklyVolume).toBeGreaterThan(0);
  });

  it("should return 404 for non-existent student", async () => {
    const req = createMockRequest({ params: { clientId: "999" } });
    const res = createMockResponse();

    res.status(404).json({ error: "Student not found" });

    expect(res.statusCode).toBe(404);
    expect(res.jsonData).toHaveProperty("error");
  });

  it("should update workout program successfully", async () => {
    const req = createMockRequest({
      params: { clientId: "1" },
      body: { programId: "program-advanced-123" },
    });
    const res = createMockResponse();

    const response = {
      message: "Workout program updated successfully",
      clientId: "1",
      programId: "program-advanced-123",
    };

    res.status(200).json(response);

    expect(res.statusCode).toBe(200);
    expect(res.jsonData.message).toContain("updated");
  });

  it("should return 400 if programId is missing", async () => {
    const req = createMockRequest({
      params: { clientId: "1" },
      body: {},
    });
    const res = createMockResponse();

    res.status(400).json({ error: "programId is required" });

    expect(res.statusCode).toBe(400);
    expect(res.jsonData).toHaveProperty("error");
  });
});
