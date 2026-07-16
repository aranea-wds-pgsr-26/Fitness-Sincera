import { FormEvent, useEffect, useMemo, useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Dumbbell,
  Filter,
  HelpCircle,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: string[];
  createdAt?: string;
}

const PAGE_SIZE = 10;

function parseExercises(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function WorkoutPlanModal({
  initialPlan,
  onClose,
  onSave,
}: {
  initialPlan?: WorkoutPlan | null;
  onClose: () => void;
  onSave: (payload: { name: string; description: string; exercises: string[] }) => Promise<void>;
}) {
  const [name, setName] = useState(initialPlan?.name ?? "");
  const [description, setDescription] = useState(initialPlan?.description ?? "");
  const [exercises, setExercises] = useState(initialPlan?.exercises.join("\n") ?? "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSave({
        name,
        description,
        exercises: parseExercises(exercises),
      });
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          {initialPlan ? "Editar treino" : "Criar treino"}
        </h2>
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome do treino"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-300"
            required
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descricao"
            className="min-h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-300"
          />
          <textarea
            value={exercises}
            onChange={(event) => setExercises(event.target.value)}
            placeholder={"Exercicios, um por linha\nSupino reto 4x10\nRemada baixa 4x12"}
            className="min-h-32 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-300"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-[#475569] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

function TemplateCard({
  plan,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  plan: WorkoutPlan;
  onEdit: (plan: WorkoutPlan) => void;
  onDuplicate: (plan: WorkoutPlan) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
        <Dumbbell className="h-5 w-5 text-slate-600" />
      </div>
      <h3 className="mb-2 flex min-h-10 items-center justify-center text-sm font-bold leading-tight text-slate-700">
        {plan.name}
      </h3>
      <p className="mb-2 line-clamp-2 min-h-10 text-xs text-slate-400">
        {plan.description || "Sem descricao"}
      </p>
      <p className="mb-6 text-xs font-medium text-slate-400">
        Exercicios: {plan.exercises.length}
      </p>
      <div className="mt-auto flex items-center justify-center gap-4 text-slate-400">
        <button onClick={() => onEdit(plan)} className="transition-colors hover:text-slate-700" title="Editar">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={() => onDuplicate(plan)} className="transition-colors hover:text-slate-700" title="Duplicar">
          <Copy className="h-4 w-4" />
        </button>
        <button onClick={() => onDelete(plan.id)} className="transition-colors hover:text-red-500" title="Eliminar">
          <Trash2 className="h-4 w-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function loadPlans() {
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", "/api/workouts");
      const body = await response.json();
      setPlans(body.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPlans();
  }, []);

  const filtered = useMemo(
    () => plans.filter((plan) => plan.name.toLowerCase().includes(search.toLowerCase())),
    [plans, search]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function createPlan(payload: { name: string; description: string; exercises: string[] }) {
    const response = await apiRequest("POST", "/api/workouts", payload);
    const body = await response.json();
    setPlans((current) => [body.data, ...current]);
    setMessage("Treino criado no Supabase.");
  }

  async function updatePlan(payload: { name: string; description: string; exercises: string[] }) {
    if (!editingPlan) return;

    const response = await apiRequest("PUT", `/api/workouts/${editingPlan.id}`, payload);
    const body = await response.json();
    setPlans((current) => current.map((plan) => (plan.id === editingPlan.id ? body.data : plan)));
    setEditingPlan(null);
    setMessage("Treino atualizado.");
  }

  async function duplicatePlan(plan: WorkoutPlan) {
    const response = await apiRequest("POST", "/api/workouts", {
      name: `${plan.name} copia`,
      description: plan.description,
      exercises: plan.exercises,
    });
    const body = await response.json();
    setPlans((current) => [body.data, ...current]);
    setMessage("Treino duplicado.");
  }

  async function deletePlan(id: string) {
    await apiRequest("DELETE", `/api/workouts/${id}`);
    setPlans((current) => current.filter((plan) => plan.id !== id));
    setMessage("Treino removido.");
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ProSidebar role="trainer" />

      {showCreate && (
        <WorkoutPlanModal
          onClose={() => setShowCreate(false)}
          onSave={createPlan}
        />
      )}
      {editingPlan && (
        <WorkoutPlanModal
          initialPlan={editingPlan}
          onClose={() => setEditingPlan(null)}
          onSave={updatePlan}
        />
      )}

      <main className="flex-1 p-4 md:ml-64 md:p-8">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-slate-700">Templates</h1>
            <HelpCircle className="ml-2 h-4 w-4 cursor-help text-slate-400" />
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-lg bg-[#475569] px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700"
          >
            <Plus className="h-4 w-4" />
            Criar Template
          </button>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar templates"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-100 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-slate-200"
            />
          </div>
          <button className="flex items-center rounded-lg bg-[#334155] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-700">
            <Filter className="mr-2 h-3.5 w-3.5" /> Filtro
          </button>
          <span className="text-sm text-slate-400">{filtered.length} templates</span>
          {message && <span className="text-sm font-bold text-emerald-600">{message}</span>}
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-sm text-slate-400">Carregando templates...</div>
        ) : paged.length === 0 ? (
          <div className="py-20 text-center text-sm text-slate-400">Nenhum template encontrado</div>
        ) : (
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {paged.map((plan) => (
              <TemplateCard
                key={plan.id}
                plan={plan}
                onEdit={setEditingPlan}
                onDuplicate={(selectedPlan) => void duplicatePlan(selectedPlan)}
                onDelete={(id) => void deletePlan(id)}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page <= 1}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-slate-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-bold text-slate-600">{page} of {totalPages}</span>
          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page >= totalPages}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-slate-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
