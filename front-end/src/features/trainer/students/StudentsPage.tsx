import React, { useState } from "react";
import { useLocation } from "wouter";
import { Filter, HelpCircle, Search } from "lucide-react";
import { ProSidebar } from "@/layout/ProSidebar";
import { useTrainerClients } from "@/lib/hooks/useTrainerClients";
import { ClientList } from "@/shared/components/ClientList";

export default function StudentsPage() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "paused">("all");
  const [page, setPage] = useState(1);
  const { data: studentsData, isLoading } = useTrainerClients({
    performance: statusFilter === "all" ? undefined : statusFilter,
    search: search || undefined,
    page,
  });

  const students = studentsData?.data ?? [];
  const totalItems = studentsData?.pagination.totalItems ?? students.length;
  const totalPages = studentsData?.pagination.totalPages ?? 1;
  const activeCount = students.filter((student) => student.status === "active").length;
  const inactiveCount = students.filter((student) => student.status === "inactive").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <ProSidebar role="trainer" />
      <main className="md:ml-64 flex-1 p-4 md:p-8">
        <div className="flex items-center mb-8">
          <h1 className="text-xl font-bold text-slate-700">Gestao dos alunos</h1>
          <HelpCircle className="w-4 h-4 ml-2 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Stat label="Total" value={totalItems} detail="alunos vinculados" />
          <Stat label="Ativos" value={activeCount} detail="com acompanhamento ativo" tone="text-emerald-600" />
          <Stat label="Inativos" value={inactiveCount} detail="sem acompanhamento ativo" tone="text-slate-500" />
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <div className="flex items-center gap-1 flex-wrap">
                {(["all", "active", "inactive", "paused"] as const).map((status) => {
                  const labels = { all: "Todos", active: "Ativos", inactive: "Inativos", paused: "Pausados" };
                  return (
                    <button key={status} onClick={() => { setStatusFilter(status); setPage(1); }} className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${statusFilter === status ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      {labels[status]}
                    </button>
                  );
                })}
              </div>
              <span className="text-sm text-slate-400 font-medium">{totalItems} aluno{totalItems !== 1 ? "s" : ""}</span>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Pesquisar aluno" className="w-full bg-white border border-gray-200 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-slate-300" />
            </div>
          </div>
          <ClientList clients={students} onClientClick={(id) => navigate(`/trainer/alunos/${id}`)} isLoading={isLoading} accentColor="personal" page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, detail, tone = "text-slate-800" }: { label: string; value: number; detail: string; tone?: string }) {
  return <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p><p className={`text-2xl font-bold ${tone}`}>{value}</p><p className="text-xs text-slate-400 mt-0.5">{detail}</p></div>;
}