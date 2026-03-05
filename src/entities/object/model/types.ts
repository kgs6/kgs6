
export interface ObjectDTO {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  image: ObjectIMGDTO;
}

export interface CreateObjectDTO {
  name: string;
  description: string;
  status: string;
  isActive: boolean;
}

export interface ObjectIMGDTO {
  url: string;
  fileName: string;
  fileSize: number;
}

export interface ObjectPublicDTO {
  name: string;
  description: string;
  image: {
    url: string;
  };
}