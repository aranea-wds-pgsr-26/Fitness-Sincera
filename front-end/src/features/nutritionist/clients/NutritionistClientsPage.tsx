import React, { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { ProSidebar } from "@/layout/ProSidebar";
import { ClientList } from "@/shared/components/ClientList";
import { useNutritionistClients } from "@/lib/hooks/useNutritionistClients";
import { Filter, Search, UserPlus, HelpCircle } from "lucide-react";

const PAGE_SIZE = 10;

export default function NutritionistClientsPage() {
    const [, navigate] = useLocation();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "paused">("all");
    const [page, setPage] = useState(1);

    const { data: clientsData, isLoading } = useNutritionistClients({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search || undefined,
        page,
    });

    const clients = clientsData?.data ?? [];
    const totalPages = clientsData?.pagination?.totalPages ?? 1;
    const totalItems = clientsData?.pagination?.totalItems ?? clients.length;

    const activeCount = clients.filter(c => c.status === "active").length;
    const inactiveCount = clients.filter(c => c.status === "inactive").length;

    const handleClientClick = useCallback(
        (clientId: string) => { navigate(`/nutritionist/planos/${clientId}`); },
        [navigate]
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <ProSidebar role="nutritionist" />

            <main className="md:ml-64 flex-1 p-4 md:p-8">
                {/* ── Page Header ────────────────────────────────────────────────────── */}
                <div className="flex items-center mb-8">
                    <h1 className="text-xl font-bold text-slate-700">Gestão dos Clientes</h1>
                    <HelpCircle className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                </div>

                {/* ── Quick Stats ────────────────────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total</p>
                        <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
                        <p className="text-xs text-slate-400 mt-0.5">clientes registados</p>
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
                                    const isActive = statusFilter === s;
                                    return (
                                        <button
                                            key={s}
                                            onClick={() => { setStatusFilter(s); setPage(1); }}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isActive
                                                ? "bg-[#d4f54c] text-black"
                                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                }`}
                                        >
                                            {labels[s]}
                                        </button>
                                    );
                                })}
                            </div>

                            <span className="text-sm text-slate-400 font-medium">
                                {totalItems} Cliente{totalItems !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar cliente"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full bg-white border border-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-200 transition-all"
                                />
                            </div>
                            <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <UserPlus className="w-4 h-4 mr-2" /> Novo cliente
                            </button>
                        </div>
                    </div>

                    {/* ClientList component */}
                    <ClientList
                        clients={clients}
                        onClientClick={handleClientClick}
                        isLoading={isLoading}
                        accentColor="nutrition"
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </div>
    );
}
