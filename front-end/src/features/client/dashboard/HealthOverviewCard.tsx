import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Flame, Footprints, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HealthOverviewCard() {
  return (
    <Card className="col-span-1 md:col-span-2 bg-card border-white/5 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-personal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-5 w-5 text-personal" />
          <span className="font-heading tracking-wide">Visão Geral</span>
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-white">
            Hoje
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
        {/* Left Column: Metrics List */}
        <div className="md:col-span-2 space-y-6">
          {/* Metric 1: Calories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-primary" />
                <span>Calorias Queimadas</span>
              </div>
              <span className="font-bold text-lg">2,340</span>
            </div>
            <Progress value={78} className="h-2 bg-white/5 [&>div]:bg-primary" />
            <p className="text-xs text-muted-foreground text-right">Meta: 3,000 kcal</p>
          </div>

          {/* Metric 2: Steps */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Footprints className="h-4 w-4 text-personal" />
                <span>Passos</span>
              </div>
              <span className="font-bold text-lg">8,547</span>
            </div>
            <Progress value={85} className="h-2 bg-white/5 [&>div]:bg-personal" />
            <p className="text-xs text-muted-foreground text-right">Meta: 10,000</p>
          </div>

          {/* Metric 3: Water */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="h-4 w-4 text-nutrition" />
                <span>Hidratação</span>
              </div>
              <span className="font-bold text-lg">1.8L</span>
            </div>
            <Progress value={60} className="h-2 bg-white/5 [&>div]:bg-nutrition" />
            <p className="text-xs text-muted-foreground text-right">Meta: 3L</p>
          </div>
        </div>

        {/* Right Column: Circular Wellness Gauge */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              {/* Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * 72) / 100}
                className="text-personal drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-heading text-white">72</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Wellness</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-success text-sm font-bold bg-success/10 px-2 py-1 rounded-md">↑ 5%</span>
            <p className="text-xs text-muted-foreground mt-1">vs semana passada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
