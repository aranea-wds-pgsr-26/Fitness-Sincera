/**
 * server/data/mockData.ts
 *
 * Single source of truth for all mock/demo data used across routes.ts and controllers.
 * In production this will be replaced by real DB queries via IStorage / DbStorage.
 *
 * Organised by domain:
 *   - nutritionistMockData  → nutritionist dashboard, clients, metrics
 *   - trainerMockData       → trainer dashboard, clients, sessions
 *   - mealPlansMockData     → published meal plans (nutritionist → client)
 *   - authMockData          → demo sessions (will be replaced by Passport.js)
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ago = (ms: number) => new Date(Date.now() - ms).toISOString();
const future = (ms: number) => new Date(Date.now() + ms).toISOString();

const H = 3_600_000;    // 1 hour in ms
const D = 86_400_000;   // 1 day in ms

// ─── Nutritionist Domain ──────────────────────────────────────────────────────

export const nutritionistMockData = {
    dashboard: {
        totalClients: 12,
        activeClients: 10,
        clientsAtRisk: 2,
        avgCompliancePercent: 74,
        recentActivity: [
            { id: "1", clientName: "João Silva", action: "registrou refeição", timestamp: ago(1 * H) },
            { id: "2", clientName: "Maria Santos", action: "completou meta diária", timestamp: ago(2 * H) },
            { id: "3", clientName: "Pedro Costa", action: "começou acompanhamento", timestamp: ago(1 * D) },
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
    },

    clients: [
        { id: "1", name: "João Silva", email: "joao.silva@email.com", status: "active", lastCheckin: ago(1 * H), adherence: 87, mealPlanId: "plan-1" },
        { id: "2", name: "Maria Santos", email: "maria.s@email.com", status: "active", lastCheckin: ago(2 * H), adherence: 72, mealPlanId: "plan-2" },
        { id: "3", name: "Pedro Costa", email: "pedro.c@email.com", status: "paused", lastCheckin: null, adherence: 41, mealPlanId: "plan-3" },
        { id: "4", name: "Ana Lima", email: "ana.lima@email.com", status: "active", lastCheckin: ago(1 * D), adherence: 94, mealPlanId: "plan-4" },
        { id: "5", name: "Carla Vieira", email: "carla.v@email.com", status: "active", lastCheckin: ago(12 * H), adherence: 61, mealPlanId: "plan-5" },
        { id: "6", name: "Rafael Mendes", email: "rafa.m@email.com", status: "active", lastCheckin: ago(2 * D), adherence: 79, mealPlanId: "plan-6" },
        { id: "7", name: "Beatriz Lima", email: "bea.lima@email.com", status: "at_risk", lastCheckin: ago(4 * D), adherence: 38, mealPlanId: "plan-7" },
        { id: "8", name: "Lucas Ferreira", email: "lucas.f@email.com", status: "active", lastCheckin: ago(6 * H), adherence: 96, mealPlanId: "plan-8" },
    ],

    /** Build a detailed client record from the clients list above */
    getClientDetail: (clientId: string) => {
        const client = nutritionistMockData.clients.find(c => c.id === clientId);
        if (!client) return null;
        return {
            ...client,
            metrics: Array.from({ length: 7 }, (_, i) => ({
                date: ago((7 - i) * D),
                caloriesConsumed: 1900 + Math.round(Math.random() * 200),
                caloriesGoal: 2000,
                protein: 148 + Math.round(Math.random() * 20),
                carbs: 195 + Math.round(Math.random() * 30),
                fat: 58 + Math.round(Math.random() * 10),
                proteinGoal: 160, carbsGoal: 220, fatGoal: 65,
            })),
            currentMetrics: {
                date: ago(1 * D),
                caloriesConsumed: 1990, caloriesGoal: 2000,
                protein: 152, carbs: 207, fat: 60,
                proteinGoal: 160, carbsGoal: 220, fatGoal: 65,
            },
        };
    },
};

// ─── Trainer Domain ───────────────────────────────────────────────────────────

