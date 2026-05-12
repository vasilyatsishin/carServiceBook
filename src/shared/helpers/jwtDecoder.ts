import { jwtDecode } from "jwt-decode";
import type { AccessTokenView } from "../../interfaces/AuthInterfaces";

export const getTokenData = (): AccessTokenView | null => {
  const token = localStorage.getItem("access");
  if (!token) return null;
  try {
    return jwtDecode<AccessTokenView>(token); // передаємо generic
  } catch {
    return null;
  }
};

export const getUserRole = (): string | null => getTokenData()?.role ?? null;
export const getUserId = (): string | null => getTokenData()?.sub ?? null;
