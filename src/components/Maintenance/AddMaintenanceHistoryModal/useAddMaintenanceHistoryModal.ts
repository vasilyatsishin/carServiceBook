import { useEffect, useState } from "react";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import { addMaintenanceHistory } from "../../../services/maintenanceService";
import type { DropDownOptionsInterface } from "../../../interfaces/DropDownOptionsInterface";
import { parseOdometerIntoNumber } from "../../../shared/helpers/formatters/carFormatter";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";
import { getCarById } from "../../../services/carService";
import { useApiQuery } from "../../../shared/hooks/useApiQuery";
import type { MaintenanceHistorySendObject } from "../../../interfaces/Maintenance/PerformedMaintenanceInterface";
import type { Dayjs } from "dayjs";

interface useAddMaintenanceHistoryModalProps {
  carId: string;
  setIsVisible: (visible: boolean) => void;
}

export const useAddMaintenanceHistoryModal = ({
  carId,
  setIsVisible,
}: useAddMaintenanceHistoryModalProps) => {
  const [place, setPlace] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  const [performedMaintenances, setPerformedMaintenances] = useState<
    DropDownOptionsInterface[]
  >([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [price, setPrice] = useState<string>("");

  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);

  useEffect(() => {
    const isFormValid =
      place.trim().length >= 3 &&
      odometorValidator(odometer) &&
      parseOdometerIntoNumber(odometer) >= carObject.odometer &&
      performedMaintenances.length > 0 &&
      date != null &&
      price != null;
    setIsSendButtonActive(isFormValid);
  }, [performedMaintenances, odometer, place, date]);

  const setToNull = () => {
    setPlace("");
    setOdometer("");
    setPrice("");
    setPerformedMaintenances([]);
    setIsVisible(false);
    setDate(null);
  };

  const { data: carObject } = useApiQuery(
    ["car", carId],
    () => getCarById(Number(carId)),
    {
      enabled: !!carId,
    }
  );

  // Створюємо мутацію
  const { mutate: addMaintenance, isPending } = useApiMutation({
    mutationFn: (data: MaintenanceHistorySendObject) =>
      addMaintenanceHistory(data),
    invalidateKeys: [
      ["maintenanceList", carId],
      ["car", carId],
      ["performedMaintenances", carId],
    ],
    onSuccessCallback: (data) => {
      setToNull();
      console.log("Запис додано успішно:", data);
      // тут можна ще чистити локальні стани або закривати модалку
    },
  });

  const handleSubmit = async () => {
    await addMaintenance({
      carId: Number(carId),
      comment: "asdasd",
      date: date!.format("YYYY-MM-DD"),
      odometer: parseOdometerIntoNumber(odometer),
      performedMaintenance: performedMaintenances.map((e) => e.value),
      place: place,
      price: parseOdometerIntoNumber(price),
    });
  };

  return {
    state: {
      place,
      odometer,
      performedMaintenances,
      isSendButtonActive,
      isLoading: isPending,
      car: carObject,
      date,
      price,
    },
    setters: {
      setPlace,
      setOdometer,
      setPerformedMaintenances,
      setDate,
      setPrice,
    },
    handlers: {
      handleSubmit,
      setToNull, // Тепер це звичайна функція, яку клікає кнопка
    },
  };
};
