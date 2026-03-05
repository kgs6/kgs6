import React from 'react';
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttachmentDto from "@/types/DTOs/public/attachment-dto";
import FileBadges from "@/components/shared/file-icon";
import {formatBytes} from "@/shared/lib/format-bytres";
import {getFileType} from "@/shared/lib/get-file-type";

interface FileItemProps {
  file: AttachmentDto;
}

export function FileItem({ file }: FileItemProps) {
  const { type, isSigned } = getFileType(file.fileName);

  return (
    <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border bg-card transition-colors group gap-2 w-full overflow-hidden">

      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-sm font-medium truncate text-foreground ">
          {file.fileName}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="hidden md:inline-block text-[10px] text-muted-foreground font-mono bg-muted px-1 rounded">
            {formatBytes(file.fileSize)}
          </span>
          <FileBadges type={type} isSigned={isSigned} />
        </div>

        <Button variant="secondary" size="icon" asChild className="h-8 w-8 shrink-0">
          <a 
            href={file.url}
            target="_blank"
            download={file.fileName}
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}