import { Link, useLocation } from "wouter";
import { clientNavigationItems as navItems } from "@/lib/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut, Zap, Rocket } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

export function AppSidebar() {
  const [location, navigate] = useLocation();
  const { session, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a1c1e] hidden md:flex flex-col p-6 z-50 overflow-hidden">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-12 pl-2">
        <div className="w-8 h-8 bg-[#d4f54c] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,245,76,0.2)]">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tighter">flux</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const isTreino = item.label === "Treino";
          
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden",
              isActive
                ? (isTreino ? "bg-[#7c69ef] text-white shadow-[0_0_20px_rgba(124,105,239,0.4)]" : "bg-[#d4f54c] text-black shadow-lg")
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}>
                {/* Special Purple Line/Glow for Treino */}
                {isTreino && !isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#7c69ef] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#7c69ef]" />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? (isTreino ? "text-white" : "text-black") : (isTreino ? "text-slate-400 group-hover:text-[#7c69ef]" : "text-slate-400 group-hover:text-white")
                    )}
                  />
                  <span className={cn("font-bold text-sm tracking-tight", isTreino && !isActive && "group-hover:text-[#7c69ef] transition-colors")}>{item.label}</span>
                </div>
                {item.label === "Dashboard" && !isActive && (
                   <span className="w-5 h-5 bg-[#d4f54c] rounded-full text-[10px] flex items-center justify-center font-black text-black">3</span>
                )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card (Flux Style) */}
      <div className="mt-auto bg-[#d4f54c] rounded-[32px] p-5 relative overflow-hidden group cursor-pointer shadow-xl hover:scale-[1.02] transition-all duration-300">
        <div className="relative z-10">
          <h4 className="text-black font-black text-lg mb-1 leading-tight">Upgrade para Pro</h4>
          <p className="text-black/60 text-[10px] font-bold uppercase tracking-wider mb-4">Experiência completa</p>
          <button className="w-full bg-black text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg">
            Upgrade Agora
          </button>
        </div>
        <Rocket className="absolute -right-3 -bottom-3 w-20 h-20 text-black/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500" />
      </div>

      {/* Logout */}
      <div className="pt-6 mt-6 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 transition-colors w-full cursor-pointer font-bold text-sm"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
}
