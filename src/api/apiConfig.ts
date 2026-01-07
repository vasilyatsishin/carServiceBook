import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

export const BASE_URL = "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Інтерсептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message = error.response?.data?.message || "Сталася системна помилка";
    return Promise.reject(message);
  }
);

export default api;
