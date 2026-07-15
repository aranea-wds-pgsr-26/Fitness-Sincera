import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ProSidebar } from "@/layout/ProSidebar";
import { MealPlanEditor } from "./MealPlanEditor";
import {
    ArrowLeft, Users, FileText, Clock, CheckCircle2, Edit3, Home
} from "lucide-react";
import type { MealPlan } from "@shared/schema";

// ─── Mock client list with their plan status ─────────────────────────────────
const MOCK_CLIENTS = [
    { id: "user-1", name: "Lucas Bennett", avatar: "LB", planId: "plan-lucas-week1", planStatus: "published" as const, planName: "Semana 1 — Foco em Proteína" },
    { id: "user-2", name: "Ana Costa", avatar: "AC", planId: "plan-ana-week1", planStatus: "draft" as const, planName: "Semana 1 — Déficit" },
    { id: "user-3", name: "Rafael Mendes", avatar: "RM", planId: null, planStatus: null, planName: null },
    { id: "user-4", name: "Carla Vieira", avatar: "CV", planId: "plan-carla-week2", planStatus: "review" as const, planName: "Semana 2 — Manutenção" },
    { id: "user-5", name: "João Faria", avatar: "JF", planId: null, planStatus: null, planName: null },
    { id: "user-6", name: "Beatriz Lemos", avatar: "BL", planId: "plan-bl-week1", planStatus: "published" as const, planName: "Semana 1 — Low Carb" },
    { id: "user-7", name: "Tiago Correia", avatar: "TC", planId: null, planStatus: null, planName: null },
    { id: "user-8", name: "Sofia Pinto", avatar: "SP", planId: "plan-sp-week3", planStatus: "draft" as const, planName: "Semana 3 — Bulking" },
];

// ─── Mock plan data from server (same seed as routes.ts) ─────────────────────
const MOCK_PLAN: MealPlan = {
    id: "plan-lucas-week1",
    nutritionistId: "nutri-1",
    clientId: "user-1",
    name: "Semana 1 — Foco em Proteína",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    blocks: [
        {
            id: "block-1", time: "07:00", title: "Café da Manhã", type: "meal",
            items: [
                { id: "i1", name: "Ovos Mexidos", quantity: "3 unidades", calories: 210, protein: 18, carbs: 3, fat: 14 },
                { id: "i2", name: "Pão Integral", quantity: "1 fatia", calories: 80, protein: 4, carbs: 15, fat: 1 },
                { id: "i3", name: "Café Preto", quantity: "1 xícara", calories: 5, protein: 0, carbs: 1, fat: 0 },
            ],
        },
        {
            id: "block-2", time: "10:00", title: "Lanche da Manhã", type: "snack",
            items: [
                { id: "i4", name: "Maçã", quantity: "1 unidade", calories: 95, protein: 0, carbs: 25, fat: 0 },
                { id: "i5", name: "Castanhas", quantity: "15g", calories: 90, protein: 2, carbs: 2, fat: 8 },
            ],
        },
        {
            id: "block-3", time: "13:00", title: "Almoço", type: "meal",
            items: [
                { id: "i6", name: "Peito de Frango", quantity: "150g", calories: 247, protein: 46, carbs: 0, fat: 5 },
                { id: "i7", name: "Arroz Branco", quantity: "100g cozido", calories: 130, protein: 3, carbs: 28, fat: 0 },
                { id: "i8", name: "Salada Mista", quantity: "à vontade", calories: 40, protein: 2, carbs: 7, fat: 0 },
            ],
        },
        {
            id: "block-4", time: "16:00", title: "Pré-Treino", type: "snack",
            items: [
                { id: "i9", name: "Banana", quantity: "1 unidade", calories: 90, protein: 1, carbs: 23, fat: 0 },
                { id: "i10", name: "Creatina", quantity: "5g", calories: 0, protein: 0, carbs: 0, fat: 0 },
            ],
        },
        {
            id: "block-5", time: "20:00", title: "Jantar", type: "meal",
            items: [
                { id: "i11", name: "Tilápia Grelhada", quantity: "150g", calories: 180, protein: 33, carbs: 0, fat: 4 },
                { id: "i12", name: "Purê de Batata Doce", quantity: "100g", calories: 90, protein: 2, carbs: 21, fat: 0 },
            ],
        },
        {
            id: "block-6", time: "22:30", title: "Ceia", type: "snack",
            items: [
                { id: "i13", name: "Iogurte Grego", quantity: "200g", calories: 130, protein: 17, carbs: 6, fat: 4 },
                { id: "i14", name: "Pasta de Amendoim", quantity: "1 colher", calories: 90, protein: 4, carbs: 3, fat: 8 },
            ],
        },
    ],
};

type StatusBadgeProps = { status: "draft" | "review" | "published" | null };

