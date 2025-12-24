import type { AxiosInstance } from "axios";
import axios from "axios";

export const BASE_URL = "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Інтерсептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
