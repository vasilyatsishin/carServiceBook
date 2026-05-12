import { useEffect, useState } from "react";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import type { MaintenanceJobSendObject } from "../../../interfaces/Maintenance/MaintenanceJobInterface";
import { addMaintenanceTypeJob } from "../../../services/maintenanceService";
import { getCatalog } from "../../../services/catalogService";
import { parseOdometerIntoNumber } from "../../../shared/helpers/formatters/carFormatter";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";
import { QueryKeys } from "../../../interfaces/QueryKeys";
import type { CatalogItem } from "../../../interfaces/Catalog/CatalogInterface";

interface useAddMaintenancePointModalProps {
  carId: string;
  setIsVisible: (visible: boolean) => void;
  scheduledJobNames: string[];
}

export const useAddMaintenancePointModal = ({
  carId,
  setIsVisible,
  scheduledJobNames,
}: useAddMaintenancePointModalProps) => {
  const [catalogId, setCatalogId] = useState<number | null>(null);
  const [interval, setInterval] = useState<string>("");
  const [addToAllCars, setAddToAllCars] = useState<boolean>(false);
  const [regular, setRegular] = useState<boolean>(false);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    getCatalog().then(setCatalogItems).catch(() => {});
  }, []);

  useEffect(() => {
    const isFormValid = catalogId !== null && odometorValidator(interval);
    setIsSendButtonActive(isFormValid);
  }, [catalogId, interval]);

  const { mutate: addMaintenance, isPending } = useApiMutation({
    mutationFn: (data: MaintenanceJobSendObject) => addMaintenanceTypeJob(data),
    invalidateKeys: [[QueryKeys.NEXT_MAINTENANCES_LIST, carId]],
    onSuccessCallback: () => {
      setIsVisible(false);
      setCatalogId(null);
      setInterval("");
      setAddToAllCars(false);
    },
  });

  const handleSubmit = () => {
    if (isPending || catalogId === null) return;
    addMaintenance({
      catalogId,
      interval: parseOdometerIntoNumber(interval),
      applyToAllCars: addToAllCars,
      carId: Number(carId),
      regular,
    });
  };

  const availableCatalogItems = catalogItems.filter(
    (item) => !scheduledJobNames.includes(item.name)
  );

  return {
    state: {
      catalogId,
      interval,
      isSendButtonActive,
      addToAllCars,
      regular,
      isLoading: isPending,
      catalogItems: availableCatalogItems,
    },
    setters: {
      setInterval,
      setCatalogId,
      setRegular,
      setAddToAllCars,
    },
    handlers: {
      handleSubmit,
    },
  };
};