function StatusBadge({ status }: StatusBadgeProps) {
    if (!status) return <span className="text-[10px] text-slate-400 italic">Sem plano</span>;
    const map = {
        draft: { label: "Rascunho", cls: "bg-slate-100 text-slate-500" },
        review: { label: "Revisão", cls: "bg-amber-100 text-amber-600" },
        published: { label: "Publicado", cls: "bg-emerald-100 text-emerald-600" },
    };
    const { label, cls } = map[status];
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MealPlanEditorPage() {
    // Read :clientId from URL if navigated from /nutritionist/planos/:clientId
    const params = useParams<{ clientId?: string }>();
    const [, navigate] = useLocation();

    const [selectedClient, setSelectedClient] = useState<string | null>(params.clientId ?? null);
    const [plan, setPlan] = useState<MealPlan>(MOCK_PLAN);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState<string | null>(null);

    // When URL param changes (e.g., back-navigation), sync state
    useEffect(() => {
        if (params.clientId) {
            setSelectedClient(params.clientId);
            setPlan(MOCK_PLAN);
        }
    }, [params.clientId]);

    const currentClient = MOCK_CLIENTS.find(c => c.id === selectedClient);

    // ── Auto-save on plan change ──────────────────────────────────────────────
    const handlePlanChange = useCallback((updated: MealPlan) => {
        setPlan(updated);
        // Optimistic save signal (will be real API call in Sprint 3)
        setIsSaving(true);
        clearTimeout((window as any).__saveTimer);
        (window as any).__saveTimer = setTimeout(async () => {
            try {
                await fetch(`/api/meal-plans/${updated.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updated),
                });
                setSaveMsg("Guardado");
                setTimeout(() => setSaveMsg(null), 2000);
            } catch {
                setSaveMsg("Erro ao guardar");
            } finally {
                setIsSaving(false);
            }
        }, 800);
    }, []);

    // ── Publish ────────────────────────────────────────────────────────────────
    const handlePublish = useCallback(async () => {
        await fetch(`/api/meal-plans/${plan.id}/publish`, { method: "POST" });
        setPlan(p => ({ ...p, status: "published", publishedAt: new Date().toISOString() }));
        setSaveMsg("✅ Publicado ao cliente!");
        setTimeout(() => setSaveMsg(null), 3000);
    }, [plan.id]);

    return (
        <div className="h-screen bg-[#111111] overflow-hidden flex flex-col md:flex-row">
            <ProSidebar role="nutritionist" />

            <div className="flex-1 md:ml-64 bg-[#111111] p-3 md:p-4 flex flex-col overflow-hidden gap-3 md:gap-4">

                {/* ── Left panel: client list ─────────────────────── */}
                <div className="flex gap-4 h-full">
                    <div className="w-72 flex-shrink-0 bg-[#1a1c1e] rounded-2xl border border-white/5 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-4 h-4 text-[#d4f54c]" />
                                <h2 className="font-black text-white text-sm uppercase tracking-widest">Clientes</h2>
                            </div>
                            <p className="text-slate-500 text-[10px]">Selecione para editar o plano</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {MOCK_CLIENTS.map(client => (
                                <button
                                    key={client.id}
                                    onClick={() => { setSelectedClient(client.id); setPlan(MOCK_PLAN); }}
                                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group
                    ${selectedClient === client.id
                                            ? "bg-[#d4f54c] text-black"
                                            : "hover:bg-white/5 text-slate-400 hover:text-white"
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0
                    ${selectedClient === client.id ? "bg-black/20 text-black" : "bg-white/10 text-white"}`}>
                                        {client.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold truncate ${selectedClient === client.id ? "text-black" : "text-white"}`}>
                                            {client.name}
                                        </p>
                                        <div className="mt-0.5">
                                            <StatusBadge status={client.planStatus} />
                                        </div>
                                    </div>
                                    {client.planId && (
                                        <FileText className={`w-3.5 h-3.5 flex-shrink-0 ${selectedClient === client.id ? "text-black/60" : "text-slate-600"}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right panel: editor ─────────────────────────── */}
                    <div className="flex-1 bg-[#e9e9e9] rounded-[32px] overflow-hidden flex flex-col">
                        {!selectedClient ? (
                            /* Empty state */
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                                <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-4">
                                    <Edit3 className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="font-black text-slate-600 text-lg mb-2">Selecione um cliente</h3>
                                <p className="text-slate-400 text-sm max-w-64">
                                    Escolha um cliente à esquerda para abrir ou criar o plano alimentar.
                                </p>
                            </div>
                        ) : (
                            /* Editor toolbar + editor */
                            <div className="flex flex-col h-full">
                                {/* Toolbar */}
                                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedClient(null);
                                                navigate("/nutritionist/planos");
                                            }}
                                            className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4 text-slate-500" />
                                        </button>
                                        <div>
                                            <h1 className="font-black text-slate-800 text-lg leading-tight">{plan.name}</h1>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-slate-400 text-xs">{currentClient?.name}</span>
                                                <span className="text-slate-300">·</span>
                                                <StatusBadge status={plan.status} />
                                                {isSaving && (
                                                    <span className="text-[10px] text-slate-400 italic flex items-center gap-1">
                                                        <Clock className="w-3 h-3 animate-spin" /> A guardar...
                                                    </span>
                                                )}
                                                {saveMsg && !isSaving && (
                                                    <span className={`text-[10px] font-bold flex items-center gap-1 ${saveMsg.startsWith("✅") ? "text-emerald-500" : "text-slate-500"}`}>
                                                        <CheckCircle2 className="w-3 h-3" /> {saveMsg}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {plan.status !== "published" ? (
                                            <button
                                                onClick={handlePublish}
                                                className="flex items-center gap-2 bg-[#111111] text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-[#d4f54c]" />
                                                Publicar ao Cliente
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setPlan(p => ({ ...p, status: "draft" }))}
                                                className="flex items-center gap-2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-all shadow-lg"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Publicado · Editar
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Editor body */}
                                <div className="flex-1 overflow-y-auto">
                                    <MealPlanEditor plan={plan} onChange={handlePlanChange} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
