import { DashboardLayout } from "@/layout/DashboardLayout";
import { DailyRoutineTimeline } from "./DailyRoutineTimeline";
import { UpgradeCTACard } from "./UpgradeCTACard";
import { EnergyUsedCard } from "./EnergyUsedCard";
import { SleepAnalysisCard } from "./SleepAnalysisCard";
import { GoalProgressCard } from "./GoalProgressCard";
import { WaterIntakeCard } from "./WaterIntakeCard";
import {
  Search,
  Bell,
  ChevronDown,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleCameraClick = () => {
    setIsUploading(true);
    toast({
      title: "Analisando alimento...",
      description: "Nossa IA está identificando sua refeição.",
    });

    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Sucesso! 🎉",
        description: "Refeição identificada: Frango Grelhado com Salada (350kcal)",
        className: "bg-nutrition text-white border-none",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      {/* Main Content Area */}
      <div className="flex-1 bg-[#e9e9e9] rounded-[28px] md:rounded-[36px] overflow-y-auto p-4 md:p-8 selection:bg-[#d4f54c] selection:text-black">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" />
              <AvatarFallback>LB</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-bold text-sm text-slate-900">Lucas Bennett</span>
                <ChevronDown size={14} className="text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium">bennet02@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-white rounded-full py-2.5 pl-10 pr-4 text-sm w-full sm:w-52 md:w-64 focus:outline-none focus:ring-2 focus:ring-[#d4f54c]/50 border-none shadow-sm"
              />
            </div>
            <div className="relative p-2.5 bg-white rounded-full shadow-sm cursor-pointer hover:bg-slate-50 transition-colors flex-shrink-0">
              <Bell size={18} className="text-slate-700" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#d4f54c] border-2 border-white rounded-full text-[8px] flex items-center justify-center font-black">2</span>
            </div>
          </div>
        </header>

        {/* Section Title */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight uppercase font-body">Visão Geral de Saúde</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Tome o controlo da sua saúde hoje!</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">12 Julho, 2024</span>
            <button className="bg-white px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              Hoje <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </section>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

          {/* Row 1: 3 cards */}
          <div className="sm:col-span-1 lg:col-span-4">
            <DailyRoutineTimeline />
          </div>
          <div className="sm:col-span-1 lg:col-span-4">
            <GoalProgressCard />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <WaterIntakeCard />
          </div>

          {/* Row 2: Sleep + Energy */}
          <div className="sm:col-span-2 lg:col-span-8">
            <SleepAnalysisCard />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <EnergyUsedCard />
          </div>

          {/* Full Width Row: Upgrade CTA */}
          <div className="sm:col-span-2 lg:col-span-12">
            <UpgradeCTACard />
          </div>
        </div>
      </div>

      {/* FAB - Camera Button */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <Button
          size="lg"
          className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#d4f54c] text-black hover:bg-[#c4e600] shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-4 border-[#111111]"
          onClick={handleCameraClick}
          disabled={isUploading}
        >
          <Camera className={isUploading ? "animate-pulse" : ""} strokeWidth={3} size={24} />
        </Button>
      </div>
    </DashboardLayout>
  );
}
