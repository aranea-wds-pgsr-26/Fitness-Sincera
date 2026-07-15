import React, { useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import { Search, Filter, Plus, MoreHorizontal, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Food {
    id: string;
    name: string;
    category: string;
    portion: string;
    carbs: string;
    prot: string;
    fat: string;
    cals: number;
    calColor: string;
}

interface Meal {
    id: string;
    name: string;
    mealType: string;
    itemsCount: number;
    carbs: string;
    prot: string;
    fat: string;
    cals: number;
    calColor: string;
    img: string;
}

// ─── Shared Macro-Pill helper ────────────────────────────────────────────────

function MacroPill({ label, type }: { label: string; type: "carb" | "prot" | "fat" }) {
    const styles = {
        carb: "bg-amber-100 text-amber-800",
        prot: "bg-green-100 text-green-800",
        fat: "bg-red-100 text-red-800",
    };
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type]}`}>
            {label}
        </span>
    );
}

function CalCircle({ cals, color }: { cals: number; color: string }) {
    return (
        <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2"
            style={{ borderColor: color }}
        >
            {cals}
        </div>
    );
}

// ─── Food Data ────────────────────────────────────────────────────────────────

const FOODS: Food[] = [
    { id: "1", name: "100% Real Whey Protein", category: "Laticínios", portion: "1 Scoop", carbs: "1,5g", prot: "22,8g", fat: "2,5g", cals: 119, calColor: "#22c55e" },
    { id: "2", name: "Abacate, Hass", category: "Fruta", portion: "100 Gramas", carbs: "2,3g", prot: "1,1g", fat: "17,4g", cals: 170, calColor: "#ef4444" },
    { id: "3", name: "Abóbora cristalizada", category: "Produtos hortícolas transformados", portion: "100 Gramas", carbs: "72,4g", prot: "0,6g", fat: "0,2g", cals: 291, calColor: "#f59e0b" },
    { id: "4", name: "Abóbora crua", category: "Frutos de hortícolas", portion: "100 Gramas", carbs: "1,7g", prot: "0,3g", fat: "0,2g", cals: 10, calColor: "#a3e635" },
    { id: "5", name: "Abrótea cozida", category: "Peixe (músculo)", portion: "100 Gramas", carbs: "0,0g", prot: "18,4g", fat: "0,5g", cals: 79, calColor: "#22c55e" },
    { id: "6", name: "Abrótea crua", category: "Peixe (músculo)", portion: "100 Gramas", carbs: "0,0g", prot: "17,2g", fat: "0,5g", cals: 73, calColor: "#22c55e" },
    { id: "7", name: "Açafrão", category: "Especiarias", portion: "100 Gramas", carbs: "61,5g", prot: "11,4g", fat: "5,9g", cals: 345, calColor: "#f59e0b" },
    { id: "8", name: "Açafrão-da-índia seco", category: "Especiarias", portion: "100 Gramas", carbs: "44,1g", prot: "8,7g", fat: "9,9g", cals: 268, calColor: "#f59e0b" },
    { id: "9", name: "Acelga crua", category: "Hortícolas folhosos", portion: "100 Gramas", carbs: "2,7g", prot: "1,8g", fat: "0,2g", cals: 20, calColor: "#a3e635" },
    { id: "10", name: "Açorda", category: "Pratos", portion: "100 Gramas", carbs: "13,1g", prot: "3,3g", fat: "4,0g", cals: 102, calColor: "#f59e0b" },
    { id: "11", name: "Alface crua", category: "Hortícolas folhosos", portion: "100 Gramas", carbs: "1,8g", prot: "1,4g", fat: "0,2g", cals: 15, calColor: "#a3e635" },
    { id: "12", name: "Amêijoa cozida", category: "Pescado e mariscos", portion: "100 Gramas", carbs: "2,7g", prot: "15,8g", fat: "1,6g", cals: 88, calColor: "#22c55e" },
];

// ─── Meal Data (refeições) ────────────────────────────────────────────────────

const MEALS: Meal[] = [
    {
        id: "1",
        name: "Batido de banana e aveia proteico",
        mealType: "Snack",
        itemsCount: 4,
        carbs: "57,7g", prot: "35,2g", fat: "7,2g",
        cals: 422, calColor: "#f59e0b",
        img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=50&h=50&fit=crop",
    },
    {
        id: "2",
        name: "Ovos mexidos c/ bacon",
        mealType: "Pequeno Almoço",
        itemsCount: 2,
        carbs: "2,0g", prot: "22,0g", fat: "16,0g",
        cals: 228, calColor: "#22c55e",
        img: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=50&h=50&fit=crop",
    },
    {
        id: "3",
        name: "Papas de aveia c/ banana",
        mealType: "Lanches",
        itemsCount: 3,
        carbs: "53,5g", prot: "7,5g", fat: "5,6g",
        cals: 280, calColor: "#f59e0b",
        img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=50&h=50&fit=crop",
    },
    {
        id: "4",
        name: "Peito de frango c/ arroz e salada",
        mealType: "Almoço",
        itemsCount: 3,
        carbs: "23,4g", prot: "28,5g", fat: "11,8g",
        cals: 314, calColor: "#22c55e",
        img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=50&h=50&fit=crop",
    },
    {
        id: "5",
        name: "Salmão grelhado c/ legumes",
        mealType: "Jantar",
        itemsCount: 4,
        carbs: "12,0g", prot: "35,0g", fat: "18,0g",
        cals: 345, calColor: "#22c55e",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=50&h=50&fit=crop",
    },
];

const PAGE_SIZE = 10;

// ─── Tab: Alimentos ──────────────────────────────────────────────────────────

function AlimentosTab() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = FOODS.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <>
            {/* Header */}
            <div className="flex items-center mb-8">
                <h1 className="text-xl font-bold text-slate-700">Alimentos</h1>
                <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button className="bg-[#F8FAFC] border border-gray-200 text-slate-600 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-white hover:shadow-sm transition-all">
                    <Filter className="w-4 h-4 mr-2" /> Filtro
                </button>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar alimento"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-white border border-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-200 transition-all"
                        />
                    </div>
                    <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Plus className="w-4 h-4 mr-2" /> Novo alimento
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="border-b border-gray-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="py-4 px-6 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                </th>
                                <th className="py-4 px-4">Nome</th>
                                <th className="py-4 px-4">Categoria</th>
                                <th className="py-4 px-4">Porção</th>
                                <th className="py-4 px-4">Macronutrientes</th>
                                <th className="py-4 px-4">Calorias</th>
                                <th className="py-4 px-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-600 divide-y divide-gray-50">
                            {paged.map((food) => (
                                <tr key={food.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-6">
                                        <input type="checkbox" className="rounded border-gray-300 text-purple-600 cursor-pointer" />
                                    </td>
                                    <td className="py-3 px-4 font-medium text-slate-700">{food.name}</td>
                                    <td className="py-3 px-4 text-slate-400 text-xs">{food.category}</td>
                                    <td className="py-3 px-4 text-slate-400 text-xs italic">{food.portion}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-1.5 flex-wrap">
                                            <MacroPill label={`${food.carbs} hidratos`} type="carb" />
                                            <MacroPill label={`${food.prot} proteínas`} type="prot" />
                                            <MacroPill label={`${food.fat} gorduras`} type="fat" />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <CalCircle cals={food.cals} color={food.calColor} />
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100 transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 bg-white border-t border-gray-50 flex items-center justify-center gap-8">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-slate-600">{page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
}

// ─── Tab: Refeições ──────────────────────────────────────────────────────────

function RefeicoesTab() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = MEALS.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <>
            {/* Header */}
            <div className="flex items-center mb-8">
                <h1 className="text-xl font-bold text-slate-700">Refeições</h1>
                <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button className="bg-[#F8FAFC] border border-gray-200 text-slate-600 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-white hover:shadow-sm transition-all">
                    <Filter className="w-4 h-4 mr-2" /> Filtro
                </button>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar refeição"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-white border border-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-200 transition-all"
                        />
                    </div>
                    <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Plus className="w-4 h-4 mr-2" /> Nova refeição
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="border-b border-gray-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="py-4 px-6 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                </th>
                                <th className="py-4 px-4">Nome</th>
                                <th className="py-4 px-4">Alimentos</th>
                                <th className="py-4 px-4">Macronutrientes</th>
                                <th className="py-4 px-4">Calorias</th>
                                <th className="py-4 px-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-600 divide-y divide-gray-50">
                            {paged.map((meal) => (
                                <tr key={meal.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-6">
                                        <input type="checkbox" className="rounded border-gray-300 text-purple-600 cursor-pointer" />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <img
                                                src={meal.img}
                                                className="w-10 h-10 rounded-lg object-cover mr-3 border border-gray-100 flex-shrink-0"
                                                alt={meal.name}
                                            />
                                            <div>
                                                <p className="font-medium text-slate-700 text-xs leading-tight">{meal.name}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">{meal.mealType}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-slate-500 font-medium text-xs">{meal.itemsCount}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-1.5 flex-wrap">
                                            <MacroPill label={`${meal.carbs} hidratos`} type="carb" />
                                            <MacroPill label={`${meal.prot} proteínas`} type="prot" />
                                            <MacroPill label={`${meal.fat} gorduras`} type="fat" />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <CalCircle cals={meal.cals} color={meal.calColor} />
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100 transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 bg-white border-t border-gray-50 flex items-center justify-center gap-8">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-slate-600">{page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "alimentos" | "refeicoes";

export default function FoodLibraryPage() {
    const [activeTab, setActiveTab] = useState<Tab>("alimentos");

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <ProSidebar role="nutritionist" />

            <main className="md:ml-64 flex-1 p-4 md:p-8">
                {/* Tabs Navigation — exact match to ref */}
                <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab("alimentos")}
                        className={`pb-3 text-sm transition-all px-1 ${activeTab === "alimentos"
                                ? "text-slate-900 border-b-2 border-slate-900 font-semibold"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        Alimentos
                    </button>
                    <button
                        onClick={() => setActiveTab("refeicoes")}
                        className={`pb-3 text-sm transition-all px-1 ${activeTab === "refeicoes"
                                ? "text-slate-900 border-b-2 border-slate-900 font-semibold"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        Refeições
                    </button>
                </div>

                {activeTab === "alimentos" ? <AlimentosTab /> : <RefeicoesTab />}
            </main>
        </div>
    );
}
