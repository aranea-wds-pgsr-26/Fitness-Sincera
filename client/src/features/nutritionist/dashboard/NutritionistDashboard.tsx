import React, { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useNutritionistDashboard, useNutritionistClients } from "@/lib/hooks/useNutritionistClients";
import { ClientList } from "@/shared/components/ClientList";
import {
  ChevronRight,
  HelpCircle,
  Trash2,
  ChevronDown,
  UserPlus,
  Search,
  ClipboardEdit,
} from "lucide-react";



// ─── Nutritional Alerts Widget (mirrors Notificações) ────────────────────────
const MOCK_ALERTS = [
  {
    id: "1",
    initials: "CS",
    darkAvatar: true,
    type: "risk",
    title: "Meta calórica não atingida ⚠️",
    message: "Cátia Silva está 35% abaixo da meta calórica diária há 3 dias.",
    time: "há 1 dia",
  },
  {
    id: "2",
    initials: "AN",
    darkAvatar: false,
    type: "ok",
    title: "Plano alimentar atualizado ✅",
    message: "Adriana Nobre recebeu o novo plano de emagrecimento — Fase 2.",
    time: "há 2 dias",
  },
  {
    id: "3",
    initials: "RG",
    darkAvatar: false,
    type: "risk",
    title: "Hidratação baixa 🚨",
    message: "Rita Gomes registou menos de 1L de água por 4 dias consecutivos.",
    time: "há 3 dias",
  },
];

