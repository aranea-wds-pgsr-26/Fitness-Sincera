import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  HeartPulse,
  Loader2,
  MessageCircle,
  Salad,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

const carouselItems = [
  "O sistema que vai te auxiliar a construir uma vida mais saudavel",
  "Personal trainer: criando exercicios sob medida",
  "Nutricionista: mudando a forma de se alimentar",
];

const plans = [
  {
    name: "Total",
    description: "Nutricionista, personal trainer, chat contextual e acompanhamento completo.",
    price: "Plano principal",
  },
  {
    name: "Nutricao",
    description: "Dietas personalizadas, substituicoes inteligentes e metas alimentares.",
    price: "Foco alimentar",
  },
  {
    name: "Treino",
    description: "Treinos sob medida, biblioteca de exercicios e orientacao profissional.",
    price: "Foco performance",
  },
];

const testimonials = [
  "A plataforma aproximou treino e alimentacao sem eu precisar pular entre varios aplicativos.",
  "O chat ajuda a organizar ideias antes de montar uma dieta ou um plano de treino.",
  "A visao conjunta dos profissionais deixa o acompanhamento mais claro para o cliente.",
];

export default function PublicSitePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    audience: "client",
    interest: "complete",
    message: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      await apiRequest("POST", "/api/public/leads", form);
      setFeedback("Recebemos suas informacoes. Nossa equipe vai analisar e retornar em breve.");
      setForm({
        name: "",
        email: "",
        phone: "",
        audience: "client",
        interest: "complete",
        message: "",
      });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Nao foi possivel enviar agora.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] text-[#171914] dark:bg-[#111111] dark:text-white">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-black/10 bg-[#f7f8f3]/90 backdrop-blur dark:border-white/10 dark:bg-[#111111]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-3 font-black uppercase">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4f54c] text-black">
              <HeartPulse className="h-5 w-5" />
            </span>
            Fitness Sincera
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 dark:text-slate-300 md:flex">
            <a href="#relatos">Relatos</a>
            <a href="#avaliacoes">Avaliacoes</a>
            <a href="#historia">Historia</a>
            <a href="#planos">Planos</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 w-9" />
            <a
              href="/login"
              className="rounded-lg bg-[#171914] px-4 py-2 text-sm font-black uppercase text-[#d4f54c] dark:bg-[#d4f54c] dark:text-black"
            >
              Entrar
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen overflow-hidden bg-[#171914] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-black uppercase text-[#d4f54c]">
                <Sparkles className="h-4 w-4" />
                Nutricionista + personal trainer + chat contextual
              </p>
              <h1 className="max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
                Fitness Sincera
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium text-slate-200">
                Uma plataforma profissional para conectar clientes, nutricionistas e personal trainers em um acompanhamento mais claro, humano e orientado por dados.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/cadastro" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d4f54c] px-5 py-3 text-sm font-black uppercase text-black">
                  Se inscreva
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#planos" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-black uppercase text-white">
                  Ver planos
                </a>
              </div>
            </div>

            <div className="h-[360px] overflow-hidden rounded-lg border border-white/15 bg-black/35 p-4 backdrop-blur">
              <div className="flex h-full snap-y snap-mandatory flex-col gap-4 overflow-y-auto pr-2">
                {carouselItems.map((item, index) => (
                  <div key={item} className="flex min-h-[320px] snap-center flex-col justify-between rounded-lg bg-white/10 p-6">
                    <span className="text-sm font-black text-[#d4f54c]">0{index + 1}</span>
                    <p className="text-3xl font-black uppercase leading-tight">{item}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[#d4f54c]" />
                      Construido para evolucao continua
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="historia" className="bg-white py-20 dark:bg-[#171914]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase text-[#6f870d] dark:text-[#d4f54c]">Historia da empresa</p>
              <h2 className="mt-3 text-4xl font-black uppercase">Tecnologia para aproximar cuidado e rotina.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-5 dark:border-white/10">
                <Salad className="mb-4 h-7 w-7 text-[#6f870d] dark:text-[#d4f54c]" />
                <h3 className="font-black uppercase">Nutricao</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Dietas personalizadas com base em alimentos reais e substituicoes possiveis.</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-5 dark:border-white/10">
                <Dumbbell className="mb-4 h-7 w-7 text-[#6f870d] dark:text-[#d4f54c]" />
                <h3 className="font-black uppercase">Treino</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Planos de exercicio sob medida, com espaco futuro para videos e validacao.</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-5 dark:border-white/10">
                <MessageCircle className="mb-4 h-7 w-7 text-[#6f870d] dark:text-[#d4f54c]" />
                <h3 className="font-black uppercase">Chat</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Apoio contextual para clientes e profissionais construirem melhores decisoes.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="relatos" className="bg-[#eef2e4] py-20 dark:bg-black">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase text-[#6f870d] dark:text-[#d4f54c]">Relatos e avaliacoes</p>
                <h2 className="mt-3 text-4xl font-black uppercase">Feito para quem precisa de clareza.</h2>
              </div>
              <div className="flex gap-1 text-[#6f870d] dark:text-[#d4f54c]">
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <div id="avaliacoes" className="grid gap-4 md:grid-cols-3">
              {testimonials.map((text) => (
                <article key={text} className="rounded-lg bg-white p-6 shadow-sm dark:bg-white/5">
                  <p className="text-lg font-bold leading-relaxed">{text}</p>
                  <p className="mt-5 text-sm font-black uppercase text-slate-500">Avaliacao inicial</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="bg-white py-20 dark:bg-[#171914]">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-sm font-black uppercase text-[#6f870d] dark:text-[#d4f54c]">Planos por area</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black uppercase">Escolha o acompanhamento que combina com sua fase.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {plans.map((plan) => (
                <article key={plan.name} className="rounded-lg border border-slate-200 p-6 dark:border-white/10">
                  <h3 className="text-2xl font-black uppercase">{plan.name}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
                  <p className="mt-6 text-sm font-black uppercase text-[#6f870d] dark:text-[#d4f54c]">{plan.price}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="inscricao" className="bg-[#171914] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase text-[#d4f54c]">Se associe, entre em contato</p>
              <h2 className="mt-3 text-4xl font-black uppercase">Conte para nos onde voce quer chegar.</h2>
              <p className="mt-4 text-slate-300">
                As respostas chegam ao painel administrativo para triagem. A notificacao por email fica preparada para integracao em uma sprint de comunicacoes.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-lg bg-white/10 p-4">
                <Users className="h-6 w-6 text-[#d4f54c]" />
                <p className="text-sm text-slate-200">Clientes, nutricionistas, personal trainers e parceiros podem iniciar contato por aqui.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 text-[#171914]">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
                  placeholder="Nome"
                  required
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
                  placeholder="Email"
                  required
                />
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
                  placeholder="Telefone"
                />
                <select
                  value={form.audience}
                  onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
                >
                  <option value="client">Sou cliente</option>
                  <option value="nutritionist">Sou nutricionista</option>
                  <option value="trainer">Sou personal trainer</option>
                  <option value="company">Sou parceiro</option>
                </select>
                <select
                  value={form.interest}
                  onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none md:col-span-2"
                >
                  <option value="complete">Plano total</option>
                  <option value="nutrition">Somente nutricao</option>
                  <option value="training">Somente treino</option>
                  <option value="professional">Quero me associar como profissional</option>
                  <option value="partnership">Parceria ou contato comercial</option>
                </select>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  className="min-h-28 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none md:col-span-2"
                  placeholder="Mensagem"
                />
              </div>

              {feedback && <p className="mt-4 rounded-lg bg-[#eef2e4] p-3 text-sm font-semibold text-[#364400]">{feedback}</p>}

              <button
                type="submit"
                disabled={isSaving}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#171914] text-sm font-black uppercase text-[#d4f54c] disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
