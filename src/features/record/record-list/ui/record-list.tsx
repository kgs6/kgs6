import { useGetRecordsQuery } from "@/entities/record/api/record-admin-api";
import { AdminFilterSkeleton } from "@/widgets/admin-filter-skeleton";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { useParams } from "next/navigation";
import { RecordFilter } from "../record-filter.tsx";
import { RecordTable } from "../record-table";
import { RecordDTO } from "@/entities/record";
import { useState } from "react";


export default function RecordList() {
  const sectionName = useParams().section as string;

  const {data: records, isLoading} = useGetRecordsQuery(sectionName);
  const [filteredRecords, setFilteredRecords] = useState<RecordDTO[]>([]);
  const [allowReorder, setAllowReorder] = useState(true);
  

  return (
    <div className={"mt-4"}>
      {isLoading ? (
        <div>
          <AdminFilterSkeleton />
          <AdminTableSkeleton />
        </div>
      ) : records ? (
        <div>
          <RecordFilter 
            sections={records} 
            onFilter={setFilteredRecords}
            allowReorder={allowReorder}
            setAllowReorder={setAllowReorder}
          />
          <RecordTable records={filteredRecords} allowReorder={allowReorder} />
        </div>
      ) : (
        <div>
          No records found.
        </div>
      )}
      
    </div>
  )
}