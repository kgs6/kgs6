import React from 'react';
import AttachmentDto from "@/types/DTOs/public/attachment-dto";
import { getFileType } from "@/shared/lib/get-file-type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface FileDownloadItemProps {
  file: AttachmentDto;
}

const FILE_TYPE_CONFIG: Record<string, { label: string; classes: string }> = {
  pdf: { label: "PDF", classes: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" },
  xml: { label: "XML", classes: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  doc: { label: "DOC", classes: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  docx: { label: "DOCX", classes: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  txt: { label: "TXT", classes: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  default: { label: "UNK", classes: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300" }
};

export default function FileDownloadItem({ file }: FileDownloadItemProps) {
  const { type, isSigned } = getFileType(file.fileName);

  const config = FILE_TYPE_CONFIG[type] || FILE_TYPE_CONFIG.default;

  return (
    <div className="flex items-center gap-2">
      <a
        href={file.url}
        target="_blank"
        download={file.fileName}
        rel="noopener noreferrer"
      >
        <Badge variant="ghost" className={cn(config.classes)}>
          {config.label}
          {/*{isSigned ? */}
          {/*  <span className={"text-green-700 dark:text-green-300"}>*/}
          {/*    (ЕЦП)*/}
          {/*  </span> : ""}*/}
          {isSigned ?
            <span>
              (ЕЦП)
            </span> : ""}
        </Badge>
      </a>
    </div>
  );
};