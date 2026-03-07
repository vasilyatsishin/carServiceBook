import { useEffect, useState } from "react";
import {
  isPhotoValid,
  odometorValidator,
} from "../../../shared/helpers/validators/addCarValidator";
// Додаємо updateCar (або як він у вас називається)
import { addCar, updateCar } from "../../../services/carService";
import type {
  CarEntity,
  CarReceivingObject,
} from "../../../interfaces/Cars/CarInterface";
import { useNavigate } from "react-router";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { BASE_DOMAIN_NAME} from "../../../api/apiConfig";

interface UseAddCarFormProps {
  carInfo?: CarReceivingObject;
}

export const useAddCarForm = ({ carInfo }: UseAddCarFormProps) => {
  const [carName, setCarName] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  // 1. Змінюємо тип стейту: тепер тут може бути і File, і string (URL)
  const [photo, setPhoto] = useState<File | string | undefined>(undefined);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (carInfo) {
      setCarName(carInfo.name);
      setOdometer(formatOdometer(carInfo.odometer.toString()));
      setPhoto(BASE_DOMAIN_NAME + carInfo.photoUrl);
    }
  }, [carInfo]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Очищуємо пробіг від крапок перед відправкою, якщо бекенд чекає число
      const cleanOdometer = odometer.replace(/\./g, "");

      const sendObject: CarEntity = {
        ...(carInfo?.id && { id: carInfo.id }),
        name: carName,
        odometer: cleanOdometer,
        photo: photo instanceof File ? photo : undefined,
      };

      if (carInfo?.id) {
        // Логіка редагування
        await updateCar(sendObject);
      } else {
        // Логіка створення
        await addCar(sendObject);
      }

      navigate("/exist-cars");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid =
      carName.trim().length >= 3 &&
      odometorValidator(odometer) &&
      isPhotoValid(photo);

    setIsSendButtonActive(isFormValid);
  }, [carName, odometer, photo, carInfo]);

  return {
    state: {
      carName,
      odometer,
      photo,
      isSendButtonActive,
      isLoading,
    },
    setters: {
      setCarName,
      setOdometer,
      setPhoto,
      setIsSendButtonActive,
    },
    handlers: {
      handleSubmit,
    },
  };
};
