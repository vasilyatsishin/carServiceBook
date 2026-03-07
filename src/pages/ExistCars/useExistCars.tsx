import { useState } from "react";
import { getCars } from "../../services/carService";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../../redux/slices/carsSlice";
import type { RootState } from "../../redux/store";
import { useApiMutation } from "../../shared/hooks/useApiMutation";
import { deleteCar as deleteCarService } from "../../services/carService";
import { QueryKeys } from "../../interfaces/QueryKeys";
import { useToast } from "../../shared/providers/ToastProvider";

export const useExistCars = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

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

  const { mutate: deleteCar, isPending } = useApiMutation({
    mutationFn: (carId: number) => {
      return deleteCarService(carId);
    },
    invalidateKeys: (carId) => [
      [QueryKeys.CAR, String(carId)],
      [QueryKeys.CAR_LIST],
      [QueryKeys.NEXT_MAINTENANCES_LIST, String(carId)],
    ],
    onSuccessCallback: async (response) => {
      await fetchCars();
      toast(response);
    },
    onErrorCallback: (response) => {
      toast(response, "error");
    },
  });

  return {
    functions: {
      fetchCars,
      deleteCar
    },
    state: {
      cars,
      isLoading: isLoading || isPending,
    },
  };
};
