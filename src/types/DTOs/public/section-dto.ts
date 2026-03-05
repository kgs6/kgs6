import RecordDTO from "@/types/DTOs/public/record-dto";

export default interface SectionDTO{
  title: string;
  orderNo: number;
  entries?: RecordDTO[]
}