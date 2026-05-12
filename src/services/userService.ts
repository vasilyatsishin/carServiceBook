import api from "../api/apiConfig";
import type { UserClientDTO } from "../interfaces/Cars/CarInterface";

export const getClients = async (): Promise<UserClientDTO[]> => {
  const res = await api.get<UserClientDTO[]>("/users/clients");
  return res.data;
};
