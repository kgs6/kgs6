import RecordDTO from "./record-dto";


export default interface SectionDto {
    id: string;
    yearId: string;
    type: string;
    title: string;
    orderNo: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    entries: RecordDTO[];
}