import AttachmentDTO from "./attachment-dto";


export default interface RecordDTO {
    id: string;
    sectionId: string;
    title: string;
    description: string;
    orderNo: number;
    isActive: boolean;
    publishedAt: string;
    attachments: AttachmentDTO[];
    createdAt: string;
    updatedAt: string;
}