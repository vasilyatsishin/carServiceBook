export interface RegisterResponse {
  refresh: string;
  access: string;
}

export interface RegisterDTO {
  email: string,
  password: string,
  name: string,
}