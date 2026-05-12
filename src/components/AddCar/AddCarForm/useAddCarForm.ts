import { useEffect, useState } from "react";
import {
  isPhotoValid,
  odometorValidator,
} from "../../../shared/helpers/validators/addCarValidator";
import { addCar, updateCar } from "../../../services/carService";
import { getClients } from "../../../services/userService";
import type {
  CarEntity,
  CarReceivingObject,
  UserClientDTO,
} from "../../../interfaces/Cars/CarInterface";
import { useNavigate } from "react-router";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import { BASE_DOMAIN_NAME} from "../../../api/apiConfig";
import { getUserRole } from "../../../shared/helpers/jwtDecoder";
import { ROLES } from "../../../constants/roles";
import { pathConstants } from "../../../constants/pathConstants";

interface UseAddCarFormProps {
  carInfo?: CarReceivingObject;
}

export const useAddCarForm = ({ carInfo }: UseAddCarFormProps) => {
  const [carName, setCarName] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  const [photo, setPhoto] = useState<File | string | undefined>(undefined);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  const [clients, setClients] = useState<UserClientDTO[]>([]);

  const isServiceRole = getUserRole() === ROLES.SERVICE;
  const navigate = useNavigate();

  useEffect(() => {
    if (isServiceRole) {
      getClients().then(setClients).catch(() => {});
    }
  }, []);

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
        ...(isServiceRole && selectedOwnerId && { ownerId: selectedOwnerId }),
      };

      if (carInfo?.id) {
        await updateCar(sendObject);
      } else {
        await addCar(sendObject);
      }

      navigate(isServiceRole ? pathConstants.SERVICE : pathConstants.EXIST_CARS);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const baseValid =
      carName.trim().length >= 3 &&
      odometorValidator(odometer) &&
      isPhotoValid(photo);
    const ownerValid = !isServiceRole || selectedOwnerId !== null;
    setIsSendButtonActive(baseValid && ownerValid);
  }, [carName, odometer, photo, carInfo, selectedOwnerId]);

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
      setSelectedOwnerId,
    },
    meta: {
      isServiceRole,
      clients,
      selectedOwnerId,
    },
    handlers: {
      handleSubmit,
    },
  };
};
