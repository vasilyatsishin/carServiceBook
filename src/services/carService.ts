import api, { BASE_URL } from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type {
  CarEntity,
  CarReceivingObject,
} from "../interfaces/Cars/CarInterface";
import { parseOdometerIntoNumber } from "../shared/helpers/formatters/carFormatter";

// GET
export const getCars = async (): Promise<CarReceivingObject[]> => {
  const res = await api.get<CarReceivingObject[]>(
    API_CONSTANTS.CARS.GET_EXIST_CARS
  );
  return res.data.map((car) => ({
    ...car,
    // Тепер photo — це просто посилання на ваш сервер
    photoUrl: `${BASE_URL}/cars/${car.id}/photo`,
  }));
};

// POST
export const addCar = async (car: CarEntity): Promise<CarEntity> => {
  const formData = new FormData();
  formData.append("name", car.name);
  const odometerNumber = parseOdometerIntoNumber(car.odometer);
  formData.append("odometer", odometerNumber.toString());
  if (car.photo) formData.append("photo", car.photo);

  const res = await api.post<CarEntity>(
    API_CONSTANTS.CARS.CAR_CREATE,
    formData
  );
  return res.data;
};
