import SectionDto from "./section-dto";

export default interface YearDto {
    id: string;
    year: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    sections: SectionDto[];
}