function AlertsWidget() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const remove = (id: string) => setAlerts((p) => p.filter((a) => a.id !== id));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Alertas Nutricionais</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <button
              onClick={() => setAlerts([])}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Limpar todas
            </button>
          )}
        </div>
      </div>
      <div className="p-1 max-h-[400px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="py-10 flex items-center justify-center text-sm text-slate-300">
            Sem alertas no momento
          </div>
        ) : (
          alerts.map((a, idx) => (
            <div
              key={a.id}
              className={`p-4 hover:bg-slate-50 flex gap-4 group ${idx > 0 ? "border-t border-gray-50" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ${a.darkAvatar ? "bg-[#525252] text-white" : "bg-slate-200 text-slate-600"
                  }`}
              >
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4
                    className={`text-xs font-bold ${a.type === "ok" ? "text-emerald-500" : "text-amber-500"
                      }`}
                  >
                    {a.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 italic flex-shrink-0 ml-2">
                    {a.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {a.message}
                </p>
              </div>
              <div className="flex items-start opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => remove(a.id)}
                  className="text-slate-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Goals / Tarefas Widget (adapted for nutritionist) ───────────────────────
function GoalsWidget() {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState<string[]>([
    "Revisar planos da Semana 8",
    "Atualizar metas calóricas de clientes em risco",
  ]);
  const [added, setAdded] = useState(false);

  const addGoal = () => {
    if (goal.trim()) {
      setGoals((p) => [...p, goal.trim()]);
      setGoal("");
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Metas da Semana</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        {goals.length > 0 && (
          <button
            onClick={() => setGoals([])}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Limpar todas
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col p-8 items-center justify-center gap-4">
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Nova Meta"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
            className="w-full border-b border-slate-200 pb-2 text-sm focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-300 bg-transparent"
          />
          {goals.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {goals.map((g, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between group text-sm text-slate-600 py-1"
                >
                  <span>{g}</span>
                  <button
                    onClick={() => setGoals((p) => p.filter((_, i) => i !== idx))}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-end mt-8">
            <button
              onClick={addGoal}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${added
                ? "bg-emerald-100 text-emerald-600"
                : "bg-[#BCE9F5] text-[#34A8C8] hover:bg-[#a6d9e8]"
                }`}
            >
              {added ? "Adicionada!" : "Adicionar meta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compliance Bar Chart Widget ──────────────────────────────────────────────
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const MOCK_COMPLIANCE = [74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const maxVal = Math.max(...MOCK_COMPLIANCE, 1);

function ComplianceChartWidget({ avg }: { avg: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[300px]">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Conformidade nutricional</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>
      <div className="p-6">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-slate-800">{avg}%</span>
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
            Média <span className="text-slate-500">2026</span>
            <ChevronDown className="w-3 h-3" />
          </span>
        </div>
        <div className="relative h-28 w-full mt-2">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[100, 75, 50, 25, 0].map((v) => (
              <div key={v} className="border-t border-slate-50 w-full relative">
                <span className="absolute -left-5 -top-2 text-[8px] text-slate-300 font-bold">
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-6 flex items-end gap-1 justify-around">
            {MOCK_COMPLIANCE.map((v, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div
                  className="w-4 bg-emerald-400 rounded-sm transition-all group-hover:brightness-110"
                  style={{ height: `${(v / maxVal) * 100}px` }}
                />
                <span className="mt-1.5 text-[8px] text-slate-300 font-medium">
                  {MONTHS[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Food Plans Placeholder Widget ──────────────────────────────────────────
function FoodPlansWidget() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[300px]">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Planos alimentares</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <p className="font-bold text-slate-800 text-sm">Nenhum plano criado ainda</p>
        <p className="text-xs text-slate-400 mt-2">
          Crie planos alimentares personalizados para os seus clientes
        </p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export function NutritionistDashboard() {
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const { data: dashboardStats } = useNutritionistDashboard();
  const { data: clientsData, isLoading: clientsLoading } = useNutritionistClients({
    status: status !== "all" ? status : undefined,
    search: debouncedSearch,
    page,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const [, navigate] = useLocation();

  const handleClientClick = useCallback(
    (clientId: string) => { navigate(`/nutritionist/planos/${clientId}`); },
    [navigate]
  );

  const totalClients = dashboardStats?.totalClients ?? 0;
  const activeClients = dashboardStats?.activeClients ?? 0;
  const atRisk = dashboardStats?.clientsAtRisk ?? 0;
  const avgCompliance = dashboardStats?.avgCompliancePercent ?? 74;

  const stackExtra = Math.max(0, totalClients - 2);
  const riskExtra = Math.max(0, atRisk - 1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Olá, Nutricionista! 🥗
            </h1>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#059669] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
            <UserPlus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>

        {/* ── Stats Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total de Clientes */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Total de Clientes</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-slate-800">{totalClients}</span>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-400" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-[8px] text-white">
                  +{stackExtra}
                </div>
              </div>
            </div>
          </div>

          {/* Clientes Ativos */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Clientes ativos nos últimos 7 dias</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-slate-800">{activeClients}</span>
            </div>
          </div>

          {/* Em Risco */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Clientes em risco nutricional</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-slate-800">{atRisk}</span>
              {atRisk > 0 && (
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-400" />
                  {riskExtra > 0 && (
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-[8px] text-amber-700">
                      +{riskExtra}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Widgets Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AlertsWidget />
          <GoalsWidget />
          <FoodPlansWidget />
          <ComplianceChartWidget avg={avgCompliance} />
        </div>

        {/* ── Clients Table ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-700">Gestão dos Clientes</h3>
              <span className="text-xs text-slate-400">
                {clientsData?.pagination?.totalItems ?? clientsData?.data?.length ?? 0} Clientes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  placeholder="Pesquisar cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-300 transition-all w-48 bg-white"
                />
              </div>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none bg-white"
              >
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="paused">Pausado</option>
              </select>
              <button
                onClick={() => navigate("/nutritionist/planos")}
                className="inline-flex items-center gap-1.5 bg-[#d4f54c] text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#c4e000] transition-colors"
              >
                <ClipboardEdit className="w-3.5 h-3.5" /> Gerir Planos
              </button>
              <button className="inline-flex items-center gap-1.5 bg-[#059669] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                <UserPlus className="w-3.5 h-3.5" /> Novo cliente
              </button>
            </div>
          </div>

          <ClientList
            clients={clientsData?.data ?? []}
            onClientClick={handleClientClick}
            isLoading={clientsLoading}
            accentColor="nutrition"
            page={page}
            totalPages={clientsData?.pagination?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
