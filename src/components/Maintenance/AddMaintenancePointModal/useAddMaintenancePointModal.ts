import { useEffect, useState } from "react";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import type { MaintenanceJobSendObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import { addMaintenanceTypeJob } from "../../../services/maintenanceService";

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
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);

  useEffect(() => {
    const isFormValid = name.trim().length >= 3 && odometorValidator(interval);

    setIsSendButtonActive(isFormValid);
  }, [name, interval]);

  const handleSubmit = async () => {
    const sendObject: MaintenanceJobSendObject = {
      name,
      interval: Number(interval.replace(/\./g, "")),
      applyToAllCars: addToAllCars,
      carId: Number(carId),
    };
    try {
      await addMaintenanceTypeJob(sendObject);
      setIsVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state: {
      name,
      interval,
      isSendButtonActive,
      addToAllCars,
    },
    setters: {
      setInterval,
      setName,
      setAddToAllCars,
    },
    handlers: {
      handleSubmit,
    },
  };
};
