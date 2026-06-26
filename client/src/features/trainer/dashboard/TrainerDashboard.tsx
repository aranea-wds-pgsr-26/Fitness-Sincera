import React, { useState, useCallback } from "react";
import { useTrainerDashboard, useTrainerClients } from "@/lib/hooks/useTrainerClients";
import { ClientList } from "@/shared/components/ClientList";
import {
  ChevronRight,
  HelpCircle,
  Filter,
  Trash2,
  Smile,
  ChevronDown,
  UserPlus,
  Search,
} from "lucide-react";

interface TrainerDashboardProps {
  onClientDetailOpen?: (clientId: string) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Notifications Widget ────────────────────────────────────────────────────
const MOCK_NOTIFS = [
  {
    id: "1",
    initials: "MD",
    darkAvatar: false,
    type: "workout",
    title: "Treino finalizado ✅",
    message: "O Aluno Margarida Duarte completou o treino: Treinando Em Casa (Body Pump)",
    time: "há 2 dias",
  },
  {
    id: "2",
    initials: "AN",
    darkAvatar: false,
    type: "workout",
    title: "Treino finalizado ✅",
    message: "O Aluno Adriana Nobre completou o treino: Legião de Ferro (H)",
    time: "há 1 semana",
  },
  {
    id: "3",
    initials: "CS",
    darkAvatar: true,
    type: "new",
    title: "Novo Aluno ✨",
    message: "O aluno Cátia Silva finalizou o registo na app, dá-lhe as boas-vindas!",
    time: "há 1 semana",
  },
];

function NotificationsWidget() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Notificações</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotifs([])}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Limpar todas
          </button>
          <button className="bg-[#475569] text-white text-[10px] px-3 py-1 rounded flex items-center gap-1 hover:bg-slate-600 transition-colors">
            <Filter className="w-3 h-3" /> Filtrar
          </button>
        </div>
      </div>
      <div className="p-1 max-h-[400px] overflow-y-auto">
        {notifs.length === 0 ? (
          <div className="py-10 flex items-center justify-center text-sm text-slate-300">
            Sem notificações
          </div>
        ) : (
          notifs.map((n, idx) => (
            <div
              key={n.id}
              className={`p-4 hover:bg-slate-50 flex gap-4 group ${idx > 0 ? "border-t border-gray-50" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ${n.darkAvatar
                  ? "bg-[#525252] text-white"
                  : "bg-slate-200 text-slate-600"
                  }`}
              >
                {n.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4
                    className={`text-xs font-bold ${n.type === "workout" ? "text-emerald-500" : "text-amber-400"
                      }`}
                  >
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 italic flex-shrink-0 ml-2">
                    {n.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
              <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(n.id)}
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

// ─── Tasks Widget ────────────────────────────────────────────────────────────
function TasksWidget() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const addTask = () => {
    if (task.trim()) {
      setTasks((p) => [...p, task.trim()]);
      setTask("");
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Tarefas</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        {tasks.length > 0 && (
          <button
            onClick={() => setTasks([])}
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
            placeholder="Nova Tarefa"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="w-full border-b border-slate-200 pb-2 text-sm focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-300 bg-transparent"
          />
          {tasks.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {tasks.map((t, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between group text-sm text-slate-600"
                >
                  <span>{t}</span>
                  <button
                    onClick={() => setTasks((p) => p.filter((_, i) => i !== idx))}
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
              onClick={addTask}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${added
                ? "bg-emerald-100 text-emerald-600"
                : "bg-[#BCE9F5] text-[#34A8C8] hover:bg-[#a6d9e8]"
                }`}
            >
              {added ? "Adicionada!" : "Adicionar tarefa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Completed Workouts Bar Chart Widget ─────────────────────────────────────
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const MOCK_MONTHLY = [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const maxVal = Math.max(...MOCK_MONTHLY, 1);

function WorkoutsWidget({ total }: { total: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[300px]">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Treinos finalizados</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>
      <div className="p-6">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-slate-800">{total}</span>
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
            Total <span className="text-slate-500">2026</span>
            <ChevronDown className="w-3 h-3" />
          </span>
        </div>
        <div className="relative h-28 w-full mt-2">
          {/* Y axis gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[8, 6, 4, 2, 0].map((v) => (
              <div key={v} className="border-t border-slate-50 w-full relative">
                <span className="absolute -left-5 -top-2 text-[8px] text-slate-300 font-bold">
                  {v}
                </span>
              </div>
            ))}
          </div>
          {/* Bars */}
          <div className="absolute bottom-0 inset-x-6 flex items-end gap-1 justify-around">
            {MOCK_MONTHLY.map((v, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div
                  className="w-4 bg-[#0EA5E9] rounded-sm transition-all group-hover:brightness-110"
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

// ─── Liga do Treinador Widget ─────────────────────────────────────────────────
function LeagueWidget() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[300px]">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-slate-700">Liga do Treinador</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-help" />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
      </div>
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <p className="font-bold text-slate-800 text-sm">Nenhuma pontuação ainda</p>
        <p className="text-xs text-slate-400 mt-2">
          Assim que os teus alunos pontuarem verás o ranking aqui
        </p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export function TrainerDashboard({ onClientDetailOpen }: TrainerDashboardProps) {
  const [performance, setPerformance] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const { data: dashboardStats } = useTrainerDashboard();
  const { data: clientsData, isLoading: clientsLoading } = useTrainerClients({
    performance: performance !== "all" ? performance : undefined,
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

  const handleClientClick = useCallback(
    (clientId: string) => { onClientDetailOpen?.(clientId); },
    [onClientDetailOpen]
  );

  const totalStudents = dashboardStats?.totalClients ?? dashboardStats?.totalStudents ?? 0;
  const activeStudents = dashboardStats?.activeStudents ?? 0;
  const lowAdherence = dashboardStats?.studentsLowAdherence ?? dashboardStats?.lowAdherenceCount ?? 0;
  const totalWorkouts = 7; // from mock — will come from API later

  // Avatar stack count
  const stackExtra = Math.max(0, totalStudents - 2);
  const inactiveExtra = Math.max(0, lowAdherence - 1);

  return (
    <div className="w-full text-slate-800">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight uppercase">
              VISÃO GERAL
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Olá Personal, controle seus alunos hoje! 👋</p>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center gap-3 bg-[#111111] text-white text-xs font-black uppercase tracking-widest px-6 py-4 rounded-2xl hover:bg-zinc-800 transition-colors shadow-xl hover:scale-105 active:scale-95">
            <UserPlus className="w-5 h-5 text-[#d4f54c]" strokeWidth={2.5} />
            Novo Aluno
          </button>
        </header>

        {/* ── Stats Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total de Alunos */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Total de Alunos</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-slate-800">{totalStudents}</span>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-400" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-[8px] text-white">
                  +{stackExtra}
                </div>
              </div>
            </div>
          </div>

          {/* Alunos Ativos */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Alunos ativos nos últimos 7 dias</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-slate-800">{activeStudents}</span>
            </div>
          </div>

          {/* Alunos Inativos / Baixa Adesão */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-500">Alunos inativos nos últimos 7 dias</h3>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-slate-800">{lowAdherence}</span>
              {lowAdherence > 0 && (
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-600" />
                  {inactiveExtra > 0 && (
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[8px] text-white">
                      +{inactiveExtra}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Widgets Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotificationsWidget />
          <TasksWidget />
          <LeagueWidget />
          <WorkoutsWidget total={totalWorkouts} />
        </div>

        {/* ── Clients Table ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-700">Gestão dos Alunos</h3>
              <span className="text-xs text-slate-400">
                {clientsData?.pagination?.totalItems ?? clientsData?.data?.length ?? 0} Alunos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  placeholder="Pesquisar aluno..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all w-48 bg-white"
                />
              </div>
              <select
                value={performance}
                onChange={(e) => { setPerformance(e.target.value); setPage(1); }}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-slate-500 focus:outline-none bg-white"
              >
                <option value="all">Todos</option>
                <option value="high">Alta adesão</option>
                <option value="low">Baixa adesão</option>
              </select>
              <button className="inline-flex items-center gap-2 bg-[#d4f54c] text-black text-xs font-black uppercase px-6 py-3 rounded-2xl hover:bg-[#c4e600] transition-colors shadow-lg cursor-pointer">
                <UserPlus className="w-4 h-4" strokeWidth={3} /> NOVO
              </button>
            </div>
          </div>

          <ClientList
            clients={clientsData?.data ?? []}
            onClientClick={handleClientClick}
            isLoading={clientsLoading}
            accentColor="personal"
            page={page}
            totalPages={clientsData?.pagination?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
