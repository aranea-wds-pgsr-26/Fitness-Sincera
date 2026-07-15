import { useState } from "react";
import { Play, Flame, Clock, Zap, Filter, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/layout/DashboardLayout";
import { PageHeader } from "@/layout/PageHeader";
import { PageShell } from "@/layout/PageShell";
import { useWorkouts, useStartWorkout } from "@/lib/hooks/use-workouts";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Workout } from "@shared/schema";

const CATEGORIES = [
  { label: "Todos", filter: undefined },
  { label: "Recomendados", filter: "Recomendados" },
  { label: "Alta Intensidade", filter: "Alta Intensidade" },
  { label: "Funcional", filter: "Funcional" },
  { label: "Recuperação", filter: "Recuperação" },
];

const INTENSITY_COLORS: Record<string, string> = {
  "Muito Alta": "bg-red-100 text-red-700",
  "Alta": "bg-orange-100 text-orange-700",
  "Média": "bg-yellow-100 text-yellow-700",
  "Baixa": "bg-green-100 text-green-700",
};

function WorkoutCard({ workout, onStart, isStarting }: { workout: Workout; onStart: () => void; isStarting: boolean }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Clock size={11} />
          {workout.duration}min
        </div>

        {/* Intensity badge */}
        <div className={cn(
          "absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full",
          INTENSITY_COLORS[workout.intensity] ?? "bg-slate-100 text-slate-700"
        )}>
          {workout.intensity}
        </div>

        {/* Play button overlay */}
        <button
          onClick={onStart}
          disabled={isStarting}
          className="absolute bottom-3 right-3 w-10 h-10 bg-[#d4f54c] rounded-full flex items-center justify-center shadow-lg hover:bg-[#c4e000] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200"
        >
          <Play size={16} fill="black" className="text-black ml-0.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1 line-clamp-1">{workout.title}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{workout.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-orange-400" />
              {workout.calories} kcal
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-[#d4f54c]" />
              {workout.exercises.length} exercícios
            </span>
          </div>
          <button
            onClick={onStart}
            disabled={isStarting}
            className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 hover:gap-2 transition-all"
          >
            Iniciar <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutPage() {
  const { data: allWorkouts = [], isLoading } = useWorkouts();
  const startWorkout = useStartWorkout();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const filteredWorkouts = activeCategory
    ? allWorkouts.filter((w: Workout) => w.category === activeCategory)
    : allWorkouts;

  const featuredWorkout = allWorkouts[0] as Workout | undefined;

  const handleStartWorkout = (workout: Workout) => {
    startWorkout.mutate(workout.id, {
      onSuccess: () => {
        toast({
          title: "Treino Iniciado! 🏋️",
          description: `${workout.title} · ${workout.duration} min · ${workout.calories} kcal`,
          className: "bg-[#d4f54c] text-black border-none font-bold",
        });
      },
    });
  };

  return (
    <DashboardLayout>
        <PageShell>
          {/* Header */}
          <PageHeader searchPlaceholder="Buscar treinos..." />

          {/* Title */}
          <section className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight uppercase font-body">
              Treinos
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              {allWorkouts.length} treinos disponíveis · Escolha o seu
            </p>
          </section>

          {/* Featured Workout */}
          {featuredWorkout && !isLoading && (
            <div className="relative mb-8 bg-[#1a1c1e] rounded-[28px] overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={featuredWorkout.image}
                  alt={featuredWorkout.title}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1e] via-[#1a1c1e]/80 to-transparent" />
              </div>
              <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <span className="inline-block bg-[#d4f54c] text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                    ⭐ Treino do Dia
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{featuredWorkout.title}</h2>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{featuredWorkout.description}</p>
                  <div className="flex items-center gap-4 text-sm font-bold text-white/80">
                    <span className="flex items-center gap-1.5"><Clock size={14} />{featuredWorkout.duration}min</span>
                    <span className="flex items-center gap-1.5"><Flame size={14} className="text-orange-400" />{featuredWorkout.calories} kcal</span>
                    <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#d4f54c]" />{featuredWorkout.intensity}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStartWorkout(featuredWorkout)}
                  disabled={startWorkout.isPending}
                  className="flex items-center gap-3 bg-[#d4f54c] text-black px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-[#c4e000] transition-all hover:scale-105 active:scale-95 shadow-xl flex-shrink-0"
                >
                  <Play size={20} fill="black" />
                  Iniciar Treino
                </button>
              </div>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            <Filter size={16} className="text-slate-400 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold flex-shrink-0 transition-all duration-200",
                  activeCategory === cat.filter
                    ? "bg-[#1a1c1e] text-[#d4f54c] shadow-sm"
                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Workout Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[24px] h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {filteredWorkouts.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <p className="text-4xl mb-2">🏋️</p>
                  <p className="font-bold">Nenhum treino nessa categoria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredWorkouts.map((workout: Workout) => (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      onStart={() => handleStartWorkout(workout)}
                      isStarting={startWorkout.isPending}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </PageShell>
    </DashboardLayout>
  );
}
