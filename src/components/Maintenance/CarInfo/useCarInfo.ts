import { useEffect, useRef, useState } from "react";
import {
  formatOdometer,
  parseOdometerIntoNumber,
} from "../../../shared/helpers/formatters/carFormatter";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";
import { updateOdometer as updateOdometerService } from "../../../services/carService";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";
import { QueryKeys } from "../../../interfaces/QueryKeys";

interface UseCarInfoProps {
  odometer: number;
  car: CarReceivingObject;
}

export const useCarInfo = ({ odometer, car }: UseCarInfoProps) => {
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [odometerValue, setOdometerValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current?.focus();
    }
  }, [isInputActive]);

  const { mutate: updateOdometer, isPending } = useApiMutation({
    mutationFn: (newOdometer: number) => {
      return updateOdometerService(car.id, newOdometer);
    },
    invalidateKeys: [
      [QueryKeys.CAR, String(car.id)],
      [QueryKeys.CAR_LIST],
      [QueryKeys.NEXT_MAINTENANCES_LIST, String(car.id)],
    ],
    onSuccessCallback: () => {
      setError(null);
      setIsInputActive(false);
      setOdometerValue("");
    },
    onErrorCallback: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const handleConfirm = async () => {
    const parsed = parseOdometerIntoNumber(odometerValue);

    if (isNaN(parsed) || parsed < odometer) {
      setError(`Пробіг не може бути меншим за поточний (${odometer} км)`);
      inputRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      await updateOdometer(parsed);
    } catch (e) {
      setLoading(false);
    }

    setError(null);
    setIsInputActive(false);
    setOdometerValue("");
    setLoading(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setOdometerValue(formatOdometer(e.target.value));
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsInputActive(false);
      setError(null);
      setOdometerValue("");
    }, 200);
  };

  const handleEdit = () => {
    setIsInputActive(true);
  };
  return {
    // state
    isInputActive,
    isPending: isPending || loading,
    error,
    odometerValue,
    inputRef,

    // setters
    setIsInputActive,

    // handlers
    handleBlur,
    handleConfirm,
    handleEdit,
    onInputChange,
  };
};
