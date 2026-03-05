import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

export default function AdminTableSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start w-20"}>
              <Skeleton className={"w-full h-3/5"} />
            </TableHead>
            <TableHead className={"text-center"}></TableHead>
            <TableHead className={"text-start w-28"}>
              <Skeleton className={"w-full h-3/5"} />
            </TableHead>
            <TableHead className={"text-start w-28"}>
              <Skeleton className={"w-full h-3/5"} />
            </TableHead>
            <TableHead className={"text-start w-36"}>
              <Skeleton className={"w-full h-3/5"} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((_, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="h-12">
                <Skeleton className="h-4 w-full" />
              </TableCell>

              <TableCell>
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>

              <TableCell className="w-28">
                <Skeleton className="h-4 w-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}