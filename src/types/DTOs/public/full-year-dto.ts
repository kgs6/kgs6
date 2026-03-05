import SectionDTO from "@/types/DTOs/public/section-dto";

export interface FullYearDTO {
  year: number;
  sections?: SectionDTO[]
}