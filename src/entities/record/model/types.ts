import { AdminAttachmentDTO } from "@/entities/file";


export interface RecordDTO {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  orderNo: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default interface RecordAdminDTO {
    id: string;
    sectionId: string;
    title: string;
    description: string;
    orderNo: number;
    isActive: boolean;
    publishedAt: string;
    attachments: AdminAttachmentDTO[];
    createdAt: string;
    updatedAt: string;
}