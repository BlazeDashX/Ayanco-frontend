import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionTitle({
  label,
  title,
  subtitle,
  centered = false,
  dark = false,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      {label && (
        <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">
          {label}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-black tracking-tight",
          dark ? "text-zinc-900" : "text-[#FAFAF9]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-2xl", dark ? "text-zinc-500" : "text-[#A8A29E]", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
