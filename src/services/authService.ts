import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type { RegisterResponse } from "../interfaces/AuthInterfaces";

// POST
export const register = async (): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>(API_CONSTANTS.AUTH.REGISTER, {
    email: "vasylyatsishin@gmail.com",
    password: "12312sd",
    name: "1312",
  });

  return res.data;
};
