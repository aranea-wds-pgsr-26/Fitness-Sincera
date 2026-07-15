import React from "react";
import { ClientListItem } from "@shared/types/professional";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface ClientListProps {
  clients: ClientListItem[];
  onClientClick: (clientId: string) => void;
  isLoading?: boolean;
  accentColor?: "personal" | "nutrition";
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Deterministic color from name for avatar background (slate tones like ref)
function getAvatarColor(name: string): string {
  const palette = [
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-zinc-500",
    "bg-neutral-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % palette.length;
  }
  return palette[Math.abs(hash) % palette.length];
}

const STATUS_MAP: Record<string, { label: string; classes: string; dot: string }> = {
  active: {
    label: "Ativo",
    classes: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    dot: "bg-emerald-500",
  },
  inactive: {
    label: "Inativo",
    classes: "bg-slate-50 text-slate-500 border border-slate-100",
    dot: "bg-slate-400",
  },
  paused: {
    label: "Pausado",
    classes: "bg-amber-50 text-amber-600 border border-amber-100",
    dot: "bg-amber-400",
  },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "------";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  if (diffDays < 30) return `há ${diffDays} dias`;
  if (diffMonths === 1) return "há 1 mês";
  if (diffMonths < 12) return `há ${diffMonths} meses`;
  if (diffYears === 1) return "há 1 ano";
  return `há ${diffYears} anos`;
}

export function ClientList({
  clients,
  onClientClick,
  isLoading = false,
  accentColor = "personal",
  page = 1,
  totalPages = 1,
  onPageChange,
}: ClientListProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 px-4 animate-pulse">
            <div className="w-4 h-4 bg-slate-100 rounded" />
            <div className="w-9 h-9 rounded-full bg-slate-100" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-slate-100 rounded w-36" />
              <div className="h-2.5 bg-slate-50 rounded w-24" />
            </div>
            <div className="h-6 w-16 bg-slate-100 rounded-full" />
            <div className="h-3 w-20 bg-slate-50 rounded" />
            <div className="h-3 w-24 bg-slate-50 rounded" />
            <div className="h-4 w-6 bg-slate-50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
          <span className="text-slate-300 text-xl">👤</span>
        </div>
        <p className="font-bold text-slate-600 text-sm">Nenhum cliente encontrado</p>
        <p className="text-xs text-slate-400 mt-1">Ajuste os filtros ou adicione um novo cliente</p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pl-4 pr-2 py-3 w-8">
              <input
                type="checkbox"
                className="rounded border-gray-200 text-violet-500 focus:ring-violet-300 cursor-pointer"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide hidden lg:table-cell">
              Tag
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide hidden md:table-cell">
              Última avaliação
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Atividade recente
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {clients.map((client) => {
            const status = STATUS_MAP[client.status] ?? STATUS_MAP.inactive;
            const avatarBg = getAvatarColor(client.name);
            return (
              <tr
                key={client.id}
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onClientClick(client.id)}
              >
                {/* Checkbox */}
                <td className="pl-4 pr-2 py-3">
                  <input
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-200 text-violet-500 focus:ring-violet-300 cursor-pointer"
                  />
                </td>
                {/* Name + Avatar */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white ${avatarBg}`}
                    >
                      {getInitials(client.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 leading-tight">
                        {client.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{client.email}</p>
                    </div>
                  </div>
                </td>
                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.classes}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </td>
                {/* Tag (placeholder) */}
                <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">------</td>
                {/* Last Evaluation */}
                <td className="px-4 py-3 text-sm text-slate-500 hidden md:table-cell">
                  {client.lastCheckin ? formatDate(client.lastCheckin) : "------"}
                </td>
                {/* Recent Activity */}
                <td className="px-4 py-3 text-sm text-slate-500">
                  {client.lastCheckin ? formatDate(client.lastCheckin) : "------"}
                </td>
                {/* Actions */}
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-300 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
                    aria-label="Mais ações"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-4 border-t border-gray-50 flex items-center justify-between">
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-slate-400">
            {page} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
