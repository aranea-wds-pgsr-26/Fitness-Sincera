import { useState, useRef, useCallback, useEffect } from "react";
import { DashboardLayout } from "@/layout/DashboardLayout";
import { PageShell } from "@/layout/PageShell";
import { PageHeader } from "@/layout/PageHeader";
import { NutritionCalculatorCard } from "@/features/client/dashboard/NutritionCalculatorCard";
import { Button } from "@/components/ui/button";
import {
  Coffee, Sun, Moon, Apple, Utensils,
  ChevronDown, ChevronUp,
  Check, Loader2, RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useClientMealPlan, useMealSwapRequest } from "@/lib/hooks/use-meals";
import { toast } from "@/hooks/use-toast";
import type { MealPlanBlock, MealPlanItem } from "@shared/schema";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getMealIcon(title: string, time: string) {
  const hour = parseInt(time.split(":")[0], 10);
  const lower = title.toLowerCase();
  if (lower.includes("café") || lower.includes("manhã")) return Coffee;
  if (lower.includes("almoço")) return Utensils;
  if (lower.includes("jantar") || lower.includes("ceia")) return Moon;
  if (lower.includes("lanche") || lower.includes("pré")) return Apple;
  if (hour < 10) return Coffee;
  if (hour < 15) return Sun;
  return Moon;
}

function sumMacros(items: MealPlanItem[]) {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

const SUBSTITUTION_REASONS = [
  { value: "dislike", label: "Não gosto do alimento" },
  { value: "allergy", label: "Sou alérgico / intolerante" },
  { value: "unavailable", label: "Alimento indisponível" },
  { value: "preference", label: "Preferência pessoal" },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function NutritionPage() {
  const { data: plan, isLoading, isError } = useClientMealPlan();

  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const blocks = plan?.blocks ?? [];
  const completedCount = blocks.filter((b) => completed.has(b.id)).length;
  const progressPct = blocks.length
    ? Math.round((completedCount / blocks.length) * 100)
    : 0;

  const toggleBlock = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <DashboardLayout>
        <PageShell>

          <PageHeader searchPlaceholder="Pesquisar alimentos..." />

          {/* ── Title + Plan chip ─────────────────────────────────── */}
          <section className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight uppercase font-body">
                Nutrição
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Acompanhe seu plano alimentar e registre suas refeições.
              </p>
            </div>
            {plan && (
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-700">Plano Ativo</span>
                <span className="text-[10px] text-slate-400 font-medium">· Dra. Sofia Almeida</span>
              </div>
            )}
          </section>

          {/* ── Daily progress bar ────────────────────────────────── */}
          {blocks.length > 0 && (
            <div className="mb-6 bg-white rounded-[24px] p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-700">Progresso do dia</span>
                <span className="text-xs font-black text-slate-900">
                  {completedCount}/{blocks.length} refeições
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d4f54c] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {progressPct === 100 && (
                <p className="text-[11px] font-bold text-emerald-600 mt-2 text-right">
                  🎉 Todas as refeições concluídas!
                </p>
              )}
            </div>
          )}

          {/* ── Two-column layout ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Calculator */}
            <div className="md:col-span-5">
              <NutritionCalculatorCard />
            </div>

            {/* Right: Scroll wheel */}
            <div className="md:col-span-7">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {plan?.name ?? "Plano Alimentar"}
                </h2>
                {blocks.length > 0 && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    arraste para ver
                  </span>
                )}
              </div>

              {isLoading && (
                <div className="flex justify-center py-16">
                  <Loader2 className="animate-spin text-slate-400" size={32} />
                </div>
              )}

              {isError && (
                <div className="bg-white rounded-[24px] p-10 text-center shadow-sm">
                  <p className="text-slate-400 font-medium text-sm">
                    Nenhum plano alimentar ativo no momento.
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    Aguarde seu nutricionista publicar um plano.
                  </p>
                </div>
              )}

              {!isLoading && !isError && blocks.length > 0 && (
                <MealScrollWheel
                  blocks={blocks}
                  completed={completed}
                  onToggle={toggleBlock}
                />
              )}
            </div>
          </div>
        </PageShell>
    </DashboardLayout>
  );
}

