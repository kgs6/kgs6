import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {ArrowDown01, ArrowUp10, Search} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {NewsDTO} from "@/entities/news";

type SortMode = "desc" | "asc";
type StatusFilter = "all" | "active" | "inactive";

interface NewsFilterProps {
  news: NewsDTO[];
  onFilter: (filtered: NewsDTO[]) => void;
}

export default function NewsFilter({news, onFilter}: NewsFilterProps) {
  const [sortMode, setSortMode] = useState<SortMode>("desc");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const preparedNews = useMemo(() => {
    const q = search.trim().toLowerCase();

    let filtered = status === "all"
      ? news
      : news.filter(n => status === "active" ? n.isActive : !n.isActive);

    if (q) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.publishedAt.includes(q)
      );
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();

      return sortMode === "desc" ? dateB - dateA : dateA - dateB;

    });
  }, [news, status, sortMode, search]);

  useEffect(() => {
    onFilter(preparedNews);
  }, [preparedNews, onFilter]);

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
          placeholder="Пошук новин..."
        />
        <InputGroupAddon><Search size={18}/></InputGroupAddon>
        <InputGroupAddon align="inline-end">{preparedNews.length} результатів</InputGroupAddon>
      </InputGroup>

      <Tabs value={sortMode} onValueChange={v => setSortMode(v as SortMode)}>
        <TabsList>
          <TabsTrigger value="desc" className="gap-2">
            Нові <ArrowUp10 size={16}/>
          </TabsTrigger>
          <TabsTrigger value="asc" className="gap-2">
            Старі <ArrowDown01 size={16}/>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}