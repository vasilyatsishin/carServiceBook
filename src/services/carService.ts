import api, { BASE_URL } from "../api/apiConfig";
import type {
  CarEntity,
  CarReceivingObject,
} from "../interfaces/Cars/CarInterface";

// GET
export const getCars = async (): Promise<CarReceivingObject[]> => {
  const res = await api.get<CarReceivingObject[]>("/cars/exist-cars");
  return res.data.map((car) => ({
    ...car,
    // Тепер photo — це просто посилання на ваш сервер
    photoUrl: `${BASE_URL}/cars/${car.id}/photo`,
  }));
};

// POST
export const addCar = async (car: CarEntity): Promise<CarEntity> => {
  const res = await api.post<CarEntity>("/cars", car);
  return res.data;
};
