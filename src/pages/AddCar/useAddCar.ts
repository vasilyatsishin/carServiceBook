import { useApiQuery } from "../../shared/hooks/useApiQuery";
import { useParams } from "react-router";
import { getCarById } from "../../services/carService";
import { useQueryClient } from "@tanstack/react-query";
import type { CarReceivingObject } from "../../interfaces/Cars/CarInterface";

interface UseAddCarProps {
  isEdit: boolean;
}

export const useAddCar = ({ isEdit }: UseAddCarProps) => {
  const { carId } = useParams();
  const queryClient = useQueryClient();

  const carFromList = isEdit
    ? queryClient
        .getQueryData<CarReceivingObject[]>(["carsList"])
        ?.find((c) => c.id === Number(carId))
    : undefined;

  const carQuery = useApiQuery(
    ["carInfo", carId],
    () => getCarById(Number(carId)),
    {
      enabled: isEdit && !!carId,
      initialData: carFromList,
    }
  );

  return {
    carInfo: carQuery.data,
  };
};
