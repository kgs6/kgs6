

export interface SectionDTO {
  id: string;
  yearId: string
  name: string;
  title: string;
  orderNo: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    entries: number;
  }
}