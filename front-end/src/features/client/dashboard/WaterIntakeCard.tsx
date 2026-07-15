import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus } from "lucide-react";
import { useWaterToday, useAddWater } from "@/lib/hooks/use-dashboard";

export function WaterIntakeCard() {
  const { data: water } = useWaterToday();
  const addWater = useAddWater();

  const amount = water?.amount ?? 0;
  const goal = water?.goal ?? 3000;
  const percent = Math.min((amount / goal) * 100, 100);

  return (
    <Card className="bg-[#1a1c1e] rounded-[32px] p-5 shadow-sm border-none flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Droplets size={20} className="text-blue-400" />
          </div>
          <span className="font-bold text-white text-lg">Hidratação</span>
        </div>
        <span className="text-xs font-black bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full uppercase tracking-widest">
          Hoje
        </span>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-black text-white tracking-tighter">
          {(amount / 1000).toFixed(1)}L
        </span>
        <span className="text-white/40 text-sm ml-2">/ {(goal / 1000).toFixed(1)}L</span>
      </div>

      <div className="mb-3">
        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-white/5 border-white/10 text-white hover:bg-blue-500/20 hover:text-blue-300 rounded-xl font-bold"
          onClick={() => addWater.mutate(250)}
          disabled={addWater.isPending}
        >
          <Plus size={14} className="mr-1" /> 250ml
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-white/5 border-white/10 text-white hover:bg-blue-500/20 hover:text-blue-300 rounded-xl font-bold"
          onClick={() => addWater.mutate(500)}
          disabled={addWater.isPending}
        >
          <Plus size={14} className="mr-1" /> 500ml
        </Button>
      </div>
    </Card>
  );
}
