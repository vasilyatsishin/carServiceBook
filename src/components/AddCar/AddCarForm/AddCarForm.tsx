import type React from "react";
import Input from "../../../shared/components/Input/Input";
import { useAddCarForm } from "./useAddCarForm";
import styles from "./AddCarForm.module.css";
import SaveButton from "../../../shared/components/SaveButton/SaveButton";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import PhotoInput from "../../../shared/components/PhotoInput/PhotoInput";
import type { CarReceivingObject } from "../../../interfaces/Cars/CarInterface";

interface AddCarFormProps {
  carInfo?: CarReceivingObject;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ carInfo }) => {
  const { setters, state, handlers } = useAddCarForm({ carInfo });
  return (
    <>
      <div className={styles.mainWrapper}>
        <PhotoInput
          setData={setters.setPhoto}
          placeholder="Додайте фото вашого авто"
          data={state.photo}
        />

        <Input
          data={state.carName}
          setData={setters.setCarName}
          label="Назва авто"
          placeholder="BMW M5 2021"
          validator={(value) =>
            value.length >= 3 ? null : "Назва має бути заповнена"
          }
          variant="addCar"
        />

        <Input
          data={state.odometer}
          setData={(value: string) =>
            setters.setOdometer(formatOdometer(value))
          }
          label="Пробіг, км"
          placeholder="195.000"
          validator={(value) =>
            odometorValidator(value) ? null : "Пробіг має містити тільки цифри"
          }
          variant="addCar"
        />

        <SaveButton
          submitHandler={handlers.handleSubmit}
          isActive={state.isSendButtonActive}
          fullWidth={false}
        />
      </div>
    </>
  );
};

export default AddCarForm;
