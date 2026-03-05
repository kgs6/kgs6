import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
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
          {years.map((yearItem, index) => (
            <YearTableRow key={index} year={yearItem}/>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}