import { useEffect, useState } from "react";
import api from "../../../api/apiConfig";
import { API_CONSTANTS } from "../../../constants/apiConstants";
import {
  isPhotoValid,
  odometorValidator,
} from "../../../shared/helpers/validators/addCarValidator";

export const useAddCarForm = () => {
  const [carName, setCarName] = useState<string>("");
  const [odometer, setOdometer] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [isSendButtonActive, setIsSendButtonActive] = useState<boolean>(true);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", carName);
    const odometerNumber = Number(odometer.replace(/\./g, ""));
    formData.append("odometer", odometerNumber.toString());
    if (photo) formData.append("photo", photo);

    await api.post(API_CONSTANTS.CAR_CREATE, formData);
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
