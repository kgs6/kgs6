import { AttachmentType } from "@/generated/prisma/enums";

export interface FileItem {
    id: number | string;
    file?: File;
    url?: string;
    name: string;
    size: number;
    type: string;
    orderNo: number;
}

export interface AdminExistingFileDTO {
  id: string;
  name: string;
  url: string;
  size: number;
  type: AttachmentType;
  orderNo: number;
}

export interface AdminAttachmentDTO {
    id: string;
    orderNo: number;
    entryId: string;
    fileName: string;
    fileSize: number;
    type: string;
    url: string;
    isActive: boolean;
    signed: boolean;
    createdAt: string;
}
