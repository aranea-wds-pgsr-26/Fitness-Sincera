import React from "react";
import { Link, useLocation } from "wouter";
import {
    LayoutDashboard,
    Users,
    MessageCircle,
    Library,
    Copy,
    Apple,
    ClipboardList,
    Settings,
    LogOut,
    Crown,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

// ─── Nav Definitions ─────────────────────────────────────────────────────────

// ─── Nav Definitions ─────────────────────────────────────────────────────────

const TRAINER_MAIN_NAV = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/trainer/dashboard" },
    { icon: Users, label: "Alunos", href: "/trainer/alunos" },
    { icon: Library, label: "Biblioteca", href: "/trainer/biblioteca" },
    { icon: Copy, label: "Templates", href: "/trainer/templates" },
    { icon: MessageCircle, label: "Chat IA", href: "/chat" },
];

const NUTRITIONIST_MAIN_NAV = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/nutritionist/dashboard" },
    { icon: Users, label: "Clientes", href: "/nutritionist/clientes" },
    { icon: ClipboardList, label: "Planos Alimentares", href: "/nutritionist/planos" },
    { icon: Apple, label: "Alimentos", href: "/nutritionist/alimentos" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────

interface ProSidebarProps {
    /** Who is using the sidebar: changes which dashboard link is "active" correctly */
    role?: "trainer" | "nutritionist";
}

export function ProSidebar({ role = "trainer" }: ProSidebarProps) {
    const [location, navigate] = useLocation();
    const { session, logout } = useAuth();

    const navItems = role === "nutritionist" ? NUTRITIONIST_MAIN_NAV : TRAINER_MAIN_NAV;
    const roleLabel = session?.name ?? (role === "nutritionist" ? "Nutricionista" : "Treinador");
    const roleEmail = session?.email ?? (role === "nutritionist" ? "nutri@fluxpro.com" : "trainer@fluxpro.com");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="hidden md:flex w-64 bg-[#1a1c1e] text-slate-400 flex-col fixed h-full z-20 overflow-hidden">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4f54c] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,245,76,0.2)] flex-shrink-0">
                    <Crown className="text-black fill-black w-5 h-5" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">Flux Pro</span>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    // Match active for exact path or sub-paths (e.g. /nutritionist/planos/:id)
                    const isActive = location === item.href || location.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive
                                ? "bg-[#d4f54c] text-black shadow-lg"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 space-y-1">
                <Link
                    href="/configuracoes"
                    className="flex items-center px-4 py-3 text-sm font-bold text-slate-400 hover:text-white rounded-2xl hover:bg-white/5 transition-all duration-300"
                >
                    <Settings className="w-5 h-5 mr-3" />
                    Configurações
                </Link>

                {/* User Avatar + Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center p-3 rounded-2xl hover:bg-red-500/10 transition-all duration-300 cursor-pointer group w-full text-left"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 border border-white/5">
                        <span className="text-white text-xs font-black">PRO</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{roleLabel}</p>
                        <p className="text-[10px] text-slate-500 group-hover:text-red-400 truncate transition-colors">{roleEmail}</p>
                    </div>
                    <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors flex-shrink-0" />
                </button>
            </div>
        </aside>
    );

}
