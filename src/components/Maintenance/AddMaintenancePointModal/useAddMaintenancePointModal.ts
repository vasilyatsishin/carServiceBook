import { useEffect, useState } from "react";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import type { MaintenanceJobSendObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import { addMaintenanceTypeJob } from "../../../services/maintenanceService";
import { parseOdometerIntoNumber } from "../../../shared/helpers/formatters/carFormatter";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";
import { QueryKeys } from "../../../interfaces/QueryKeys";

interface useAddMaintenancePointModalProps {
  carId: string;
  setIsVisible: (visible: boolean) => void;
}

export const useAddMaintenancePointModal = ({
  carId,
  setIsVisible,
}: useAddMaintenancePointModalProps) => {
  const [name, setName] = useState<string>("");
  const [interval, setInterval] = useState<string>("");
  const [addToAllCars, setAddToAllCars] = useState<boolean>(false);
  const [regular, setRegular] = useState<boolean>(false);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);

  useEffect(() => {
    const isFormValid = name.trim().length >= 3 && odometorValidator(interval);
    setIsSendButtonActive(isFormValid);
  }, [name, interval]);

  const { mutate: addMaintenance, isPending } = useApiMutation({
    mutationFn: (data: MaintenanceJobSendObject) => addMaintenanceTypeJob(data),
    invalidateKeys: [[QueryKeys.NEXT_MAINTENANCES_LIST, carId]],
    onSuccessCallback: () => {
      setIsVisible(false);
      setName("");
      setInterval("");
      setAddToAllCars(false);
    },
  });

  const handleSubmit = () => {
    const sendObject: MaintenanceJobSendObject = {
      name,
      interval: parseOdometerIntoNumber(interval),
      applyToAllCars: addToAllCars,
      carId: Number(carId),
      regular,
    };

    // Викликаємо метод mutate
    addMaintenance(sendObject);
  };

  return {
    state: {
      name,
      interval,
      isSendButtonActive,
      addToAllCars,
      regular,
      isLoading: isPending, // Можна додати лоадер на кнопку
    },
    setters: {
      setInterval,
      setName,
      setRegular,
      setAddToAllCars,
    },
    handlers: {
      handleSubmit, // Тепер це звичайна функція, яку клікає кнопка
    },
  };
};
