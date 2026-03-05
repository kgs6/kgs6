import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {FunnelX, Search} from "lucide-react";
import {SectionDTO} from "@/entities/section";
import {useEffect, useMemo, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

type StatusFilter = "all" | "active" | "inactive";


interface SectionFilterProps {
  sections: SectionDTO[];
  onFilter: (filtered: SectionDTO[]) => void;
  allowReorder: boolean;
  setAllowReorder: (allow: boolean) => void;
}

export default function SectionFilter({sections, onFilter, setAllowReorder}: SectionFilterProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const preparedSections = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byStatus = status === "all" ? sections : sections.filter(s => status === "active" ? s.isActive : !s.isActive);
    return q ? byStatus.filter(s => s.title.toLowerCase().includes(q)) : byStatus;
  }, [sections, status, search]);

  useEffect(() => {
    const isFiltersEmpty = status === "all" && search.trim() === "";
    setAllowReorder(isFiltersEmpty);
  }, [status, search, setAllowReorder]);

  useEffect(() => {
    onFilter(preparedSections);
  }, [preparedSections, onFilter]);

  const handleClearFilters = () => {
    setStatus("all");
    setSearch("");
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-6 sm:items-center sm:justify-between">
      <Tabs value={status} onValueChange={v => setStatus(v as StatusFilter)}>
        <TabsList>
          <TabsTrigger value="all">Всі</TabsTrigger>
          <TabsTrigger value="active">Активні</TabsTrigger>
          <TabsTrigger value="inactive">Неактивні</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1">
        <InputGroup>
          <InputGroupInput
            placeholder="Пошук по назві розділу"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroupAddon><Search /></InputGroupAddon>
          <InputGroupAddon align="inline-end">{preparedSections.length} результатів</InputGroupAddon>
        </InputGroup>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleClearFilters}>
            <FunnelX />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Очистити фільтри</TooltipContent>
      </Tooltip>
    </div>
  );
}