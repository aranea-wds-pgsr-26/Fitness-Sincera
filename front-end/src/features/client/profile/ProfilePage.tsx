import { DashboardLayout } from "@/layout/DashboardLayout";
import {
  Camera,
  Globe,
  TrendingUp,
  Activity,
  Calendar,
  Settings,
  Award,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile, useUpdateProfile } from "@/lib/hooks/use-profile";
import { useProgressHistory } from "@/lib/hooks/use-dashboard";
import { useAchievements } from "@/lib/hooks/use-dashboard";
import type { Achievement, DailyProgress } from "@shared/schema";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { data: progressHistory = [] } = useProgressHistory();
  const { data: achievements = [] } = useAchievements();

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" }
  ];

  const handleLanguageChange = (lang: string) => {
    updateProfile.mutate({ language: lang });
  };

  const chartData = progressHistory.slice(-12);
  const maxWeight = chartData.length > 0 ? Math.max(...chartData.map((d: DailyProgress) => d.weight)) : 85;
  const minWeight = chartData.length > 0 ? Math.min(...chartData.map((d: DailyProgress) => d.weight)) : 80;
  const range = maxWeight - minWeight || 1;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-1 bg-[#e9e9e9] rounded-[28px] md:rounded-[36px] flex items-center justify-center">
          <Loader2 className="animate-spin text-slate-400" size={48} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 bg-[#e9e9e9] rounded-[28px] md:rounded-[36px] overflow-y-auto p-4 md:p-8 selection:bg-[#d4f54c] selection:text-black">

        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight uppercase font-body">Meu Perfil</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Gerencie seus dados e preferências</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">

          {/* Left Column */}
          <div className="md:col-span-4 space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-slate-800 to-slate-900"></div>

              <div className="relative mt-8 mb-4">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={profile?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-[#d4f54c] p-1.5 rounded-full border-2 border-white text-black">
                  <Settings size={14} />
                </div>
              </div>

              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{profile?.name}</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Membro {profile?.membershipType}</p>

              <div className="w-full grid grid-cols-2 gap-3 text-left">
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Idade</span>
                  <span className="text-lg font-bold text-slate-900 block">{profile?.age} Anos</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Sexo</span>
                  <span className="text-lg font-bold text-slate-900 block">{profile?.sex}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Peso</span>
                  <span className="text-lg font-bold text-slate-900 block">{profile?.weight} kg</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Altura</span>
                  <span className="text-lg font-bold text-slate-900 block">{profile?.height} cm</span>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="text-[#d4f54c] fill-black" size={20} />
                <h3 className="font-bold text-slate-900">Idioma do App</h3>
              </div>

              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.label)}
                    disabled={updateProfile.isPending}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all font-medium text-sm",
                      profile?.language === lang.label
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </span>
                    {profile?.language === lang.label && <div className="w-2 h-2 rounded-full bg-[#d4f54c]" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="md:col-span-8 space-y-6">

            {/* Evolution Chart */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="text-[#d4f54c]" size={24} />
                    Sua Evolução
                  </h3>
                  <p className="text-slate-400 text-xs font-medium mt-1">Últimos 30 dias de progresso</p>
                </div>
                <select className="bg-slate-50 border-none text-sm font-bold text-slate-600 rounded-xl px-4 py-2 cursor-pointer focus:ring-2 focus:ring-[#d4f54c] w-full sm:w-auto">
                  <option>Peso Corporal</option>
                  <option>Gordura Corporal</option>
                  <option>Massa Muscular</option>
                </select>
              </div>

              <div className="h-48 md:h-64 w-full flex items-end justify-between gap-1 md:gap-2 px-2 md:px-4 pb-4 border-b border-slate-100 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-slate-50 last:bg-transparent" />
                  ))}
                </div>

                {chartData.map((d: DailyProgress, i: number) => {
                  const h = ((d.weight - minWeight) / range) * 80 + 10;
                  return (
                    <div key={i} className="relative group w-full flex items-end h-full">
                      <div
                        className="w-full bg-slate-100 rounded-t-lg transition-all duration-500 group-hover:bg-[#d4f54c] relative"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {d.weight.toFixed(1)}kg
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                <span>Semana 1</span>
                <span>Semana 2</span>
                <span>Semana 3</span>
                <span>Semana 4</span>
              </div>
            </div>

            {/* Achievements & Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Streak Card */}
              <div className="bg-[#1a1c1e] rounded-[32px] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Activity size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg"><Calendar className="text-[#d4f54c]" size={20} /></div>
                    <span className="font-bold text-lg">Consistência</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-[#d4f54c]">{profile?.streakDays ?? 0}</span>
                    <span className="text-lg font-bold">dias seguidos</span>
                  </div>
                  <p className="text-white/40 text-sm">Você está no top 5% dos usuários este mês!</p>

                  <div className="mt-6 flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={cn(
                        "h-2 flex-1 rounded-full",
                        i < 5 ? "bg-[#d4f54c]" : "bg-white/10"
                      )} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-orange-50 rounded-lg"><Award className="text-orange-500" size={20} /></div>
                  <span className="font-bold text-slate-900 text-lg">Conquistas</span>
                </div>

                <div className="space-y-4">
                  {achievements.slice(0, 3).map((achievement: Achievement) => (
                    <div key={achievement.id} className={cn("flex items-center gap-4", !achievement.unlocked && "opacity-50 grayscale")}>
                      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0", achievement.bgColor)}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{achievement.title}</h4>
                        <p className="text-slate-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
