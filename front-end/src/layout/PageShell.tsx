import { cn } from "@/lib/utils";

interface PageShellProps {
    children: React.ReactNode;
    className?: string;
    /** Se true, remove o padding interno (ex: para telas com scroll próprio como o Chat) */
    noPadding?: boolean;
}

/**
 * PageShell — wrapper padronizado que aplica o design padrão do Fitness Sincera:
 * fundo cinza arredondado (#e9e9e9), overflow controlado, padding.
 */
export function PageShell({ children, className, noPadding = false }: PageShellProps) {
    return (
        <div
            className={cn(
                "flex-1 bg-[#e9e9e9] rounded-[28px] md:rounded-[36px] overflow-y-auto selection:bg-[#d4f54c] selection:text-black",
                !noPadding && "p-4 md:p-8",
                className
            )}
        >
            {children}
        </div>
    );
}
