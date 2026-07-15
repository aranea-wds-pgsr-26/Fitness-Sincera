import React from "react";
import { useLocation } from "wouter";
import { useAuth, DEMO_SESSIONS } from "./AuthProvider";
import { Dumbbell, Apple, Crown, User, ArrowRight, Zap } from "lucide-react";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

const ROLES = [
    {
        key: "admin" as const,
        label: "Administrador",
        description: "Acesse todos os módulos de gestão",
        icon: Crown,
        accent: "#facc15",
        bg: "bg-amber-400",
        text: "text-black",
        iconColor: "text-black",
        name: DEMO_SESSIONS.admin.name,
    },
    {
        key: "client" as const,
        label: "Cliente",
        description: "Acompanhe dieta, treinos e evolução",
        icon: User,
        accent: "#d4f54c",
        bg: "bg-[#d4f54c]",
        text: "text-black",
        iconColor: "text-black",
        name: DEMO_SESSIONS.client.name,
    },
    {
        key: "nutritionist" as const,
        label: "Nutricionista",
        description: "Crie e publique planos alimentares",
        icon: Apple,
        accent: "#10b981",
        bg: "bg-emerald-500",
        text: "text-white",
        iconColor: "text-white",
        name: DEMO_SESSIONS.nutritionist.name,
    },
    {
        key: "trainer" as const,
        label: "Personal Trainer",
        description: "Gira treinos e acompanhe alunos",
        icon: Dumbbell,
        accent: "#8b5cf6",
        bg: "bg-violet-500",
        text: "text-white",
        iconColor: "text-white",
        name: DEMO_SESSIONS.trainer.name,
    },
];

export default function LoginPage() {
    const { login } = useAuth();
    const [, navigate] = useLocation();

    const handleLogin = (role: keyof typeof DEMO_SESSIONS) => {
        login(role);
        const dest =
            role === "admin"
                ? "/nutritionist/alimentos"
                : role === "client"
                ? "/dashboard"
                : role === "nutritionist"
                    ? "/nutritionist/dashboard"
                    : "/trainer/dashboard";
        navigate(dest);
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-[#111111] flex flex-col items-center justify-center p-6">
            <div className="absolute right-6 top-6">
                <ThemeToggle />
            </div>

            {/* Brand */}
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-[#d4f54c] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,245,76,0.3)]">
                    <Zap className="w-6 h-6 text-black fill-black" />
                </div>
                <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Fitness Sincera</span>
            </div>

            <h1 className="text-4xl font-black text-slate-950 dark:text-white uppercase tracking-tight mb-2 text-center">
                Bem-vindo
            </h1>
            <p className="text-slate-400 text-sm mb-10 text-center">
                Selecione o seu perfil para entrar
            </p>

            {/* Role cards */}
            <div className="w-full max-w-md space-y-4">
                {ROLES.map((r) => (
                    <button
                        key={r.key}
                        onClick={() => handleLogin(r.key)}
                        className="w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300
                       dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20
                       text-left rounded-2xl p-5 flex items-center gap-4
                       transition-all duration-300 hover:scale-[1.02] group"
                    >
                        <div
                            className={`w-12 h-12 ${r.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                        >
                            <r.icon className={`w-6 h-6 ${r.iconColor}`} strokeWidth={2.5} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-950 dark:text-white text-sm">{r.label}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{r.description}</p>
                            <p className="text-slate-500 text-[10px] mt-1 italic">{r.name}</p>
                        </div>

                        <ArrowRight
                            className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                        />
                    </button>
                ))}
            </div>

            <p className="text-slate-600 text-[10px] mt-10 text-center">
                Ambiente de demonstração — Sprint 1
            </p>
        </div>
    );
}
