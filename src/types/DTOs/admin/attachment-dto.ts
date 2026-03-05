export default interface AttachmentDTO {
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
