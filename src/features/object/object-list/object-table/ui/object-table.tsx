import { ObjectDTO } from "@/entities/object"
import ObjectTableRow from "./object-table-row"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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
            <TableHead className={"w-36 text-start"}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objects.map((object, index) => (
            <ObjectTableRow key={index} object={object} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}