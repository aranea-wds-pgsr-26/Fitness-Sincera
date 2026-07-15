import { Card } from "@/components/ui/card";
import { Zap, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardSummary } from "@/lib/hooks/use-dashboard";

interface ActivityRowProps {
  label: string;
  percent: number;
  color: string;
  dotColor: string;
}

const ActivityRow = ({ label, percent, color, dotColor }: ActivityRowProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
      <div className="flex items-center gap-2">
        <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
        <span>{label}</span>
      </div>
      <span>{percent}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-1000", color)}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export function EnergyUsedCard() {
  const { data: summary } = useDashboardSummary();
  const burned = summary?.caloriesBurned ?? 430;

  return (
    <Card className="col-span-1 lg:col-span-1 bg-white rounded-[32px] p-5 shadow-sm flex flex-col h-full min-h-[320px] border-none">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-50 rounded-lg">
            <Zap size={18} className="text-slate-400" />
          </div>
          <span className="font-bold text-slate-700">Energia Usada</span>
        </div>
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">{(burned / 1000).toFixed(1)}k</span>
          <span className="text-slate-400 text-sm font-medium">kcal hoje</span>
          <span className="ml-2 bg-[#d4f54c] text-[10px] font-bold px-2 py-0.5 rounded-full text-black">+5%</span>
        </div>
      </div>

      {/* Overlapping Circles Chart */}
      <div className="relative flex justify-center items-center h-36 mb-4">
        <div className="absolute w-24 h-24 rounded-full bg-[#b8b0f5] flex flex-col items-center justify-center -translate-x-7 translate-y-1 shadow-lg transition-transform hover:scale-105 duration-300">
          <span className="text-base font-bold text-black/80">{Math.round(burned * 0.6)}</span>
          <span className="text-[10px] text-black/50 font-bold uppercase tracking-widest">kcal</span>
        </div>
        <div className="absolute w-20 h-20 rounded-full bg-[#2a2d30] flex flex-col items-center justify-center translate-x-8 -translate-y-3 shadow-xl z-10 transition-transform hover:scale-105 duration-300">
          <span className="text-sm font-bold text-white">{Math.round(burned * 0.28)}</span>
          <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">kcal</span>
        </div>
        <div className="absolute w-12 h-12 rounded-full bg-[#d4f54c] flex flex-col items-center justify-center translate-x-1 translate-y-10 shadow-lg z-20 transition-transform hover:scale-105 duration-300 border-2 border-white/20">
          <span className="text-xs font-bold text-black">{Math.round(burned * 0.12)}</span>
          <span className="text-[10px] text-black/60 font-bold uppercase tracking-widest">kcal</span>
        </div>
      </div>

      {/* Activity Rows */}
      <div className="space-y-3 mt-auto">
        <ActivityRow label="Corrida" percent={45} color="bg-[#b8b0f5]" dotColor="bg-[#b8b0f5]" />
        <ActivityRow label="Treinos" percent={30} color="bg-[#2a2d30]" dotColor="bg-[#2a2d30]" />
        <ActivityRow label="Caminhada" percent={25} color="bg-[#d4f54c]" dotColor="bg-[#d4f54c]" />
      </div>
    </Card>
  );
}
