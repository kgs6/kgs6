import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useRouter} from "next/navigation";
import {PAGES} from "@/shared/config/pages.config";

interface SelectYearProps {
  years: number[];
  selectedYear: number;
}

export default function SelectYear({years, selectedYear}: SelectYearProps) {
  const router = useRouter();

  const handleYearChange = (year: string) => {
    router.push(PAGES.STOCK_INFO_FOR_YEAR(parseInt(year)));
  };
  
  return (
    <div className="sm:hidden mb-6">
      <Select
        value={selectedYear.toString()}
        onValueChange={handleYearChange}
      >
        <SelectTrigger className="w-full bg-white shadow-sm border-slate-200">
          <SelectValue placeholder="Оберіть рік" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Доступні роки</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year} рік
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
