import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;
export const BASE_DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Токен до кожного запиту
api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Інтерсептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;

    // 1. Обробка таймауту
    if (error.code === "ECONNABORTED") {
      return Promise.reject("Отакої... Помилка отримання даних (таймаут)");
    }

    // 2. Логіка Refresh Token (якщо прийшов 401)
    // Перевіряємо статус через error.response
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Шлемо запит БЕЗ тіла, але з withCredentials
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // ОБОВ'ЯЗКОВО, щоб браузер відправив куки
          },
        );

        localStorage.setItem("access", data);
        api.defaults.headers.common["Authorization"] = `Bearer ${data}`;
        originalRequest.headers["Authorization"] = `Bearer ${data}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Якщо рефреш не вдався - чистимо все і на вихід
        localStorage.removeItem("access");
        window.location.href = "/login";
        return Promise.reject("Сесія завершена. Увійдіть знову.");
      }
    }

    // 3. Формуємо повідомлення про помилку з об'єкта відповіді
    // Беремо message з твого ErrorResponse з беку
    const errorMessage =
      error.response?.data?.message || "Сталася системна помилка";

    return Promise.reject(errorMessage);
  },
);

export default api;