// ─── Meal Scroll Wheel ───────────────────────────────────────────────────────

interface WheelProps {
  blocks: MealPlanBlock[];
  completed: Set<string>;
  onToggle: (id: string) => void;
}

function MealScrollWheel({ blocks, completed, onToggle }: WheelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Find which item is snapped to the top of the container
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;

    let closest = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const dist = Math.abs(ref.offsetTop - scrollTop);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative overflow-hidden rounded-[24px]">

      {/* ── Top fade (drum roll effect) ── */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, #e9e9e9 0%, #e9e9e9 25%, rgba(233,233,233,0) 100%)",
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: "100px",
          background: "linear-gradient(to top, #e9e9e9 0%, #e9e9e9 20%, rgba(233,233,233,0) 100%)",
        }}
      />

      {/* ── Position dots (right rail) ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 pr-1 pointer-events-none">
        {blocks.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: "3px",
              height: i === activeIndex ? "16px" : "3px",
              backgroundColor: i === activeIndex ? "#d4f54c" : "#cbd5e1",
            }}
          />
        ))}
      </div>

      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: "min(480px, 60vh)",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {/* Padding top so first item can snap to top from center */}
        <div style={{ height: "4px", flexShrink: 0 }} />

        {blocks.map((block, index) => {
          const distance = Math.abs(index - activeIndex);

          return (
            <div
              key={block.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Drum-roll visual wrapper */}
              <div
                style={{
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.55 : 0.22,
                  transform: `scale(${distance === 0 ? 1 : distance === 1 ? 0.97 : 0.93})`,
                  transformOrigin: "top center",
                  transition: "opacity 300ms ease, transform 300ms ease",
                }}
                className="pb-3"
              >
                <MealBlock
                  block={block}
                  isCompleted={completed.has(block.id)}
                  onToggle={() => onToggle(block.id)}
                  defaultOpen={index === 0}
                />
              </div>
            </div>
          );
        })}

        {/* Spacer at bottom so last item can scroll to top */}
        <div style={{ height: "380px", flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ─── Meal Block ──────────────────────────────────────────────────────────────

interface MealBlockProps {
  block: MealPlanBlock;
  isCompleted: boolean;
  onToggle: () => void;
  defaultOpen?: boolean;
}

function MealBlock({ block, isCompleted, onToggle, defaultOpen = true }: MealBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subReason, setSubReason] = useState("dislike");
  const [subNote, setSubNote] = useState("");

  const swapRequest = useMealSwapRequest();
  const Icon = getMealIcon(block.title, block.time);
  const totals = sumMacros(block.items);

  const handleToggle = () => {
    onToggle();
    if (!isCompleted) setIsOpen(false);
  };

  const handleSubRequest = () => {
    swapRequest.mutate(
      { blockId: block.id, reason: subReason, note: subNote || undefined },
      {
        onSuccess: () => {
          toast({
            title: "Solicitação enviada!",
            description: "Sua nutricionista será notificada e ajustará sua refeição em breve.",
            className: "bg-[#d4f54c] text-black border-none",
          });
          setIsSubOpen(false);
          setSubNote("");
        },
        onError: () => {
          toast({
            title: "Erro ao enviar",
            description: "Tente novamente em instantes.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <>
      <div
        className={cn(
          "bg-white rounded-[24px] shadow-sm overflow-hidden border transition-colors duration-300",
          isCompleted
            ? "border-[#d4f54c]/40 bg-[#fafff0]"
            : "border-transparent"
        )}
      >
        {/* ── Header ── */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
                isCompleted ? "bg-[#d4f54c]" : "bg-slate-100"
              )}
            >
              {isCompleted
                ? <Check size={18} className="text-black" strokeWidth={3} />
                : <Icon size={18} className="text-slate-500" />
              }
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                  {block.time}
                </span>
                {block.type === "snack" && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Lanche
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Concluído
                  </span>
                )}
              </div>
              <h3
                className={cn(
                  "font-bold text-base leading-tight transition-colors",
                  isCompleted ? "text-slate-400 line-through" : "text-slate-900"
                )}
              >
                {block.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-lg font-black text-slate-900 tracking-tight">
                {totals.calories}
              </span>
              <span className="text-[10px] font-bold text-slate-400 ml-1">kcal</span>
            </div>
            {isOpen
              ? <ChevronUp size={16} className="text-slate-400" />
              : <ChevronDown size={16} className="text-slate-400" />
            }
          </div>
        </button>

        {/* ── Collapsible body ── */}
        {isOpen && (
          <div className="px-5 pb-5 border-t border-slate-100">
            <ul className="mt-4 divide-y divide-slate-50">
              {block.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2.5 first:pt-0 gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        isCompleted ? "bg-slate-200" : "bg-[#d4f54c]"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium truncate",
                        isCompleted ? "text-slate-400 line-through" : "text-slate-800"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-slate-400 font-medium">{item.quantity}</span>
                    <span className="text-xs font-black text-slate-600 font-mono w-16 text-right">
                      {item.calories} kcal
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-slate-50">
              {/* Macro pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-600">
                  P {totals.protein}g
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#d4f54c]/20 text-[#3d5200]">
                  C {totals.carbs}g
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-600">
                  G {totals.fat}g
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                {!isCompleted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSubOpen(true)}
                    className="rounded-2xl text-xs font-bold h-8 px-3 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 gap-1.5"
                  >
                    <RefreshCw size={11} />
                    Substituir
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={handleToggle}
                  className={cn(
                    "rounded-2xl text-xs font-black h-8 px-4 gap-1.5 transition-all",
                    isCompleted
                      ? "bg-slate-100 text-slate-500 hover:bg-slate-200 shadow-none"
                      : "bg-[#d4f54c] text-black hover:bg-[#c4e500] shadow-sm"
                  )}
                >
                  {isCompleted
                    ? "Desmarcar"
                    : <><Check size={12} strokeWidth={3} /> Confirmar</>
                  }
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Substitution modal ── */}
      <Dialog open={isSubOpen} onOpenChange={setIsSubOpen}>
        <DialogContent className="bg-white border-slate-100 sm:max-w-md !rounded-[32px] p-0 overflow-hidden">
          <div className="bg-[#d4f54c] px-6 pt-6 pb-5">
            <DialogTitle className="text-black font-bold text-xl leading-tight">
              Solicitar Substituição
            </DialogTitle>
            <DialogDescription className="text-black/60 text-sm mt-1">
              Sua nutricionista será notificada e ajustará o plano.
            </DialogDescription>
          </div>

          <div className="px-6 pt-5 pb-6 space-y-5">
            <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon size={16} className="text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{block.title}</p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {block.time} · {totals.calories} kcal
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Motivo</p>
              <RadioGroup value={subReason} onValueChange={setSubReason} className="gap-2">
                {SUBSTITUTION_REASONS.map((r) => (
                  <div
                    key={r.value}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-200",
                      subReason === r.value
                        ? "border-[#c4e500] bg-[#d4f54c]/10"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <RadioGroupItem
                      value={r.value}
                      id={`sub-${block.id}-${r.value}`}
                      className="border-slate-300 data-[state=checked]:border-[#3d5200] data-[state=checked]:bg-[#d4f54c]"
                    />
                    <Label
                      htmlFor={`sub-${block.id}-${r.value}`}
                      className="cursor-pointer text-sm font-medium text-slate-700 flex-1"
                    >
                      {r.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Observação (opcional)
              </p>
              <Textarea
                placeholder="Ex: sou intolerante a lactose, prefiro proteínas magras..."
                value={subNote}
                onChange={(e) => setSubNote(e.target.value)}
                rows={3}
                className="bg-slate-50 border-slate-100 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 resize-none focus-visible:ring-[#d4f54c]/60 focus-visible:border-[#d4f54c]"
              />
            </div>

            <DialogFooter className="gap-2 pt-1">
              <Button
                variant="ghost"
                onClick={() => setIsSubOpen(false)}
                className="rounded-2xl text-slate-500 hover:text-slate-800 font-bold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubRequest}
                disabled={swapRequest.isPending}
                className="rounded-2xl bg-[#d4f54c] text-black hover:bg-[#c4e500] font-black shadow-sm gap-1.5"
              >
                {swapRequest.isPending
                  ? <Loader2 size={14} className="animate-spin" />
                  : "Enviar Solicitação"
                }
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
