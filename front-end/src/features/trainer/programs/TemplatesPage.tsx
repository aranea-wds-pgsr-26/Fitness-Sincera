import React, { useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import {
    Search, Filter, HelpCircle, ChevronLeft, ChevronRight,
    Pencil, FilePlus, Copy, Trash2
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

interface WorkoutTemplate {
    id: string;
    name: string;
    workoutsCount: number;
}

const MOCK_TEMPLATES: WorkoutTemplate[] = [
    { id: "1", name: "Treino Iniciante Massacre Muscular", workoutsCount: 2 },
    { id: "2", name: "Treino Intermediário Morte Lenta", workoutsCount: 3 },
    { id: "3", name: "Treino Avançado Surrando O Shape", workoutsCount: 3 },
    { id: "4", name: "Treinando Em Casa (Body Pump)", workoutsCount: 1 },
    { id: "5", name: "Legião De Ferro (H)", workoutsCount: 3 },
    { id: "6", name: "Hipertrofia Express", workoutsCount: 4 },
    { id: "7", name: "Full Body Funcional", workoutsCount: 3 },
    { id: "8", name: "Protocolo Força Máxima", workoutsCount: 5 },
    { id: "9", name: "Cardio e Mobilidade", workoutsCount: 2 },
    { id: "10", name: "Shape Total — Corte", workoutsCount: 4 },
];

const PAGE_SIZE = 10;

// ─── Create Template Modal (simple) ──────────────────────────────────────────

function CreateTemplateModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Criar Template</h2>
                <label className="block text-sm font-medium text-slate-600 mb-1">Nome do Template</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Treino Iniciante..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 mb-6"
                />
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#475569] text-white rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors"
                    >
                        Criar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Template Card ───────────────────────────────────────────────────────────

function TemplateCard({ template, onDelete }: { template: WorkoutTemplate; onDelete: (id: string) => void }) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <h3 className="text-sm font-bold text-slate-700 h-10 flex items-center justify-center leading-tight mb-2">
                {template.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium mb-6">
                Treinos: {template.workoutsCount}
            </p>
            <div className="flex items-center gap-4 text-slate-400">
                <button className="hover:text-slate-600 transition-colors" title="Editar">
                    <Pencil className="w-4 h-4" />
                </button>
                <button className="hover:text-slate-600 transition-colors" title="Adicionar treino">
                    <FilePlus className="w-4 h-4" />
                </button>
                <button className="hover:text-slate-600 transition-colors" title="Duplicar">
                    <Copy className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(template.id)}
                    className="hover:text-red-500 transition-colors"
                    title="Eliminar"
                >
                    <Trash2 className="w-4 h-4 text-red-400" />
                </button>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [templates, setTemplates] = useState(MOCK_TEMPLATES);
    const [showCreate, setShowCreate] = useState(false);

    const filtered = templates.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleDelete = (id: string) => {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <ProSidebar role="trainer" />

            {showCreate && <CreateTemplateModal onClose={() => setShowCreate(false)} />}

            <main className="md:ml-64 flex-1 p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-slate-700">Templates</h1>
                        <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="bg-[#475569] text-white px-6 py-2 rounded-md flex items-center text-sm font-bold hover:bg-slate-700 transition-all shadow-sm"
                    >
                        Criar Template
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar templates"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-white border border-gray-100 rounded-md py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-200 transition-all"
                        />
                    </div>
                    <button className="bg-[#334155] text-white px-4 py-2 rounded-md flex items-center text-xs font-bold hover:bg-slate-700 transition-colors">
                        <Filter className="w-3.5 h-3.5 mr-2" /> Filtro
                    </button>
                    <span className="text-sm text-slate-400">{filtered.length} templates</span>
                </div>

                {/* Templates Grid — 5 cols (xl), 3 (lg), 2 (sm), 1 (xs) */}
                {paged.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 text-sm">
                        Nenhum template encontrado
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                        {paged.map((t) => (
                            <TemplateCard key={t.id} template={t} onDelete={handleDelete} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center gap-6 mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-slate-600">{page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="w-8 h-8 border border-gray-200 text-slate-400 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </main>
        </div>
    );
}
