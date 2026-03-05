import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {YearDTO} from "@/types/DTOs/public/year-dto";
import { PAGES } from "@/shared/config/pages.config";

interface YearNavigationProps {
  years: YearDTO[];
  activeYear: number;
}

export default function YearNavigation({ years, activeYear }: YearNavigationProps) {
  return (
    <nav className="flex flex-col gap-1">
      {years?.map((y) => (
        <Link
          key={y.year}
          href={PAGES.STOCK_INFO_FOR_YEAR(y.year)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start hover:bg-transparent",
            activeYear === y.year
              ? "text-primary font-bold"
              : "text-muted-foreground"
          )}
        >
          {y.year} рік
        </Link>
      ))}
    </nav>
  );
}