export const trainerMockData = {
    dashboard: {
        totalStudents: 8,
        activeStudents: 7,
        studentsLowAdherence: 1,
        avgAdherencePercent: 82,
        recentSessions: [
            { id: "1", clientName: "Ana Silva", sessionDate: ago(1 * H), status: "completed" },
            { id: "2", clientName: "Bruno Costa", sessionDate: ago(1 * D), status: "completed" },
            { id: "3", clientName: "Carla Gomes", sessionDate: ago(2 * D), status: "completed" },
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
    },

    clients: [
        { id: "1", name: "Ana Silva", email: "ana.silva@email.com", status: "active", lastCheckin: ago(1 * H), adherence: 88, mealPlanId: null },
        { id: "2", name: "Bruno Costa", email: "bruno.c@email.com", status: "active", lastCheckin: ago(1 * D), adherence: 74, mealPlanId: null },
        { id: "3", name: "Carla Gomes", email: "carla.g@email.com", status: "active", lastCheckin: ago(2 * D), adherence: 97, mealPlanId: null },
        { id: "4", name: "Daniel Oliveira", email: "daniel.o@email.com", status: "inactive", lastCheckin: null, adherence: 35, mealPlanId: null },
        { id: "5", name: "Eduardo Martins", email: "edu.m@email.com", status: "active", lastCheckin: ago(12 * H), adherence: 82, mealPlanId: null },
        { id: "6", name: "Fernanda Rocha", email: "fern.r@email.com", status: "active", lastCheckin: ago(6 * H), adherence: 91, mealPlanId: null },
        { id: "7", name: "Gabriel Torres", email: "gab.t@email.com", status: "at_risk", lastCheckin: ago(3 * D), adherence: 43, mealPlanId: null },
        { id: "8", name: "Helena Souza", email: "hel.s@email.com", status: "active", lastCheckin: ago(2 * H), adherence: 85, mealPlanId: null },
    ],

    getClientDetail: (clientId: string) => {
        const client = trainerMockData.clients.find(c => c.id === clientId);
        if (!client) return null;
        return {
            ...client,
            nextWorkout: future(1 * D),
            lastFiveSessions: [
                { id: "s1", date: ago(7 * D), type: "Chest & Triceps", duration: 60, exercisesCompleted: 6, totalExercises: 6 },
                { id: "s2", date: ago(6 * D), type: "Back & Biceps", duration: 55, exercisesCompleted: 5, totalExercises: 6 },
                { id: "s3", date: ago(5 * D), type: "Legs", duration: 65, exercisesCompleted: 5, totalExercises: 5 },
                { id: "s4", date: ago(4 * D), type: "Shoulders", duration: 50, exercisesCompleted: 4, totalExercises: 5 },
                { id: "s5", date: ago(3 * D), type: "Cardio", duration: 30, exercisesCompleted: 1, totalExercises: 1 },
            ],
            personalRecords: [
                { exercise: "Supino Reto", weight: 100, date: ago(14 * D) },
                { exercise: "Agachamento", weight: 150, date: ago(7 * D) },
                { exercise: "Rosca Direta", weight: 35, date: ago(4 * D) },
            ],
            weeklyVolume: 45000,
            consistency: client.adherence,
        };
    },
};

// ─── Auth (Demo Sessions) ─────────────────────────────────────────────────────

/** DEMO ONLY: In production these sessions come from Passport.js + DB */
export const authMockData = {
    sessions: {
        client: { userId: "user-1", role: "client", name: "Lucas Bennett", email: "bennet02@gmail.com" },
        nutritionist: { userId: "nutri-1", role: "nutritionist", name: "Dra. Sofia Almeida", email: "sofia@fitnesssincera.com" },
        trainer: { userId: "pt-1", role: "trainer", name: "Coach Ricardo", email: "ricardo@fitnesssincera.com" },
    } as Record<string, object>,
};

// ─── Meal Plans ───────────────────────────────────────────────────────────────
// NOTE: In Sprint 2 this moves to DbStorage. Currently in-memory only.

export const INITIAL_MEAL_PLANS: Record<string, object> = {
    "plan-lucas-week1": {
        id: "plan-lucas-week1",
        nutritionistId: "nutri-1",
        clientId: "user-1",
        name: "Plano Semana 1 — Lucas",
        status: "published",
        publishedAt: ago(1 * D),
        createdAt: ago(2 * D),
        updatedAt: ago(1 * D),
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
