export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
};