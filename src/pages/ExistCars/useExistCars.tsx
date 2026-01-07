import { useState } from "react";
import { getCars } from "../../services/carService";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../../redux/slices/carsSlice";
import type { RootState } from "../../redux/store";

export const useExistCars = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.carsState.cars);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const data = await getCars();
      dispatch(setCars(data));
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
  };
};
