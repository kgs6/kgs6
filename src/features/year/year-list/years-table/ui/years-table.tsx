import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {YearDTO} from "@/entities/year";
import {YearTableRow} from "@/features/year/year-list/years-table";

interface YearsTableProps {
  years: YearDTO[]
}

export default function YearsTable({years}: YearsTableProps) {
  return (
    <div className={"border rounded-lg overflow-hidden"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start min-w-16"}>Рік</TableHead>
            <TableHead className={"text-start w-28"}>Розділи</TableHead>
            <TableHead className={"text-start w-28"}>Статус</TableHead>
            <TableHead className={"w-36 text-start"}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {years && years.length > 0 ? (
            years.map((item) => <YearTableRow key={item.id} year={item} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground h-24"
              >
                Нічого не знайдено
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}