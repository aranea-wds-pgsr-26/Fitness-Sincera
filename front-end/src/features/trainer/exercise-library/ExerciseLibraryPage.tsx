import React, { useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import {
    Search, Filter, Plus, MoreHorizontal, HelpCircle,
    ChevronLeft, ChevronRight, Upload, Play
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
    Costas: "bg-red-500 text-white",
    Peitoral: "bg-green-500 text-white",
    "Treinando Em Casa": "bg-purple-500 text-white",
    Cardio: "bg-pink-600 text-white",
    Ombros: "bg-blue-500 text-white",
    Bíceps: "bg-orange-500 text-white",
    Tríceps: "bg-yellow-500 text-white",
    Pernas: "bg-cyan-600 text-white",
};

const EXERCISES = [
    { id: "1", name: "Remada Articulada", category: "Costas", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=60&fit=crop" },
    { id: "2", name: "Puxada Supinada Polia Alta", category: "Costas", img: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=100&h=60&fit=crop" },
    { id: "3", name: "Remada Baixa Triângulo (H)", category: "Costas", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=60&fit=crop" },
    { id: "4", name: "Puxada Aberta Polia Alta (H)", category: "Costas", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&h=60&fit=crop" },
    { id: "5", name: "Crossover Polia Alta", category: "Peitoral", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=60&fit=crop" },
    { id: "6", name: "Crucifixo (H)", category: "Peitoral", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&h=60&fit=crop" },
    { id: "7", name: "Supino Inclinado com Halter (H)", category: "Peitoral", img: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=100&h=60&fit=crop" },
    { id: "8", name: "Supino Reto com Halter (H)", category: "Peitoral", img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=100&h=60&fit=crop" },
    { id: "9", name: "Treino pra Casa (Body Pump)", category: "Treinando Em Casa", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&h=60&fit=crop" },
    { id: "10", name: "Alongamento", category: "Cardio", img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=100&h=60&fit=crop" },
    { id: "11", name: "Desenvolvimento com Halter", category: "Ombros", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&h=60&fit=crop" },
    { id: "12", name: "Rosca Direta com Barra", category: "Bíceps", img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=100&h=60&fit=crop" },
];

const PAGE_SIZE = 10;
const CATEGORIES = ["Todas", ...Array.from(new Set(EXERCISES.map((e) => e.category)))];

export default function ExerciseLibraryPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Todas");
    const [page, setPage] = useState(1);

    const filtered = EXERCISES.filter((e) => {
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === "Todas" || e.category === categoryFilter;
        return matchSearch && matchCat;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <ProSidebar role="trainer" />

            <main className="md:ml-64 flex-1 p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-slate-700">Biblioteca de exercícios</h1>
                        <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-all">
                            <Upload className="w-4 h-4 mr-2" /> Importar exercícios
                        </button>
                        <button className="bg-[#475569] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-slate-700 transition-all">
                            Criar categoria
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <button className="bg-[#334155] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-slate-700 transition-colors">
                            <Filter className="w-4 h-4 mr-2" /> Filtro
                        </button>
                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                            className="text-sm border border-gray-200 rounded-md px-3 py-2 text-slate-500 focus:outline-none bg-white"
                        >
                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <span className="text-sm text-slate-400 font-medium">{filtered.length} exercícios</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar exercício"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="w-full bg-white border border-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-200 transition-all"
                            />
                        </div>
                        <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                            <Plus className="w-4 h-4 mr-2" /> Adicionar exercício
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="border-b border-gray-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="py-4 px-6 w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                </th>
                                <th className="py-4 px-4">Exercício</th>
                                <th className="py-4 px-4">Categoria</th>
                                <th className="py-4 px-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-600 divide-y divide-gray-50">
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-16 text-center text-slate-400 text-sm">
                                        Nenhum exercício encontrado
                                    </td>
                                </tr>
                            ) : paged.map((ex) => {
                                const catStyle = CATEGORY_STYLES[ex.category] ?? "bg-slate-500 text-white";
                                return (
                                    <tr key={ex.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <div className="w-16 h-10 rounded overflow-hidden mr-4 bg-slate-200 border border-gray-100 relative group cursor-pointer flex-shrink-0">
                                                    <img src={ex.img} className="w-full h-full object-cover" alt={ex.name} />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all">
                                                        <Play className="w-4 h-4 text-white fill-white" />
                                                    </div>
                                                </div>
                                                <span className="font-medium text-slate-700 text-sm">{ex.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${catStyle}`}>
                                                {ex.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100 transition-colors">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="p-4 bg-white border-t border-gray-50 flex items-center justify-center gap-6">
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
            </main>
        </div>
    );
}
