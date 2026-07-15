import React, { useState } from "react";
import { TrainerDashboard } from "./TrainerDashboard";
import { ClientWorkoutProgress } from "./ClientWorkoutProgress";
import { ProSidebar } from "@/layout/ProSidebar";
import { Menu, Crown, LayoutDashboard, Users, Library, Copy, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/trainer/dashboard" },
  { icon: Users, label: "Alunos", href: "/trainer/alunos" },
  { icon: Library, label: "Biblioteca", href: "/trainer/biblioteca" },
  { icon: Copy, label: "Templates", href: "/trainer/templates" },
  { icon: MessageCircle, label: "Chat IA", href: "/chat" },
];

export default function TrainerDashboardPage() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <div className="h-screen bg-[#111111] overflow-hidden flex flex-col">
      <ProSidebar role="trainer" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#1a1c1e] border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#d4f54c] rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Flux Pro</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1a1c1e] border-r border-white/10 p-6 w-72">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#d4f54c] rounded-xl flex items-center justify-center">
                <Crown className="text-black fill-black w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg">Flux Pro</span>
            </div>
            <nav className="space-y-1">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                  location === item.href ? "bg-[#d4f54c] text-black" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main — offset by sidebar on desktop */}
      <main className="flex-1 md:pl-64 overflow-hidden flex p-3 md:p-4">
        <div className="flex-1 bg-[#e9e9e9] rounded-[28px] md:rounded-[36px] overflow-y-auto selection:bg-[#d4f54c] selection:text-black shadow-2xl relative">
          <TrainerDashboard onClientDetailOpen={setSelectedClientId} />
        </div>
      </main>

      {selectedClientId && (
        <ClientWorkoutProgress
          clientId={selectedClientId}
          onClose={() => setSelectedClientId(null)}
        />
      )}
    </div>
  );
}
