import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Apple,
  ClipboardList,
  Crown,
  Dumbbell,
  Loader2,
  LogOut,
  MessageCircle,
  Plus,
  Users,
  Wallet,
} from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/features/auth/AuthProvider";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

interface AdminDashboard {
  users: number;
  clients: number;
  nutritionists: number;
  trainers: number;
  meals: number;
  diets: number;
  workouts: number;
  foods: number;
  chatMessages: number;
  siteLeads: number;
  notifications: {
    siteUnread: number;
    email: {
      status: string;
      provider: string | null;
    };
  };
  revenue: {
    monthlyRecurring: number;
    currency: string;
    status: string;
  };
}

interface Professional {
  id: string;
  name: string;
  email: string;
  role: "nutritionist" | "trainer";
  createdAt?: string;
}

interface SiteLead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  audience: string;
  interest: string;
  message?: string | null;
  status: string;
  createdAt?: string;
}

const emptyDashboard: AdminDashboard = {
  users: 0,
  clients: 0,
  nutritionists: 0,
  trainers: 0,
  meals: 0,
  diets: 0,
  workouts: 0,
  foods: 0,
  chatMessages: 0,
  siteLeads: 0,
  notifications: {
    siteUnread: 0,
    email: {
      status: "pending_integration",
      provider: null,
    },
  },
  revenue: {
    monthlyRecurring: 0,
    currency: "BRL",
    status: "not_configured",
  },
};

function roleLabel(role: Professional["role"]) {
  return role === "nutritionist" ? "Nutricionista" : "Personal trainer";
}

export default function AdminDashboardPage() {
  const { session, logout } = useAuth();
  const [, navigate] = useLocation();
  const [dashboard, setDashboard] = useState<AdminDashboard>(emptyDashboard);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [siteLeads, setSiteLeads] = useState<SiteLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "nutritionist" as Professional["role"],
  });

  const stats = useMemo(
    () => [
      { label: "Usuarios", value: dashboard.users, icon: Users },
      { label: "Clientes", value: dashboard.clients, icon: Activity },
      { label: "Nutricionistas", value: dashboard.nutritionists, icon: Apple },
      { label: "Personal trainers", value: dashboard.trainers, icon: Dumbbell },
      { label: "Dietas", value: dashboard.diets, icon: ClipboardList },
      { label: "Treinos", value: dashboard.workouts, icon: Dumbbell },
      { label: "Alimentos", value: dashboard.foods, icon: Apple },
      { label: "Mensagens IA", value: dashboard.chatMessages, icon: MessageCircle },
      { label: "Leads do site", value: dashboard.siteLeads, icon: MessageCircle },
    ],
    [dashboard]
  );

  async function loadAdminData() {
    setIsLoading(true);
    try {
      const [dashboardResponse, professionalsResponse, leadsResponse] = await Promise.all([
        apiRequest("GET", "/api/admin/dashboard"),
        apiRequest("GET", "/api/admin/professionals"),
        apiRequest("GET", "/api/admin/site-leads"),
      ]);

      const dashboardBody = await dashboardResponse.json();
      const professionalsBody = await professionalsResponse.json();
      const leadsBody = await leadsResponse.json();

      setDashboard(dashboardBody.data ?? emptyDashboard);
      setProfessionals(professionalsBody.data ?? []);
      setSiteLeads(leadsBody.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadAdminData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSaving(true);

    try {
      const response = await apiRequest("POST", "/api/admin/professionals", form);
      const body = await response.json();
      setProfessionals((current) => [body.data, ...current]);
      setForm({ name: "", email: "", password: "", role: "nutritionist" });
      setMessage("Profissional cadastrado com sucesso.");
      await loadAdminData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nao foi possivel cadastrar.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-[#111111] dark:text-white">
      <aside className="fixed left-0 top-0 hidden h-full w-72 flex-col border-r border-white/10 bg-[#1a1c1e] p-6 text-white md:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4f54c]">
            <Crown className="h-5 w-5 fill-black text-black" />
          </div>
          <div>
            <p className="text-lg font-black">Admin</p>
            <p className="text-xs text-slate-400">Fitness Sincera</p>
          </div>
        </div>

        <nav className="space-y-2">
          <span className="flex items-center gap-3 rounded-lg bg-[#d4f54c] px-4 py-3 text-sm font-black text-black">
            <Activity className="h-4 w-4" />
            Visao geral
          </span>
        </nav>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-xs font-bold uppercase text-slate-400">Tema</span>
            <ThemeToggle className="h-9 w-9" />
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <main className="md:pl-72">
        <header className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xs font-black uppercase text-[#79920d] dark:text-[#d4f54c]">
              Painel administrativo
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">
              Visao geral da plataforma
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {session?.name ?? "Admin"} acompanha operacao, profissionais e crescimento.
            </p>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm dark:bg-white/10 dark:text-white"
            >
              Sair
            </button>
          </div>
        </header>

        <section className="grid gap-4 px-5 md:grid-cols-4 md:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/10">
                <stat.icon className="h-5 w-5 text-slate-700 dark:text-[#d4f54c]" />
              </div>
              <p className="text-2xl font-black">{isLoading ? "-" : stat.value}</p>
              <p className="text-xs font-bold uppercase text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="px-5 pt-6 md:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black uppercase">Solicitacoes do site</h2>
                <p className="text-sm text-slate-500">Inscricoes, associacoes e contatos recebidos pela pagina publica.</p>
              </div>
              <MessageCircle className="h-5 w-5 text-slate-400" />
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              {siteLeads.slice(0, 6).map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                      {lead.phone && <p className="text-xs text-slate-500">{lead.phone}</p>}
                    </div>
                    <span className="rounded-lg bg-[#d4f54c] px-3 py-1 text-[10px] font-black uppercase text-black">
                      {lead.interest}
                    </span>
                  </div>
                  {lead.message && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{lead.message}</p>}
                </div>
              ))}

              {!isLoading && siteLeads.length === 0 && (
                <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500 dark:bg-black/20">
                  Nenhuma solicitacao recebida ainda.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-5 px-5 py-6 lg:grid-cols-[1fr_420px] md:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black uppercase">Profissionais cadastrados</h2>
                <p className="text-sm text-slate-500">Nutricionistas e personal trainers ativos no sistema.</p>
              </div>
              <Wallet className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              {professionals.map((professional) => (
                <div
                  key={professional.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20"
                >
                  <div>
                    <p className="font-bold">{professional.name}</p>
                    <p className="text-xs text-slate-500">{professional.email}</p>
                  </div>
                  <span className="rounded-lg bg-[#d4f54c] px-3 py-1 text-[10px] font-black uppercase text-black">
                    {roleLabel(professional.role)}
                  </span>
                </div>
              ))}

              {!isLoading && professionals.length === 0 && (
                <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500 dark:bg-black/20">
                  Nenhum profissional cadastrado ainda.
                </p>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-5">
              <h2 className="text-lg font-black uppercase">Cadastrar profissional</h2>
              <p className="text-sm text-slate-500">Crie acesso inicial para nutricionista ou personal.</p>
            </div>

            <div className="space-y-3">
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Nome"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                required
              />
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Senha inicial"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                required
              />
              <select
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({ ...current, role: event.target.value as Professional["role"] }))
                }
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
              >
                <option value="nutritionist">Nutricionista</option>
                <option value="trainer">Personal trainer</option>
              </select>
            </div>

            {message && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-black/20 dark:text-slate-300">{message}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#111111] text-sm font-black uppercase text-[#d4f54c] transition hover:bg-black disabled:opacity-60 dark:bg-[#d4f54c] dark:text-black"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Cadastrar
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
