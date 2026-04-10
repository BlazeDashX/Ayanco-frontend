import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray" | "dark";
  border?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  background = "white",
  border = true,
}: SectionWrapperProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-[#F5F4F0]",
    dark: "bg-[#09090B]",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-24 lg:py-32",
        bgClasses[background],
        border && "border-t border-zinc-200",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}
