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

export interface UserAdminDTO {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  oauthOnly: boolean;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  allowOauth: boolean;
  allowPassword: boolean;
  role: "USER" | "ADMIN";
}