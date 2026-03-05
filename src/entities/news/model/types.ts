export interface NewsDTO {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  isActive: boolean;
}

export interface NewsCreateDTO {
  title: string;
  description: string;
  publishedAt: string;
}

export interface NewsEditDTO {
  title: string;
  description: string;
  publishedAt: string;
}

export interface NewsPublicDTO {
  title: string;
  description: string;
  publishedAt: string;
}