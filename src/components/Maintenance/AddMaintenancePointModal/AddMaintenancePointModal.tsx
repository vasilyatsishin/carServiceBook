import type React from "react";
import styles from "./AddMaintenancePointModal.module.css";
import Input from "../../../shared/components/Input/Input";
import { useAddMaintenancePointModal } from "./useAddMaintenancePointModal";
import { odometorValidator } from "../../../shared/helpers/validators/addCarValidator";
import { formatOdometer } from "../../../shared/helpers/formatters/carFormatter";
import SaveButton from "../../../shared/components/SaveButton/SaveButton";
import { useParams } from "react-router";
import Checkbox from "../../../shared/components/Checkbox/Checkbox";

interface AddMaintenancePointModalProps {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const AddMaintenancePointModal: React.FC<AddMaintenancePointModalProps> = ({
  visible,
  setIsVisible,
}) => {
  const { carId } = useParams<{ carId: string }>();
  const { setters, state, handlers } = useAddMaintenancePointModal({
    carId: carId || "",
    setIsVisible,
  });

  return (
    <>
      <div
        className={styles.overlay}
        data-visible={visible}
        onClick={() => setIsVisible(false)}
      >
        <div
          className={styles.mainWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Створити тип обслуговування</h1>
          <Input
            data={state.name}
            label="Робота"
            setData={setters.setName}
            placeholder="Заміна мастила"
            variant="addMaintenance"
          />
          <Input
            data={state.interval}
            label="Інтервал заміни, км"
            setData={(value: string) =>
              setters.setInterval(formatOdometer(value))
            }
            placeholder="10.000"
            variant="addMaintenance"
            validator={(value) =>
              odometorValidator(value)
                ? null
                : "Інтервал має містити тільки цифри"
            }
          />
          <div className={styles.fullsizeWrapper}>
            <Checkbox
              handleChoose={(e) => setters.setAddToAllCars(e.target.checked)}
              label="Застосувати для всіх авто"
            />
            <Checkbox
              handleChoose={(e) => setters.setRegular(e.target.checked)}
              label="Регулярне обслуговування"
            />
          </div>

          <SaveButton
            submitHandler={handlers.handleSubmit}
            isActive={state.isSendButtonActive}
            fullWidth={false}
            isLoading={state.isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AddMaintenancePointModal;
