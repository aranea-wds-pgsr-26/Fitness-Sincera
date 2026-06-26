import { Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/lib/hooks/use-profile";

interface PageHeaderProps {
    searchPlaceholder?: string;
    notificationCount?: number;
}

/**
 * PageHeader — componente padronizado de cabeçalho para todas as páginas do cliente.
 * Inclui avatar + nome + email do perfil, campo de busca e sino de notificações.
 */
export function PageHeader({
    searchPlaceholder = "Pesquisar...",
    notificationCount = 2,
}: PageHeaderProps) {
    const { data: profile } = useProfile();

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage src={profile?.avatar} />
                    <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                        {profile?.name?.slice(0, 2).toUpperCase() ?? "FS"}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <span className="font-bold text-sm text-slate-900">
                            {profile?.name ?? "Usuário"}
                        </span>
                        <ChevronDown size={14} className="text-slate-500" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                        {profile?.email ?? ""}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 md:flex-none">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="bg-white rounded-full py-2.5 pl-10 pr-4 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#d4f54c]/50 border-none shadow-sm"
                    />
                </div>
                <div className="relative p-2.5 bg-white rounded-full shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                    <Bell size={18} className="text-slate-700" />
                    {notificationCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#d4f54c] border-2 border-white rounded-full text-[8px] flex items-center justify-center font-black">
                            {notificationCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
