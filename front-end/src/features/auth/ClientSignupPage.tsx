import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  Loader2,
  Lock,
  Mail,
  Ruler,
  User,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import type { AuthSession } from "@shared/schema";

const STORAGE_KEY = "fs_auth_session";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  birthDate: "",
  gender: "",
  goal: "",
  planInterest: "complete",
  heightCm: "",
  weightKg: "",
  activityLevel: "moderate",
  restrictions: "",
  injuries: "",
  medications: "",
  sleepQuality: "",
  hydration: "",
  notes: "",
};

function toSession(user: { id: string; name: string; email: string; role: AuthSession["role"] }): AuthSession {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: undefined,
  };
}

export default function ClientSignupPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/public/client-signup", {
        ...form,
        heightCm: form.heightCm ? Number(form.heightCm) : null,
        weightKg: form.weightKg ? Number(form.weightKg) : null,
      });
      const body = await response.json();
      const session = toSession(body.data.user);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          session,
          token: body.data.token,
        })
      );

      window.location.assign("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel concluir o cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-[#111111] dark:text-white">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#111111]/85">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-3 text-sm font-black uppercase">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4f54c] text-black">
              <HeartPulse className="h-5 w-5" />
            </span>
            Fitness Sincera
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 w-9" />
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-black uppercase dark:border-white/10"
            >
              Entrar
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:py-10">
        <aside className="rounded-lg bg-[#171914] p-6 text-white lg:sticky lg:top-6 lg:h-fit">
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase text-[#d4f54c]">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </a>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4f54c]">
            Cadastro do cliente
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
            Crie sua conta e preencha sua anamnese inicial.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Essas informacoes ajudam nutricionistas e personal trainers a entenderem seu contexto antes da primeira orientacao.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-200">
            <span className="rounded-lg bg-white/10 p-3">Plano completo, nutricao ou treino.</span>
            <span className="rounded-lg bg-white/10 p-3">Ficha inicial salva no Supabase.</span>
            <span className="rounded-lg bg-white/10 p-3">Acesso imediato ao painel do cliente.</span>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-5 flex items-center gap-3">
              <User className="h-5 w-5 text-[#6f870d] dark:text-[#d4f54c]" />
              <h2 className="text-lg font-black uppercase">Acesso e dados pessoais</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Nome completo"
                required
              />
              <span className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-black/20">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                  placeholder="Email"
                  required
                />
              </span>
              <span className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-black/20">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                  placeholder="Senha"
                  minLength={6}
                  required
                />
              </span>
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Telefone"
              />
              <input
                type="date"
                value={form.birthDate}
                onChange={(event) => updateField("birthDate", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
              />
              <select
                value={form.gender}
                onChange={(event) => updateField("gender", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
              >
                <option value="">Genero</option>
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="other">Outro</option>
                <option value="prefer_not_to_say">Prefiro nao informar</option>
              </select>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-5 flex items-center gap-3">
              <HeartPulse className="h-5 w-5 text-[#6f870d] dark:text-[#d4f54c]" />
              <h2 className="text-lg font-black uppercase">Objetivo e plano</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={form.planInterest}
                onChange={(event) => updateField("planInterest", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                required
              >
                <option value="complete">Plano total</option>
                <option value="nutrition">Somente nutricao</option>
                <option value="training">Somente treino</option>
              </select>
              <select
                value={form.activityLevel}
                onChange={(event) => updateField("activityLevel", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
              >
                <option value="sedentary">Sedentario</option>
                <option value="light">Leve</option>
                <option value="moderate">Moderado</option>
                <option value="intense">Intenso</option>
              </select>
              <textarea
                value={form.goal}
                onChange={(event) => updateField("goal", event.target.value)}
                className="min-h-28 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20 md:col-span-2"
                placeholder="Qual objetivo voce busca agora?"
                required
              />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-5 flex items-center gap-3">
              <Ruler className="h-5 w-5 text-[#6f870d] dark:text-[#d4f54c]" />
              <h2 className="text-lg font-black uppercase">Anamnese inicial</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                value={form.heightCm}
                onChange={(event) => updateField("heightCm", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Altura em cm"
              />
              <input
                type="number"
                value={form.weightKg}
                onChange={(event) => updateField("weightKg", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Peso em kg"
              />
              <textarea
                value={form.restrictions}
                onChange={(event) => updateField("restrictions", event.target.value)}
                className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Restricoes alimentares"
              />
              <textarea
                value={form.injuries}
                onChange={(event) => updateField("injuries", event.target.value)}
                className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Lesoes, dores ou limitacoes"
              />
              <textarea
                value={form.medications}
                onChange={(event) => updateField("medications", event.target.value)}
                className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Medicamentos ou observacoes de saude"
              />
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Observacoes gerais"
              />
              <input
                value={form.sleepQuality}
                onChange={(event) => updateField("sleepQuality", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Sono atual"
              />
              <input
                value={form.hydration}
                onChange={(event) => updateField("hydration", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none dark:border-white/10 dark:bg-black/20"
                placeholder="Hidratacao diaria"
              />
            </div>
          </section>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#171914] text-sm font-black uppercase text-[#d4f54c] transition hover:bg-black disabled:opacity-60 dark:bg-[#d4f54c] dark:text-black"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Criar conta e entrar
          </button>
        </form>
      </main>
    </div>
  );
}
