"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Dispatch} from "react";

type SelectYearProps = {
  year: string;
  onYearChange: Dispatch<React.SetStateAction<string>>;
  range?: number;
};

export default function SelectYear({ year, onYearChange, range = 40,}: SelectYearProps) {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = React.useState(false);

  const years = React.useMemo(() => {
    const start = currentYear - range;
    const end = currentYear + range;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentYear, range]);

  const selectedRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      selectedRef.current?.scrollIntoView({ block: "center" });
    }, 0);
    return () => clearTimeout(id);
  }, [open, year]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {year || "Оберіть рік"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="center"
        sideOffset={6}
        className="w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto"
      >
        {years.map((y, index) => {
          const yStr = String(y);
          const isSelected = year === yStr;

          return (
            <React.Fragment key={y}>
              <DropdownMenuItem
                ref={isSelected ? selectedRef : null}
                onClick={() => {
                  onYearChange(yStr);
                  setOpen(false);
                }}
                className="flex justify-between"
              >
                {y}
                {isSelected && <Check className="h-4 w-4" />}
              </DropdownMenuItem>

              {index < years.length - 1 && <DropdownMenuSeparator className="mx-1"/>}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
