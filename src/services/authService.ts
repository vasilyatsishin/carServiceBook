import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type { LoginDTO, RegisterDTO } from "../interfaces/AuthInterfaces";

// POST
export const register = async (user: RegisterDTO): Promise<string> => {
  const res = await api.post<string>(API_CONSTANTS.AUTH.REGISTER, user, {
    withCredentials: true, // Додай це тут теж!
  });

  return res.data;
};

// POST
export const login = async (user: LoginDTO): Promise<string> => {
  const res = await api.post<string>(API_CONSTANTS.AUTH.LOG_IN, user, {
    withCredentials: true,
  });
  return res.data;
};

// POST
export const logout = async (): Promise<void> => {
  await api.post(API_CONSTANTS.AUTH.LOG_OUT, {}, { withCredentials: true });
};
