import RecordDTO from "@/types/DTOs/public/record-dto";
import FileDownloadItem from "./file-download-item";


export function RecordCard({ entry }: { entry: RecordDTO }) {
  const sortedAttachments = [...(entry.attachments || [])].sort((a, b) => a.orderNo - b.orderNo);

  return (
    <div className="w-full min-w-0 py-1 px-3 md:px-6 overflow-hidden">
      <div className="min-w-0">
        <div className="flex flex-col lg:flex-row justify-start items-start  lg:justify-between ">
          <div className="flex gap-2 flex-row w-full items-start">
            <p className="w-28 text-xs text-muted-foreground rounded-xl">
              {new Date(entry.publishedAt).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <div className="flex w-full items-start">
              <h4 className="text-sm sm:text-base  leading-tight flex-1 min-w-0 wrap-break-words">
                {entry.title}
              </h4>

              <div className={"hidden lg:flex lg:justify-end gap-2 w-60"}>
                {sortedAttachments.map((file, idx) => (
                  <FileDownloadItem key={idx} file={file} />
                ))}
              </div>
            </div>


          </div>
          <div className={"w-full flex lg:hidden gap-2 items-start mt-4"}>
            {sortedAttachments.map((file, idx) => (
              <FileDownloadItem key={idx} file={file} />
            ))}
          </div>
        </div>

        {entry.description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed wrap-break-words line-clamp-3">
            {entry.description}
          </p>
        )}
      </div>

      {/*{sortedAttachments.length > 0 ? (*/}
      {/*  <div className="flex flex-col gap-2 w-full min-w-0">*/}
      {/*    {sortedAttachments.map((file, idx) => (*/}
      {/*      <FileItem key={idx} file={file} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className="text-[10px] uppercase text-muted-foreground/50 border-t pt-3 font-semibold italic">*/}
      {/*    Документи відсутні*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
    ;
}