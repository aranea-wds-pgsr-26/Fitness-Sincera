import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check, RefreshCw, ChevronRight, Dumbbell, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useMealsToday, useUpdateMealStatus, useSwapMeal } from "@/lib/hooks/use-meals";
import type { Meal } from "@shared/schema";

export function DailyRoutineTimeline() {
  const { data: meals = [], isLoading } = useMealsToday();
  const updateStatus = useUpdateMealStatus();
  const swapMeal = useSwapMeal();
  const [, setLocation] = useLocation();
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [selectedMealForSwap, setSelectedMealForSwap] = useState<string | null>(null);
  const [selectedSwapOption, setSelectedSwapOption] = useState("");
  const [activeTab, setActiveTab] = useState<"meal" | "workout">("meal");

  const toggleStatus = (meal: Meal) => {
    const newStatus = meal.status === "pending" ? "completed" : "pending";
    updateStatus.mutate({ id: meal.id, status: newStatus });
  };

  const openSwapDialog = (meal: Meal) => {
    setSelectedMealForSwap(meal.id);
    setSelectedSwapOption(meal.swapOptions?.[0] || "");
    setIsSwapOpen(true);
  };

  const handleSwap = () => {
    if (selectedMealForSwap) {
      swapMeal.mutate(selectedMealForSwap);
    }
    setIsSwapOpen(false);
  };

  const nextMeal = useMemo(() => {
    return meals.find((m: Meal) => m.status === "pending") || null;
  }, [meals]);

  const activeMeal = nextMeal || meals[meals.length - 1];
  const isAllDone = !nextMeal;

  if (isLoading) {
    return (
      <Card className="bg-white rounded-[32px] p-6 shadow-sm border-none flex items-center justify-center min-h-[380px]">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-[32px] p-6 shadow-sm border-none flex flex-col h-full min-h-[380px]">
      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Próxima Atividade</h3>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("meal")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === "meal" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Refeição
          </button>
          <button
            onClick={() => setActiveTab("workout")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1",
              activeTab === "workout" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Treino <span className="bg-[#d4f54c] w-2 h-2 rounded-full inline-block"></span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeTab === "meal" ? (
          activeMeal ? (
            <div className="flex-1 rounded-[40px] flex flex-col justify-between relative overflow-hidden group border border-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

              <div className="absolute inset-0 z-0">
                <img
                  src={activeMeal.image}
                  alt={activeMeal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 p-5">
                <div className="flex justify-between items-start gap-4">
                  {/* Left: Title + Calorie Badge */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-black text-white leading-none tracking-tight drop-shadow-sm">
                        {activeMeal.title}
                      </h2>
                      <div className="bg-[#d4f54c] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-black/5 flex-shrink-0">
                        <span className="text-[10px] sm:text-xs font-black text-black whitespace-nowrap">{activeMeal.calories} kcal</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Refresh Button */}
                  {activeMeal.swapOptions && activeMeal.swapOptions.length > 0 && (
                    <button
                      onClick={() => openSwapDialog(activeMeal)}
                      className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-[#d4f54c] hover:text-black hover:scale-110 transition-all shadow-lg flex-shrink-0"
                      title="Trocar refeição"
                    >
                      <RefreshCw size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 relative z-10">
                <div className="space-y-2 mb-5">
                  {activeMeal.items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4f54c]" />
                      <span className="text-sm font-bold text-white leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto relative z-30">
                  <Button
                    onClick={() => toggleStatus(activeMeal)}
                    disabled={updateStatus.isPending}
                    className={cn(
                      "w-full h-11 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] border-none",
                      isAllDone
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                        : "bg-[#d4f54c] hover:bg-[#c4e600] text-black shadow-[#d4f54c]/20"
                    )}
                  >
                    {isAllDone ? (
                      <span className="flex items-center gap-2"><Check size={20} strokeWidth={3} /> Concluído</span>
                    ) : (
                      "Check Refeição"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Check size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Tudo Pronto!</h3>
              <p className="text-slate-500 text-sm">Você completou todas as refeições de hoje.</p>
            </div>
          )
        ) : (
          <div className="flex-1 rounded-[40px] flex flex-col justify-between relative overflow-hidden group border border-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="Treino de Pernas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-[#d4f54c] p-1.5 rounded-full border border-black/10">
                  <Dumbbell size={14} className="text-black" />
                </div>
                <span className="text-sm font-bold text-[#d4f54c] tracking-wide uppercase">Treino do Dia</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-none tracking-tight drop-shadow-sm mb-2">
                Leg Day <br /> Explosivo
              </h2>
              <p className="text-white/70 text-sm font-medium max-w-[200px]">
                Foco em quadríceps e posterior com alta intensidade.
              </p>
            </div>

            <div className="p-5 pt-0 relative z-10 mt-auto">
              <div className="flex gap-3 mb-4">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock size={12} /> 45 min
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" /> Alta Intensidade
                </div>
              </div>

              <Button
                onClick={() => setLocation('/treino')}
                className="w-full h-11 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] border-none bg-white text-black hover:bg-slate-200"
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        )}

        {!isAllDone && activeTab === "meal" && (
          <div className="mt-6 px-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">A seguir</span>
              <ChevronRight size={14} className="text-slate-300" />
            </div>

            <div className="space-y-2">
              {meals.filter((m: Meal) => m.status === 'pending' && m.id !== activeMeal?.id).slice(0, 2).map((nextM: Meal) => (
                <div key={nextM.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{nextM.time}</span>
                    <span className="text-sm font-bold text-slate-700">{nextM.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full">{nextM.calories} kcal</span>
                </div>
              ))}

              {meals.filter((m: Meal) => m.status === 'pending' && m.id !== activeMeal?.id).length === 0 && (
                <p className="text-xs text-slate-400 italic">Nenhuma outra refeição pendente.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog open={isSwapOpen} onOpenChange={setIsSwapOpen}>
        <DialogContent className="bg-white text-slate-900 border-none sm:max-w-md rounded-[32px] p-8 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl font-black tracking-tight text-slate-900">Trocar Alimento</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Selecione uma opção equivalente para substituir sua refeição.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <RadioGroup value={selectedSwapOption} onValueChange={setSelectedSwapOption} className="gap-3">
              {meals.find((m: Meal) => m.id === selectedMealForSwap)?.swapOptions?.map((option: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-3 bg-slate-100 p-4 rounded-2xl border border-slate-200 hover:border-[#d4f54c] hover:bg-slate-50 cursor-pointer [&:has([data-state=checked])]:bg-[#d4f54c]/10 [&:has([data-state=checked])]:border-[#d4f54c] transition-all">
                  <RadioGroupItem value={option} id={`opt-${idx}`} className="border-slate-400 text-[#d4f54c] data-[state=checked]:border-[#d4f54c]" />
                  <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer font-bold text-sm text-slate-900">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsSwapOpen(false)} className="rounded-xl font-bold text-slate-500 hover:text-slate-900">Cancelar</Button>
            <Button onClick={handleSwap} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-200">
              Confirmar Troca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
