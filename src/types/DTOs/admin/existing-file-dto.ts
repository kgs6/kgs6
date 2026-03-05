import {AttachmentType} from "@/generated/prisma/enums";

export interface ExistingFileDTO {
  id: string;
  name: string;
  url: string;
  size: number;
  type: AttachmentType;
  orderNo: number;
}