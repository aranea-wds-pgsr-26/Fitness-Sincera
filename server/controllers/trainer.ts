import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { TrainerDashboardStats, ClientListItem, ClientWorkoutDetail } from "../../shared/types/professional";

// Mock data for development
const mockStudents: ClientListItem[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    status: "active",
    lastCheckin: new Date(Date.now() - 86400000).toISOString(),
    mealPlanId: null,
    adherence: 88,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    status: "active",
    lastCheckin: new Date(Date.now() - 172800000).toISOString(),
    mealPlanId: null,
    adherence: 72,
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@example.com",
    status: "active",
    lastCheckin: new Date(Date.now() - 345600000).toISOString(),
    mealPlanId: null,
    adherence: 55,
  },
];

const mockWorkoutSessions = [
  { id: "s1", date: new Date(Date.now() - 604800000).toISOString(), type: "Chest & Triceps", duration: 60, exercisesCompleted: 6, totalExercises: 6 },
  { id: "s2", date: new Date(Date.now() - 518400000).toISOString(), type: "Back & Biceps", duration: 55, exercisesCompleted: 5, totalExercises: 6 },
  { id: "s3", date: new Date(Date.now() - 432000000).toISOString(), type: "Legs", duration: 65, exercisesCompleted: 5, totalExercises: 5 },
  { id: "s4", date: new Date(Date.now() - 345600000).toISOString(), type: "Shoulders", duration: 50, exercisesCompleted: 4, totalExercises: 5 },
  { id: "s5", date: new Date(Date.now() - 259200000).toISOString(), type: "Cardio", duration: 30, exercisesCompleted: 1, totalExercises: 1 },
];

const mockPersonalRecords = [
  { exercise: "Supino Reto", weight: 100, date: new Date(Date.now() - 1209600000).toISOString() },
  { exercise: "Agachamento", weight: 150, date: new Date(Date.now() - 604800000).toISOString() },
  { exercise: "Rosca Direta", weight: 35, date: new Date(Date.now() - 345600000).toISOString() },
];

export async function getTrainerDashboard(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const studentsLowAdherence = mockStudents.filter((s) => s.adherence < 60).length;
    const activeStudents = mockStudents.filter((s) => s.status === "active").length;
    const avgAdherencePercent = Math.round(
      mockStudents.reduce((sum, s) => sum + s.adherence, 0) / mockStudents.length
    );

    const stats: TrainerDashboardStats = {
      totalStudents: mockStudents.length,
      activeStudents,
      studentsLowAdherence,
      avgAdherencePercent,
      recentSessions: [
        { id: "1", clientName: "João Silva", sessionDate: new Date(Date.now() - 3600000).toISOString(), status: "completed" },
        { id: "2", clientName: "Maria Santos", sessionDate: new Date(Date.now() - 86400000).toISOString(), status: "completed" },
      ],
      weeklyVolumeData: [
        { label: "Seg", value: 5800 },
        { label: "Ter", value: 6200 },
        { label: "Qua", value: 5500 },
        { label: "Qui", value: 6100 },
        { label: "Sex", value: 5900 },
        { label: "Sab", value: 4800 },
        { label: "Dom", value: 0 },
      ],
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error in getTrainerDashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listTrainerClients(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { performance, search, page = "1" } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const pageSize = 10;

    let filtered = [...mockStudents];

    if (performance && performance !== "all") {
      if (performance === "high") {
        filtered = filtered.filter((s) => s.adherence > 80);
      } else if (performance === "medium") {
        filtered = filtered.filter((s) => s.adherence >= 60 && s.adherence <= 80);
      } else if (performance === "low") {
        filtered = filtered.filter((s) => s.adherence < 60);
      }
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.email.toLowerCase().includes(searchTerm)
      );
    }

    const total = filtered.length;
    const start = (pageNum - 1) * pageSize;
    const students = filtered.slice(start, start + pageSize);

    res.status(200).json({
      data: students,
      pagination: {
        page: pageNum,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error in listTrainerClients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTrainerClientDetail(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { clientId } = req.params;

    const student = mockStudents.find((s) => s.id === clientId);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const weeklyVolume = mockWorkoutSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );

    const detail: ClientWorkoutDetail = {
      id: student.id,
      name: student.name,
      email: student.email,
      status: student.status,
      nextWorkout: new Date(Date.now() + 86400000).toISOString(),
      lastFiveSessions: mockWorkoutSessions,
      personalRecords: mockPersonalRecords,
      weeklyVolume,
      consistency: student.adherence,
    };

    res.status(200).json(detail);
  } catch (error) {
    console.error("Error in getTrainerClientDetail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTrainerClientProgram(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const { clientId } = req.params;
    const { programId } = req.body;

    if (!programId) {
      res.status(400).json({ error: "programId is required" });
      return;
    }

    const student = mockStudents.find((s) => s.id === clientId);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.status(200).json({
      message: "Workout program updated successfully",
      clientId,
      programId,
    });
  } catch (error) {
    console.error("Error in updateTrainerClientProgram:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
