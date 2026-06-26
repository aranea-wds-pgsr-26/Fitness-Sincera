import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UpgradeCTACard() {
  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-4 overflow-hidden relative border-none bg-[#DFFF00] text-black h-[300px] flex items-center group">
      {/* Abstract Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_rgba(0,0,0,0.2),_transparent_50%)]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[linear-gradient(to_left,_rgba(255,255,255,0.2),_transparent)] pointer-events-none" />
      
      <CardContent className="relative flex items-center justify-between p-8 md:p-12 w-full h-full">
        <div className="flex flex-col gap-6 max-w-lg z-10">
          <div>
            <div className="inline-block bg-black/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
              Premium Access
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-[0.9] tracking-tight mb-2">
              DESBLOQUEIE SEU<br/>
              <span className="opacity-60">POTENCIAL MÁXIMO</span>
            </h2>
            <p className="font-medium text-black/70 max-w-sm mt-4 text-lg">
              Acesso ilimitado a planos de treino personalizados e chat direto com seu nutricionista.
            </p>
          </div>
          
          <Button className="w-fit bg-black text-white hover:bg-black/80 border-none h-12 px-8 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Fazer Upgrade Agora
          </Button>
        </div>

        {/* 3D Phone Mockup Container */}
        <div className="hidden md:block absolute right-0 bottom-[-50px] w-[500px] h-[500px] transition-transform duration-500 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]">
          <img 
            src="/images/phone-mockup.png" 
            alt="App Interface Mockup" 
            className="w-full h-full object-contain drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.5)] rotate-[-5deg]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
