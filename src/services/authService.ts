import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type {
  RegisterDTO,
  RegisterResponse,
} from "../interfaces/AuthInterfaces";

// POST
export const register = async (
  user: RegisterDTO
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>(
    API_CONSTANTS.AUTH.REGISTER,
    user
  );

  return res.data;
};
