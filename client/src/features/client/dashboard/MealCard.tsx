import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MealItem } from "@/lib/mockData";
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

interface MealCardProps {
  meal: MealItem;
  onToggleStatus: (id: string) => void;
  onSwapItem: (id: string, newItem: string) => void;
}

export function MealCard({ meal, onToggleStatus, onSwapItem }: MealCardProps) {
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(meal.swapOptions?.[0] || "");

  const isCompleted = meal.status === "completed";

  const handleSwap = () => {
    onSwapItem(meal.id, selectedSwap);
    setIsSwapOpen(false);
  };

  return (
    <>
      <div className="relative pl-8 pb-8 last:pb-0 group">
        {/* Timeline Line */}
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-white/10 group-last:hidden" />
        
        {/* Timeline Dot */}
        <div className={cn(
          "absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10",
          isCompleted 
            ? "bg-nutrition border-nutrition shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
            : "bg-background border-white/20 group-hover:border-primary/50"
        )}>
          {isCompleted && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <span className="text-sm font-medium text-muted-foreground font-mono flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {meal.time}
          </span>
          <h3 className={cn("text-xl font-heading tracking-wide transition-colors", isCompleted && "text-nutrition")}>
            {meal.title}
          </h3>
        </div>

        <Card className={cn(
          "border-white/5 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80",
          isCompleted && "bg-nutrition/5 border-nutrition/20"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <ul className="space-y-1.5 flex-1">
                {meal.items.map((item, idx) => (
                  <li key={idx} className={cn(
                    "text-sm transition-all duration-300",
                    isCompleted ? "text-muted-foreground line-through opacity-50" : "text-white"
                  )}>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-end gap-2">
                <div className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
                  {meal.calories} kcal
                </div>
                
                {meal.swapOptions && !isCompleted && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                    onClick={() => setIsSwapOpen(true)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
               <Button
                variant={isCompleted ? "outline" : "default"}
                size="sm"
                className={cn(
                  "w-full sm:w-auto transition-all duration-300 font-heading tracking-wide",
                  isCompleted 
                    ? "border-nutrition/50 text-nutrition hover:bg-nutrition/10 hover:text-nutrition" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(223,255,0,0.15)] hover:shadow-[0_0_20px_rgba(223,255,0,0.3)]"
                )}
                onClick={() => onToggleStatus(meal.id)}
              >
                {isCompleted ? "Desmarcar" : "Check Refeição"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Swap Dialog */}
      <Dialog open={isSwapOpen} onOpenChange={setIsSwapOpen}>
        <DialogContent className="bg-card border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl tracking-wide">Trocar Alimento</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Selecione uma opção equivalente para substituir sua refeição.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={selectedSwap} onValueChange={setSelectedSwap} className="gap-3">
              {meal.swapOptions?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-transparent hover:border-primary/30 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                  <RadioGroupItem value={option} id={`opt-${idx}`} className="border-white/20 text-primary" />
                  <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer font-medium text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsSwapOpen(false)}>Cancelar</Button>
            <Button onClick={handleSwap} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Confirmar Troca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
