import React, { useState } from "react";
import { ProSidebar } from "@/layout/ProSidebar";
import { ClientList } from "@/shared/components/ClientList";
import { ClientListItem } from "@shared/types/professional";
import { Filter, Search, UserPlus, HelpCircle } from "lucide-react";

// ─── Mock students (espelhado no ref HTML) ────────────────────────────────────

const MOCK_STUDENTS: ClientListItem[] = [
    { id: "1", name: "Adriana Nobre", email: "adriana.nobre@email.com", status: "active", lastCheckin: new Date(Date.now() - 4 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 85 },
    { id: "2", name: "Adriana Alves", email: "adriana.alves@email.com", status: "inactive", lastCheckin: new Date(Date.now() - 13 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 40 },
    { id: "3", name: "Andreia Alver", email: "andreia.alver@email.com", status: "paused", lastCheckin: null, mealPlanId: null, adherence: 0 },
    { id: "4", name: "Anisa Tavares", email: "anisa.tavares@email.com", status: "active", lastCheckin: new Date(Date.now() - 4 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 72 },
    { id: "5", name: "Cátia Smith", email: "catia.smith@email.com", status: "active", lastCheckin: new Date(Date.now() - 7 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 68 },
    { id: "6", name: "Denize Silva", email: "denize.silva@email.com", status: "paused", lastCheckin: null, mealPlanId: null, adherence: 0 },
    { id: "7", name: "Diana Martins", email: "diana.martins@email.com", status: "inactive", lastCheckin: null, mealPlanId: null, adherence: 20 },
    { id: "8", name: "Edilma Araujo", email: "edilma.araujo@email.com", status: "paused", lastCheckin: null, mealPlanId: null, adherence: 0 },
    { id: "9", name: "Edlaine Silva", email: "edlaine.silva@email.com", status: "inactive", lastCheckin: null, mealPlanId: null, adherence: 15 },
    { id: "10", name: "Elizete Gomes", email: "elizete.gomes@email.com", status: "active", lastCheckin: new Date(Date.now() - 3 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 91 },
    { id: "11", name: "Eni Alves Dos Santos", email: "eni.alves@email.com", status: "paused", lastCheckin: null, mealPlanId: null, adherence: 0 },
    { id: "12", name: "Fernanda Cabral", email: "fernanda.cabral@email.com", status: "inactive", lastCheckin: null, mealPlanId: null, adherence: 30 },
    { id: "13", name: "Geslem Da Silva Queiroz", email: "geslem.silva@email.com", status: "active", lastCheckin: null, mealPlanId: null, adherence: 55 },
    { id: "14", name: "Hanny Moreira", email: "hanny.moreira@email.com", status: "active", lastCheckin: null, mealPlanId: null, adherence: 60 },
    { id: "15", name: "Herica Milhomem", email: "herica.milhomem@email.com", status: "inactive", lastCheckin: new Date(Date.now() - 24 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 10 },
    { id: "16", name: "Isabela Ramos", email: "isabela.ramos@email.com", status: "active", lastCheckin: new Date(Date.now() - 2 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 88 },
    { id: "17", name: "Jessica Oliveira", email: "jessica.oliveira@email.com", status: "active", lastCheckin: new Date(Date.now() - 1 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 95 },
    { id: "18", name: "Juliana Costa", email: "juliana.costa@email.com", status: "paused", lastCheckin: null, mealPlanId: null, adherence: 0 },
    { id: "19", name: "Karen Ferreira", email: "karen.ferreira@email.com", status: "active", lastCheckin: new Date(Date.now() - 5 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 77 },
    { id: "20", name: "Larissa Pereira", email: "larissa.pereira@email.com", status: "inactive", lastCheckin: new Date(Date.now() - 10 * 30 * 86400000).toISOString(), mealPlanId: null, adherence: 25 },
];

const PAGE_SIZE = 10;

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "paused">("all");
    const [page, setPage] = useState(1);

    // ── filter ──────────────────────────────────────────────────────────────────
    const filtered = MOCK_STUDENTS.filter((s) => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const activeCount = MOCK_STUDENTS.filter((s) => s.status === "active").length;
    const inactiveCount = MOCK_STUDENTS.filter((s) => s.status === "inactive").length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <ProSidebar role="trainer" />

            <main className="md:ml-64 flex-1 p-4 md:p-8">
                {/* ── Page Header ────────────────────────────────────────────────────── */}
                <div className="flex items-center mb-8">
                    <h1 className="text-xl font-bold text-slate-700">Gestão dos Alunos</h1>
                    <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                </div>

                {/* ── Quick Stats ────────────────────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total</p>
                        <p className="text-2xl font-bold text-slate-800">{MOCK_STUDENTS.length}</p>
                        <p className="text-xs text-slate-400 mt-0.5">alunos registados</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ativos</p>
                        <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
                        <p className="text-xs text-slate-400 mt-0.5">com check-in recente</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Inativos</p>
                        <p className="text-2xl font-bold text-slate-500">{inactiveCount}</p>
                        <p className="text-xs text-slate-400 mt-0.5">sem atividade recente</p>
                    </div>
                </div>

                {/* ── Table Card ──────────────────────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <button className="bg-[#334155] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-slate-700 transition-colors">
                                <Filter className="w-4 h-4 mr-2" /> Filtro
                            </button>

                            {/* Status quick-filter pills */}
                            <div className="flex items-center gap-1">
                                {(["all", "active", "inactive", "paused"] as const).map((s) => {
                                    const labels = { all: "Todos", active: "Ativos", inactive: "Inativos", paused: "Pausados" };
                                    const active = statusFilter === s;
                                    return (
                                        <button
                                            key={s}
                                            onClick={() => { setStatusFilter(s); setPage(1); }}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${active
                                                    ? "bg-slate-700 text-white"
                                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                }`}
                                        >
                                            {labels[s]}
                                        </button>
                                    );
                                })}
                            </div>

                            <span className="text-sm text-slate-400 font-medium">
                                {filtered.length} Aluno{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar aluno"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full bg-white border border-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-200 transition-all"
                                />
                            </div>
                            <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <UserPlus className="w-4 h-4 mr-2" /> Novo aluno
                            </button>
                        </div>
                    </div>

                    {/* ClientList component (fully reused) */}
                    <ClientList
                        clients={paged}
                        onClientClick={(id) => console.log("open client", id)}
                        isLoading={false}
                        accentColor="personal"
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </div>
    );
}
