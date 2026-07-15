import { AppSidebar } from "./AppSidebar";
import { Menu, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/mockData";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="h-screen bg-slate-100 dark:bg-[#111111] overflow-hidden flex flex-col">
      {/* Fixed sidebar — visible only on md+ (AppSidebar já tem hidden md:flex) */}
      <AppSidebar />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1c1e] border-b border-slate-200 dark:border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#d4f54c] rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-lg font-bold text-slate-950 dark:text-white tracking-tighter">flux</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          <SheetContent side="left" className="bg-[#1a1c1e] border-r border-white/10 p-6 w-72">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#d4f54c] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black fill-black" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tighter">flux</span>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer",
                    location === item.href
                      ? "bg-[#d4f54c] text-black"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content — flex-1 fills remaining height, md:pl-64 offsets fixed sidebar */}
      <main className="flex-1 md:pl-64 overflow-hidden flex p-3 md:p-4">
        {children}
      </main>
    </div>
  );
}
