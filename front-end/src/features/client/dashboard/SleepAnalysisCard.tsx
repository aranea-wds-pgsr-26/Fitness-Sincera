import { Card, CardContent } from "@/components/ui/card";
import { Moon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SleepBar = ({ month, height, active = false }: { month: string; height: string; active?: boolean }) => (
  <div className="flex flex-col items-center gap-2 flex-1 group">
    <div className="relative w-full flex justify-center items-end h-28">
      <div
        className={cn(
          "w-full max-w-[12px] rounded-full transition-all duration-500",
          active ? "bg-[#d4f54c] shadow-[0_0_15px_rgba(212,245,76,0.3)]" : "bg-zinc-800 group-hover:bg-zinc-700",
          height
        )}
      />
    </div>
    <span className={cn(
      "text-[10px] font-bold uppercase tracking-widest",
      active ? "text-[#d4f54c]" : "text-slate-500"
    )}>
      {month}
    </span>
  </div>
);

export function SleepAnalysisCard() {
  return (
    <Card className="col-span-1 lg:col-span-2 bg-[#1a1c1e] rounded-[32px] p-5 shadow-xl text-white border-none h-full">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-xl">
            <Moon size={20} className="text-slate-300" />
          </div>
          <span className="font-bold text-lg tracking-tight">Análise do Sono</span>
        </div>
        <button className="bg-zinc-800 px-4 py-2 rounded-xl text-sm flex items-center gap-2 text-slate-300 hover:bg-zinc-700 transition-colors">
          Mensal <ChevronDown size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1.5 bg-[#d4f54c] rounded-full shadow-[0_0_10px_rgba(212,245,76,0.2)]"></div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">85</span>
              <span className="text-xs text-slate-500">%</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Eficiência do Sono</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-1.5 bg-[#b8b0f5] rounded-full shadow-[0_0_10px_rgba(184,176,245,0.2)]"></div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">7h 15m</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Duração do Sono</p>
          </div>
        </div>
      </div>

      {/* Sleep Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-28 px-2">
        <SleepBar month="Jun" height="h-16" />
        <SleepBar month="Jul" height="h-20" />
        <SleepBar month="Ago" height="h-18" />
        <SleepBar month="Set" height="h-28" active={true} />
        <SleepBar month="Out" height="h-14" />
        <SleepBar month="Nov" height="h-20" />
        <SleepBar month="Dez" height="h-18" />
      </div>
    </Card>
  );
}
