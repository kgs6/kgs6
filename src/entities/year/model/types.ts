export interface YearDTO {
  id: string;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    sections: number;
  }
}