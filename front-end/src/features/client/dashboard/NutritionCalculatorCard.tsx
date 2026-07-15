import { Card } from "@/components/ui/card";
import { Flame, Droplets, TrendingUp, Clock, Zap } from "lucide-react";
import { useNutritionSummary } from "@/lib/hooks/use-meals";

export function NutritionCalculatorCard() {
  const { data: summary } = useNutritionSummary();

  const consumed = summary?.consumed ?? 0;
  const goal = summary?.goal ?? 2500;
  const remaining = Math.max(goal - consumed, 0);
  const pct = Math.min((consumed / goal) * 100, 100);

  const macros = [
    {
      label: "Proteína",
      val: summary?.protein.current ?? 0,
      max: summary?.protein.goal ?? 1,
      color: "#f97316",
    },
    {
      label: "Carboidratos",
      val: summary?.carbs.current ?? 0,
      max: summary?.carbs.goal ?? 1,
      color: "#d4f54c",
    },
    {
      label: "Gorduras",
      val: summary?.fat.current ?? 0,
      max: summary?.fat.goal ?? 1,
      color: "#a78bfa",
    },
  ];

  // SVG ring dimensions
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <Card className="bg-white rounded-[32px] p-6 shadow-sm border-none flex flex-col gap-5">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Resumo Diário</h3>
        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
          Hoje
        </span>
      </div>

      {/* ── Calorie Ring + breakdown ────────────────────────── */}
      <div className="flex items-center gap-5">

        {/* Compact ring */}
        <div className="relative flex-shrink-0 w-[104px] h-[104px]">
          <svg width="104" height="104" viewBox="0 0 104 104">
            {/* Track */}
            <circle
              cx="52" cy="52" r={r}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="9"
            />
            {/* Progress */}
            <circle
              cx="52" cy="52" r={r}
              fill="none"
              stroke="#d4f54c"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90 52 52)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <div className="bg-orange-50 rounded-full p-1">
              <Flame size={12} className="text-orange-500 fill-orange-400" />
            </div>
            <span className="text-xl font-black text-slate-900 leading-none">{consumed}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">kcal</span>
          </div>
        </div>

        {/* Numbers breakdown */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Meta</p>
            <p className="text-lg font-black text-slate-900 leading-none">
              {goal.toLocaleString("pt-BR")}
              <span className="text-xs font-bold text-slate-400 ml-1">kcal</span>
            </p>
          </div>
          <div className="h-px bg-slate-100" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Restante</p>
            <p className={`text-lg font-black leading-none ${remaining === 0 ? "text-emerald-500" : "text-slate-900"}`}>
              {remaining.toLocaleString("pt-BR")}
              <span className="text-xs font-bold text-slate-400 ml-1">kcal</span>
            </p>
          </div>
          {/* Mini progress bar */}
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d4f54c] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-bold">{Math.round(pct)}% da meta consumida</p>
        </div>
      </div>

      {/* ── Macro rows ─────────────────────────────────────── */}
      <div className="space-y-3">
        {macros.map((m) => {
          const mpct = Math.min((m.val / m.max) * 100, 100);
          return (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-600">{m.label}</span>
                <span className="text-xs font-black text-slate-800 font-mono">
                  {m.val}g
                  <span className="text-slate-400 font-bold"> / {m.max}g</span>
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${mpct}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mini stats grid ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2">
        <MiniStat
          icon={Droplets}
          label="Hidratação"
          value="1.2L"
          sub="meta: 2.5L"
          iconColor="text-sky-500"
          iconBg="bg-sky-50"
        />
        <MiniStat
          icon={TrendingUp}
          label="Adesão"
          value="78%"
          sub="esta semana"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <MiniStat
          icon={Clock}
          label="Próxima"
          value="13:00"
          sub="Almoço"
          iconColor="text-amber-500"
          iconBg="bg-amber-50"
        />
        <MiniStat
          icon={Zap}
          label="Sequência"
          value="5 dias"
          sub="recorde: 12"
          iconColor="text-[#4a5e00]"
          iconBg="bg-[#d4f54c]/20"
        />
      </div>
    </Card>
  );
}

// ─── Mini Stat ───────────────────────────────────────────────────────────────

interface MiniStatProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  iconColor: string;
  iconBg: string;
}

function MiniStat({ icon: Icon, label, value, sub, iconColor, iconBg }: MiniStatProps) {
  return (
    <div className="bg-slate-50 rounded-2xl p-3 flex items-start gap-2.5 border border-slate-100">
      <div className={`w-7 h-7 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={13} className={iconColor} />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">{label}</p>
        <p className="text-sm font-black text-slate-800 leading-tight">{value}</p>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
