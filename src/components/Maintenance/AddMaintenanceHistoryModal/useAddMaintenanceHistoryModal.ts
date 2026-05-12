import { useEffect, useState } from "react";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import { addMaintenanceHistory } from "../../../services/maintenanceService";
import { getCatalog } from "../../../services/catalogService";
import type { DropDownOptionsInterface } from "../../../interfaces/DropDownOptionsInterface";
import { parseOdometerIntoNumber } from "../../../shared/helpers/formatters/carFormatter";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";
import { getCarById } from "../../../services/carService";
import { useApiQuery } from "../../../shared/hooks/useApiQuery";
import type { MaintenanceHistorySendObject } from "../../../interfaces/Maintenance/PerformedMaintenanceInterface";
import type { CatalogItem } from "../../../interfaces/Catalog/CatalogInterface";
import type { Dayjs } from "dayjs";
import { QueryKeys } from "../../../interfaces/QueryKeys";

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
  const [performedMaintenances, setPerformedMaintenances] = useState<DropDownOptionsInterface[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);
  const [isAddPointModalVisible, setIsAddPointModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getCatalog().then(setCatalogItems).catch(() => {});
  }, []);

  const calculatedPrice = performedMaintenances.reduce((sum, opt) => {
    const item = catalogItems.find((c) => c.id === opt.value);
    return sum + (item?.price ?? 0);
  }, 0);

  const { data: carObject } = useApiQuery(
    ["car", carId],
    () => getCarById(Number(carId)),
    { enabled: !!carId }
  );

  useEffect(() => {
    const isFormValid =
      place.trim().length >= 3 &&
      odometorValidator(odometer) &&
      parseOdometerIntoNumber(odometer) >= (carObject?.odometer ?? 0) &&
      performedMaintenances.length > 0 &&
      date != null;
    setIsSendButtonActive(isFormValid);
  }, [performedMaintenances, odometer, place, date, carObject]);

  const setToNull = () => {
    setPlace("");
    setOdometer("");
    setPerformedMaintenances([]);
    setIsVisible(false);
    setDate(null);
  };

  const { mutate: addMaintenance, isPending } = useApiMutation({
    mutationFn: (data: MaintenanceHistorySendObject) => addMaintenanceHistory(data),
    invalidateKeys: [
      [QueryKeys.NEXT_MAINTENANCES_LIST, carId],
      [QueryKeys.CAR, carId],
      [QueryKeys.PERFORMED_MAINTENANCES, carId],
    ],
    onSuccessCallback: () => setToNull(),
  });

  const handleSubmit = async () => {
    if (isPending) return;
    await addMaintenance({
      carId: Number(carId),
      comment: "",
      date: date!.format("YYYY-MM-DD"),
      odometer: parseOdometerIntoNumber(odometer),
      performedCatalogIds: performedMaintenances.map((e) => e.value),
      place,
      price: calculatedPrice,
    });
  };

  const catalogDropdownOptions: DropDownOptionsInterface[] = catalogItems.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return {
    state: {
      place,
      odometer,
      performedMaintenances,
      isSendButtonActive,
      isLoading: isPending,
      car: carObject,
      date,
      calculatedPrice,
      isAddPointModalVisible,
      catalogDropdownOptions,
    },
    setters: {
      setPlace,
      setOdometer,
      setPerformedMaintenances,
      setDate,
      setIsAddPointModalVisible,
    },
    handlers: {
      handleSubmit,
      setToNull,
    },
  };
};
