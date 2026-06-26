import { Card } from "@/components/ui/card";
import { Flame, Target } from "lucide-react";
import { useNutritionSummary } from "@/lib/hooks/use-meals";

export function GoalProgressCard() {
  const { data: summary } = useNutritionSummary();

  const consumed = summary?.consumed ?? 0;
  const goal = summary?.goal ?? 2500;
  const remaining = summary?.remaining ?? goal;
  const percent = Math.min((consumed / goal) * 100, 100);

  return (
    <Card className="col-span-1 md:col-span-12 lg:col-span-3 bg-[#d4f54c] rounded-[32px] p-5 shadow-sm border-none flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-black/10 rounded-xl backdrop-blur-sm">
            <Target size={20} className="text-black" />
          </div>
          <span className="text-xs font-black bg-black text-[#d4f54c] px-2 py-1 rounded-full uppercase tracking-widest">
            Meta Diária
          </span>
        </div>

        <h3 className="text-3xl font-black text-black leading-none mb-1 tracking-tighter">
          {remaining.toLocaleString("pt-BR")}
        </h3>
        <p className="text-black/60 text-xs font-bold uppercase tracking-wide">
          Kcal restantes
        </p>
      </div>

      <div className="relative z-10 mt-4">
        <div className="flex justify-between items-end mb-2 text-black/80 font-bold text-xs">
          <span>Consumido</span>
          <span>{consumed} / {goal}</span>
        </div>
        <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <Flame className="absolute bottom-4 right-4 text-black/5 w-24 h-24 -rotate-12" />
    </Card>
  );
}
