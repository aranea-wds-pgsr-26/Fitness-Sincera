import { FormEvent, useEffect, useMemo, useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  HelpCircle,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Food {
  id: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  id: string;
  name: string;
  notes?: string | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

type Tab = "alimentos" | "refeicoes";
type FoodPayload = Omit<Food, "id">;
type MealPayload = Omit<Meal, "id">;

const PAGE_SIZE = 10;

function MacroPill({ label, type }: { label: string; type: "carb" | "prot" | "fat" }) {
  const styles = {
    carb: "bg-amber-100 text-amber-800",
    prot: "bg-green-100 text-green-800",
    fat: "bg-red-100 text-red-800",
  };
  return <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${styles[type]}`}>{label}</span>;
}

function CalCircle({ cals }: { cals: number }) {
  const color = cals >= 300 ? "#f59e0b" : cals >= 120 ? "#22c55e" : "#a3e635";
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold"
      style={{ borderColor: color }}
    >
      {Math.round(cals)}
    </div>
  );
}

function FoodModal({
  initialFood,
  onClose,
  onSave,
}: {
  initialFood?: Food | null;
  onClose: () => void;
  onSave: (payload: FoodPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<FoodPayload>({
    name: initialFood?.name ?? "",
    brand: initialFood?.brand ?? "",
    category: initialFood?.category ?? "",
    servingSize: initialFood?.servingSize ?? 100,
    servingUnit: initialFood?.servingUnit ?? "g",
    calories: initialFood?.calories ?? 0,
    protein: initialFood?.protein ?? 0,
    carbs: initialFood?.carbs ?? 0,
    fat: initialFood?.fat ?? 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-slate-800">{initialFood ? "Editar alimento" : "Novo alimento"}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Nome" className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none" required />
          <input value={form.category ?? ""} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} placeholder="Categoria" className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none" />
          <input value={form.brand ?? ""} onChange={(e) => setForm((c) => ({ ...c, brand: e.target.value }))} placeholder="Marca" className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none" />
          <input value={form.servingUnit} onChange={(e) => setForm((c) => ({ ...c, servingUnit: e.target.value }))} placeholder="Unidade" className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none" />
          {(["servingSize", "calories", "protein", "carbs", "fat"] as const).map((field) => (
            <input
              key={field}
              type="number"
              step="0.1"
              value={form[field]}
              onChange={(e) => setForm((c) => ({ ...c, [field]: Number(e.target.value) }))}
              placeholder={field}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            />
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50">Cancelar</button>
          <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

function MealModal({
  initialMeal,
  onClose,
  onSave,
}: {
  initialMeal?: Meal | null;
  onClose: () => void;
  onSave: (payload: MealPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<MealPayload>({
    name: initialMeal?.name ?? "",
    notes: initialMeal?.notes ?? "",
    calories: initialMeal?.calories ?? 0,
    protein: initialMeal?.protein ?? 0,
    carbs: initialMeal?.carbs ?? 0,
    fat: initialMeal?.fat ?? 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-slate-800">{initialMeal ? "Editar refeicao" : "Nova refeicao"}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Nome" className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none md:col-span-2" required />
          <textarea value={form.notes ?? ""} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} placeholder="Observacoes" className="min-h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none md:col-span-2" />
          {(["calories", "protein", "carbs", "fat"] as const).map((field) => (
            <input
              key={field}
              type="number"
              step="0.1"
              value={form[field]}
              onChange={(e) => setForm((c) => ({ ...c, [field]: Number(e.target.value) }))}
              placeholder={field}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            />
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50">Cancelar</button>
          <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

function AlimentosTab() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function loadFoods() {
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", `/api/foods?search=${encodeURIComponent(search)}&limit=200`);
      const body = await response.json();
      setFoods(body.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadFoods();
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(foods.length / PAGE_SIZE));
  const paged = useMemo(() => foods.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [foods, page]);

  async function createFood(payload: FoodPayload) {
    const response = await apiRequest("POST", "/api/foods", payload);
    const body = await response.json();
    setFoods((current) => [body.data, ...current]);
  }

  async function updateFood(payload: FoodPayload) {
    if (!editingFood) return;
    const response = await apiRequest("PUT", `/api/foods/${editingFood.id}`, payload);
    const body = await response.json();
    setFoods((current) => current.map((food) => (food.id === editingFood.id ? body.data : food)));
    setEditingFood(null);
  }

  async function deleteFood(id: string) {
    await apiRequest("DELETE", `/api/foods/${id}`);
    setFoods((current) => current.filter((food) => food.id !== id));
  }

  return (
    <>
      {showCreate && <FoodModal onClose={() => setShowCreate(false)} onSave={createFood} />}
      {editingFood && <FoodModal initialFood={editingFood} onClose={() => setEditingFood(null)} onSave={updateFood} />}
      <div className="mb-8 flex items-center">
        <h1 className="text-xl font-bold text-slate-700">Alimentos</h1>
        <HelpCircle className="ml-2 h-4 w-4 cursor-help text-slate-400" />
      </div>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <button className="flex items-center rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:shadow-sm">
          <Filter className="mr-2 h-4 w-4" /> Filtro
        </button>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar alimento"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-100 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-emerald-200"
            />
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-50">
            <Plus className="mr-2 h-4 w-4" /> Novo alimento
          </button>
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        rows={paged}
        onEdit={setEditingFood}
        onDelete={(food) => void deleteFood(food.id)}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}

function RefeicoesTab() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMeals() {
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", "/api/meals");
      const body = await response.json();
      setMeals(body.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadMeals();
  }, []);

  const filtered = meals.filter((meal) => meal.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function createMeal(payload: MealPayload) {
    const response = await apiRequest("POST", "/api/meals", payload);
    const body = await response.json();
    setMeals((current) => [body.data, ...current]);
  }

  async function updateMeal(payload: MealPayload) {
    if (!editingMeal) return;
    const response = await apiRequest("PUT", `/api/meals/${editingMeal.id}`, payload);
    const body = await response.json();
    setMeals((current) => current.map((meal) => (meal.id === editingMeal.id ? body.data : meal)));
    setEditingMeal(null);
  }

  async function deleteMeal(id: string) {
    await apiRequest("DELETE", `/api/meals/${id}`);
    setMeals((current) => current.filter((meal) => meal.id !== id));
  }

  return (
    <>
      {showCreate && <MealModal onClose={() => setShowCreate(false)} onSave={createMeal} />}
      {editingMeal && <MealModal initialMeal={editingMeal} onClose={() => setEditingMeal(null)} onSave={updateMeal} />}
      <div className="mb-8 flex items-center">
        <h1 className="text-xl font-bold text-slate-700">Refeicoes</h1>
        <HelpCircle className="ml-2 h-4 w-4 cursor-help text-slate-400" />
      </div>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <button className="flex items-center rounded-lg border border-gray-200 bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:shadow-sm">
          <Filter className="mr-2 h-4 w-4" /> Filtro
        </button>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar refeicao"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-100 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-emerald-200"
            />
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-50">
            <Plus className="mr-2 h-4 w-4" /> Nova refeicao
          </button>
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        rows={paged.map((meal) => ({
          id: meal.id,
          name: meal.name,
          category: meal.notes ?? "Refeicao",
          servingSize: 1,
          servingUnit: "porcao",
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
        }))}
        onEdit={(row) => setEditingMeal(meals.find((meal) => meal.id === row.id) ?? null)}
        onDelete={(row) => void deleteMeal(row.id)}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}

function DataTable({
  isLoading,
  rows,
  onEdit,
  onDelete,
}: {
  isLoading: boolean;
  rows: Food[];
  onEdit: (row: Food) => void;
  onDelete: (row: Food) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-gray-100 text-[11px] font-bold uppercase text-slate-400">
            <tr>
              <th className="px-4 py-4">Nome</th>
              <th className="px-4 py-4">Categoria</th>
              <th className="px-4 py-4">Porcao</th>
              <th className="px-4 py-4">Macronutrientes</th>
              <th className="px-4 py-4">Calorias</th>
              <th className="px-4 py-4 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-slate-600">
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">Carregando...</td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">Nenhum item encontrado.</td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-700">{row.name}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{row.category ?? "-"}</td>
                <td className="px-4 py-3 text-xs italic text-slate-400">{row.servingSize} {row.servingUnit}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <MacroPill label={`${row.carbs}g carb`} type="carb" />
                    <MacroPill label={`${row.protein}g prot`} type="prot" />
                    <MacroPill label={`${row.fat}g gord`} type="fat" />
                  </div>
                </td>
                <td className="px-4 py-3"><CalCircle cals={row.calories} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onEdit(row)} className="rounded p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(row)} className="rounded p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center justify-center gap-8 border-t border-gray-50 bg-white p-4">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-slate-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-sm font-medium text-slate-600">{page} of {totalPages}</span>
      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-slate-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function FoodLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("alimentos");

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ProSidebar role="nutritionist" />
      <main className="flex-1 p-4 md:ml-64 md:p-8">
        <div className="mb-8 flex items-center gap-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("alimentos")}
            className={`px-1 pb-3 text-sm transition-all ${activeTab === "alimentos" ? "border-b-2 border-slate-900 font-semibold text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
          >
            Alimentos
          </button>
          <button
            onClick={() => setActiveTab("refeicoes")}
            className={`px-1 pb-3 text-sm transition-all ${activeTab === "refeicoes" ? "border-b-2 border-slate-900 font-semibold text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
          >
            Refeicoes
          </button>
        </div>
        {activeTab === "alimentos" ? <AlimentosTab /> : <RefeicoesTab />}
      </main>
    </div>
  );
}
