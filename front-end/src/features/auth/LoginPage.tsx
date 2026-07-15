import { FormEvent, useState } from "react";
import { useLocation } from "wouter";
import {
  Apple,
  ArrowRight,
  Crown,
  Dumbbell,
  Loader2,
  Lock,
  Mail,
  User,
  Zap,
} from "lucide-react";
import {
  DEMO_SESSIONS,
  getRedirectForRole,
  useAuth,
  type AuthRole,
} from "./AuthProvider";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

const QUICK_ACCESS = [
  {
    key: "admin" as const,
    label: "Admin",
    icon: Crown,
    bg: "bg-amber-400",
    iconColor: "text-black",
    name: DEMO_SESSIONS.admin.name,
  },
  {
    key: "client" as const,
    label: "Cliente",
    icon: User,
    bg: "bg-[#d4f54c]",
    iconColor: "text-black",
    name: DEMO_SESSIONS.client.name,
  },
  {
    key: "nutritionist" as const,
    label: "Nutricionista",
    icon: Apple,
    bg: "bg-emerald-500",
    iconColor: "text-white",
    name: DEMO_SESSIONS.nutritionist.name,
  },
  {
    key: "trainer" as const,
    label: "Personal",
    icon: Dumbbell,
    bg: "bg-violet-500",
    iconColor: "text-white",
    name: DEMO_SESSIONS.trainer.name,
  },
];

export default function LoginPage() {
  const { login, loginWithCredentials } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("admin@fitnesssincera.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeLogin = (role: AuthRole) => {
    navigate(getRedirectForRole(role));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const session = await loginWithCredentials(email.trim(), password);
      completeLogin(session.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel entrar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (role: AuthRole) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const session = await login(role);
      completeLogin(session.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel entrar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#111111] flex items-center justify-center p-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <main className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_420px]">
        <section className="flex flex-col justify-center rounded-[32px] bg-[#111111] p-8 text-white dark:bg-[#1a1c1e] md:p-10">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4f54c] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,245,76,0.3)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter">Fitness Sincera</span>
          </div>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#d4f54c]">
            Plataforma integrada
          </p>
          <h1 className="max-w-xl text-4xl font-black uppercase tracking-tight md:text-5xl">
            Entre para gerenciar sua evolucao com profissionais e IA.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
            Login real com usuarios do banco. Os atalhos de teste continuam disponiveis
            por enquanto para acelerar a validacao dos perfis.
          </p>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">
              Acessar sistema
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Use email e senha cadastrados no Supabase.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Email
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-black/20">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  placeholder="voce@email.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Senha
              </span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-black/20">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  required
                />
              </span>
            </label>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#111111] text-sm font-black uppercase tracking-widest text-[#d4f54c] transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#d4f54c] dark:text-black dark:hover:bg-[#c8ea3d]"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Entrar
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-white/10">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
              Acesso rapido para testes
            </p>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACCESS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleQuickLogin(item.key)}
                  title={item.name}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`}>
                    <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-black text-slate-900 dark:text-white">
                      {item.label}
                    </span>
                    <span className="block truncate text-[10px] text-slate-500">
                      {item.name}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
