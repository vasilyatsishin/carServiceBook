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

// GET
export const getCarById = async (id: number): Promise<CarReceivingObject> => {
  const res = await api.get<CarReceivingObject>(API_CONSTANTS.CARS.CARS + id);
  return res.data;
};

// PUT

export const updateOdometer = async (
  carId: number,
  newOdometer: number
): Promise<String> => {
  const res = await api.patch<String>(
    `${API_CONSTANTS.CARS.UPDATE_ODOMETER}?carId=${carId}&newOdometer=${newOdometer}`
  );

  return res.data;
};

// POST
export const addCar = async (car: CarEntity): Promise<CarEntity> => {
  const formData = prepareCarFormData(car);
  const res = await api.post<CarEntity>(
    API_CONSTANTS.CARS.CAR_CREATE,
    formData
  );
  return res.data;
};

// PUT
export const updateCar = async (car: CarEntity): Promise<CarEntity> => {
  const formData = prepareCarFormData(car);
  // Додаємо ID до URL, якщо ваш бекенд очікує /update/{id}
  const res = await api.put<CarEntity>(API_CONSTANTS.CARS.UPDATE_CAR, formData);
  return res.data;
};

// DELETE
export const deleteCar = async (carId: number): Promise<string> => {
  const res = await api.delete<string>(
    `${API_CONSTANTS.CARS.DELETE_CAR}/${carId}`
  );
  return res.data;
};

const prepareCarFormData = (car: CarEntity): FormData => {
  console.log(car);
  
  const formData = new FormData();
  formData.append("name", car.name);

  const odometerNumber = parseOdometerIntoNumber(car.odometer);
  formData.append("odometer", odometerNumber.toString());

  if (car.id) {
    formData.append("id", car.id.toString());
  }

  // Додаємо фото тільки якщо це новий файл (File)
  if (car.photo instanceof File) {
    formData.append("photo", car.photo);
  }

  return formData;
};
