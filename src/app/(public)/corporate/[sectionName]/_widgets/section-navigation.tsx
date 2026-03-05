"use client";

import { cn } from "@/shared/lib/utils";
import SectionDTO from "@/types/DTOs/public/section-dto";

interface SectionNavigationProps {
  sections: SectionDTO[];
  activeOrderNo: number;
}

export function SectionNavigation({ sections, activeOrderNo }: SectionNavigationProps) {
  const scrollTo = (orderNo: number) => {
    const element = document.getElementById(`section-${orderNo}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="flex flex-col border-l relative">
      {sections.map((section) => (
        <button
          key={section.orderNo}
          onClick={() => scrollTo(section.orderNo)}
          className={cn(
            "text-sm text-left pl-4 py-2 -ml-px border-l-2 transition-all duration-200",
            activeOrderNo === section.orderNo
              ? "text-primary font-semibold border-primary"
              : "text-muted-foreground border-transparent hover:border-slate-300 hover:text-foreground"
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}