import {DataType} from "csstype";
import AttachmentDTO from "@/types/DTOs/admin/attachment-dto";

export default interface RecordDTO {
  title: string;
  description?: string;
  publishedAt: string;
  attachments?: AttachmentDTO[];
}