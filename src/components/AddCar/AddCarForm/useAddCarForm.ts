import { useEffect, useState } from "react";
import {
  isPhotoValid,
  odometorValidator,
} from "../../../shared/helpers/validators/addCarValidator";
import { addCar } from "../../../services/carService";
import type {
  CarEntity,
  CarReceivingObject,
} from "../../../interfaces/Cars/CarInterface";
import { useNavigate } from "react-router";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";

interface UseAddCarFormProps {
  carInfo?: CarReceivingObject;
}

export const useAddCarForm = ({ carInfo }: UseAddCarFormProps) => {
  const [carName, setCarName] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    setCarName(carInfo?.name || "");
    setOdometer(formatOdometer(carInfo?.odometer.toString() || ""));
  }, [carInfo]);

  const handleSubmit = async () => {
    try {
      const sendObject: CarEntity = {
        name: carName,
        odometer,
        photo: photo,
      };
      await addCar(sendObject);
      navigate("/exist-cars");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isFormValid =
      carName.trim().length >= 3 &&
      odometorValidator(odometer) &&
      isPhotoValid(photo);

    setIsSendButtonActive(isFormValid);
  }, [carName, odometer, photo]);

  return {
    state: {
      carName,
      odometer,
      photo,
      isSendButtonActive,
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
