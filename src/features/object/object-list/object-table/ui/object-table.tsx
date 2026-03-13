import { ObjectDTO } from "@/entities/object"
import ObjectTableRow from "./object-table-row"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface ObjectTableProps {
  objects: ObjectDTO[]
}


export default function ObjectTable({ objects }: ObjectTableProps) {
  return (
    <div className={"border rounded-lg overflow-hidden"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start w-16 truncate"}>Зображення</TableHead>
            <TableHead className={"text-start min-w-36 truncate"}>Назва</TableHead>
            <TableHead className={"text-start w-28"}>Статус</TableHead>
            <TableHead className={"text-start w-36"}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objects && objects.length > 0 ? (
            objects.map((item) => <ObjectTableRow key={item.id} object={item} />)
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