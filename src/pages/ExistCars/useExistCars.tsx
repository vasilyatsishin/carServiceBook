import { useState } from "react";
import { type CarReceivingObject } from "../../interfaces/Cars/CarInterface";
import { getCars } from "../../services/carService";

export const useExistCars = () => {
  const [cars, setCars] = useState<CarReceivingObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const data = await getCars();
      setCars(data);
      console.log(data); // тут вже є дані
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    functions: {
      fetchCars,
    },
    state: {
      cars,
      isLoading,
    },
    setters: {
      setCars,
    },
  };
};
