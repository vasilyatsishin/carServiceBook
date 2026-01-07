import { useEffect, useState } from "react";
import {
  isPhotoValid,
  odometorValidator,
} from "../../../shared/helpers/validators/addCarValidator";
import { addCar } from "../../../services/carService";
import type { CarEntity } from "../../../interfaces/Cars/CarInterface";
import { useDispatch } from "react-redux";

export const useAddCarForm = () => {
  const [carName, setCarName] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const sendObject: CarEntity = {
        name: carName,
        odometer,
        photo: photo,
      };
      await addCar(sendObject);
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
