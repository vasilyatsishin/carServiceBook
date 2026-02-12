import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Інтерсептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject("Отакої... Помилка отримання даних");
    }
    const message = error.response?.data?.message || "Сталася системна помилка";
    return Promise.reject(message);
  }
);

export default api;
