import {
  type User,
  type InsertUser,
  type UserProfile,
  type Meal,
  type NutritionSummary,
  type Workout,
  type WorkoutSession,
  type WaterIntake,
  type DailyProgress,
  type Achievement,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users (existing)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile
  getProfile(userId: string): Promise<UserProfile | undefined>;
  updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile | undefined>;

  // Meals
  getMealsToday(userId: string): Promise<Meal[]>;
  updateMealStatus(mealId: string, status: "pending" | "completed"): Promise<Meal | undefined>;
  swapMeal(mealId: string): Promise<Meal | undefined>;
  getNutritionSummary(userId: string): Promise<NutritionSummary>;

  // Workouts
  getWorkouts(category?: string): Promise<Workout[]>;
  getWorkout(id: string): Promise<Workout | undefined>;
  startWorkout(workoutId: string, userId: string): Promise<WorkoutSession>;
  completeWorkout(sessionId: string): Promise<WorkoutSession | undefined>;

  // Water
  getWaterToday(userId: string): Promise<WaterIntake>;
  addWater(userId: string, amount: number): Promise<WaterIntake>;

  // Progress
  getProgressHistory(userId: string): Promise<DailyProgress[]>;

  // Achievements
  getAchievements(userId: string): Promise<Achievement[]>;

  // Dashboard
  getDashboardSummary(userId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private profiles: Map<string, UserProfile>;
  private meals: Map<string, Meal>;
  private workouts: Map<string, Workout>;
  private sessions: Map<string, WorkoutSession>;
  private water: Map<string, WaterIntake>;
  private progress: Map<string, DailyProgress[]>;
  private achievements: Map<string, Achievement[]>;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.meals = new Map();
    this.workouts = new Map();
    this.sessions = new Map();
    this.water = new Map();
    this.progress = new Map();
    this.achievements = new Map();
    this.seedData();
  }

  private seedData() {
    const userId = "user-1";

    // Profile
    this.profiles.set(userId, {
      id: userId,
      name: "Lucas Bennett",
      email: "bennet02@gmail.com",
      age: 26,
      sex: "Masculino",
      weight: 82.5,
      height: 183,
      goalCalories: 2500,
      language: "Português",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      membershipType: "Pro",
      streakDays: 31,
    });

    // Meals — variada (mediterrânea + proteica + vegana)
    const meals: Meal[] = [
      {
        id: "meal-1",
        time: "07:00",
        title: "Café da Manhã",
        items: ["3 Ovos Mexidos", "1 Fatia Pão Integral", "Café Preto s/ Açúcar"],
        calories: 320,
        protein: 22,
        carbs: 28,
        fat: 14,
        status: "completed",
        type: "meal",
        swapOptions: ["Mingau de Aveia + Whey", "Crepioca de Frango", "Omelete de Espinafre"],
        image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800&q=80",
      },
      {
        id: "meal-2",
        time: "10:00",
        title: "Lanche da Manhã",
        items: ["1 Maçã", "15g Castanhas"],
        calories: 150,
        protein: 3,
        carbs: 22,
        fat: 7,
        status: "completed",
        type: "snack",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      },
      {
        id: "meal-3",
        time: "13:00",
        title: "Almoço",
        items: ["150g Peito de Frango", "100g Arroz Branco", "Salada à Vontade"],
        calories: 450,
        protein: 42,
        carbs: 55,
        fat: 8,
        status: "completed",
        type: "meal",
        swapOptions: ["150g Patinho Moído + 150g Batata Inglesa"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      },
      {
        id: "meal-4",
        time: "16:00",
        title: "Pré-Treino",
        items: ["1 Banana", "30g Doce de Leite", "5g Creatina"],
        calories: 280,
        protein: 5,
        carbs: 52,
        fat: 8,
        status: "pending",
        type: "snack",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80",
      },
      {
        id: "meal-5",
        time: "20:00",
        title: "Jantar",
        items: ["150g Tilápia", "100g Purê de Batata"],
        calories: 380,
        protein: 35,
        carbs: 30,
        fat: 12,
        status: "pending",
        type: "meal",
        swapOptions: ["150g Salmão Grelhado + Legumes"],
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      },
      {
        id: "meal-6",
        time: "17:30",
        title: "Pós-Treino",
        items: ["1 Scoop Whey Protein", "1 Banana", "200ml Água de Coco"],
        calories: 220,
        protein: 28,
        carbs: 32,
        fat: 2,
        status: "pending",
        type: "snack",
        image: "https://images.unsplash.com/photo-1622484211697-e123cb0f9665?w=800&q=80",
      },
      {
        id: "meal-7",
        time: "22:30",
        title: "Ceia",
        items: ["200g Iogurte Grego", "1 Colher de Pasta de Amendoim"],
        calories: 250,
        protein: 20,
        carbs: 15,
        fat: 14,
        status: "pending",
        type: "snack",
        swapOptions: ["200g Queijo Cottage + 5 Nozes"],
        image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=800&q=80",
      },
    ];
    meals.forEach((m) => this.meals.set(m.id, m));

    // Extra clientes (for multi-user simulation)
    const extraProfiles = [
      { id: "user-2", name: "Ana Costa", email: "ana.costa@email.com", age: 29, sex: "Feminino", weight: 62.0, height: 165, goalCalories: 1800, language: "Português", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", membershipType: "Pro", streakDays: 14 },
      { id: "user-3", name: "Rafael Mendes", email: "rafa@email.com", age: 32, sex: "Masculino", weight: 90.0, height: 178, goalCalories: 3000, language: "Português", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", membershipType: "Basic", streakDays: 7 },
      { id: "user-4", name: "Carla Vieira", email: "carla.v@email.com", age: 24, sex: "Feminino", weight: 55.5, height: 160, goalCalories: 1600, language: "Português", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", membershipType: "Pro", streakDays: 22 },
      { id: "user-5", name: "Thiago Rocha", email: "thiago.r@email.com", age: 27, sex: "Masculino", weight: 75.0, height: 175, goalCalories: 2200, language: "Português", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", membershipType: "Basic", streakDays: 3 },
      { id: "user-6", name: "Beatriz Lima", email: "bea.lima@email.com", age: 35, sex: "Feminino", weight: 68.0, height: 170, goalCalories: 2000, language: "Português", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", membershipType: "Pro", streakDays: 45 },
      { id: "user-7", name: "Paulo Neves", email: "paulo.n@email.com", age: 41, sex: "Masculino", weight: 95.0, height: 182, goalCalories: 2800, language: "Português", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop", membershipType: "Basic", streakDays: 0 },
      { id: "user-8", name: "Mariana Fonseca", email: "mari.f@email.com", age: 23, sex: "Feminino", weight: 58.0, height: 163, goalCalories: 1700, language: "Português", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop", membershipType: "Pro", streakDays: 19 },
    ];
    extraProfiles.forEach((p) => this.profiles.set(p.id, p));

    // Workouts — 16 treinos em 5 categorias
    const workouts: Workout[] = [
      {
        id: "w-1", title: "Força Total", description: "Treino completo de força para todo o corpo com foco em movimentos compostos. Ideal para ganho de massa.",
        category: "Recomendados", duration: 50, calories: 400, intensity: "Alta",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
        exercises: [
          { name: "Agachamento Livre", sets: 4, reps: "8-10" },
          { name: "Supino Reto com Barra", sets: 4, reps: "8-10" },
          { name: "Remada Curvada", sets: 3, reps: "10-12" },
          { name: "Desenvolvimento com Halteres", sets: 3, reps: "10-12" },
          { name: "Rosca Direta", sets: 3, reps: "12" },
          { name: "Tríceps Corda", sets: 3, reps: "12" },
        ],
      },
      {
        id: "w-2", title: "Cardio Queima Gordura", description: "Sessão de cardio intervalado para maximizar a queima calórica e melhorar o condicionamento cardiovascular.",
        category: "Recomendados", duration: 35, calories: 380, intensity: "Alta",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
        exercises: [
          { name: "Aquecimento leve", duration: "5 min" },
          { name: "Corrida Intervalada (1min rápido / 1min lento)", duration: "20 min" },
          { name: "Burpees", sets: 3, reps: "15" },
          { name: "Mountain Climbers", sets: 3, reps: "30" },
          { name: "Desaceleração", duration: "5 min" },
        ],
      },
      {
        id: "w-3", title: "Yoga Flow", description: "Sequência fluida de yoga para aumentar a flexibilidade, aliviar tensões e promover o equilíbrio mental.",
        category: "Recomendados", duration: 40, calories: 150, intensity: "Baixa",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80",
        exercises: [
          { name: "Pranayama (respiração)", duration: "5 min" },
          { name: "Saudação ao Sol — 3 ciclos", sets: 3 },
          { name: "Guerreiro I, II e III", duration: "10 min" },
          { name: "Postura da Árvore", duration: "5 min" },
          { name: "Savasana", duration: "5 min" },
        ],
      },
      {
        id: "w-4", title: "Core de Aço", description: "Treino focado no core e abdômen para definição e estabilidade da coluna vertebral.",
        category: "Recomendados", duration: 28, calories: 210, intensity: "Média",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        exercises: [
          { name: "Prancha Frontal", sets: 4, duration: "45s" },
          { name: "Prancha Lateral", sets: 3, duration: "30s" },
          { name: "Abdominal Bicicleta", sets: 4, reps: "20" },
          { name: "Russian Twist com Peso", sets: 3, reps: "20" },
          { name: "Dead Bug", sets: 3, reps: "12" },
        ],
      },
      {
        id: "w-5", title: "Mobilidade Articular", description: "Rotina de mobilidade para prevenir lesões, melhorar amplitude de movimento e preparar o corpo para treinos intensos.",
        category: "Recomendados", duration: 22, calories: 90, intensity: "Baixa",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80",
        exercises: [
          { name: "Rotação de Ombros e Pescoço", sets: 2, reps: "15" },
          { name: "Hip Circles", sets: 2, reps: "10" },
          { name: "Torácica Rotation", sets: 2, reps: "10" },
          { name: "Flexão de Quadril (90/90)", duration: "3 min" },
          { name: "World's Greatest Stretch", sets: 2, reps: "8" },
        ],
      },
      {
        id: "w-6", title: "WOD CrossFit", description: "Workout of the Day estilo CrossFit com movimentos funcionais de alta intensidade. Queima calorias e desenvolve força.",
        category: "Alta Intensidade", duration: 45, calories: 520, intensity: "Muito Alta",
        image: "https://images.unsplash.com/photo-1517963879466-db09208752d5?w=400&q=80",
        exercises: [
          { name: "Clean & Jerk", sets: 5, reps: "5" },
          { name: "Box Jump", sets: 4, reps: "10" },
          { name: "Wall Ball 9kg", sets: 3, reps: "15" },
          { name: "Double Unders", sets: 3, reps: "30" },
          { name: "Thruster", sets: 3, reps: "12" },
        ],
      },
      {
        id: "w-7", title: "Boxe Fitness", description: "Combinações de boxe e treinamento funcional para condicionamento cardiovascular e agilidade.",
        category: "Alta Intensidade", duration: 40, calories: 460, intensity: "Alta",
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80",
        exercises: [
          { name: "Shadowboxing aquecimento", duration: "3 min" },
          { name: "Jab-Cross Combo", sets: 5, duration: "3 min" },
          { name: "Uppercut Drills", sets: 3, duration: "2 min" },
          { name: "Combinações no Saco", sets: 4, duration: "3 min" },
          { name: "Pular corda", duration: "5 min" },
        ],
      },
      {
        id: "w-8", title: "Sprint Master", description: "Protocolo de sprints para desenvolvimento de velocidade, potência explosiva e condicionamento anaeróbico.",
        category: "Alta Intensidade", duration: 30, calories: 390, intensity: "Muito Alta",
        image: "https://images.unsplash.com/photo-1552674605-469455963666?w=400&q=80",
        exercises: [
          { name: "Corrida de aquecimento", duration: "5 min" },
          { name: "Sprint 100m — recuperação 90s", sets: 8 },
          { name: "Sprint em Ladeira", sets: 5 },
          { name: "Trote de recuperação", duration: "5 min" },
        ],
      },
      {
        id: "w-9", title: "Kettlebell Power", description: "Treino de força funcional e potência usando kettlebell. Desenvolve músculos estabilizadores e melhora o condicionamento.",
        category: "Alta Intensidade", duration: 38, calories: 360, intensity: "Alta",
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80",
        exercises: [
          { name: "Kettlebell Swing two-hand", sets: 4, reps: "20" },
          { name: "Turkish Get-Up", sets: 3, reps: "3 cada lado" },
          { name: "Goblet Squat", sets: 4, reps: "12" },
          { name: "KB Clean & Press", sets: 3, reps: "8 cada lado" },
          { name: "KB Windmill", sets: 2, reps: "6 cada lado" },
        ],
      },
      {
        id: "w-10", title: "Alongamento Profundo", description: "Sessão completa de alongamento estático e dinâmico para recuperação muscular e prevenção de lesões.",
        category: "Recuperação", duration: 30, calories: 70, intensity: "Baixa",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80",
        exercises: [
          { name: "Quadríceps e Isquiotibiais", duration: "8 min" },
          { name: "Glúteo e Quadril", duration: "8 min" },
          { name: "Ombros e Peitorais", duration: "7 min" },
          { name: "Panturrilhas e Tornozelos", duration: "4 min" },
          { name: "Respiração final", duration: "3 min" },
        ],
      },
      {
        id: "w-11", title: "Foam Rolling", description: "Auto-liberação miofascial com rolo de espuma para aliviar pontos de tensão e melhorar a circulação.",
        category: "Recuperação", duration: 20, calories: 55, intensity: "Baixa",
        image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=400&q=80",
        exercises: [
          { name: "Quadríceps", duration: "3 min" },
          { name: "IT Band", duration: "3 min" },
          { name: "Dorsais e Coluna Torácica", duration: "4 min" },
          { name: "Glúteos", duration: "3 min" },
          { name: "Panturrilhas", duration: "3 min" },
        ],
      },
      {
        id: "w-12", title: "Meditação Guiada", description: "Sessão de meditação e mindfulness para recuperação mental, redução de cortisol e melhora do sono.",
        category: "Recuperação", duration: 15, calories: 20, intensity: "Baixa",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
        exercises: [
          { name: "Respiração 4-7-8", duration: "4 min" },
          { name: "Body Scan progressivo", duration: "5 min" },
          { name: "Visualização positiva", duration: "5 min" },
          { name: "Intenção do dia", duration: "1 min" },
        ],
      },
      {
        id: "w-13", title: "Pilates Core", description: "Aula de Pilates com foco no fortalecimento do core, melhora da postura e consciência corporal.",
        category: "Funcional", duration: 45, calories: 180, intensity: "Média",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
        exercises: [
          { name: "The Hundred", sets: 1, reps: "100 bombeios" },
          { name: "Roll-Up", sets: 2, reps: "10" },
          { name: "Single Leg Stretch", sets: 3, reps: "10 cada lado" },
          { name: "Teaser", sets: 3, reps: "8" },
          { name: "Swan Dive", sets: 3, reps: "8" },
        ],
      },
      {
        id: "w-14", title: "Funcional Completo", description: "Treino funcional com movimentos multiarticulares que simulam atividades do dia a dia e melhoram a performance atlética.",
        category: "Funcional", duration: 50, calories: 420, intensity: "Alta",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
        exercises: [
          { name: "Agachamento com Salto", sets: 4, reps: "12" },
          { name: "Push-Up com Rotação", sets: 3, reps: "10" },
          { name: "Avanço com Haltere", sets: 3, reps: "12 cada lado" },
          { name: "Remada com Elástico", sets: 4, reps: "15" },
          { name: "Farmer's Walk", sets: 4, duration: "20m" },
        ],
      },
      {
        id: "w-15", title: "Natação Fitness", description: "Sessão de natação com diferentes estilos e intensidades para queima calórica completa e baixo impacto articular.",
        category: "Funcional", duration: 60, calories: 520, intensity: "Média",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80",
        exercises: [
          { name: "Aquecimento crawl leve", duration: "10 min" },
          { name: "Intervalos borboleta 25m", sets: 6 },
          { name: "Costas técnica", duration: "10 min" },
          { name: "Nado peito ritmado", duration: "10 min" },
          { name: "Sprint crawl 50m", sets: 4 },
        ],
      },
      {
        id: "w-16", title: "HIIT 30 Minutos", description: "High Intensity Interval Training de 30 minutos sem equipamento. Máximo resultado em tempo mínimo.",
        category: "Alta Intensidade", duration: 30, calories: 350, intensity: "Muito Alta",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
        exercises: [
          { name: "Jump Squat", sets: 4, reps: "15" },
          { name: "Push-Up explosivo", sets: 4, reps: "12" },
          { name: "High Knees", sets: 4, duration: "40s" },
          { name: "Burpee com Salto", sets: 3, reps: "12" },
          { name: "Descanso ativo", duration: "10s entre blocos" },
        ],
      },
    ];
    workouts.forEach((w) => this.workouts.set(w.id, w));

    // Water
    const today = new Date().toISOString().split("T")[0];
    this.water.set(userId, { date: today, amount: 1500, goal: 3000 });

    // Progress (30 days)
    const progressData: DailyProgress[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      progressData.push({
        date: d.toISOString().split("T")[0],
        weight: 82.5 + (Math.random() - 0.5) * 2,
        caloriesConsumed: 2000 + Math.floor(Math.random() * 800),
        caloriesBurned: 300 + Math.floor(Math.random() * 400),
        waterMl: 1500 + Math.floor(Math.random() * 2000),
        workoutsCompleted: Math.random() > 0.3 ? 1 : 0,
      });
    }
    this.progress.set(userId, progressData);

    // Achievements — 10 conquistas
    this.achievements.set(userId, [
      { id: "a-1", title: "Primeiro Passo", description: "Completou o primeiro treino da jornada", icon: "🚀", bgColor: "bg-blue-100", unlocked: true, unlockedAt: "2024-06-01" },
      { id: "a-2", title: "Semana Perfeita", description: "7 dias consecutivos de treino completados", icon: "🔥", bgColor: "bg-yellow-100", unlocked: true, unlockedAt: "2024-06-15" },
      { id: "a-3", title: "Rei da Dieta", description: "Seguiu o plano alimentar por 14 dias sem falhas", icon: "👑", bgColor: "bg-green-100", unlocked: true, unlockedAt: "2024-06-28" },
      { id: "a-4", title: "Maratonista", description: "Completou 30 treinos no total", icon: "🏃", bgColor: "bg-orange-100", unlocked: true, unlockedAt: "2024-07-05" },
      { id: "a-5", title: "Meta de Proteína", description: "Bateu a meta de proteína por 10 dias seguidos", icon: "🥩", bgColor: "bg-red-100", unlocked: true, unlockedAt: "2024-07-12" },
      { id: "a-6", title: "Mês Épico", description: "31 dias consecutivos de atividade registrada", icon: "🏆", bgColor: "bg-amber-100", unlocked: true, unlockedAt: "2024-07-31" },
      { id: "a-7", title: "Mestre da Hidratação", description: "Atingiu 3L de água por 30 dias consecutivos", icon: "💧", bgColor: "bg-blue-100", unlocked: false, unlockedAt: null },
      { id: "a-8", title: "Monstro da Força", description: "Aumentou cargas em pelo menos 20% nos compostos", icon: "💪", bgColor: "bg-purple-100", unlocked: false, unlockedAt: null },
      { id: "a-9", title: "Zen Master", description: "Completou 10 sessões de meditação ou yoga", icon: "🧘", bgColor: "bg-teal-100", unlocked: false, unlockedAt: null },
      { id: "a-10", title: "Lenda Sincera", description: "90 dias de consistência total — treino, dieta e sono", icon: "⭐", bgColor: "bg-yellow-100", unlocked: false, unlockedAt: null },
    ]);
  }

  // --- Users ---
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "client",
      isSpecialist: false
    };
    this.users.set(id, user);
    return user;
  }

  // --- Profile ---
  async getProfile(userId: string): Promise<UserProfile | undefined> {
    return this.profiles.get(userId);
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile | undefined> {
    const profile = this.profiles.get(userId);
    if (!profile) return undefined;
    const updated = { ...profile, ...data, id: profile.id };
    this.profiles.set(userId, updated);
    return updated;
  }

  // --- Meals ---
  async getMealsToday(_userId: string): Promise<Meal[]> {
    return Array.from(this.meals.values());
  }

  async updateMealStatus(mealId: string, status: "pending" | "completed"): Promise<Meal | undefined> {
    const meal = this.meals.get(mealId);
    if (!meal) return undefined;
    const updated = { ...meal, status };
    this.meals.set(mealId, updated);
    return updated;
  }

  async swapMeal(mealId: string): Promise<Meal | undefined> {
    const meal = this.meals.get(mealId);
    if (!meal || !meal.swapOptions || meal.swapOptions.length === 0) return meal;

    const swapOption = meal.swapOptions[0];
    const updated: Meal = {
      ...meal,
      title: `${meal.title} (Substituto)`,
      items: [swapOption],
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=150&h=150&fit=crop",
    };
    this.meals.set(mealId, updated);
    return updated;
  }

  async getNutritionSummary(_userId: string): Promise<NutritionSummary> {
    const meals = Array.from(this.meals.values());
    const completed = meals.filter((m) => m.status === "completed");

    const consumed = completed.reduce((sum, m) => sum + m.calories, 0);
    const protein = completed.reduce((sum, m) => sum + m.protein, 0);
    const carbs = completed.reduce((sum, m) => sum + m.carbs, 0);
    const fat = completed.reduce((sum, m) => sum + m.fat, 0);

    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
    const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
    const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

    return {
      consumed,
      goal: 2500,
      remaining: Math.max(0, 2500 - consumed),
      protein: { current: protein, goal: totalProtein },
      carbs: { current: carbs, goal: totalCarbs },
      fat: { current: fat, goal: totalFat },
    };
  }

  // --- Workouts ---
  async getWorkouts(category?: string): Promise<Workout[]> {
    const all = Array.from(this.workouts.values());
    if (category) return all.filter((w) => w.category === category);
    return all;
  }

  async getWorkout(id: string): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async startWorkout(workoutId: string, _userId: string): Promise<WorkoutSession> {
    const session: WorkoutSession = {
      id: randomUUID(),
      workoutId,
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "active",
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async completeWorkout(sessionId: string): Promise<WorkoutSession | undefined> {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    const updated = { ...session, completedAt: new Date().toISOString(), status: "completed" as const };
    this.sessions.set(sessionId, updated);
    return updated;
  }

  // --- Water ---
  async getWaterToday(userId: string): Promise<WaterIntake> {
    const today = new Date().toISOString().split("T")[0];
    const existing = this.water.get(userId);
    if (existing && existing.date === today) return existing;
    const fresh: WaterIntake = { date: today, amount: 0, goal: 3000 };
    this.water.set(userId, fresh);
    return fresh;
  }

  async addWater(userId: string, amount: number): Promise<WaterIntake> {
    const current = await this.getWaterToday(userId);
    const updated = { ...current, amount: current.amount + amount };
    this.water.set(userId, updated);
    return updated;
  }

  // --- Progress ---
  async getProgressHistory(userId: string): Promise<DailyProgress[]> {
    return this.progress.get(userId) || [];
  }

  // --- Achievements ---
  async getAchievements(userId: string): Promise<Achievement[]> {
    return this.achievements.get(userId) || [];
  }

  // --- Dashboard ---
  async getDashboardSummary(userId: string): Promise<any> {
    const profile = await this.getProfile(userId);
    const nutrition = await this.getNutritionSummary(userId);
    const water = await this.getWaterToday(userId);
    const meals = await this.getMealsToday(userId);
    const workouts = Array.from(this.workouts.values());

    const nextMeal = meals.find((m) => m.status === "pending") || null;
    const todayWorkout = workouts[0] || null;

    return {
      caloriesConsumed: nutrition.consumed,
      caloriesGoal: nutrition.goal,
      caloriesBurned: 430,
      waterMl: water.amount,
      waterGoal: water.goal,
      workoutsToday: 1,
      streakDays: profile?.streakDays || 0,
      wellnessIndex: 78,
      nextMeal,
      todayWorkout,
    };
  }
}

export const storage = new MemStorage();
