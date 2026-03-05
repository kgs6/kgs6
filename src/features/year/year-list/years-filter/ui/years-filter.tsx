import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {ArrowDown01, ArrowUp10, Search} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {YearDTO} from "@/entities/year";

type SortMode = "desc" | "asc";
type StatusFilter = "all" | "active" | "inactive";

interface YearsFilterProps {
  years: YearDTO[];
  onFilter: (filtered: YearDTO[]) => void;
}

export default function YearsFilter({years, onFilter}: YearsFilterProps) {
  const [sortMode, setSortMode] = useState<SortMode>("desc");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const preparedYears = useMemo(() => {
    const q = search.trim();
    const byStatus = status === "all" ? years : years.filter(y => status === "active" ? y.isActive : !y.isActive);
    const bySearch = q ? byStatus.filter(y => String(y.year).includes(q)) : byStatus;
    return [...bySearch].sort((a, b) => sortMode === "desc" ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year));
  }, [years, status, sortMode, search])

  useEffect(() => {
    onFilter(preparedYears);
  }, [preparedYears, onFilter]);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-6 sm:items-center sm:justify-between">
      <Tabs value={status} onValueChange={v => setStatus(v as StatusFilter)}>
        <TabsList>
          <TabsTrigger value="all">Всі</TabsTrigger>
          <TabsTrigger value="active">Активні</TabsTrigger>
          <TabsTrigger value="inactive">Неактивні</TabsTrigger>
        </TabsList>
      </Tabs>

      <InputGroup>
        <InputGroupInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Пошук року..."
        />
        <InputGroupAddon><Search size={18}/></InputGroupAddon>
        <InputGroupAddon align="inline-end"> результатів</InputGroupAddon>
      </InputGroup>

      <Tabs value={sortMode} onValueChange={v => setSortMode(v as SortMode)}>
        <TabsList>
          <TabsTrigger value="desc">Рік: від більшого<ArrowUp10/></TabsTrigger>
          <TabsTrigger value="asc">Рік: від меншого<ArrowDown01/></TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}